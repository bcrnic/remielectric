/**
 * Structured Data (JSON-LD) za SEO
 * https://schema.org/
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: "REMIELECTRIC",
  description: "Profesionalne elektro instalacije u Novom Sadu",
  url: "https://remielectric.rs",
  telephone: "+38163312579",
  email: "info@remielectric.rs",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Stevana Hristića 5",
    addressLocality: "Novi Sad",
    postalCode: "21000",
    addressCountry: "RS",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.2471495,
    longitude: 19.8380483,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  founder: {
    "@type": "Person",
    name: "Daniel Crnić",
  },
  foundingDate: "2023-06-21",
  areaServed: {
    "@type": "City",
    name: "Novi Sad",
  },
  priceRange: "$$",
  serviceType: [
    "Electrical Installation",
    "Electrical Repair",
    "LED Lighting",
    "Smart Home Installation",
  ],
  image: "https://remielectric.rs/og-image.jpg",
  logo: "https://remielectric.rs/logo.png",
  sameAs: ["https://www.facebook.com/remielectric", "https://www.instagram.com/remielectric"],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://remielectric.rs",
  name: "REMIELECTRIC",
  image: "https://remielectric.rs/og-image.jpg",
  telephone: "+38163312579",
  email: "info@remielectric.rs",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Stevana Hristića 5",
    addressLocality: "Novi Sad",
    addressRegion: "Vojvodina",
    postalCode: "21000",
    addressCountry: "RS",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.2471495,
    longitude: 19.8380483,
  },
  url: "https://remielectric.rs",
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const serviceSchema = (serviceName: string, description: string, price?: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: serviceName,
  description: description,
  provider: {
    "@type": "Electrician",
    name: "REMIELECTRIC",
    telephone: "+38163312579",
    url: "https://remielectric.rs",
  },
  areaServed: {
    "@type": "City",
    name: "Novi Sad",
  },
  ...(price && {
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: "RSD",
    },
  }),
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const reviewSchema = (
  reviews: {
    author: string;
    rating: number;
    text: string;
    date: string;
  }[],
) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "REMIELECTRIC",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: reviews.length,
    bestRating: "5",
    worstRating: "1",
  },
  review: reviews.map((review) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author,
    },
    datePublished: review.date,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: review.text,
  })),
});

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "REMIELECTRIC",
  url: "https://remielectric.rs",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://remielectric.rs/usluge?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};
