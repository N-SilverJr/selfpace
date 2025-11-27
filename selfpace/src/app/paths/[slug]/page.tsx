// src/app/paths/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { createClient } from '@/server/supabase'
import Header from '@/components/Header'
import ResourceCard from '@/components/ResourceCard'
import Link from 'next/link'
import { ArrowLeft, Flame, Clock, Tag } from 'lucide-react'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PathPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: path, error } = await supabase
    .from('paths')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !path) notFound()

  const normalizedPath = {
    ...path,
    description: path.description || undefined,
    level: path.level || undefined,
    estimated_weeks: path.estimated_weeks || undefined,
    tags: path.tags || [],
    resources: path.resources || [],
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-black transition-colors duration-500">
      <Header />

      {/* Back Button */}
      <div className="sticky top-16 z-40 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/10 dark:border-white/5 -mx-4 px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all paths
        </Link>
      </div>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Title + Featured */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {normalizedPath.title}
          </h1>
          {normalizedPath.featured && (
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300 font-bold text-sm">
              <Flame className="w-5 h-5" />
              Featured Path
            </div>
          )}
          {normalizedPath.description && (
            <p className="mt-8 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {normalizedPath.description}
            </p>
          )}
        </div>

        {/* Metadata Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {normalizedPath.level && (
            <span className={`px-5 py-2 rounded-full font-bold text-sm uppercase tracking-wider ${
              normalizedPath.level === 'Beginner'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                : normalizedPath.level === 'Intermediate'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                : 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300'
            }`}>
              {normalizedPath.level}
            </span>
          )}
          {normalizedPath.estimated_weeks && (
            <div className="flex items-center gap-2 px-5 py-2 bg-gray-100 dark:bg-gray-800/50 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
              <Clock className="w-5 h-5" />
              {normalizedPath.estimated_weeks} weeks
            </div>
          )}
          {normalizedPath.tags.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
              <Tag className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              {normalizedPath.tags.map((tag: string) => (
                <span key={tag} className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium border border-indigo-200/50 dark:border-indigo-700/30">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Resources */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Your Learning Resources
          </h2>
          {normalizedPath.resources.map((resource: any, index: number) => (
            <div key={index} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {index + 1}
              </div>
              <div className="flex-1">
                <ResourceCard resource={resource} />
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-20 p-10 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-3xl text-center border border-indigo-200/50 dark:border-indigo-700/30">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Ready to start learning?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Follow this path step by step to master <span className="font-bold text-indigo-600 dark:text-indigo-400">{normalizedPath.title}</span>
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-500 hover:to-purple-500 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            Start Learning Path
          </button>
        </div>
      </main>
    </div>
  )
}