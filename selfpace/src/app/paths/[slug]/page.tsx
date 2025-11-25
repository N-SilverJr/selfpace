// src/app/paths/[slug]/page.tsx
import { createClient } from '@/lib/supabase';
import ResourceCard from '@/components/ResourceCard';
import { notFound } from 'next/navigation';
import { Clock, Tag, Flame, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

// No 'use client' → this is a Server Component again (required for async)
export const revalidate = 60;   // ← safe to keep here

export default async function PathPage({
  params,
}: {
  params: Promise<{ slug: string }>;   // ← params is a Promise in Next.js 16
}) {
  // Unwrap the promise correctly
  const { slug } = await params;

  const supabase = createClient();

  const { data: path, error } = await supabase
    .from('paths')
    .select('*')
    .eq('slug', slug)
    .single();

  // 404 if not found
  if (!path || error) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to all paths</span>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 inline-flex items-center gap-4">
            {path.title}
            {path.featured && <Flame className="w-10 h-10 text-orange-500" />}
          </h1>
          {path.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{path.description}</p>
          )}
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
          {path.level && (
            <span
              className={`px-4 py-2 rounded-full font-medium ${
                path.level === 'Beginner'
                  ? 'bg-green-100 text-green-800'
                  : path.level === 'Intermediate'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {path.level}
            </span>
          )}
          {path.estimated_weeks && (
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5" />
              <span>{path.estimated_weeks} weeks</span>
            </div>
          )}
          {path.tags && path.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-5 h-5 text-gray-500" />
              {path.tags.map((tag: string) => (
                <span key={tag} className="text-gray-600">#{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Resources */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">Your Learning Resources</h2>
          {Array.isArray(path.resources) ? path.resources.map((resource: any, index: number) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                {index < ((Array.isArray(path.resources) ? path.resources.length : 0) - 1) && (
                  <div className="w-0.5 h-20 bg-gray-200 mt-2" />
                )}
              </div>
              <div className="flex-1 pb-8">
                <ResourceCard resource={resource} />
              </div>
            </div>
          )) : null}
        </div>

        {/* Final note */}
        <div className="mt-16 p-8 bg-indigo-50 rounded-2xl text-center">
          <p className="text-lg text-indigo-900 font-medium">
            You’ve got this. Study at your own pace — no pressure, just progress.
          </p>
        </div>
      </main>
    </div>
  );
}