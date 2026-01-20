import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Import gallery images
const placeholderImage = (label: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#1E40AF"/>
          <stop offset="1" stop-color="#FBBF24"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="1200" fill="url(#g)"/>
      <rect x="60" y="60" width="1080" height="1080" rx="64" fill="rgba(0,0,0,0.25)"/>
      <text x="600" y="620" text-anchor="middle" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="56" fill="white" font-weight="700">${label}</text>
      <text x="600" y="690" text-anchor="middle" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="26" fill="rgba(255,255,255,0.85)">REMIELECTRIC</text>
    </svg>
  `)}`;

const galleryItems = [
  {
    src: "/distribution_panel.png",
    title: "Razvodna tabla",
    description: "Profesionalna ugradnja razvodne table",
  },
  {
    src: "/gallery-led.jpg",
    title: "LED rasveta",
    description: "Moderna LED rasveta u stanu",
  },
  {
    src: "/wall_sockets.png",
    title: "Uti\u010dnice i prekida\u010di",
    description: "Ugradnja modernih uti\u010dnica",
  },
  {
    src: "/smart_home.png",
    title: "Smart home sistem",
    description: "Pametna kontrola osvetljenja",
  },
  {
    src: "/outdoor_house.png",
    title: "Spoljna rasveta",
    description: "Dekorativna spoljna rasveta",
  },
  {
    src: "/gallery-industrial.jpg",
    title: "Industrijski sistem",
    description: "Elektro ormar za poslovni objekat",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryItems.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryItems.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <>
      <Helmet>
        <title>Galerija Radova - REMIELECTRIC | Električar Novi Sad</title>
        <meta
          name="description"
          content="Pogledajte galeriju naših završenih projekata. Elektro instalacije, LED rasveta, razvodne table i više."
        />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />

        <main className="pt-20">
          {/* Hero */}
          <section className="py-12 md:py-16 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Galerija radova
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                Pogledajte neke od naših završenih projekata. Kvalitet koji govori sam za sebe.
              </p>
            </div>
          </section>

          {/* Gallery Grid */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.map((item, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-display font-semibold text-lg text-primary-foreground">
                        {item.title}
                      </h3>
                      <p className="text-primary-foreground/80 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-12 md:py-16 bg-muted/50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Sviđa vam se naš rad?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Kontaktirajte nas i razgovarajte sa nama o vašem projektu. Besplatna procena i
                savetovanje.
              </p>
              <Link to="/zakazivanje">
                <Button variant="electric" size="lg">
                  Zakaži termin besplatno
                </Button>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
        <WhatsAppButton />

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-card/20 hover:bg-card/40 flex items-center justify-center text-primary-foreground transition-colors"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              className="absolute left-4 w-12 h-12 rounded-full bg-card/20 hover:bg-card/40 flex items-center justify-center text-primary-foreground transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              className="absolute right-4 w-12 h-12 rounded-full bg-card/20 hover:bg-card/40 flex items-center justify-center text-primary-foreground transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="max-w-4xl max-h-[80vh] p-4" onClick={(e) => e.stopPropagation()}>
              <img
                src={galleryItems[selectedImage].src}
                alt={galleryItems[selectedImage].title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              <div className="text-center mt-4">
                <h3 className="font-display font-semibold text-xl text-primary-foreground">
                  {galleryItems[selectedImage].title}
                </h3>
                <p className="text-primary-foreground/70">
                  {galleryItems[selectedImage].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
