# SEO Optimizacija - Kompletni Vodič

## 📋 Implementirane SEO funkcionalnosti

### 1. ✅ Sitemap.xml

- **Lokacija:** `public/sitemap.xml`
- **Generator:** `scripts/generate-sitemap.js`
- **Komanda:** `npm run generate-sitemap`

**Kako koristiti:**

```bash
# Generisanje sitemap-a
npm run generate-sitemap

# Sitemap će biti kreiran u public/sitemap.xml
```

**Šta sadrži:**

- Sve stranice sajta (/, /usluge, /galerija, /kontakt, /zakazivanje)
- Lastmod (datum poslednje izmene)
- Changefreq (učestalost promena)
- Priority (prioritet stranice)

**Slanje Google-u:**

1. Idite na https://search.google.com/search-console
2. Dodajte property za remielectric.rs
3. Idite na "Sitemaps"
4. Unesite: `https://remielectric.rs/sitemap.xml`
5. Kliknite "Submit"

### 2. ✅ Robots.txt

- **Lokacija:** `public/robots.txt`
- **Optimizovano za:** Google, Bing, Social Media bots

**Sadržaj:**

- Sitemap referenca
- Crawl delay za različite botove
- Allow/Disallow pravila

### 3. ✅ SEO Komponenta

- **Lokacija:** `src/components/SEO.tsx`
- **Funkcionalnost:** Centralizovano upravljanje meta tagovima

**Kako koristiti:**

```tsx
import SEO from "@/components/SEO";

<SEO
  title="Naslov Stranice"
  description="Opis stranice za Google"
  keywords="ključne reči, odvojene zarezom"
  canonical="https://remielectric.rs/stranica"
  structuredData={schemaObject}
/>;
```

**Šta automatski dodaje:**

- Title tag
- Meta description
- Meta keywords
- Canonical URL
- Open Graph tags (Facebook)
- Twitter Card tags
- Geo tags (lokacija)
- Author, language, revisit-after
- Robots direktivе

### 4. ✅ Structured Data (JSON-LD)

- **Lokacija:** `src/lib/structuredData.ts`
- **Schema.org tipovi:** Organization, LocalBusiness, Service, FAQ, Review, Breadcrumb

**Implementirani schema tipovi:**

#### Organization Schema

```typescript
import { organizationSchema } from "@/lib/structuredData";
```

- Tip: Electrician
- Podaci: Naziv, adresa, telefon, radno vreme
- Founder: Daniel Crnić
- Area served: Novi Sad

#### LocalBusiness Schema

```typescript
import { localBusinessSchema } from "@/lib/structuredData";
```

- Geo koordinate
- Radno vreme
- Kontakt informacije

#### Breadcrumb Schema

```typescript
import { breadcrumbSchema } from "@/lib/structuredData";

const breadcrumbs = breadcrumbSchema([
  { name: "Početna", url: "https://remielectric.rs" },
  { name: "Usluge", url: "https://remielectric.rs/usluge" },
]);
```

#### Service Schema

```typescript
import { serviceSchema } from "@/lib/structuredData";

const service = serviceSchema(
  "Elektro instalacije",
  "Opis usluge",
  "5000", // opciono - cena
);
```

#### FAQ Schema

```typescript
import { faqSchema } from "@/lib/structuredData";

const faq = faqSchema([{ question: "Pitanje?", answer: "Odgovor" }]);
```

#### Review Schema

```typescript
import { reviewSchema } from "@/lib/structuredData";

const reviews = reviewSchema([
  {
    author: "Ime Prezime",
    rating: 5,
    text: "Tekst recenzije",
    date: "2024-01-15",
  },
]);
```

### 5. ✅ Meta Tags po stranicama

Sve stranice imaju optimizovane meta tagove:

**Početna (/):**

- Title: "REMIELECTRIC - Električar Novi Sad | Elektro Instalacije"
- Keywords: električar Novi Sad, elektro instalacije, REMIELECTRIC, Daniel Crnić
- Structured data: Organization + Website schema

**Usluge (/usluge):**

- Title: "Usluge - REMIELECTRIC | Elektro Instalacije Novi Sad"
- Keywords: elektro usluge, kućne instalacije, LED rasveta
- Structured data: Breadcrumb + Service schema

**Galerija (/galerija):**

- Title: "Galerija Radova - REMIELECTRIC | Električar Novi Sad"
- Keywords: galerija radova, elektro instalacije galerija
- Structured data: Breadcrumb schema

**Kontakt (/kontakt):**

- Title: "Kontakt - REMIELECTRIC | Električar Novi Sad"
- Keywords: kontakt električar, REMIELECTRIC kontakt
- Structured data: Breadcrumb + LocalBusiness schema

**Zakazivanje (/zakazivanje):**

- Title: "Zakaži Termin - REMIELECTRIC | Električar Novi Sad"
- Keywords: zakazivanje termina, online rezervacija
- Structured data: Breadcrumb schema

---

## 🎯 SEO Best Practices implementirane

### On-Page SEO

✅ Unique title tags za svaku stranicu  
✅ Meta descriptions (150-160 karaktera)  
✅ H1 tagovi na svakoj stranici  
✅ Semantic HTML (header, main, footer, section)  
✅ Alt text za slike  
✅ Internal linking  
✅ Canonical URLs

### Technical SEO

✅ Sitemap.xml  
✅ Robots.txt  
✅ Structured data (JSON-LD)  
✅ Mobile-responsive design  
✅ Fast loading (optimizovane slike)  
✅ HTTPS ready  
✅ Clean URLs

### Local SEO

✅ NAP (Name, Address, Phone) konzistentnost  
✅ Geo meta tags  
✅ LocalBusiness schema  
✅ Google Maps embed  
✅ Radno vreme  
✅ Lokalne ključne reči

### Content SEO

✅ FAQ sekcija (long-tail keywords)  
✅ Testimonials (social proof)  
✅ Service pages sa detaljima  
✅ Keyword-rich content  
✅ Natural language

---

## 📊 SEO Checklist

### Pre-Launch

- [ ] Generisati sitemap: `npm run generate-sitemap`
- [ ] Proveriti robots.txt
- [ ] Testirati structured data: https://search.google.com/test/rich-results
- [ ] Proveriti meta tagove u browser DevTools
- [ ] Testirati mobile responsiveness
- [ ] Optimizovati slike: `npm run optimize-images`

### Post-Launch

- [ ] Dodati sajt u Google Search Console
- [ ] Submitovati sitemap u Google Search Console
- [ ] Dodati sajt u Bing Webmaster Tools
- [ ] Kreirati Google My Business profil
- [ ] Dodati sajt u lokalne direktorijume
- [ ] Setupovati Google Analytics
- [ ] Setupovati Google Tag Manager (opciono)

### Ongoing

- [ ] Ažurirati sitemap mesečno
- [ ] Pratiti Google Search Console za greške
- [ ] Ažurirati content redovno
- [ ] Dodavati nove recenzije
- [ ] Ažurirati FAQ sekciju
- [ ] Pratiti keyword rankings

---

## 🔍 SEO Tools za testiranje

### Google Tools

1. **Google Search Console**
   - URL: https://search.google.com/search-console
   - Za: Monitoring indexing, greške, performance

2. **Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Za: Testiranje structured data

3. **PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Za: Performance i Core Web Vitals

4. **Mobile-Friendly Test**
   - URL: https://search.google.com/test/mobile-friendly
   - Za: Mobile responsiveness

### Third-Party Tools

1. **Screaming Frog SEO Spider**
   - Za: Crawling sajta i pronalaženje grešaka

2. **Ahrefs / SEMrush**
   - Za: Keyword research i competitor analysis

3. **GTmetrix**
   - Za: Performance testing

4. **Schema Markup Validator**
   - URL: https://validator.schema.org/
   - Za: Validaciju JSON-LD

---

## 🎓 Ključne reči (Keywords)

### Primary Keywords

- električar Novi Sad
- elektro instalacije Novi Sad
- REMIELECTRIC

### Secondary Keywords

- kućne elektro instalacije
- poslovne elektro instalacije
- LED rasveta Novi Sad
- održavanje elektro instalacija
- hitne intervencije električar
- smart home instalacije

### Long-tail Keywords

- koliko košta elektro instalacija u Novom Sadu
- najbolji električar Novi Sad
- hitna intervencija električar Novi Sad
- ugradnja LED rasvete cena
- zakazivanje termina električar online

### Location-based Keywords

- električar Petrovaradin
- električar Sremska Kamenica
- električar Futog
- električar Veternik

---

## 📈 Očekivani rezultati

### Kratkoročno (1-3 meseca)

- Indexing svih stranica u Google-u
- Pojava u lokalnim rezultatima pretrage
- Rangiranje za branded keywords (REMIELECTRIC)

### Srednjoročno (3-6 meseci)

- Top 10 za "električar Novi Sad"
- Top 5 za long-tail keywords
- Povećan organic traffic za 50-100%

### Dugoročno (6-12 meseci)

- Top 3 za glavne ključne reči
- Dominacija u lokalnim rezultatima
- 200-300% povećanje organic traffic-a

---

## 🛠️ Maintenance

### Mesečno

- Generisati novi sitemap
- Proveriti Google Search Console za greške
- Ažurirati content (dodati novi blog post ako imate blog)

### Kvartalno

- Ažurirati FAQ sa novim pitanjima
- Dodati nove testimonials
- Proveriti i ažurirati ključne reči

### Godišnje

- Kompletna SEO audit
- Ažurirati structured data
- Proveriti konkurenciju

---

## 📞 Dodatne preporuke

1. **Google My Business**
   - Kreirajte profil
   - Dodajte slike
   - Tražite recenzije od klijenata

2. **Backlinks**
   - Registrujte se u lokalne direktorijume
   - Tražite linkove od partnera
   - Guest posting na relevantnim sajtovima

3. **Content Marketing**
   - Dodajte blog sekciju
   - Pišite o elektro temama
   - Koristite video content

4. **Social Media**
   - Facebook Business Page
   - Instagram profil
   - LinkedIn profil

---

**Napomena:** SEO je dugoročna strategija. Rezultati se obično vide nakon 3-6 meseci kontinuiranog rada.
