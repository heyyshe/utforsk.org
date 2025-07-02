/*
  # Create waitlist table

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `created_at` (timestamp with timezone, default now)
      - `status` (text, default 'pending')

  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for public insert access (for signup form)
    - Add policy for authenticated users to read all data (for admin access)

  3. Notes
    - Email addresses are stored uniquely to prevent duplicates
    - Status field allows for future management (pending, contacted, etc.)
    - Public can insert but not read (privacy protection)
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow public to insert email addresses (for signup form)
CREATE POLICY "Anyone can sign up for waitlist"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all waitlist entries (for admin access)
CREATE POLICY "Authenticated users can read waitlist"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for better performance on email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);