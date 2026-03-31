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
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import { breadcrumbSchema } from "@/lib/structuredData";

const timeSlots = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
];

const Booking = () => {
  const { t, i18n } = useTranslation();
  
  const servicesList = t("services.list", { returnObjects: true }) as Array<{ title: string }>;
  const serviceTypes = [...servicesList.map((s) => s.title), t("booking.other", "Drugo")];

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
      toast.error(t("booking.selectDateError", "Molimo izaberite datum"));
      return;
    }

    if (!formData.timeSlot) {
      toast.error(t("booking.selectTimeError", "Molimo izaberite termin"));
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - in production, this would send to a backend
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success(t("booking.success"));
  };

  const breadcrumbs = breadcrumbSchema([
    { name: t("nav.home"), url: "https://remielectric.rs" },
    { name: t("nav.booking"), url: "https://remielectric.rs/zakazivanje" },
  ]);

  if (isSubmitted) {
    return (
      <>
        <SEO
          title={t("seo.booking.successTitle", "Termin Zakazan - REMIELECTRIC")}
          description={t("seo.booking.successDesc", "Vaš termin je uspešno zakazan. Kontaktiraćemo vas uskoro.")}
          noindex={true}
        />

        <div className="min-h-screen">
          <Navbar />
          <main className="pt-20 min-h-[80vh] flex items-center">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-md mx-auto text-center">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                  {t("booking.success")}
                </h1>
                <p className="text-muted-foreground mb-6">
                  {t("booking.successMessage")}
                </p>
                <div className="bg-card rounded-xl p-6 border border-border text-left mb-8">
                  <h3 className="font-semibold text-foreground mb-4">{t("booking.bookingDetails")}</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">{t("common.name")}:</span>
                      <span className="font-medium">{formData.name}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">{t("common.date")}:</span>
                      <span className="font-medium">
                        {date && format(date, "PPP", { locale: i18n.language === 'en' ? undefined : sr })}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">{t("common.time")}:</span>
                      <span className="font-medium">{formData.timeSlot}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">{t("booking.service")}:</span>
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
                  {t("booking.bookNew")}
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
      <SEO
        title={t("seo.booking.title", "Zakaži Termin - REMIELECTRIC | Električar Novi Sad")}
        description={t("seo.booking.description", "Zakažite besplatan termin za elektro usluge. Brza i jednostavna rezervacija online.")}
        keywords="zakazivanje termina električar, online rezervacija elektro usluge, zakaži termin Novi Sad"
        canonical="https://remielectric.rs/zakazivanje"
        structuredData={breadcrumbs}
      />

      <div className="min-h-screen">
        <Navbar />

        <main className="pt-20">
          {/* Hero */}
          <section className="py-12 md:py-16 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                {t("booking.title")}
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                {t("booking.subtitle")}
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
                      {t("booking.personalInfo")}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("contact.form.name")} *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder={t("contact.form.name")}
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("contact.form.phone")} *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Daniel: 063 312 579 / Srđan: 060 630 1113"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <Label htmlFor="email">{t("contact.form.email")}</Label>
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
                      {t("booking.service")}
                    </h2>

                    <div className="space-y-2">
                      <Label>{t("booking.serviceType")} *</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, service: value }))
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("booking.selectService")} />
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
                      <Label htmlFor="description">{t("booking.description")}</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder={t("booking.descriptionPlaceholder")}
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                    <h2 className="font-display font-semibold text-xl text-foreground mb-6">
                      {t("booking.dateTime")}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Date Picker */}
                      <div className="space-y-2">
                        <Label>{t("booking.preferredDate")} *</Label>
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
                              {date ? format(date, "PPP", { locale: i18n.language === 'en' ? undefined : sr }) : t("booking.selectDate")}
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
                        <Label>{t("booking.preferredTime")} *</Label>
                        <Select
                          value={formData.timeSlot}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, timeSlot: value }))
                          }
                        >
                          <SelectTrigger>
                            <Clock className="mr-2 h-4 w-4" />
                            <SelectValue placeholder={t("booking.selectTime")} />
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
                        {t("booking.submitting")}
                      </>
                    ) : (
                      t("booking.submit")
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    {t("booking.noObligation")}
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
