import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Home,
  Building2,
  Wrench,
  Lightbulb,
  Plug,
  Shield,
  Zap,
  Settings,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import SEO from "@/components/SEO";
import { breadcrumbSchema, serviceSchema } from "@/lib/structuredData";

const serviceIcons = [
  Home,
  Building2,
  Wrench,
  Lightbulb,
  Plug,
  Shield,
  Zap,
  Settings,
];

const servicePrices = [
  "Po dogovoru",
  "Po dogovoru",
  "Od 2.000 RSD",
  "Od 1.500 RSD",
  "Od 500 RSD",
  "Od 3.000 RSD",
  "Po dogovoru",
  "Po dogovoru",
];


const Services = () => {
  const { t } = useTranslation();
  
  const servicesList = t("services.list", { returnObjects: true }) as Array<{
    title: string;
    description: string;
    features: string[];
  }>;
  const breadcrumbs = breadcrumbSchema([
    { name: "Početna", url: "https://remielectric.rs" },
    { name: "Usluge", url: "https://remielectric.rs/usluge" },
  ]);

  const servicesStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbs,
      serviceSchema(
        "Elektro instalacije",
        "Kompletne elektro instalacije za stambene i poslovne objekte u Novom Sadu",
      ),
    ],
  };

  return (
    <>
      <SEO
        title={t("seo.services.title", "Usluge - REMIELECTRIC | Elektro Instalacije Novi Sad")}
        description={t("seo.services.description", "Kompletan spektar elektro usluga: kućne instalacije, poslovni objekti, LED rasveta, održavanje. Profesionalno i povoljno.")}
        keywords="elektro usluge Novi Sad, kućne instalacije, LED rasveta, poslovne instalacije, održavanje elektro instalacija"
        canonical="https://remielectric.rs/usluge"
        structuredData={servicesStructuredData}
      />

      <div className="min-h-screen">
        <Navbar />

        <main className="pt-20">
          {/* Hero */}
          <section className="py-16 md:py-24 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t("services.pageTitle")}
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                {t("services.pageSubtitle")}
              </p>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {servicesList.map((service, index) => {
                  const Icon = serviceIcons[index] || Home;
                  return (
                  <div
                    key={index}
                    className="bg-card rounded-2xl p-6 md:p-8 border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-electric-blue-light flex items-center justify-center flex-shrink-0">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-display font-semibold text-xl text-foreground mb-1">
                          {service.title}
                        </h2>
                        <span className="text-accent font-semibold text-sm">{servicePrices[index]}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link to="/zakazivanje">
                      <Button variant="outline" className="w-full group">
                        {t("services.viewAll")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                )})}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t("services.ctaTitle")}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {t("services.ctaSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/zakazivanje">
                  <Button variant="electric" size="lg">
                    {t("nav.booking")}
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button variant="outline" size="lg">
                    {t("services.ctaButton")}
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Services;
