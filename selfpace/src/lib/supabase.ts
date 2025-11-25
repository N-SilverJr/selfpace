// src/lib/supabase.ts
import { createBrowserClient, createServerClient } from '@supabase/ssr';
import type { Database } from '@/types/supabase';

export const createClient = () => {
  // Server components (App Router)
  if (typeof window === 'undefined') {
    return createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => [],
          setAll: () => {},
        },
      }
    );
  }

  // Client components
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};