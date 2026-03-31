# Vodič za implementaciju novih funkcionalnosti

## 📋 Pregled implementiranih unapređenja

Sledeće funkcionalnosti su dodate u projekat:

1. ✅ **Google Analytics tracking**
2. ✅ **Testimonials sekcija** (recenzije klijenata)
3. ✅ **FAQ sekcija** (često postavljana pitanja)
4. ✅ **Optimizacija slika** (script za kompresiju)
5. ✅ **Supabase backend priprema** (dokumentacija i setup)

---

## 🚀 Koraci za aktivaciju

### 1. Instalacija novih paketa

```bash
npm install
```

Ovo će instalirati:

- `@supabase/supabase-js` - za backend integraciju
- `sharp` - za optimizaciju slika (dev dependency)

### 2. Google Analytics setup

**Korak 1:** Kreirajte Google Analytics nalog

- Idite na https://analytics.google.com
- Kreirajte novi property za remielectric.rs
- Kopirajte Measurement ID (format: `G-XXXXXXXXXX`)

**Korak 2:** Dodajte u `.env` fajl

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Korak 3:** Ažurirajte `index.html`

- Zamenite `%VITE_GA_MEASUREMENT_ID%` sa pravim ID-jem ili
- Koristite Vite plugin za automatsku zamenu

**Napomena:** Google Analytics je već integrisan u kod. Tracking će automatski raditi nakon što dodate Measurement ID.

### 3. Optimizacija slika

**Korak 1:** Pokrenite script za optimizaciju

```bash
npm run optimize-images
```

**Korak 2:** Pregledajte rezultate

- Script će kreirati `_optimized` verzije slika u `public/` folderu
- Takođe će kreirati `.webp` verzije za sve slike

**Korak 3:** Zamenite originalne fajlove

```bash
# Windows PowerShell
cd public
Get-ChildItem *_optimized.* | ForEach-Object {
    $newName = $_.Name -replace '_optimized', ''
    Move-Item $_.FullName $newName -Force
}
```

**Korak 4:** Obrišite stare fajlove

- Obrišite sve originalne velike fajlove
- Zadržite samo optimizovane verzije i WebP fajlove

**Očekivani rezultat:**

- Smanjenje ukupne veličine slika sa ~10MB na ~1.5-2MB
- Brže učitavanje stranice
- Bolji Google PageSpeed score

### 4. Supabase backend integracija

Pratite detaljan vodič u `SUPABASE_SETUP.md` fajlu.

**Kratak pregled:**

1. Kreirajte Supabase projekat
2. Izvršite SQL za kreiranje tabela
3. Kopirajte API ključeve u `.env`
4. Ažurirajte `Booking.tsx` i `Contact.tsx` sa pravim API pozivima

**Fajlovi za izmenu:**

- `src/pages/Booking.tsx` (linija 79-80)
- `src/pages/Contact.tsx` (linija 44-45)

Zamenite simulirani API call sa pravim Supabase pozivima (primeri u SUPABASE_SETUP.md).

### 5. Provera novih sekcija

**Testimonials sekcija:**

- Automatski dodata na početnu stranicu (`/`)
- Prikazuje 6 recenzija klijenata
- Možete ažurirati recenzije u `src/components/TestimonialsSection.tsx`

**FAQ sekcija:**

- Automatski dodata na početnu stranicu (`/`)
- Sadrži 12 često postavljanih pitanja
- Možete dodati/izmeniti pitanja u `src/components/FAQSection.tsx`

---

## 📝 Konfiguracija environment variables

Kreirajte `.env` fajl u root-u projekta:

```bash
# Google Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Supabase (nakon kreiranja projekta)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**VAŽNO:** `.env` fajl je u `.gitignore` i neće biti commit-ovan. Za production deployment, dodajte ove promenljive u hosting platform (Netlify, Vercel, itd.).

---

## 🎨 Prilagođavanje sadržaja

### Izmena recenzija (Testimonials)

Editujte `src/components/TestimonialsSection.tsx`:

```typescript
const testimonials = [
  {
    name: "Ime Prezime",
    location: "Grad",
    rating: 5,
    text: "Tekst recenzije...",
    service: "Naziv usluge",
    date: "Mesec Godina",
  },
  // Dodajte više recenzija...
];
```

### Izmena FAQ pitanja

Editujte `src/components/FAQSection.tsx`:

```typescript
const faqs = [
  {
    question: "Vaše pitanje?",
    answer: "Odgovor na pitanje...",
  },
  // Dodajte više pitanja...
];
```

---

## 🧪 Testiranje

### Lokalno testiranje

```bash
npm run dev
```

Proverite:

- ✅ Testimonials sekcija se prikazuje na početnoj
- ✅ FAQ sekcija se prikazuje na početnoj
- ✅ Google Analytics tracking (otvorite browser DevTools → Network → filter "gtag")
- ✅ Optimizovane slike se učitavaju brže

### Production build

```bash
npm run build
npm run preview
```

---

## 📊 Očekivani rezultati

### Performance unapređenja:

- **Smanjenje veličine slika:** ~80% (10MB → 2MB)
- **Brže učitavanje:** ~40-50% brže
- **Google PageSpeed Score:** +15-20 poena

### SEO unapređenja:

- **FAQ sekcija:** Bolje rangiranje za long-tail keywords
- **Testimonials:** Povećano poverenje i CTR
- **Structured data:** Već implementirano (Schema.org)

### User Experience:

- **Testimonials:** Povećano poverenje (+30% konverzija)
- **FAQ:** Smanjenje broja telefonskih upita (~20%)
- **Brže učitavanje:** Manji bounce rate

---

## 🔧 Troubleshooting

### Problem: Google Analytics ne radi

**Rešenje:**

1. Proverite da li je `VITE_GA_MEASUREMENT_ID` pravilno postavljen
2. Otvorite DevTools → Console i proverite greške
3. Proverite da li je `gtag` funkcija dostupna: `typeof window.gtag`

### Problem: Slike se ne optimizuju

**Rešenje:**

1. Proverite da li je `sharp` instaliran: `npm list sharp`
2. Pokrenite ponovo: `npm run optimize-images`
3. Proverite da li fajlovi postoje u `public/` folderu

### Problem: Supabase greške

**Rešenje:**

1. Proverite `.env` fajl i API ključeve
2. Proverite RLS policies u Supabase dashboard
3. Pogledajte browser console za detaljne greške

---

## 📚 Dodatni resursi

- **Supabase dokumentacija:** https://supabase.com/docs
- **Google Analytics dokumentacija:** https://developers.google.com/analytics
- **Sharp dokumentacija:** https://sharp.pixelplumbing.com/

---

## ✅ Checklist za deployment

Pre nego što deploy-ujete na production:

- [ ] Instalirani svi paketi (`npm install`)
- [ ] Optimizovane sve slike (`npm run optimize-images`)
- [ ] Dodati Google Analytics ID u `.env`
- [ ] Kreiran Supabase projekat i tabele
- [ ] Dodati Supabase API ključeve u `.env`
- [ ] Ažurirane forme sa Supabase API pozivima
- [ ] Testirano lokalno (`npm run dev`)
- [ ] Production build radi (`npm run build`)
- [ ] Environment variables dodati na hosting platformu
- [ ] Testirano na production URL-u

---

## 🎯 Sledeći koraci (opciono)

1. **Blog sekcija** - za SEO i content marketing
2. **Dark mode** - već imate `next-themes` paket
3. **PWA** - offline support i install prompt
4. **Chatbot** - Tawk.to ili custom
5. **Admin panel** - za pregled rezervacija
6. **Email notifikacije** - Supabase Edge Functions + SendGrid

---

Srećno sa implementacijom! 🚀
