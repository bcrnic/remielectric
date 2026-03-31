import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  structuredData?: object;
}

const SEO = ({
  title,
  description,
  keywords = "električar Novi Sad, elektro instalacije, električne instalacije Novi Sad, električar, REMIELECTRIC, Daniel Crnić",
  canonical,
  ogImage = "https://remielectric.rs/og-image.jpg",
  ogType = "website",
  noindex = false,
  structuredData,
}: SEOProps) => {
  const fullTitle = title.includes("REMIELECTRIC") ? title : `${title} - REMIELECTRIC`;
  const siteUrl = "https://remielectric.rs";
  const canonicalUrl = canonical || siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow" />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="sr_RS" />
      <meta property="og:site_name" content="REMIELECTRIC" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="author" content="REMIELECTRIC - Daniel Crnić" />
      <meta name="language" content="Serbian" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Geo Tags */}
      <meta name="geo.region" content="RS-VO" />
      <meta name="geo.placename" content="Novi Sad" />
      <meta name="geo.position" content="45.2471495;19.8380483" />
      <meta name="ICBM" content="45.2471495, 19.8380483" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
