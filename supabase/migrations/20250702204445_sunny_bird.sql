/*
  # Fix waitlist RLS policies

  1. Security Updates
    - Drop all existing policies to start clean
    - Create proper policy for anonymous users to insert (signup)
    - Create policy for authenticated users to read (admin)
    - Create policy for service role full access
  
  2. Changes
    - Ensures anonymous users can sign up for waitlist
    - Maintains admin access to read waitlist data
    - Fixes RLS policy violations
*/

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Allow anonymous waitlist signup" ON public.waitlist;
DROP POLICY IF EXISTS "Authenticated users can read waitlist" ON public.waitlist;
DROP POLICY IF EXISTS "Service role full access" ON public.waitlist;
DROP POLICY IF EXISTS "Anyone can sign up for waitlist" ON public.waitlist;

-- Ensure RLS is enabled
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert into waitlist (for public signup)
CREATE POLICY "Enable insert for anonymous users"
  ON public.waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all waitlist data (for admin panel)
CREATE POLICY "Enable read for authenticated users"
  ON public.waitlist
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow service role full access (for backend operations)
CREATE POLICY "Enable all for service role"
  ON public.waitlist
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);