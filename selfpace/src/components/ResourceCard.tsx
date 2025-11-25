// src/components/ResourceCard.tsx
import { PlayCircle, BookOpen, ExternalLink, FileText } from 'lucide-react';

type Resource = {
  title: string;
  type: 'youtube' | 'coursera' | 'article' | 'docs';
  url: string;
  duration?: string;
  why?: string;
};

export default function ResourceCard({ resource }: { resource: Resource }) {
  const icons = {
    youtube: <PlayCircle className="w-9 h-9 text-red-600 group-hover:scale-110 transition-transform duration-300" />,
    coursera: <BookOpen className="w-9 h-9 text-blue-600 group-hover:scale-110 transition-transform duration-300" />,
    article: <FileText className="w-9 h-9 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />,
    docs: <ExternalLink className="w-9 h-9 text-purple-600 group-hover:scale-110 transition-transform duration-300" />,
  };

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {/* Gradient border wrapper (same as PathCard) */}
      <div className="h-full p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl transition-all duration-500 group-hover:from-indigo-400 group-hover:via-purple-400 group-hover:to-pink-400">
        {/* Glassmorphic inner card */}
        <div className="h-full p-7 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-md hover:shadow-2xl transition-all duration-500 flex items-start gap-6">
          {/* Icon */}
          <div className="flex-shrink-0 mt-1">{icons[resource.type]}</div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2">
              {resource.title}
            </h3>

            {(resource.duration || resource.why) && (
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                {resource.duration && (
                  <div className="flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400">
                    <span className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
                    {resource.duration}
                  </div>
                )}
                {resource.why && (
                  <p className="italic leading-relaxed opacity-90">
                    “{resource.why}”
                  </p>
                )}
              </div>
            )}
          </div>

          {/* External link arrow */}
          <ExternalLink className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0" />
        </div>
      </div>
    </a>
  );
}