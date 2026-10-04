import { addDays, format } from "date-fns";
import type { Booking } from "@/lib/supabase";

export type BookingStatus = NonNullable<Booking["status"]>;

export const statusMeta: Record<BookingStatus, { label: string; className: string }> = {
  pending: { label: "Na čekanju", className: "bg-signal text-ink" },
  confirmed: { label: "Potvrđen", className: "bg-ink text-white dark:bg-white dark:text-ink" },
  completed: {
    label: "Završen",
    className: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200",
  },
  cancelled: { label: "Otkazan", className: "bg-muted text-muted-foreground line-through" },
};

/**
 * Data access for the admin panel. The demo implementation keeps sample
 * bookings in memory; swap in a Supabase-backed one once the project exists.
 */
export interface BookingsRepository {
  isDemo: boolean;
  list(): Promise<Booking[]>;
  updateStatus(id: string, status: BookingStatus): Promise<void>;
}

const day = (offset: number) => format(addDays(new Date(), offset), "yyyy-MM-dd");
const created = (offsetDays: number, hour: number) => {
  const d = addDays(new Date(), offsetDays);
  d.setHours(hour, 15, 0, 0);
  return d.toISOString();
};

// Sample data for the demo mode only. These people are not real clients.
const sampleBookings: Booking[] = [
  {
    id: "demo-1",
    created_at: created(0, 8),
    name: "Primer Klijent 1",
    phone: "060 000 0001",
    email: "klijent1@primer.rs",
    service: "Kućne instalacije",
    date: day(0),
    time_slot: "10:00 - 12:00",
    description: "Renoviranje stana od 55 m², potrebna nova razvodna tabla.",
    status: "confirmed",
  },
  {
    id: "demo-2",
    created_at: created(0, 9),
    name: "Primer Klijent 2",
    phone: "060 000 0002",
    service: "LED rasveta",
    date: day(0),
    time_slot: "14:00 - 16:00",
    description: "Ugradnja LED traka u kuhinji i dnevnoj sobi.",
    status: "pending",
  },
  {
    id: "demo-3",
    created_at: created(-1, 18),
    name: "Primer Klijent 3",
    phone: "060 000 0003",
    email: "klijent3@primer.rs",
    service: "Ugradnja utičnica i prekidača",
    date: day(1),
    time_slot: "08:00 - 10:00",
    description: "Dodati tri utičnice u spavaćoj sobi.",
    status: "pending",
  },
  {
    id: "demo-4",
    created_at: created(-1, 11),
    name: "Primer Klijent 4",
    phone: "060 000 0004",
    service: "Poslovni objekti",
    date: day(2),
    time_slot: "12:00 - 14:00",
    description: "Lokal od 40 m², pregled instalacije pre otvaranja.",
    status: "confirmed",
  },
  {
    id: "demo-5",
    created_at: created(-2, 20),
    name: "Primer Klijent 5",
    phone: "060 000 0005",
    service: "Smart home sistemi",
    date: day(3),
    time_slot: "16:00 - 18:00",
    status: "pending",
  },
  {
    id: "demo-6",
    created_at: created(-3, 10),
    name: "Primer Klijent 6",
    phone: "060 000 0006",
    email: "klijent6@primer.rs",
    service: "Zaštita od prenapona",
    date: day(5),
    time_slot: "10:00 - 12:00",
    description: "Ugradnja odvodnika prenapona u kući.",
    status: "confirmed",
  },
  {
    id: "demo-7",
    created_at: created(-6, 9),
    name: "Primer Klijent 7",
    phone: "060 000 0007",
    service: "Električni grejači",
    date: day(-2),
    time_slot: "08:00 - 10:00",
    description: "Priključenje bojlera.",
    status: "completed",
  },
  {
    id: "demo-8",
    created_at: created(-7, 14),
    name: "Primer Klijent 8",
    phone: "060 000 0008",
    service: "Kućne instalacije",
    date: day(-3),
    time_slot: "12:00 - 14:00",
    status: "completed",
  },
  {
    id: "demo-9",
    created_at: created(-5, 16),
    name: "Primer Klijent 9",
    phone: "060 000 0009",
    service: "LED rasveta",
    date: day(-1),
    time_slot: "14:00 - 16:00",
    description: "Klijent otkazao zbog putovanja.",
    status: "cancelled",
  },
];

const createDemoRepository = (): BookingsRepository => {
  let rows = sampleBookings.map((b) => ({ ...b }));
  return {
    isDemo: true,
    list: async () => rows.map((b) => ({ ...b })),
    updateStatus: async (id, status) => {
      rows = rows.map((b) => (b.id === id ? { ...b, status } : b));
    },
  };
};

export const bookingsRepository: BookingsRepository = createDemoRepository();
