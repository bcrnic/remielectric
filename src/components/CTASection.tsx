import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { contactLinks, withBase } from "@/lib/utils";

const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-ink">
      <img
        src={withBase("/images/pro_electrician.jpg")}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="container mx-auto px-4 relative py-20 md:py-24 text-center">
        <h2 className="font-display text-5xl md:text-7xl font-extrabold uppercase leading-none text-signal mb-5">
          {t("cta.title")}
        </h2>
        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-10">{t("cta.subtitle")}</p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          <Button asChild variant="hero" size="xl">
            <Link to="/zakazivanje">{t("cta.button")}</Link>
          </Button>
          <Button asChild variant="hero-outline" size="xl">
            <a href={contactLinks.danielTel}>
              <Phone className="w-5 h-5" />
              Daniel · {contactLinks.danielPhone}
            </a>
          </Button>
          <Button asChild variant="hero-outline" size="xl">
            <a href={contactLinks.srdjanTel}>
              <Phone className="w-5 h-5" />
              Srđan · {contactLinks.srdjanPhone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
