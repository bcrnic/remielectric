import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesPreview from "@/components/ServicesPreview";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import { organizationSchema, websiteSchema } from "@/lib/structuredData";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, websiteSchema],
  };

  return (
    <>
      <SEO
        title="REMIELECTRIC - Električar Novi Sad | Elektro Instalacije"
        description="REMIELECTRIC - profesionalne elektro instalacije u Novom Sadu. Kućne i poslovne instalacije, održavanje, LED rasveta. Pozovite za besplatnu procenu!"
        keywords="električar Novi Sad, elektro instalacije, električne instalacije Novi Sad, električar, REMIELECTRIC, Daniel Crnić, elektro usluge Novi Sad"
        canonical="https://remielectric.rs"
        structuredData={structuredData}
      />

      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <ServicesPreview />
          <AboutSection />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
