/*
  # Fix waitlist table RLS policy for anonymous inserts

  1. Security Changes
    - Drop existing INSERT policy for anonymous users that may be misconfigured
    - Create new INSERT policy that properly allows anonymous users to add emails to waitlist
    - Ensure the policy allows any anonymous user to insert their email

  This migration fixes the "new row violates row-level security policy" error
  by ensuring anonymous users can properly insert into the waitlist table.
*/

-- Drop the existing INSERT policy for anonymous users if it exists
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON waitlist;

-- Create a new INSERT policy that allows anonymous users to insert emails
CREATE POLICY "Allow anonymous users to join waitlist"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure the policy also works for authenticated users
CREATE POLICY "Allow authenticated users to join waitlist"
  ON waitlist
  FOR INSERT
  TO authenticated
  WITH CHECK (true);