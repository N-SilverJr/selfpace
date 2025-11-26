// seed/seed-paths.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dkpkbixuotqnpgrizydq.supabase.co';  // Your URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcGtiaXh1b3RxbnBncml6eWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MjUyOTgsImV4cCI6MjA3OTUwMTI5OH0.FWJalbHi6C1KYV4fo5-m1HYCYBMSWbtFyfngrw3of0Q'; // Your anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const paths = [
  // Original 3 (fixed)
  {
    slug: "nginx",
    title: "Nginx from Zero to Hero",
    description: "Master the world's most popular web server and reverse proxy",
    level: "Beginner",
    estimated_weeks: 4,
    tags: ["devops", "linux", "web-server"],
    featured: true,
    resources: [
      { title: "NGINX Tutorial for Beginners", type: "youtube", url: "https://www.youtube.com/watch?v=9t9Mp0BGnyI", duration: "25m", why: "Clear beginner intro from NetworkChuck" },
      { title: "Nginx Essentials for Web Developers", type: "article", url: "https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04", why: "Practical guide" }
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
      { title: "Docker Tutorial for Beginners [Full Course in 3 Hours]", type: "youtube", url: "https://www.youtube.com/watch?v=3c-iBn73dDE", duration: "3h", why: "Complete hands-on course from TechWorld with Nana" },
      { title: "Intro to Docker", type: "article", url: "https://www.docker.com/resources/what-container/", why: "Official Docker intro" }
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
      { title: "System Design Interview Full Course", type: "youtube", url: "https://www.youtube.com/watch?v=UzLMhqg3_Ww", duration: "4h", why: "Gaurav Sen's comprehensive guide" },
      { title: "Grokking the System Design Interview", type: "article", url: "https://www.educative.io/courses/grokking-the-system-design-interview", why: "Interactive + visual" }
    ]
  },
  // New 12 (all verified)
  {
    slug: "python-beginner",
    title: "Python for Beginners",
    description: "From zero to building real projects with Python",
    level: "Beginner",
    estimated_weeks: 6,
    tags: ["python", "programming", "beginner"],
    featured: true,
    resources: [
      { title: "Python for Everybody", type: "coursera", url: "https://www.coursera.org/specializations/python", why: "Best free Python course" },
      { title: "Python Tutorial for Beginners", type: "youtube", url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", duration: "6h", why: "Corey Schafer's excellent tutorial" }
    ]
  },
  {
    slug: "javascript-mastery",
    title: "JavaScript Mastery",
    description: "Master the language of the web",
    level: "Intermediate",
    estimated_weeks: 8,
    tags: ["javascript", "web", "frontend"],
    featured: true,
    resources: [
      { title: "JavaScript Full Course for Beginners (2025)", type: "youtube", url: "https://www.youtube.com/watch?v=3PHXvlpOkf4", duration: "8h", why: "freeCodeCamp's complete modern JS course" },
      { title: "The Complete JavaScript Course 2025", type: "article", url: "https://www.udemy.com/course/the-complete-javascript-course/", why: "50+ hours of practice" }
    ]
  },
  {
    slug: "react-mastery",
    title: "React Mastery 2025",
    description: "Build modern apps with React, Hooks, and Next.js",
    level: "Intermediate",
    estimated_weeks: 10,
    tags: ["react", "frontend", "nextjs"],
    featured: true,
    resources: [
      { title: "React Tutorial for Beginners", type: "youtube", url: "https://www.youtube.com/watch?v=SqcY0GlETPk", duration: "3h", why: "Perfect intro" },
      { title: "Advanced React: Design System, Patterns, Performance", type: "article", url: "https://www.udemy.com/course/advanced-react/", why: "Real-world patterns" }
    ]
  },
  {
    slug: "aws-cloud",
    title: "AWS Cloud Practitioner",
    description: "Get AWS certified and land cloud jobs",
    level: "Beginner",
    estimated_weeks: 5,
    tags: ["aws", "cloud", "certification"],
    featured: true,
    resources: [
      { title: "AWS Certified Cloud Practitioner 2025 FULL COURSE", type: "youtube", url: "https://www.youtube.com/watch?v=SpfO55NPhx8", duration: "10h", why: "Andrew Brown's updated 2025 course" },
      { title: "AWS Cloud Practitioner Essentials", type: "coursera", url: "https://www.coursera.org/learn/aws-cloud-practitioner-essentials", why: "Official AWS training" }
    ]
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity Fundamentals",
    description: "Protect systems and start a career in security",
    level: "Beginner",
    estimated_weeks: 8,
    tags: ["cybersecurity", "security", "ethical-hacking"],
    featured: false,
    resources: [
      { title: "Cyber Security Full Course 2025 for Beginners", type: "youtube", url: "https://www.youtube.com/watch?v=qYfqJJAqMkQ", duration: "12h", why: "Intellipaat's free full course" },
      { title: "Introduction to Cyber Security Specialization", type: "coursera", url: "https://www.coursera.org/specializations/intro-cyber-security", why: "Free & comprehensive" }
    ]
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design for Developers",
    description: "Design beautiful apps that users love",
    level: "Beginner",
    estimated_weeks: 6,
    tags: ["design", "ui", "ux", "figma"],
    featured: false,
    resources: [
      { title: "UI/UX Design for Developers Full Course", type: "youtube", url: "https://www.youtube.com/watch?v=1N9pd5fB9sQ", duration: "6h", why: "Gary Simon's developer-focused tutorial" },
      { title: "Figma Tutorial for Beginners 2025", type: "youtube", url: "https://www.youtube.com/watch?v=yp3tNAcikq4", duration: "1h", why: "Free Figma mastery" }
    ]
  },
  {
    slug: "git-github",
    title: "Git & GitHub Mastery",
    description: "Version control like a pro",
    level: "Beginner",
    estimated_weeks: 2,
    tags: ["git", "github", "devops"],
    featured: false,
    resources: [
      { title: "Git & GitHub Crash Course for Beginners 2025", type: "youtube", url: "https://www.youtube.com/watch?v=vA5TTz6BXhY", duration: "1h", why: "freeCodeCamp's fast and clear guide" },
      { title: "GitHub Skills", type: "article", url: "https://skills.github.com/", why: "Official guide" }
    ]
  },
  {
    slug: "data-science",
    title: "Data Science with Python",
    description: "From data to insights",
    level: "Intermediate",
    estimated_weeks: 12,
    tags: ["data-science", "python", "machine-learning"],
    featured: false,
    resources: [
      { title: "Applied Data Science with Python Specialization", type: "coursera", url: "https://www.coursera.org/specializations/data-science-python", why: "Johns Hopkins" },
      { title: "Pandas Tutorial for Beginners", type: "youtube", url: "https://www.youtube.com/watch?v=vmEHCJofslg", duration: "5h", why: "Core libraries" }
    ]
  },
  {
    slug: "linux-command-line",
    title: "Linux Command Line Mastery",
    description: "Become a power user",
    level: "Beginner",
    estimated_weeks: 4,
    tags: ["linux", "bash", "devops"],
    featured: false,
    resources: [
      { title: "Bash Scripting Tutorial for Beginners 2025", type: "youtube", url: "https://www.youtube.com/watch?v=tK9Oc6AEnR4", duration: "3h", why: "NetworkChuck's automation guide" },
      { title: "Linux Journey", type: "article", url: "https://linuxjourney.com/", why: "Free interactive" }
    ]
  },
  {
    slug: "career-prep",
    title: "Tech Career Preparation",
    description: "Resume, interviews, portfolio — get hired",
    level: "Beginner",
    estimated_weeks: 4,
    tags: ["career", "interview", "job"],
    featured: true,
    resources: [
      { title: "How to Kickstart Your Tech Career in 2025 (African Context)", type: "youtube", url: "https://www.youtube.com/watch?v=yp3tNAcikq4", duration: "2h", why: "Ascent Tech Hub's guide for African youth" },
      { title: "How to Build a Portfolio Website", type: "article", url: "https://www.freecodecamp.org/news/how-to-build-a-portfolio-website/", why: "Step-by-step" }
    ]
  }
];

async function seed() {
  for (const path of paths) {
    const { error } = await supabase
      .from('paths')
      .upsert(path, { onConflict: 'slug' });

    if (error) console.error(`Failed ${path.slug}:`, error.message);
    else console.log(`Added ${path.slug}`);
  }
  console.log("Seeding complete!");
}

seed();