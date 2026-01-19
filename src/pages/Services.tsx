import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
import { Helmet } from "react-helmet-async";

const services = [
  {
    icon: Home,
    title: "Kućne elektro instalacije",
    description:
      "Kompletne elektro instalacije za stambene objekte - od razvodnih tabli do utičnica i prekidača. Radimo na novogradnjama i renoviranjima.",
    features: [
      "Ugradnja razvodnih tabli i osigurača",
      "Postavljanje utičnica i prekidača",
      "Provlačenje kablova",
      "Povezivanje kućnih aparata",
      "Ugradnja interfona i zvona",
    ],
    price: "Po dogovoru",
  },
  {
    icon: Building2,
    title: "Poslovni objekti",
    description:
      "Elektro instalacije za poslovne prostore, kancelarije, lokale i industrijske objekte. Prilagođeno vašim poslovnim potrebama.",
    features: [
      "Industrijske elektro instalacije",
      "Kancelarijska infrastruktura",
      "Trofazni sistemi",
      "Elektro ormari",
      "Uzemljenje i gromobranska zaštita",
    ],
    price: "Po dogovoru",
  },
  {
    icon: Wrench,
    title: "Održavanje i popravke",
    description:
      "Brze intervencije i redovno održavanje elektro instalacija. Dostupni smo 7 dana u nedelji za hitne slučajeve.",
    features: [
      "Dijagnostika kvarova",
      "Zamena osigurača i sklopki",
      "Popravka kratkih spojeva",
      "Servis elektro uređaja",
      "Hitne intervencije",
    ],
    price: "Od 2.000 RSD",
  },
  {
    icon: Lightbulb,
    title: "LED rasveta",
    description:
      "Ugradnja energetski efikasne LED rasvete i pametnih sistema osvetljenja za dom i posao.",
    features: [
      "Unutrašnja LED rasveta",
      "Spoljna LED rasveta",
      "Dekorativna rasveta",
      "Smart osvetljenje",
      "Zamena starih svetiljki",
    ],
    price: "Od 1.500 RSD",
  },
  {
    icon: Plug,
    title: "Ugradnja utičnica i prekidača",
    description: "Profesionalna ugradnja i zamena utičnica, prekidača i senzora pokreta.",
    features: [
      "Obične i šuko utičnice",
      "USB utičnice",
      "Prekidači i regulatori",
      "Senzori pokreta",
      "Tajmeri",
    ],
    price: "Od 500 RSD",
  },
  {
    icon: Shield,
    title: "Zaštita od prenapona",
    description: "Ugradnja zaštitnih uređaja za sigurnost vaše elektro opreme i aparata.",
    features: [
      "Prenaponska zaštita",
      "Diferencijalna zaštita",
      "FID sklopke",
      "Uzemljenje",
      "Kontrola instalacija",
    ],
    price: "Od 3.000 RSD",
  },
  {
    icon: Zap,
    title: "Električni grejači",
    description: "Ugradnja i povezivanje električnih grejnih sistema za komforan dom.",
    features: [
      "Podno grejanje",
      "Električni radijatori",
      "IR paneli",
      "Termostatska regulacija",
      "Energetski efikasni sistemi",
    ],
    price: "Po dogovoru",
  },
  {
    icon: Settings,
    title: "Smart home sistemi",
    description: "Integracija pametnih sistema za kontrolu osvetljenja, grejanja i sigurnosti.",
    features: [
      "Pametne utičnice",
      "Daljinska kontrola",
      "Automatizacija osvetljenja",
      "Integracija sa mobilnim",
      "Glasovna kontrola",
    ],
    price: "Po dogovoru",
  },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Usluge - REMIELECTRIC | Elektro Instalacije Novi Sad</title>
        <meta
          name="description"
          content="Kompletan spektar elektro usluga: kućne instalacije, poslovni objekti, LED rasveta, održavanje. Profesionalno i povoljno."
        />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />

        <main className="pt-20">
          {/* Hero */}
          <section className="py-16 md:py-24 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                Naše usluge
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                Kompletne elektro usluge za stambene i poslovne objekte. Kvalitet, pouzdanost i fer
                cene.
              </p>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-2xl p-6 md:p-8 border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-electric-blue-light flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-display font-semibold text-xl text-foreground mb-1">
                          {service.title}
                        </h2>
                        <span className="text-accent font-semibold text-sm">{service.price}</span>
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
                        Zakaži uslugu
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Nije na listi? Kontaktirajte nas!
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Radimo i druge elektro usluge po dogovoru. Opišite vaš problem i poslaćemo vam
                besplatnu procenu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/zakazivanje">
                  <Button variant="electric" size="lg">
                    Zakaži termin besplatno
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button variant="outline" size="lg">
                    Kontaktirajte nas
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Services;
