import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/structuredData";

const Contact = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    toast.success(t("contact.form.success"));
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const breadcrumbs = breadcrumbSchema([
    { name: t("nav.home"), url: "https://remielectric.rs" },
    { name: t("nav.contact"), url: "https://remielectric.rs/kontakt" },
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbs, localBusinessSchema],
  };

  return (
    <>
      <SEO
        title={t("seo.contact.title", "Kontakt - REMIELECTRIC | Električar Novi Sad")}
        description={t(
          "seo.contact.description",
          "Kontaktirajte REMIELECTRIC za sve elektro usluge. Adresa: Stevana Hristića 5, 21000 Novi Sad. Brz odgovor garantovan.",
        )}
        keywords="kontakt električar Novi Sad, REMIELECTRIC kontakt, elektro usluge kontakt, Stevana Hristića 5"
        canonical="https://remielectric.rs/kontakt"
        structuredData={structuredData}
      />

      <div className="min-h-screen">
        <Navbar />

        <main className="pt-20">
          {/* Hero */}
          <section className="py-12 md:py-16 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                {t("contact.title")}
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                {t("contact.subtitle")}
              </p>
            </div>
          </section>

          {/* Contact Content */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                    {t("contact.info")}
                  </h2>

                  <div className="space-y-6">
                    {/* Address */}
                    <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                      <div className="w-12 h-12 rounded-lg bg-electric-blue-light flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Adresa</h3>
                        <p className="text-muted-foreground">
                          Stevana Hristića 5<br />
                          21000 Novi Sad, Srbija
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                      <div className="w-12 h-12 rounded-lg bg-electric-blue-light flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Telefon</h3>
                        <a
                          href="tel:+38163312579"
                          className="text-primary hover:text-electric-blue-dark transition-colors font-medium"
                        >
                          Daniel: 063 312 579
                        </a>
                        <div className="mt-1">
                          <a
                            href="tel:+381606301113"
                            className="text-primary hover:text-electric-blue-dark transition-colors font-medium"
                          >
                            Srđan: 060 630 1113
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                      <div className="w-12 h-12 rounded-lg bg-electric-blue-light flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                        <a
                          href="mailto:info@remielectric.rs"
                          className="text-primary hover:text-electric-blue-dark transition-colors font-medium"
                        >
                          info@remielectric.rs
                        </a>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                      <div className="w-12 h-12 rounded-lg bg-electric-blue-light flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {t("footer.workingHours")}
                        </h3>
                        <ul className="text-muted-foreground space-y-1 text-sm">
                          <li>{t("footer.workingDays")}</li>
                          <li>{t("footer.saturday")}</li>
                          <li>{t("footer.sunday")}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <a href="tel:+38163312579" className="flex-1">
                      <Button variant="default" size="lg" className="w-full">
                        <Phone className="w-4 h-4" />
                        {t("contact.form.callDaniel", "Pozovite Daniela")}
                      </Button>
                    </a>
                    <a href="tel:+381606301113" className="flex-1">
                      <Button variant="default" size="lg" className="w-full">
                        <Phone className="w-4 h-4" />
                        {t("contact.form.callSrdjan", "Pozovite Srđana")}
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    {t("contact.form.title")}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("contact.form.email")} *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="vas@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="060 630 1113"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t("contact.form.message")} *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="electric"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t("contact.form.sending")}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {t("contact.form.send")}
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Map */}
              <div className="mt-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  {t("contact.location")}
                </h2>
                <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2806.0559722961197!2d19.8380483!3d45.2471495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475b109d6f1c5f73%3A0xf24be4b0c6f4b26e!2sStevana%20Hristi%C4%87a%205%2C%20Novi%20Sad!5e0!3m2!1sen!2srs!4v1700000000000!5m2!1sen!2srs"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t("contact.form.mapTitle", "REMIELECTRIC lokacija")}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
