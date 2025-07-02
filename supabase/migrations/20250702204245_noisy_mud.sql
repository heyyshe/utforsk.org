/*
  # Fix waitlist RLS policy for anonymous users

  1. Security Updates
    - Drop existing INSERT policy that's not working properly
    - Create new INSERT policy that allows anonymous users to add themselves to waitlist
    - Ensure the policy has proper conditions for anonymous access

  2. Changes
    - Remove restrictive INSERT policy
    - Add permissive INSERT policy for anon role with proper qualification
*/

-- Drop the existing INSERT policy that's causing issues
DROP POLICY IF EXISTS "Anyone can sign up for waitlist" ON waitlist;

-- Create a new INSERT policy that properly allows anonymous users to insert
CREATE POLICY "Allow anonymous waitlist signup"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure the SELECT policy for authenticated users remains intact
-- (This should already exist based on the schema, but let's make sure)
DROP POLICY IF EXISTS "Authenticated users can read waitlist" ON waitlist;

CREATE POLICY "Authenticated users can read waitlist"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);