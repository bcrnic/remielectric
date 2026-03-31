# 🚀 Brzi start - Nove funkcionalnosti

## Šta je dodato?

✅ **Google Analytics** - tracking posetilaca  
✅ **Testimonials** - recenzije klijenata na početnoj  
✅ **FAQ sekcija** - često postavljana pitanja  
✅ **Optimizacija slika** - script za kompresiju  
✅ **Supabase setup** - priprema za backend  

---

## Sledeći koraci (po prioritetu):

### 1️⃣ Instalirajte pakete
```bash
npm install
```

### 2️⃣ Optimizujte slike (VAŽNO za performance)
```bash
npm run optimize-images
```
Zatim zamenite originalne fajlove sa `_optimized` verzijama.

### 3️⃣ Dodajte Google Analytics ID

Kreirajte `.env` fajl:
```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Dobijte ID na: https://analytics.google.com

### 4️⃣ Setup Supabase backend

Pratite `SUPABASE_SETUP.md` za detalje:
1. Kreirajte Supabase projekat
2. Izvršite SQL za tabele
3. Dodajte API ključeve u `.env`
4. Ažurirajte forme u `Booking.tsx` i `Contact.tsx`

---

## Testiranje

```bash
npm run dev
```

Proverite:
- Početna stranica ima Testimonials i FAQ sekcije
- Google Analytics radi (DevTools → Network → filter "gtag")
- Forme rade (nakon Supabase setup-a)

---

## Deployment

Pre deploy-a:
1. ✅ Optimizovane slike
2. ✅ Dodati environment variables na hosting platformu
3. ✅ Testiran production build: `npm run build`

---

**Detaljne instrukcije:** Pogledajte `IMPLEMENTATION_GUIDE.md`  
**Supabase setup:** Pogledajte `SUPABASE_SETUP.md`  
**Optimizacija slika:** Pogledajte `OPTIMIZATION_GUIDE.md`
