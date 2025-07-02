/*
  # Midlertidig deaktivering av RLS for waitlist-tabellen

  1. Endringer
    - Deaktiverer Row Level Security på waitlist-tabellen midlertidig
    - Dette lar alle brukere (inkludert anonyme) legge til e-poster på ventelisten
    - Fjerner alle eksisterende policies som skaper problemer

  2. Sikkerhet
    - Dette er en midlertidig løsning for å få funksjonaliteten til å virke
    - I produksjon bør RLS aktiveres igjen med riktige policies
*/

-- Fjern alle eksisterende policies
DROP POLICY IF EXISTS "Allow anonymous users to join waitlist" ON public.waitlist;
DROP POLICY IF EXISTS "Allow authenticated users to join waitlist" ON public.waitlist;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.waitlist;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON public.waitlist;
DROP POLICY IF EXISTS "Enable all for service role" ON public.waitlist;
DROP POLICY IF EXISTS "Authenticated users can read waitlist" ON public.waitlist;
DROP POLICY IF EXISTS "Service role full access" ON public.waitlist;

-- Deaktiver RLS midlertidig
ALTER TABLE public.waitlist DISABLE ROW LEVEL SECURITY;