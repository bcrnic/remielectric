import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { sr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const serviceTypes = [
  "Kućne elektro instalacije",
  "Poslovni objekti",
  "Održavanje i popravke",
  "LED rasveta",
  "Ugradnja utičnica/prekidača",
  "Zaštita od prenapona",
  "Električni grejači",
  "Smart home sistemi",
  "Drugo",
];

const timeSlots = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
];

const Booking = () => {
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    timeSlot: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      toast.error("Molimo izaberite datum");
      return;
    }

    if (!formData.timeSlot) {
      toast.error("Molimo izaberite termin");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - in production, this would send to a backend
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Termin je uspešno zakazan!");
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Termin Zakazan - REMIELECTRIC</title>
        </Helmet>

        <div className="min-h-screen">
          <Navbar />
          <main className="pt-20 min-h-[80vh] flex items-center">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-md mx-auto text-center">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                  Termin je zakazan!
                </h1>
                <p className="text-muted-foreground mb-6">
                  Hvala vam na poverenju. Kontaktiraćemo vas uskoro radi potvrde termina.
                </p>
                <div className="bg-card rounded-xl p-6 border border-border text-left mb-8">
                  <h3 className="font-semibold text-foreground mb-4">Detalji zakazivanja:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Ime:</span>
                      <span className="font-medium">{formData.name}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Datum:</span>
                      <span className="font-medium">
                        {date && format(date, "PPP", { locale: sr })}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Termin:</span>
                      <span className="font-medium">{formData.timeSlot}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Usluga:</span>
                      <span className="font-medium">{formData.service}</span>
                    </li>
                  </ul>
                </div>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      phone: "",
                      email: "",
                      service: "",
                      timeSlot: "",
                      description: "",
                    });
                    setDate(undefined);
                  }}
                  variant="outline"
                >
                  Zakaži novi termin
                </Button>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Zakaži Termin - REMIELECTRIC | Električar Novi Sad</title>
        <meta
          name="description"
          content="Zakažite besplatan termin za elektro usluge. Brza i jednostavna rezervacija online."
        />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />

        <main className="pt-20">
          {/* Hero */}
          <section className="py-12 md:py-16 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Zakaži termin
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                Popunite formu ispod i kontaktiraćemo vas u najkraćem roku radi potvrde termina.
              </p>
            </div>
          </section>

          {/* Booking Form */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                    <h2 className="font-display font-semibold text-xl text-foreground mb-6">
                      Vaši podaci
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Ime i prezime *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Vaše ime"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="060 630 1113"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="vas@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                    <h2 className="font-display font-semibold text-xl text-foreground mb-6">
                      Usluga
                    </h2>

                    <div className="space-y-2">
                      <Label>Vrsta usluge *</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, service: value }))
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Izaberite uslugu" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="mt-4 space-y-2">
                      <Label htmlFor="description">Opis problema / projekta</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Opišite ukratko šta vam treba..."
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                    <h2 className="font-display font-semibold text-xl text-foreground mb-6">
                      Datum i vreme
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Date Picker */}
                      <div className="space-y-2">
                        <Label>Željeni datum *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP", { locale: sr }) : "Izaberite datum"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(date) => date < new Date() || date.getDay() === 0}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Time Slot */}
                      <div className="space-y-2">
                        <Label>Željeni termin *</Label>
                        <Select
                          value={formData.timeSlot}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, timeSlot: value }))
                          }
                        >
                          <SelectTrigger>
                            <Clock className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Izaberite vreme" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="electric"
                    size="xl"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Zakazujem...
                      </>
                    ) : (
                      "Zakaži termin besplatno"
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Kontaktiraćemo vas telefonom radi potvrde termina. Bez obaveza.
                  </p>
                </form>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Booking;
