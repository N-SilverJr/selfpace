// src/components/Header.tsx
import { createClient } from '@/lib/supabase';

export default async function Header() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-indigo-600">SelfPace</h2>
        
        {user ? (
          <div className="text-sm text-gray-700">
            Hi, {user.email?.split('@')[0]}
          </div>
        ) : (
          <form action="/auth/signin" method="post">
            <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
              Sign in
            </button>
          </form>
        )}
      </div>
    </header>
  );
}