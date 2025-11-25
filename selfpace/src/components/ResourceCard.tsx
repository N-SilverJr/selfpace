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
    youtube: <PlayCircle className="w-7 h-7 text-red-600" />,
    coursera: <BookOpen className="w-7 h-7 text-blue-600" />,
    article: <FileText className="w-7 h-7 text-green-600" />,
    docs: <ExternalLink className="w-7 h-7 text-purple-600" />,
  };

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-5 p-6 bg-white border border-gray-200 rounded-xl hover:border-indigo-400 hover:shadow-lg transition-all duration-300"
    >
      <div className="mt-1">{icons[resource.type]}</div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition">
          {resource.title}
        </h3>
        {(resource.duration || resource.why) && (
          <div className="mt-2 text-sm text-gray-600">
            {resource.duration && <span className="font-medium">{resource.duration}</span>}
            {resource.duration && resource.why && " · "}
            {resource.why && <span className="italic">“{resource.why}”</span>}
          </div>
        )}
      </div>
      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition opacity-0 group-hover:opacity-100" />
    </a>
  );
}