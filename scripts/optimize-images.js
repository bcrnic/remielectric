/**
 * Image Optimization Script
 *
 * Ovaj script kompresuje slike i kreira WebP verzije.
 *
 * Instalacija:
 * npm install --save-dev sharp
 *
 * Pokretanje:
 * node scripts/optimize-images.js
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, "../public");
const imagesToOptimize = [
  "distribution_panel.png",
  "gallery-industrial.jpg",
  "gallery-led.jpg",
  "outdoor_house.png",
  "pro_electrician.png",
  "smart_home.png",
  "wall_sockets.png",
];

async function optimizeImage(filename) {
  const inputPath = path.join(publicDir, filename);
  const ext = path.extname(filename);
  const name = path.basename(filename, ext);

  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  Fajl ne postoji: ${filename}`);
    return;
  }

  const stats = fs.statSync(inputPath);
  const originalSize = (stats.size / 1024 / 1024).toFixed(2);

  console.log(`\n📸 Optimizujem: ${filename} (${originalSize}MB)`);

  try {
    // Kreiranje WebP verzije
    const webpPath = path.join(publicDir, `${name}.webp`);
    await sharp(inputPath).webp({ quality: 80 }).toFile(webpPath);

    const webpStats = fs.statSync(webpPath);
    const webpSize = (webpStats.size / 1024 / 1024).toFixed(2);
    console.log(`  ✅ WebP kreiran: ${name}.webp (${webpSize}MB)`);

    // Optimizacija originalnog formata
    const optimizedPath = path.join(publicDir, `${name}_optimized${ext}`);

    if (ext === ".jpg" || ext === ".jpeg") {
      await sharp(inputPath).jpeg({ quality: 85, progressive: true }).toFile(optimizedPath);
    } else if (ext === ".png") {
      await sharp(inputPath).png({ quality: 85, compressionLevel: 9 }).toFile(optimizedPath);
    }

    const optimizedStats = fs.statSync(optimizedPath);
    const optimizedSize = (optimizedStats.size / 1024 / 1024).toFixed(2);
    console.log(`  ✅ Optimizovan: ${name}_optimized${ext} (${optimizedSize}MB)`);

    const savings = ((1 - optimizedStats.size / stats.size) * 100).toFixed(1);
    console.log(`  💾 Ušteda: ${savings}%`);
  } catch (error) {
    console.error(`  ❌ Greška: ${error.message}`);
  }
}

async function main() {
  console.log("🚀 Pokretanje optimizacije slika...\n");
  console.log("=".repeat(50));

  for (const image of imagesToOptimize) {
    await optimizeImage(image);
  }

  console.log("\n" + "=".repeat(50));
  console.log("\n✨ Optimizacija završena!");
  console.log("\n📝 Sledeći koraci:");
  console.log("1. Pregledajte optimizovane slike u public/ folderu");
  console.log("2. Zamenite originalne fajlove sa _optimized verzijama");
  console.log("3. Obrišite stare fajlove");
  console.log("4. Commit-ujte promene\n");
}

main().catch(console.error);
