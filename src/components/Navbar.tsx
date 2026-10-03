import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import BrandMark from "@/components/BrandMark";
import { contactLinks } from "@/lib/utils";

const TopBar = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-ink text-white/75 text-sm">
      <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
        <span>
          {t("topbar.area")}
          <span className="hidden sm:inline"> · {t("topbar.hours")}</span>
        </span>
        <span className="flex items-center gap-5">
          <a
            href={contactLinks.viber}
            className="hidden sm:inline hover:text-signal transition-colors"
          >
            Viber
          </a>
          <a
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline hover:text-signal transition-colors"
          >
            WhatsApp
          </a>
          <a
            href={contactLinks.danielTel}
            className="font-semibold text-signal hover:text-white transition-colors"
          >
            {contactLinks.danielPhone}
          </a>
        </span>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.services"), path: "/usluge" },
    { name: t("nav.gallery"), path: "/galerija" },
    { name: t("nav.contact"), path: "/kontakt" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" aria-label="REMIELECTRIC">
              <BrandMark />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-semibold text-[15px] uppercase tracking-wide py-1 border-b-2 transition-colors ${
                    isActive(link.path)
                      ? "border-signal text-foreground"
                      : "border-transparent text-foreground/80 hover:text-foreground hover:border-signal/60"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
              <Link to="/zakazivanje">
                <Button variant="electric" size="lg" className="px-6">
                  {t("nav.booking")}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-border animate-fade-in">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-semibold uppercase tracking-wide py-3 border-l-4 pl-3 transition-colors ${
                      isActive(link.path) ? "border-signal" : "border-transparent"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex items-center gap-3 pt-3">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
                <Link to="/zakazivanje" onClick={() => setIsOpen(false)}>
                  <Button variant="electric" className="w-full mt-3 h-12">
                    {t("nav.booking")}
                  </Button>
                </Link>
                <a
                  href={contactLinks.danielTel}
                  className="flex items-center justify-center gap-2 h-12 mt-2 rounded-lg border-2 border-foreground font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  {contactLinks.danielPhone}
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
