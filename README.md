# SelfPace – Learn Tech at Your Own Speed

A beautiful, free, self-paced learning platform for African youth.  
Curated paths using the best YouTube + Coursera resources.

**Live Demo:** https://selfpace.vercel.app  
**Built with:** Next.js 16, Supabase, Tailwind CSS, TypeScript

## Features
- 15+ curated learning paths (Docker, AWS, Python, React, Cybersecurity, etc.)
- Login required to access full paths
- Glassmorphic design
- Protected routes with Supabase Auth

## How to Run Locally

```bash
git clone https://github.com/your-username/selfpace.git
cd selfpace

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Add your Supabase keys
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# Run
npm run dev
