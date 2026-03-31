# Open Graph Image - Vodič za kreiranje

## Šta je Open Graph slika?

Open Graph slika je slika koja se prikazuje kada neko podeli vaš sajt na društvenim mrežama (Facebook, LinkedIn, Twitter, WhatsApp, itd.).

## Trenutno stanje

Trenutno se koristi placeholder slika:

- `public/placeholder.svg` - generička slika
- Referencirano u `index.html` i SEO komponentama

## Preporučene dimenzije

### Facebook / LinkedIn / WhatsApp

- **Dimenzije:** 1200x630 px
- **Format:** JPG ili PNG
- **Veličina:** < 1MB
- **Aspect ratio:** 1.91:1

### Twitter

- **Dimenzije:** 1200x675 px (ili 1200x630)
- **Format:** JPG, PNG, WEBP, GIF
- **Veličina:** < 5MB

## Kako kreirati OG sliku

### Opcija 1: Online alati (NAJLAKŠE)

**Canva** (https://www.canva.com)

1. Izaberite "Custom size" → 1200x630 px
2. Koristite template ili kreirajte od nule
3. Dodajte:
   - Logo REMIELECTRIC
   - Slogan: "Profesionalne elektro instalacije"
   - Lokacija: "Novi Sad"
   - Telefon: +38163 312 579
   - Pozadinska slika (elektro tema)
4. Export kao JPG (Quality: 100%)

**Figma** (https://www.figma.com)

1. New file → Frame → 1200x630
2. Dizajnirajte sliku
3. Export → JPG ili PNG

**Adobe Express** (https://www.adobe.com/express)

- Besplatni online alat
- Slično Canva-i

### Opcija 2: Photoshop / GIMP

1. New document: 1200x630 px, 72 DPI
2. Dizajnirajte sliku sa:
   - Branding (logo, boje)
   - Ključna poruka
   - Call-to-action
3. Save for Web → JPG (Quality: 80-90%)

### Opcija 3: Koristi postojeću sliku

Možete koristiti jednu od postojećih slika iz galerije:

```bash
# Resize postojeće slike na 1200x630
# Koristite online alat: https://www.iloveimg.com/resize-image
```

## Dizajn preporuke

### Šta uključiti:

✅ Logo REMIELECTRIC  
✅ Glavni slogan  
✅ Lokacija (Novi Sad)  
✅ Kontakt (telefon)  
✅ Vizuelni element (slika električara, elektro opreme)  
✅ Brand boje (plava, žuta - iz Tailwind config-a)

### Šta izbegavati:

❌ Previše teksta  
❌ Sitna slova (neće biti čitljiva)  
❌ Generičke stock fotografije  
❌ Niska rezolucija

## Primer strukture

```
┌─────────────────────────────────────────┐
│  [LOGO]           REMIELECTRIC          │
│                                         │
│  Profesionalne elektro instalacije      │
│  u Novom Sadu                          │
│                                         │
│  [Slika električara ili elektro opreme] │
│                                         │
│  📞 +38163 312 579                      │
│  📍 Novi Sad                            │
└─────────────────────────────────────────┘
```

## Implementacija

### Korak 1: Kreirajte sliku

Koristite jedan od gore navedenih alata.

### Korak 2: Optimizujte sliku

```bash
# Online: https://tinypng.com/
# Ili lokalno sa sharp:
npm run optimize-images
```

### Korak 3: Dodajte u public folder

```bash
# Preimenujte u:
public/og-image.jpg
```

### Korak 4: Testiranje

Testirajte kako izgleda na društvenim mrežama:

**Facebook Debugger:**
https://developers.facebook.com/tools/debug/

**Twitter Card Validator:**
https://cards-dev.twitter.com/validator

**LinkedIn Post Inspector:**
https://www.linkedin.com/post-inspector/

## Trenutna implementacija

OG slika je već referencirana u:

- `index.html` (linija 27)
- `src/components/SEO.tsx` (default vrednost)

Kada kreirate `og-image.jpg`, automatski će se koristiti na svim stranicama.

## Dodatne varijante (opciono)

Možete kreirati specifične OG slike za različite stranice:

```
public/og-image.jpg          # Default (početna)
public/og-image-usluge.jpg   # Za /usluge
public/og-image-galerija.jpg # Za /galerija
public/og-image-kontakt.jpg  # Za /kontakt
```

Zatim u SEO komponentama:

```tsx
<SEO
  ogImage="https://remielectric.rs/og-image-usluge.jpg"
  ...
/>
```

## Checklist

- [ ] Kreirati OG sliku (1200x630 px)
- [ ] Optimizovati sliku (< 500KB)
- [ ] Dodati u `public/og-image.jpg`
- [ ] Testirati na Facebook Debugger
- [ ] Testirati na Twitter Card Validator
- [ ] Testirati na LinkedIn Post Inspector
- [ ] Commit i deploy

## Resursi

- **Canva:** https://www.canva.com
- **Unsplash (besplatne slike):** https://unsplash.com/s/photos/electrician
- **Pexels (besplatne slike):** https://www.pexels.com/search/electrician/
- **TinyPNG (optimizacija):** https://tinypng.com/
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
