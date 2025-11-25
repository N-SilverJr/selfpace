import { createClient } from '@/lib/supabase-server'
import Header from '@/components/Header'
import PathCard from '@/components/PathCard'
import SearchBar from '@/components/SearchBar'

export const revalidate = 60

export default async function Home() {
  const supabase = await createClient()

  const { data: paths, error } = await supabase
    .from('paths')
    .select('*')
    .order('featured', { ascending: false })
    .order('title')

  if (error) {
    console.error('Error fetching paths:', error)
  }

  const normalizedPaths = paths?.map(path => ({
    ...path,
    description: path.description || undefined,
    level: path.level || undefined,
    estimated_weeks: path.estimated_weeks || undefined,
    tags: path.tags || [],
  })) || []

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Master Your Tech Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Curated learning paths to guide you from beginner to expert in modern technologies
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar />
        </div>

        {normalizedPaths.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {normalizedPaths.map((path) => (
              <PathCard key={path.id} path={path} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No learning paths found.</p>
          </div>
        )}
      </main>
    </div>
  )
}