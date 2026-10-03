import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { withBase } from "@/lib/utils";

// Index into services.list, paired with the photo shown on its tile
const tiles = [
  { service: 0, image: "/images/distribution_panel.jpg" },
  { service: 1, image: "/images/gallery-industrial.jpg" },
  { service: 3, image: "/images/gallery-led.jpg" },
  { service: 4, image: "/images/wall_sockets.jpg" },
  { service: 7, image: "/images/smart_home.jpg" },
  { service: 5, image: "/images/outdoor_house.jpg" },
];

const ServicesPreview = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-signal-text font-bold text-sm uppercase tracking-[0.2em]">
            {t("services.title")}
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase leading-none text-foreground mt-3">
            {t("services.headline")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tiles.map(({ service, image }) => (
            <Link
              key={service}
              to="/usluge"
              className="group relative h-64 md:h-80 rounded-xl overflow-hidden bg-ink flex flex-col items-center justify-center gap-5 text-center px-6"
            >
              <img
                src={withBase(image)}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-ink-deep/55 group-hover:bg-ink-deep/65 transition-colors" />
              <span className="relative font-display font-bold text-white text-4xl md:text-5xl leading-none">
                {t(`services.list.${service}.title`)}
              </span>
              <span className="relative border-2 border-signal text-white rounded-full px-6 py-2.5 text-[13px] font-bold uppercase tracking-[0.08em] group-hover:bg-signal group-hover:text-ink transition-colors">
                {t("common.learnMore")}
              </span>
            </Link>
          ))}

          <div className="md:col-span-2 rounded-xl bg-signal text-ink flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left px-8 py-10 md:px-12">
            <div>
              <h3 className="font-display font-bold text-3xl md:text-4xl leading-tight">
                {t("services.customTitle")}
              </h3>
              <p className="mt-2 text-lg">{t("services.customText")}</p>
            </div>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 shrink-0 bg-ink text-white rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] hover:bg-ink-deep transition-colors"
            >
              {t("services.customButton")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
