// seed/seed-paths.ts
import { createClient } from '@supabase/supabase-js';  // ← This is the correct one

const SUPABASE_URL = 'https://dkpkbixuotqnpgrizydq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcGtiaXh1b3RxbnBncml6eWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MjUyOTgsImV4cCI6MjA3OTUwMTI5OH0.FWJalbHi6C1KYV4fo5-m1HYCYBMSWbtFyfngrw3of0Q';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);  

const paths = [
  {
    slug: "Linux",
    title: "Linux from Zero to Hero",
    description: "Master the world's most exciting operating system",
    level: "Beginner",
    estimated_weeks: 4,
    tags: ["devops", "linux", "web-server"],
    featured: true,
    resources: [
      { title: "Linux Beginner Tutorial", type: "youtube", url: "https://www.youtube.com/watch?v=sWbUDq4S6Y8", duration: "6h 08m", why: "Best free introduction" },
      { title: "Linux Fundamentals", type: "coursera", url: "https://www.coursera.org/learn/hands-on-introduction-to-linux-commands-and-shell-scripting", why: "University-level depth" }
    ]
  },
  {
    slug: "docker",
    title: "Docker & Docker Compose Mastery",
    description: "Containerize anything, deploy anywhere",
    level: "Beginner",
    estimated_weeks: 3,
    tags: ["devops", "containers", "docker"],
    featured: true,
    resources: [
      { title: "Docker for Beginners", type: "youtube", url: "https://www.youtube.com/watch?v=fqMOX6JJhGo", duration: "2h", why: "Most popular free course" },
      { title: "Docker and Kubernetes: The Complete Guide", type: "coursera", url: "https://www.coursera.org/learn/ibm-containers-docker-kubernetes-openshift", why: "Industry standard" }
    ]
  },
  {
    slug: "system-design",
    title: "System Design Interview Prep",
    description: "Ace your FAANG-level system design interviews",
    level: "Advanced",
    estimated_weeks: 8,
    tags: ["interviews", "architecture", "scalability"],
    featured: false,
    resources: [
      { title: "System Design Interview – Full Course", type: "youtube", url: "https://www.youtube.com/watch?v=m8Icp_Cid5o", duration: "4h", why: "The gold standard" },
      { title: "Grokking the System Design Interview", type: "article", url: "https://www.coursera.org/learn/pearson-system-design-fundamentals-livelesson-video-training-n1kdi/home", why: "Interactive + visual" }
    ]
  }
];

async function seed() {
  for (const path of paths) {
    const { error } = await supabase
      .from('paths')
      .upsert(path, { onConflict: 'slug' });

    if (error) console.error(`Failed ${path.slug}:`, error.message);
    else console.log(`Added/Updated ${path.slug}`);
  }
  console.log("Seeding complete!");
}

seed();