// src/app/page.tsx
import { createClient } from '@/server/supabase-server'
import Header from '@/components/Header'
import PathCard from '@/components/PathCard'

export const revalidate = 60

export default async function Home() {
  const supabase = await createClient()
  const { data: paths } = await supabase
    .from('paths')
    .select('*')
    .order('featured', { ascending: false })
    .order('title')

  const normalizedPaths = (paths || []).map((path: any) => ({
    ...path,
    description: path.description || undefined,
    level: path.level || undefined,
    estimated_weeks: path.estimated_weeks || undefined,
    tags: path.tags || [],
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-black">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Master Your Tech Journey
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
            Curated learning paths to guide you from beginner to expert
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {normalizedPaths.length === 0 ? (
            <p className="col-span-full text-center text-red-600 text-2xl">
              No paths found — run the seed script!
            </p>
          ) : (
            normalizedPaths.map((path) => (
              <PathCard key={path.id} path={path} />
            ))
          )}
        </div>
      </main>
    </div>
  )
}