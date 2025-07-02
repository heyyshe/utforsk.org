import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase configuration check:');
console.log('URL configured:', !!supabaseUrl);
console.log('Anon key configured:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase is not properly configured. Please set up your environment variables.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type Database = {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          status: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          status?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          status?: string;
        };
      };
    };
  };
};