# Vodič za optimizaciju slika

## Trenutno stanje

Slike u `public/` folderu su prevelike (1-2MB svaka). Potrebno ih je kompresovati.

## Koraci za optimizaciju:

### 1. Instalacija alata za kompresiju

```bash
npm install -D sharp
```

### 2. Kompresija slika

Koristite online alate ili sharp za kompresiju:

**Online alati:**

- https://squoosh.app/ (Google)
- https://tinypng.com/
- https://imageoptim.com/

**Preporučene postavke:**

- JPEG kvalitet: 80-85%
- PNG: optimizovati sa TinyPNG
- Kreirati WebP verzije svih slika

### 3. Slike koje treba optimizovati:

- `distribution_panel.png` (1.7MB) → kompresovati na ~200-300KB
- `gallery-industrial.jpg` (1MB) → kompresovati na ~150-200KB
- `gallery-led.jpg` (869KB) → kompresovati na ~120-150KB
- `outdoor_house.png` (1.8MB) → kompresovati na ~200-300KB
- `pro_electrician.png` (1.9MB) → kompresovati na ~200-300KB
- `smart_home.png` (1.4MB) → kompresovati na ~150-200KB
- `wall_sockets.png` (1.4MB) → kompresovati na ~150-200KB

### 4. Kreiranje WebP verzija

Za svaku sliku kreirajte i WebP verziju:

```bash
# Primer sa sharp (Node.js script)
const sharp = require('sharp');

sharp('distribution_panel.png')
  .webp({ quality: 80 })
  .toFile('distribution_panel.webp');
```

### 5. Rezultat

Nakon optimizacije, ukupna veličina slika bi trebala biti ~1.5-2MB umesto trenutnih ~10MB.
