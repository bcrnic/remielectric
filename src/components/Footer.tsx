import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import BrandMark from "@/components/BrandMark";
import { contactLinks } from "@/lib/utils";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-ink-deep text-white/70">
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" aria-label="REMIELECTRIC" className="inline-block">
              <BrandMark tone="dark" badgeClassName="h-20 md:h-20" />
            </Link>
            <p className="text-sm leading-relaxed">{t("footer.companyDesc")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold uppercase tracking-wide text-xl text-white mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              {[
                { name: t("nav.home"), path: "/" },
                { name: t("nav.services"), path: "/usluge" },
                { name: t("nav.gallery"), path: "/galerija" },
                { name: t("nav.booking"), path: "/zakazivanje" },
                { name: t("nav.contact"), path: "/kontakt" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-signal transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold uppercase tracking-wide text-xl text-white mb-4">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-signal mt-0.5 flex-shrink-0" />
                <span>
                  Stevana Hristića 5<br />
                  21000 Novi Sad, Srbija
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-signal flex-shrink-0" />
                <a href={contactLinks.danielTel} className="hover:text-signal transition-colors">
                  Daniel: {contactLinks.danielPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-signal flex-shrink-0" />
                <a href={contactLinks.srdjanTel} className="hover:text-signal transition-colors">
                  Srđan: {contactLinks.srdjanPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-signal flex-shrink-0" />
                <a
                  href={`mailto:${contactLinks.email}`}
                  className="hover:text-signal transition-colors"
                >
                  {contactLinks.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="font-display font-bold uppercase tracking-wide text-xl text-white mb-4">
              {t("footer.workingHours")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>{t("footer.workingDays")}</li>
              <li>{t("footer.saturday")}</li>
              <li>{t("footer.sunday")}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5 text-sm text-white/50">
          © {new Date().getFullYear()} REMIELECTRIC. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
