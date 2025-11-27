// src/app/page.tsx
'use client';
import { createClient } from "@/server/supabase-server";
import Header from '@/components/Header';
import PathCard from '@/components/PathCard';
import SearchBar from '@/components/SearchBar';
import { Suspense } from 'react';
import { useState } from 'react';

function PathGrid({ initialPaths }: { initialPaths: any[] }) {
  const [filteredPaths, setFilteredPaths] = useState(initialPaths);

  return (
    <>
      <div className="max-w-2xl mx-auto mb-16">
        <SearchBar paths={initialPaths} onSearch={setFilteredPaths} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPaths.map((path) => (
          <PathCard key={path.id} path={path} />
        ))}
      </div>
    </>
  );
}

export default async function Home() {
  const supabase = await createClient();
  const { data: paths } = await supabase
    .from('paths')
    .select('*')
    .order('featured', { ascending: false })
    .order('title');

  const normalizedPaths = (paths || []).map((path: any) => ({
    ...path,
    description: path.description || undefined,
    level: path.level || undefined,
    estimated_weeks: path.estimated_weeks || undefined,
    tags: path.tags || [],
  }));

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

        {normalizedPaths.length > 0 ? (
          <Suspense fallback={<p className="text-center py-20 text-lg text-gray-500 dark:text-gray-400">Loading paths...</p>}>
            <PathGrid initialPaths={normalizedPaths} />
          </Suspense>
        ) : (
          <p className="text-center py-20 text-lg text-gray-500 dark:text-gray-400">No paths found.</p>
        )}
      </main>
    </div>
  );
}