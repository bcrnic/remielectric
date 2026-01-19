import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const whatsappNumber = "38163312579";
  const whatsappMessage = encodeURIComponent(
    "Zdravo! Zanima me zakazivanje termina za elektro usluge.",
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

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
    toast.success("Poruka je uspešno poslata! Kontaktiraćemo vas uskoro.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>Kontakt - REMIELECTRIC | Električar Novi Sad</title>
        <meta
          name="description"
          content="Kontaktirajte REMIELECTRIC za sve elektro usluge. Adresa: Stevana Hristića 5, 21000 Novi Sad. Brz odgovor garantovan."
        />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />

        <main className="pt-20">
          {/* Hero */}
          <section className="py-12 md:py-16 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Kontaktirajte nas
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                Imate pitanje ili vam je potrebna pomoć? Javite nam se i odgovorićemo u najkraćem
                roku.
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
                    Kontakt informacije
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
                          +38163 312 579
                        </a>
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
                        <h3 className="font-semibold text-foreground mb-1">Radno vreme</h3>
                        <ul className="text-muted-foreground space-y-1 text-sm">
                          <li>Ponedeljak - Petak: 08:00 - 18:00</li>
                          <li>Subota: 09:00 - 14:00</li>
                          <li>Nedelja: Zatvoreno</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <a href="tel:+38163312579" className="flex-1">
                      <Button variant="default" size="lg" className="w-full">
                        <Phone className="w-4 h-4" />
                        Pozovite nas
                      </Button>
                    </a>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="whatsapp" size="lg" className="w-full">
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Pošaljite poruku
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
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
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+38163 312 579"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Poruka *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Kako vam možemo pomoći?"
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
                          Šaljem...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Pošalji poruku
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Map */}
              <div className="mt-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Lokacija</h2>
                <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2806.0559722961197!2d19.8380483!3d45.2471495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475b109d6f1c5f73%3A0xf24be4b0c6f4b26e!2sStevana%20Hristi%C4%87a%205%2C%20Novi%20Sad!5e0!3m2!1sen!2srs!4v1700000000000!5m2!1sen!2srs"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="REMIELECTRIC lokacija"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Contact;
