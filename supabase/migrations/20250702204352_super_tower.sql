/*
  # Fix waitlist RLS policy for anonymous users

  1. Security Updates
    - Drop existing policies to ensure clean state
    - Recreate policy to allow anonymous users to insert into waitlist
    - Ensure authenticated users can still read waitlist data
    - Add policy for service role to have full access for admin functionality

  2. Changes
    - Remove any conflicting policies
    - Create clear, working policies for INSERT (anon) and SELECT (authenticated)
    - Add service role policy for admin operations
*/

-- Drop existing policies to start fresh
DROP POLICY IF EXISTS "Allow anonymous waitlist signup" ON public.waitlist;
DROP POLICY IF EXISTS "Authenticated users can read waitlist" ON public.waitlist;

-- Ensure RLS is enabled
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert into waitlist (for signup)
CREATE POLICY "Allow anonymous waitlist signup"
  ON public.waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read waitlist data (for admin)
CREATE POLICY "Authenticated users can read waitlist"
  ON public.waitlist
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow service role full access (for admin operations)
CREATE POLICY "Service role full access"
  ON public.waitlist
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);