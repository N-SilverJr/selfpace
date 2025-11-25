// src/components/SearchBar.tsx
'use client';

export default function SearchBar() {
  return (
    <div className="relative max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Search paths by title, tag, or skill..."
        className="w-full pl-12 pr-6 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
      />
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
}