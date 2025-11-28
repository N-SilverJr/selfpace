// src/components/Header.tsx
import Link from 'next/link';
import { createClient } from '@/server/supabase-server';

export default async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          SelfPace
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4 text-sm">
              <span className="font-medium">Hey, {user.email?.split('@')[0]}!</span>
              <form action="/auth/signout" method="post">
                <button className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}