# Supabase Backend Integracija

## Korak 1: Kreiranje Supabase projekta

1. Idite na [https://supabase.com](https://supabase.com)
2. Kreirajte nalog ili se prijavite
3. Kliknite "New Project"
4. Unesite:
   - Project name: `remielectric`
   - Database password: (sačuvajte negde sigurno)
   - Region: `Europe (Frankfurt)` ili najbliži
5. Sačekajte da se projekat kreira (~2 minuta)

## Korak 2: Kreiranje tabela

U Supabase dashboard-u, idite na **SQL Editor** i izvršite sledeći SQL:

```sql
-- Tabela za zakazivanje termina
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- Tabela za kontakt forme
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied'))
);

-- Indeksi za brže pretraživanje
CREATE INDEX bookings_created_at_idx ON bookings(created_at DESC);
CREATE INDEX bookings_status_idx ON bookings(status);
CREATE INDEX contact_messages_created_at_idx ON contact_messages(created_at DESC);
CREATE INDEX contact_messages_status_idx ON contact_messages(status);

-- Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy za insert (svako može da kreira)
CREATE POLICY "Anyone can insert bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Policy za select (samo admin može da čita - za sada onemogućeno)
-- Kasnije dodati autentifikaciju za admin panel
```

## Korak 3: Email notifikacije (opciono)

1. U Supabase dashboard-u, idite na **Database** → **Webhooks**
2. Kreirajte webhook za `bookings` tabelu (INSERT event)
3. URL: Vaš email service (npr. Zapier, Make.com, ili custom endpoint)

**Alternativa:** Koristite Supabase Edge Functions za slanje email-ova:

```sql
-- Kreiranje funkcije za email notifikaciju
CREATE OR REPLACE FUNCTION notify_new_booking()
RETURNS TRIGGER AS $$
BEGIN
  -- Ovde dodati logiku za slanje email-a
  -- Može se integrisati sa Supabase Edge Functions
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger za novu rezervaciju
CREATE TRIGGER on_booking_created
  AFTER INSERT ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_booking();
```

## Korak 4: Dobijanje API ključeva

1. U Supabase dashboard-u, idite na **Settings** → **API**
2. Kopirajte:
   - **Project URL** (npr. `https://xxxxx.supabase.co`)
   - **anon public** key (za frontend)

## Korak 5: Konfiguracija u projektu

1. Kreirajte `.env` fajl u root-u projekta:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

2. Instalirajte Supabase klijent:

```bash
npm install @supabase/supabase-js
```

## Korak 6: Implementacija u kodu

Fajlovi koji treba da se kreiraju/izmene:

### `src/lib/supabase.ts`
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Booking {
  id?: string
  created_at?: string
  name: string
  phone: string
  email?: string
  service: string
  date: string
  time_slot: string
  description?: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

export interface ContactMessage {
  id?: string
  created_at?: string
  name: string
  email: string
  phone?: string
  message: string
  status?: 'new' | 'read' | 'replied'
}
```

### Izmena `src/pages/Booking.tsx`

Zameniti simulirani API call (linija 79-80) sa:

```typescript
import { supabase } from '@/lib/supabase'

// U handleSubmit funkciji:
const { error } = await supabase.from('bookings').insert({
  name: formData.name,
  phone: formData.phone,
  email: formData.email || null,
  service: formData.service,
  date: format(date, 'yyyy-MM-dd'),
  time_slot: formData.timeSlot,
  description: formData.description || null,
})

if (error) {
  toast.error('Greška pri zakazivanju. Pokušajte ponovo.')
  console.error('Supabase error:', error)
  return
}
```

### Izmena `src/pages/Contact.tsx`

Zameniti simulirani API call (linija 44-45) sa:

```typescript
import { supabase } from '@/lib/supabase'

// U handleSubmit funkciji:
const { error } = await supabase.from('contact_messages').insert({
  name: formData.name,
  email: formData.email,
  phone: formData.phone || null,
  message: formData.message,
})

if (error) {
  toast.error('Greška pri slanju poruke. Pokušajte ponovo.')
  console.error('Supabase error:', error)
  return
}
```

## Korak 7: Testiranje

1. Pokrenite dev server: `npm run dev`
2. Popunite booking formu
3. Proverite u Supabase dashboard → **Table Editor** → `bookings` da li je red dodat
4. Isto testirati i contact formu

## Korak 8: Admin panel (opciono - za kasnije)

Možete kreirati admin stranicu za pregled rezervacija:

```typescript
// src/pages/Admin.tsx
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const Admin = () => {
  const [bookings, setBookings] = useState([])
  
  useEffect(() => {
    const fetchBookings = async () => {
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
      setBookings(data || [])
    }
    fetchBookings()
  }, [])
  
  // Render tabelu sa rezervacijama
}
```

## Napomene

- `.env` fajl je u `.gitignore` - **NIKAD** ne commit-ujte API ključeve
- Za production, koristite environment variables na hosting platformi
- Razmislite o dodavanju CAPTCHA-e za zaštitu od spam-a
- Supabase besplatni plan: 500MB baze, 1GB file storage, 2GB bandwidth

## Troubleshooting

**Problem:** "Missing Supabase environment variables"
- **Rešenje:** Proverite da li `.env` fajl postoji i da li su promenljive pravilno nazvane

**Problem:** "Row Level Security policy violation"
- **Rešenje:** Proverite da li su RLS policies pravilno postavljene u SQL editoru

**Problem:** Podaci se ne pojavljuju u bazi
- **Rešenje:** Otvorite browser console i proverite error poruke
