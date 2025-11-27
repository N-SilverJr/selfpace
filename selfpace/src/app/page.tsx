// src/app/page.tsx
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase-server'
import Header from '@/components/Header'
import PathCard from '@/components/PathCard'
import SearchBar from '@/components/SearchBar'

export const revalidate = 60

export default async function Home() {
  const supabase = await createClient()

  const { data: paths } = await supabase
    .from('paths')
    .select('*')
    .order('featured', { ascending: false })
    .order('title')

  const normalizedPaths = (paths || []).map(path => ({
    ...path,
    description: path.description || undefined,
    level: path.level || undefined,
    estimated_weeks: path.estimated_weeks || undefined,
    tags: path.tags || [],
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-black transition-colors duration-500">
      <Suspense fallback={<div className="min-h-screen bg-white dark:bg-gray-950" />}>
        <Header />
      </Suspense>

      <main className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Master Your Tech Journey
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Curated learning paths to guide you from beginner to expert in modern technologies
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-16">
          <Suspense fallback={<div className="h-12" />}>
            <SearchBar />
          </Suspense>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {normalizedPaths.map((path) => (
            <PathCard key={path.id} path={path} />
          ))}
        </div>
      </main>
    </div>
  )
}