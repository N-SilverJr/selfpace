// src/app/page.tsx
import { createClient } from '@/lib/supabase';
import Header from '../components/Header';
import PathCard from '../components/PathCard';
import SearchBar from '../components/SearchBar';

export const revalidate = 60; // Refresh data every minute

export default async function Home() {
  const supabase = createClient();
  const { data: paths } = await supabase
    .from('paths')
    .select('*')
    .order('featured', { ascending: false })
    .order('title');

  // Normalize nullable fields from Supabase to match the 'Path' type (convert null -> undefined)
  const normalizedPaths = paths?.map((p) => ({
    ...p,
    description: p.description ?? undefined,
    level: p.level ?? undefined,
    estimated_weeks: p.estimated_weeks ?? undefined,
    featured: p.featured ?? undefined,
    tags: p.tags ?? undefined,
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            SelfPace
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Learn anything at your own speed. Curated paths with the best free YouTube + Coursera resources.
          </p>
        </section>

        {/* Search + Grid */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <SearchBar />
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {normalizedPaths?.length === 0 && (
              <p className="col-span-full text-center text-gray-500 text-lg py-20">
                No paths yet — let’s add some in Supabase!
              </p>
            )}
            {normalizedPaths?.map((path) => (
              <PathCard key={path.id} path={path} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}