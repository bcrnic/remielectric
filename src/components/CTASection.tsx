import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";

const CTASection = () => {
  const whatsappNumber = "38163312579";
  const whatsappMessage = encodeURIComponent(
    "Zdravo! Zanima me zakazivanje termina za elektro usluge.",
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const viberNumber = "+38163312579";
  const viberMessage = encodeURIComponent(
    "Zdravo! Zanima me zakazivanje termina za elektro usluge.",
  );
  const viberLink = `viber://chat?number=${encodeURIComponent(viberNumber)}&text=${viberMessage}`;

  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Potreban vam je <span className="text-accent">električar</span>?
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 leading-relaxed">
            Zakažite termin besplatno i dobijte ponudu za vaš projekat. Naši stručnjaci su tu da vam
            pomognu sa svim elektro potrebama.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/zakazivanje">
              <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                Zakaži termin besplatno
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="xl" className="w-full sm:w-auto">
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </Button>
            </a>
            <a href={viberLink} target="_blank" rel="noopener noreferrer">
              <Button variant="viber" size="xl" className="w-full sm:w-auto">
                <MessageCircle className="w-5 h-5" />
                Viber
              </Button>
            </a>
            <a href="tel:+38163312579">
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                <Phone className="w-5 h-5" />
                Pozovite nas
              </Button>
            </a>
          </div>

          {/* Trust Text */}
          <p className="mt-8 text-primary-foreground/60 text-sm">
            Bez skrivenih troškova · Besplatna procena · Garancija na sve radove
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
