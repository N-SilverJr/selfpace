// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import Header from '@/components/Header';
import PathCard from '@/components/PathCard';
import SearchBar from '@/components/SearchBar';


export default function Home() {
  const [paths, setPaths] = useState<any[]>([]);
  const [filteredPaths, setFilteredPaths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('paths')
      .select('*')
      .order('featured', { ascending: false })
      .order('title')
      .then(({ data }) => {
        const normalized = (data || []).map((path: any) => ({
          ...path,
          description: path.description || undefined,
          level: path.level || undefined,
          estimated_weeks: path.estimated_weeks || undefined,
          tags: path.tags || [],
        }));
        setPaths(normalized);
        setFilteredPaths(normalized);
        setLoading(false);
      });
  }, []);

  // FINAL REDIRECT FIX
  useEffect(() => {
    const url = new URL(window.location.href);
    const redirectTo = url.searchParams.get('redirect_to');
    if (redirectTo && redirectTo.startsWith('/paths/')) {
      const supabase = createClient();
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          window.location.href = redirectTo;
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-black transition-colors duration-500">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Master Your Tech Journey
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Curated learning paths to guide you from beginner to expert in modern technologies
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <SearchBar paths={paths} onSearch={setFilteredPaths} />
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-500 dark:text-gray-400">Loading paths...</p>
          </div>
        ) : filteredPaths.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPaths.map((path) => (
              <PathCard key={path.id} path={path} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No paths found.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}