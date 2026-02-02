import { Link } from "react-router-dom";
import { Zap, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display font-bold text-xl">REMIELECTRIC</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Profesionalne elektro instalacije za vaš dom i posao. Kvalitet i pouzdanost od 2023.
              godine.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Brzi linkovi</h3>
            <ul className="space-y-2">
              {[
                { name: "Početna", path: "/" },
                { name: "Usluge", path: "/usluge" },
                { name: "Galerija", path: "/galerija" },
                { name: "Zakazivanje", path: "/zakazivanje" },
                { name: "Kontakt", path: "/kontakt" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  Stevana Hristića 5<br />
                  21000 Novi Sad, Srbija
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="tel:+38163312579"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  Daniel: +38163 312 579
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="tel:+381606301113"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  Srđan: +38160 630 1113
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="mailto:info@remielectric.rs"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  info@remielectric.rs
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Radno vreme</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li className="flex justify-between">
                <span>Ponedeljak - Petak</span>
                <span className="text-accent font-medium">08:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Subota</span>
                <span className="text-accent font-medium">09:00 - 14:00</span>
              </li>
              <li className="flex justify-between">
                <span>Nedelja</span>
                <span className="text-primary-foreground/60">Zatvoreno</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© 2024 REMIELECTRIC. Sva prava zadržana.</p>
            <p>Vlasnik: Daniel Crnić | Osnovano: 21.06.2023</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
