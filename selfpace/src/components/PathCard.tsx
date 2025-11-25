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
      <div className="h-full p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition">
            {path.title}
          </h3>
          {path.featured && <Flame className="w-6 h-6 text-orange-500" />}
        </div>

        {path.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">{path.description}</p>
        )}

        <div className="flex flex-wrap gap-3 text-sm">
          {path.level && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              path.level === 'Beginner' ? 'bg-green-100 text-green-800' :
              path.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {path.level}
            </span>
          )}
          {path.estimated_weeks && (
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{path.estimated_weeks} weeks</span>
            </div>
          )}
        </div>

        {path.tags && path.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {path.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}