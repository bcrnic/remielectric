import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const TestimonialsSection = () => {
  const { t } = useTranslation();

  const testimonials = (
    t("testimonials.list", { returnObjects: true }) as Array<{
      name: string;
      location: string;
      rating: number;
      text: string;
      service: string;
    }>
  ).slice(0, 3);

  return (
    <section className="py-20 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase leading-none text-foreground mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col rounded-xl bg-card p-7 shadow-[0_4px_18px_rgba(0,0,0,0.05)]"
            >
              <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating}/5`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-signal text-signal" />
                ))}
              </div>
              <blockquote className="text-foreground text-lg leading-relaxed flex-1">
                {testimonial.text}
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-border">
                <span className="font-bold text-foreground">{testimonial.name}</span>
                <span className="text-muted-foreground"> · {testimonial.location}</span>
                <span className="block text-sm text-signal-text font-semibold mt-1">
                  {testimonial.service}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
