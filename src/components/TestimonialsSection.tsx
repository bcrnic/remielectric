import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const TestimonialsSection = () => {
  const { t } = useTranslation();
  
  const testimonials = [
    {
      name: t("testimonials.list.0.name"),
      location: t("testimonials.list.0.location"),
      rating: 5,
      text: t("testimonials.list.0.text"),
      service: t("testimonials.list.0.service"),
      date: t("testimonials.list.0.date"),
    },
    {
      name: t("testimonials.list.1.name"),
      location: t("testimonials.list.1.location"),
      rating: 5,
      text: t("testimonials.list.1.text"),
      service: t("testimonials.list.1.service"),
      date: t("testimonials.list.1.date"),
    },
    {
      name: t("testimonials.list.2.name"),
      location: t("testimonials.list.2.location"),
      rating: 5,
      text: t("testimonials.list.2.text"),
      service: t("testimonials.list.2.service"),
      date: t("testimonials.list.2.date"),
    },
    {
      name: t("testimonials.list.3.name"),
      location: t("testimonials.list.3.location"),
      rating: 5,
      text: t("testimonials.list.3.text"),
      service: t("testimonials.list.3.service"),
      date: t("testimonials.list.3.date"),
    },
    {
      name: t("testimonials.list.4.name"),
      location: t("testimonials.list.4.location"),
      rating: 5,
      text: t("testimonials.list.4.text"),
      service: t("testimonials.list.4.service"),
      date: t("testimonials.list.4.date"),
    },
    {
      name: t("testimonials.list.5.name"),
      location: t("testimonials.list.5.location"),
      rating: 5,
      text: t("testimonials.list.5.text"),
      service: t("testimonials.list.5.service"),
      date: t("testimonials.list.5.date"),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-accent/20 mb-4" />

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-foreground mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-accent font-medium">{testimonial.service}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            Sve recenzije su autentične i potiču od naših zadovoljnih klijenata.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
