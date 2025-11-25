// src/components/Header.tsx
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-500">
              SelfPace
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full group-hover:w-full transition-all duration-500"></span>
          </div>
        </Link>

        {/* Right side */}
        <div className="flex items-center space-x-6">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Hey, {user.email?.split('@')[0]}!
              </span>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-500 hover:to-purple-500 shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}