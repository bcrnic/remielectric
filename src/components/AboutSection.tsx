import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Award, Users } from "lucide-react";

const stats = [
  { icon: Users, value: "100+", label: "Zadovoljnih klijenata" },
  { icon: Award, value: "1+", label: "Godina iskustva" },
  { icon: Clock, value: "24h", label: "Brza reakcija" },
  { icon: Shield, value: "100%", label: "Garancija kvaliteta" },
];

const AboutSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              O nama
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              REMIELECTRIC - Vaš partner za elektro instalacije
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Osnovani 21. juna 2023. godine, REMIELECTRIC je mlada ali ambiciozna firma
                specijalizovana za elektro instalacije u Novom Sadu i okolini.
              </p>
              <p>
                Pod vođstvom Daniela Crnića, naš tim pruža profesionalne usluge za stambene i
                poslovne objekte. Koristimo kvalitetne materijale i pratimo najnovije standarde u
                industriji.
              </p>
              <p>
                Naša misija je da svakom klijentu pružimo pouzdanu i sigurnu elektro instalaciju uz
                fer cene i garantovanu uslugu.
              </p>
            </div>

            {/* Contact Info */}
            <div className="mt-8 p-6 bg-card rounded-xl border border-border">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                Kontakt informacije
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Adresa:</span>
                  <span className="text-foreground font-medium">
                    Stevana Hristića 5, 21000 Novi Sad
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Vlasnik:</span>
                  <span className="text-foreground font-medium">Daniel Crnić</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Delatnost:</span>
                  <span className="text-foreground font-medium">Elektro instalacije (4321)</span>
                </li>
              </ul>
            </div>

            <Link to="/kontakt" className="inline-block mt-8">
              <Button variant="default" size="lg">
                Kontaktirajte nas
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-electric-blue-light flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
