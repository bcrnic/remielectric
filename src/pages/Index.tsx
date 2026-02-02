import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesPreview from "@/components/ServicesPreview";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>REMIELECTRIC - Električar Novi Sad | Elektro Instalacije</title>
        <meta
          name="description"
          content="REMIELECTRIC - profesionalne elektro instalacije u Novom Sadu. Kućne i poslovne instalacije, održavanje, LED rasveta. Pozovite za besplatnu procenu!"
        />
        <meta
          name="keywords"
          content="električar Novi Sad, elektro instalacije, električne instalacije Novi Sad, električar, REMIELECTRIC"
        />
        <link rel="canonical" href="https://remielectric.rs" />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <ServicesPreview />
          <AboutSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
