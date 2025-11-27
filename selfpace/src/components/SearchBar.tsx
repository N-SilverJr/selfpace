// src/components/SearchBar.tsx
'use client';

import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

type Path = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  level?: string;
  tags?: string[];
};

type SearchBarProps = {
  paths: Path[];
  onSearch: (filtered: Path[]) => void;
};

export default function SearchBar({ paths, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!query.trim()) {
      onSearch(paths);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = paths.filter((path) => {
      const text = `${path.title} ${path.description || ''} ${path.level || ''} ${path.tags?.join(' ') || ''}`.toLowerCase();
      return text.includes(lowerQuery);
    });

    onSearch(filtered);
  }, [query, paths, onSearch]);

  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search paths by title, tag, level..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-12 pr-6 py-4 text-lg border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white dark:bg-gray-900"
      />
    </div>
  );
}