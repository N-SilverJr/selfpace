import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import Header from '@/components/Header'
import ResourceCard from '@/components/ResourceCard'
import Link from 'next/link'
import { ArrowLeft, Flame } from 'lucide-react'

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

  if (error || !path) {
    notFound()
  }

  const normalizedPath = {
    ...path,
    description: path.description || undefined,
    level: path.level || undefined,
    estimated_weeks: path.estimated_weeks || undefined,
    tags: path.tags || [],
    resources: path.resources || [],
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 -mx-4 px-4 py-2 border-b">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all paths
          </Link>
        </div>

        {/* Path header */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                {normalizedPath.title}
              </h1>
              {normalizedPath.featured && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-4">
                  <Flame className="w-4 h-4 mr-1" />
                  Featured
                </div>
              )}
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            {normalizedPath.description}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 mb-8">
            {normalizedPath.level && (
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {normalizedPath.level}
              </div>
            )}
            {normalizedPath.estimated_weeks && (
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {normalizedPath.estimated_weeks} weeks
              </div>
            )}
            {normalizedPath.tags.map((tag: string) => (
              <div
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Resources */}
          <div className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
            {normalizedPath.resources.map((resource: any, index: number) => (
              <ResourceCard
                key={index}
                resource={resource}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center border">
            <h3 className="text-2xl font-bold mb-4">Ready to start learning?</h3>
            <p className="text-muted-foreground mb-6">
              Follow this path step by step to master {normalizedPath.title}
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Start Learning Path
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}