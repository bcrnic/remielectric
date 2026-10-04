import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, isToday, isTomorrow, parseISO, differenceInCalendarDays } from "date-fns";
import { srLatn } from "date-fns/locale";
import { Phone, Search, Check, CheckCheck, X, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Booking } from "@/lib/supabase";
import { bookingsRepository, statusMeta, type BookingStatus } from "@/lib/bookings";

type Filter = "all" | BookingStatus;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Svi" },
  { value: "pending", label: "Na čekanju" },
  { value: "confirmed", label: "Potvrđeni" },
  { value: "completed", label: "Završeni" },
  { value: "cancelled", label: "Otkazani" },
];

const toastText: Record<BookingStatus, string> = {
  pending: "Termin vraćen na čekanje",
  confirmed: "Termin potvrđen",
  completed: "Termin označen kao završen",
  cancelled: "Termin otkazan",
};

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

const dayLabel = (date: string) => {
  const d = parseISO(date);
  if (isToday(d)) return "Danas";
  if (isTomorrow(d)) return "Sutra";
  return format(d, "EEEE, d. MMMM", { locale: srLatn });
};

const StatusBadge = ({ status }: { status: BookingStatus }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide whitespace-nowrap",
      statusMeta[status].className,
    )}
  >
    {statusMeta[status].label}
  </span>
);

interface ActionsProps {
  booking: Booking;
  onChange: (status: BookingStatus) => void;
  onCancel: () => void;
  size?: "sm" | "default";
}

const BookingActions = ({ booking, onChange, onCancel, size = "sm" }: ActionsProps) => {
  const status = booking.status ?? "pending";
  return (
    <div className="flex flex-wrap gap-2">
      {status === "pending" && (
        <Button size={size} variant="electric" onClick={() => onChange("confirmed")}>
          <Check /> Potvrdi
        </Button>
      )}
      {status === "confirmed" && (
        <Button size={size} onClick={() => onChange("completed")}>
          <CheckCheck /> Završeno
        </Button>
      )}
      {(status === "pending" || status === "confirmed") && (
        <Button size={size} variant="outline" onClick={onCancel}>
          <X /> Otkaži
        </Button>
      )}
      {(status === "cancelled" || status === "completed") && (
        <Button size={size} variant="outline" onClick={() => onChange("pending")}>
          Vrati na čekanje
        </Button>
      )}
    </div>
  );
};

const BookingsBoard = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [cancelId, setCancelId] = useState<string | null>(null);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: () => bookingsRepository.list(),
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: BookingStatus }) =>
      bookingsRepository.updateStatus(id, status),
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
      toast.success(toastText[status]);
    },
    onError: () => toast.error("Promena nije sačuvana. Pokušajte ponovo."),
  });

  const changeStatus = (id: string, status: BookingStatus) => mutation.mutate({ id, status });

  const stats = useMemo(() => {
    const active = bookings.filter((b) => b.status !== "cancelled");
    const daysAway = (b: Booking) => differenceInCalendarDays(parseISO(b.date), new Date());
    return {
      pending: bookings.filter((b) => b.status === "pending").length,
      today: active.filter((b) => daysAway(b) === 0).length,
      week: active.filter((b) => daysAway(b) >= 0 && daysAway(b) < 7).length,
      completed: bookings.filter((b) => b.status === "completed").length,
    };
  }, [bookings]);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: bookings.length,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
    };
    bookings.forEach((b) => (c[b.status ?? "pending"] += 1));
    return c;
  }, [bookings]);

  // Upcoming first (soonest on top), then past appointments (most recent on top)
  const groups = useMemo(() => {
    const q = search.trim().toLowerCase();
    const visible = bookings.filter(
      (b) =>
        (filter === "all" || b.status === filter) &&
        (!q ||
          b.name.toLowerCase().includes(q) ||
          b.phone.replace(/\s/g, "").includes(q.replace(/\s/g, "")) ||
          b.service.toLowerCase().includes(q)),
    );
    const key = (b: Booking) => `${b.date} ${b.time_slot}`;
    const isPast = (b: Booking) => differenceInCalendarDays(parseISO(b.date), new Date()) < 0;
    const upcoming = visible.filter((b) => !isPast(b)).sort((a, b) => key(a).localeCompare(key(b)));
    const past = visible.filter(isPast).sort((a, b) => key(b).localeCompare(key(a)));

    const byDay: { label: string; items: Booking[] }[] = [];
    upcoming.forEach((b) => {
      const label = dayLabel(b.date);
      const last = byDay[byDay.length - 1];
      if (last?.label === label) last.items.push(b);
      else byDay.push({ label, items: [b] });
    });
    if (past.length) byDay.push({ label: "Prošli termini", items: past });
    return byDay;
  }, [bookings, filter, search]);

  const openBooking = bookings.find((b) => b.id === openId) ?? null;
  const cancelBooking = bookings.find((b) => b.id === cancelId) ?? null;

  const statTiles = [
    { label: "Na čekanju", value: stats.pending, highlight: true },
    { label: "Danas", value: stats.today },
    { label: "Narednih 7 dana", value: stats.week },
    { label: "Završeno", value: stats.completed },
  ];

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statTiles.map((s) => (
          <div
            key={s.label}
            className={cn(
              "rounded-xl p-5 border",
              s.highlight && s.value > 0
                ? "bg-signal border-signal text-ink"
                : "bg-card border-border",
            )}
          >
            <div className="font-display font-extrabold text-5xl leading-none tabular-nums">
              {isLoading ? "–" : s.value}
            </div>
            <div
              className={cn(
                "mt-2 text-sm font-semibold",
                s.highlight && s.value > 0 ? "text-ink" : "text-muted-foreground",
              )}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtriraj po statusu">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              role="tab"
              aria-selected={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full px-4 h-10 text-sm font-semibold border transition-colors",
                filter === f.value
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card border-border hover:border-foreground/40",
              )}
            >
              {f.label}
              <span className="ml-2 tabular-nums opacity-70">{counts[f.value]}</span>
            </button>
          ))}
        </div>
        <div className="relative lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="admin-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pretraga: ime, telefon, usluga"
            className="pl-9 h-10"
            aria-label="Pretraga termina"
          />
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : groups.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <p className="font-display font-bold text-2xl">Nema termina</p>
          <p className="text-muted-foreground mt-1">
            {search || filter !== "all"
              ? "Nijedan termin ne odgovara filteru ili pretrazi."
              : "Novi zahtevi sa forme za zakazivanje pojaviće se ovde."}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map((group) => (
            <section key={group.label} aria-label={group.label}>
              <h2 className="font-display font-bold uppercase tracking-wide text-xl mb-3 first-letter:uppercase">
                {group.label}
                <span className="ml-2 text-muted-foreground font-semibold text-base">
                  {group.items.length}
                </span>
              </h2>
              <ul className="space-y-3">
                {group.items.map((b) => {
                  const status = b.status ?? "pending";
                  return (
                    <li
                      key={b.id}
                      className={cn(
                        "rounded-xl border bg-card p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4",
                        status === "pending" ? "border-signal" : "border-border",
                        status === "cancelled" && "opacity-60",
                      )}
                    >
                      <div className="md:w-36 shrink-0">
                        <div className="font-display font-bold text-2xl leading-none tabular-nums">
                          {b.time_slot}
                        </div>
                        {group.label === "Prošli termini" && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {format(parseISO(b.date), "d. MMM", { locale: srLatn })}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setOpenId(b.id ?? null)}
                        className="flex-1 min-w-0 text-left rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="font-bold text-lg">{b.name}</span>
                          <StatusBadge status={status} />
                        </div>
                        <div className="text-sm font-semibold text-signal-text mt-1">
                          {b.service}
                        </div>
                        {b.description && (
                          <p className="text-sm text-muted-foreground mt-1 truncate">
                            {b.description}
                          </p>
                        )}
                      </button>

                      <div className="flex flex-wrap items-center gap-2 md:justify-end">
                        <Button asChild size="sm" variant="outline">
                          <a href={telHref(b.phone)}>
                            <Phone /> {b.phone}
                          </a>
                        </Button>
                        <BookingActions
                          booking={b}
                          onChange={(s) => b.id && changeStatus(b.id, s)}
                          onCancel={() => setCancelId(b.id ?? null)}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}

      {/* Detail sheet */}
      <Sheet open={!!openBooking} onOpenChange={(open) => !open && setOpenId(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          {openBooking && (
            <>
              <SheetHeader className="text-left">
                <StatusBadge status={openBooking.status ?? "pending"} />
                <SheetTitle className="font-display font-extrabold uppercase text-3xl pt-2">
                  {openBooking.name}
                </SheetTitle>
                <SheetDescription>{openBooking.service}</SheetDescription>
              </SheetHeader>

              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Termin</dt>
                  <dd className="font-semibold text-base first-letter:uppercase">
                    {format(parseISO(openBooking.date), "EEEE, d. MMMM yyyy.", { locale: srLatn })}
                    {" · "}
                    {openBooking.time_slot}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Telefon</dt>
                  <dd>
                    <a
                      href={telHref(openBooking.phone)}
                      className="font-semibold text-base underline decoration-signal decoration-2 underline-offset-4"
                    >
                      {openBooking.phone}
                    </a>
                  </dd>
                </div>
                {openBooking.email && (
                  <div>
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${openBooking.email}`}
                        className="inline-flex items-center gap-1.5 font-semibold underline decoration-signal decoration-2 underline-offset-4"
                      >
                        <Mail className="w-4 h-4" />
                        {openBooking.email}
                      </a>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-muted-foreground">Opis</dt>
                  <dd className="whitespace-pre-line">
                    {openBooking.description || "Klijent nije ostavio opis."}
                  </dd>
                </div>
                {openBooking.created_at && (
                  <div>
                    <dt className="text-muted-foreground">Zahtev poslat</dt>
                    <dd>
                      {format(parseISO(openBooking.created_at), "d. MMMM yyyy. 'u' HH:mm", {
                        locale: srLatn,
                      })}
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-8 space-y-3">
                <Button asChild variant="electric" className="w-full h-12">
                  <a href={telHref(openBooking.phone)}>
                    <Phone /> Pozovi klijenta
                  </a>
                </Button>
                <BookingActions
                  booking={openBooking}
                  size="default"
                  onChange={(s) => openBooking.id && changeStatus(openBooking.id, s)}
                  onCancel={() => setCancelId(openBooking.id ?? null)}
                />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Cancel confirmation */}
      <AlertDialog open={!!cancelBooking} onOpenChange={(open) => !open && setCancelId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Otkazati termin?</AlertDialogTitle>
            <AlertDialogDescription>
              {cancelBooking &&
                `${cancelBooking.name}, ${dayLabel(cancelBooking.date).toLowerCase()} u ${cancelBooking.time_slot}. Klijentu javite telefonom da je termin otkazan.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Nazad</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (cancelBooking?.id) changeStatus(cancelBooking.id, "cancelled");
                setCancelId(null);
              }}
            >
              Otkaži termin
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BookingsBoard;
