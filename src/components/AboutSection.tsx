import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Award, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Users, value: t("about.stats.0.value"), label: t("about.stats.0.label") },
    { icon: Award, value: t("about.stats.1.value"), label: t("about.stats.1.label") },
    { icon: Clock, value: t("about.stats.2.value"), label: t("about.stats.2.label") },
    { icon: Shield, value: t("about.stats.3.value"), label: t("about.stats.3.label") },
  ];

  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              {t("about.title")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              {t("about.subtitle")}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t("about.description")}</p>
              <p>{t("about.description2")}</p>
            </div>

            <Link to="/kontakt" className="inline-block mt-8">
              <Button variant="default" size="lg">
                {t("services.ctaButton")}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-electric-blue-light flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
