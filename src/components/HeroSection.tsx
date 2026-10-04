import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn, withBase } from "@/lib/utils";

// `position` keeps each image's subject clear of the headline when the image is cropped
const slideImages = [
  { src: withBase("/images/pro_electrician.jpg"), position: "object-center" },
  { src: withBase("/images/distribution_panel.jpg"), position: "object-center" },
  { src: withBase("/images/smart_home.jpg"), position: "object-right" },
];

const AUTOPLAY_MS = 7000;

const HeroSection = () => {
  const { t } = useTranslation();
  const slides = t("hero.slides", { returnObjects: true }) as Array<{
    title: string;
    subtitle: string;
  }>;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (delta: number) => setActive((i) => (i + delta + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, go]);

  return (
    <section
      className="relative min-h-[560px] md:min-h-[640px] flex items-center overflow-hidden bg-ink"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Background images */}
      {slideImages.map(({ src, position }, index) => (
        <img
          key={src}
          src={src}
          alt={index === 0 ? t("hero.imageAlt") : ""}
          aria-hidden={index !== 0}
          loading={index === 0 ? "eager" : "lazy"}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
            position,
            index === active ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div className="absolute inset-0 gradient-overlay" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-20 relative z-10 py-20">
        <div className="grid">
          {slides.map((slide, index) => {
            const Heading = index === 0 ? "h1" : "h2";
            return (
              <div
                key={index}
                aria-hidden={index !== active}
                className={cn(
                  "[grid-area:1/1] max-w-3xl transition-all duration-700",
                  index === active
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none",
                )}
              >
                <Heading className="font-display font-extrabold uppercase text-signal text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6 [text-wrap:balance]">
                  {slide.title}
                </Heading>
                <p className="text-white text-xl md:text-2xl font-semibold leading-snug max-w-2xl mb-10">
                  {slide.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="hero" size="xl" className="w-full sm:w-auto">
            <Link to="/zakazivanje">{t("hero.cta")}</Link>
          </Button>
          <Button asChild variant="hero-outline" size="xl" className="w-full sm:w-auto">
            <Link to="/usluge">{t("hero.secondary")}</Link>
          </Button>
        </div>
      </div>

      {/* Controls */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label={t("hero.prev")}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/85 hover:bg-white items-center justify-center text-ink transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label={t("hero.next")}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/85 hover:bg-white items-center justify-center text-ink transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`${t("hero.goTo")} ${index + 1}`}
            aria-current={index === active}
            className={cn(
              "h-2 rounded-full transition-all",
              index === active ? "w-7 bg-signal" : "w-2 bg-white/60 hover:bg-white",
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
