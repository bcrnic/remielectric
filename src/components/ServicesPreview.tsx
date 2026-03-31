import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Building2, Wrench, Lightbulb, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const ServicesPreview = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: Home,
      title: t("services.list.0.title"),
      description: t("services.list.0.description"),
      features: [
        t("services.list.0.features.0"),
        t("services.list.0.features.1"),
        t("services.list.0.features.2")
      ],
    },
    {
      icon: Building2,
      title: t("services.list.1.title"),
      description: t("services.list.1.description"),
      features: [
        t("services.list.1.features.0"),
        t("services.list.1.features.1"),
        t("services.list.1.features.2")
      ],
    },
    {
      icon: Wrench,
      title: t("services.list.2.title"),
      description: t("services.list.2.description"),
      features: [
        t("services.list.2.features.0"),
        t("services.list.2.features.1"),
        t("services.list.2.features.2")
      ],
    },
    {
      icon: Lightbulb,
      title: t("services.list.3.title"),
      description: t("services.list.3.description"),
      features: [
        t("services.list.3.features.0"),
        t("services.list.3.features.1"),
        t("services.list.3.features.2")
      ],
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            {t("services.title")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            {t("services.subtitle")}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-electric-blue-light flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/usluge">
            <Button variant="default" size="lg" className="group">
              {t("services.viewAll")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
