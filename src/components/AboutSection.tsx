import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { withBase } from "@/lib/utils";

const AboutSection = () => {
  const { t } = useTranslation();

  const stats = t("about.stats", { returnObjects: true }) as Array<{
    value: string;
    label: string;
  }>;

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <img
        src={withBase("/images/distribution_panel.jpg")}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />
      <div className="container mx-auto px-4 relative py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <img
              src={withBase("/brand/logo-512.png")}
              alt="REMI ELECTRIC"
              width={512}
              height={512}
              loading="lazy"
              className="w-32 md:w-40 h-auto mb-8"
            />
            <span className="text-signal font-bold text-sm uppercase tracking-[0.2em]">
              {t("about.title")}
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase leading-none mt-3 mb-6 [text-wrap:balance]">
              {t("about.subtitle")}
            </h2>
            <div className="space-y-4 text-white/80 text-lg leading-relaxed max-w-xl">
              <p>{t("about.description")}</p>
              <p>{t("about.description2")}</p>
            </div>
            <Button asChild variant="hero-outline" size="lg" className="mt-8">
              <Link to="/kontakt">{t("services.ctaButton")}</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-sm p-6"
              >
                <div className="font-display font-extrabold text-5xl md:text-6xl leading-none text-signal">
                  {stat.value}
                </div>
                <div className="text-white/80 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
