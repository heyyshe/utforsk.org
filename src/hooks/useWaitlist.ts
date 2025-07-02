import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useWaitlist() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToWaitlist = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      console.log('Supabase URL exists:', !!supabaseUrl);
      console.log('Supabase Anon Key exists:', !!supabaseAnonKey);
      
      if (!supabaseUrl || !supabaseAnonKey) {
        setError('Supabase er ikke konfigurert. Klikk på "Connect to Supabase" knappen øverst til høyre.');
        return { success: false, error: 'Supabase ikke konfigurert' };
      }

      console.log('Attempting to insert email:', email);
      
      const { data, error: insertError } = await supabase
        .from('waitlist')
        .insert([{ email }])
        .select();

      console.log('Insert result:', { data, error: insertError });

      if (insertError) {
        console.error('Database error:', insertError);
        
        // Handle duplicate email error gracefully
        if (insertError.code === '23505') {
          const errorMessage = 'Denne e-postadressen er allerede registrert på ventelisten.';
          setError(errorMessage);
          return { success: false, error: errorMessage };
        }
        
        // Handle other database errors
        const errorMessage = insertError.message || 'En feil oppstod. Prøv igjen senere.';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      console.log('Successfully inserted email:', data);
      return { success: true };
    } catch (err) {
      console.error('Waitlist error:', err);
      let errorMessage = 'En feil oppstod. Prøv igjen senere.';
      
      // Handle different types of errors
      if (err && typeof err === 'object' && 'code' in err) {
        if (err.code === '23505') {
          errorMessage = 'Denne e-postadressen er allerede registrert på ventelisten.';
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addToWaitlist,
    isLoading,
    error,
    clearError: () => setError(null)
  };
}