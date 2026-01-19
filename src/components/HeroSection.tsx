import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const heroImage = "/pro_electrician.png";

const HeroSection = () => {
  const benefits = ["Brza i pouzdana usluga", "Licencirani električari", "Garancija na sve radove"];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Električar na poslu" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent font-medium text-sm">Aktivni od 2023 · Novi Sad</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Vaš pouzdani <span className="text-gradient">električar</span>
            <br />u Novom Sadu
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl leading-relaxed">
            REMIELECTRIC pruža profesionalne elektro instalacije za stambene i poslovne objekte.
            Kvalitetna usluga, fer cene i garancija na sve radove.
          </p>

          {/* Benefits */}
          <ul className="flex flex-col sm:flex-row gap-4 mb-10">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 text-primary-foreground/90">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/zakazivanje">
              <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                Zakaži termin besplatno
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/usluge">
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                Pogledaj usluge
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
