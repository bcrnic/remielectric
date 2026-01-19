import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Building2, Wrench, Lightbulb, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Kućne instalacije",
    description:
      "Kompletne elektro instalacije za stambene objekte - od razvodnih tabli do utičnica i prekidača.",
    features: ["Nova gradnja", "Renoviranje", "Proširenje kapaciteta"],
  },
  {
    icon: Building2,
    title: "Poslovni objekti",
    description:
      "Elektro instalacije za poslovne prostore, kancelarije, lokale i industrijske objekte.",
    features: ["Kancelarije", "Lokali", "Industrijski objekti"],
  },
  {
    icon: Wrench,
    title: "Održavanje i popravke",
    description:
      "Brze intervencije i redovno održavanje elektro instalacija. Dostupni 7 dana u nedelji.",
    features: ["Hitne popravke", "Redovni servisi", "Dijagnostika"],
  },
  {
    icon: Lightbulb,
    title: "LED rasveta",
    description: "Ugradnja energetski efikasne LED rasvete i pametnih sistema osvetljenja.",
    features: ["Unutrašnja rasveta", "Spoljna rasveta", "Smart osvetljenje"],
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Naše usluge
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Profesionalne elektro instalacije
          </h2>
          <p className="text-muted-foreground text-lg">
            Od kućnih instalacija do industrijskih sistema - nudimo kompletne elektro usluge sa
            garancijom kvaliteta.
          </p>
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
              Sve usluge
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
