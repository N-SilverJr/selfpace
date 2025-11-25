// src/components/PathCard.tsx
import Link from 'next/link';
import { Clock, Flame } from 'lucide-react';

type Path = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  estimated_weeks?: number;
  tags?: string[];
  featured?: boolean;
};

export default function PathCard({ path }: { path: Path }) {
  return (
    <Link href={`/paths/${path.slug}`} className="group block">
      {/* Gradient border wrapper */}
      <div className="h-full p-[2px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl transition-all duration-500 group-hover:from-indigo-400 group-hover:via-purple-400 group-hover:to-pink-400">
        {/* Glassmorphic card */}
        <div className="h-full p-7 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500">
          {/* Header: Title + Flame */}
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              {path.title}
            </h3>
            {path.featured && (
              <Flame className="w-7 h-7 text-orange-500 animate-pulse" />
            )}
          </div>

          {/* Description */}
          {path.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
              {path.description}
            </p>
          )}

          {/* Level + Duration */}
          <div className="flex flex-wrap items-center gap-4 mb-5 text-sm">
            {path.level && (
              <span
                className={`px-4 py-1.5 rounded-full font-semibold text-xs tracking-wider uppercase ${
                  path.level === 'Beginner'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                    : path.level === 'Intermediate'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300'
                }`}
              >
                {path.level}
              </span>
            )}
            {path.estimated_weeks && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{path.estimated_weeks} weeks</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {path.tags && path.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {path.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200/50 dark:border-indigo-700/30"
                >
                  #{tag}
                </span>
              ))}
              {path.tags.length > 4 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{path.tags.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}