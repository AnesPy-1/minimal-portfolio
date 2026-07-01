export type SocialLink = {
  label: string;
  url: string | null;
  icon: string | null;
};

export type Metric = {
  label: string;
  value: string;
  icon: string | null;
};

export type Skill = {
  name: string;
  icon: string | null;
};

export type SkillCategory = {
  name: string;
  skills: Skill[];
};

export type Project = {
  title: string;
  description: string | null;
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  tech_stack: string[];
  accent: string | null;
};

export type Experience = {
  role: string;
  company: string | null;
  period: string | null;
  description: string | null;
};

export type SiteSettings = {
  site_name: string | null;
  logo_text: string | null;
  favicon_url: string | null;
  hero_badge: string | null;
  hero_greeting: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_primary_cta_label: string | null;
  hero_primary_cta_url: string | null;
  hero_secondary_cta_label: string | null;
  hero_secondary_cta_url: string | null;
  profile_image_url: string | null;
  profile_image_alt: string | null;
  profile_caption: string | null;
  about_title: string | null;
  about_description: string | null;
  about_link_label: string | null;
  about_link_url: string | null;
  location: string | null;
  email: string | null;
  experience: string | null;
  footer_description: string | null;
};

export type PortfolioPayload = {
  site: SiteSettings;
  social_links: SocialLink[];
  metrics: Metric[];
  skill_categories: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
};

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anespy.xyz";
export const API_URL = process.env.NEXT_PUBLIC_PORTFOLIO_API_URL ?? "http://localhost:8000/api/site/";

export const DEFAULT_TITLE = "AnesPy | Portfolio for anespy.xyz";
export const DEFAULT_DESCRIPTION = "A minimal, motion-driven portfolio for anespy.xyz built with Next.js and Django.";

export async function fetchPortfolio(): Promise<PortfolioPayload | null> {
  try {
    const response = await fetch(API_URL, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as PortfolioPayload;
  } catch {
    return null;
  }
}

export function getCanonicalUrl(pathname: string = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, SITE_URL).toString();
}

export const FALLBACK_PORTFOLIO_PAYLOAD: PortfolioPayload = {
  site: {
    site_name: "AnesPy",
    logo_text: "AnesPy",
    favicon_url: "/icon",
    hero_badge: "Full Stack Developer",
    hero_greeting: "Hi, I am Anes",
    hero_title: "Full Stack Developer",
    hero_subtitle: "I design and build modern web applications with sharp interfaces, fast interactions, and production-grade engineering.",
    hero_primary_cta_label: "Let's Build Something",
    hero_primary_cta_url: "#contact",
    hero_secondary_cta_label: "View Projects",
    hero_secondary_cta_url: "#projects",
    profile_image_url: "/opengraph-image",
    profile_image_alt: "Anes profile portrait",
    profile_caption: "Code - Motion - Mobile - UI Systems",
    about_title: "I turn product ideas into sharp, modern interfaces.",
    about_description: "My work focuses on performance, clarity, and interaction design. I like compact systems, clean architecture, and visual details that make digital products feel premium.",
    about_link_label: "More About Me",
    about_link_url: "#experience",
    location: "Tehran, Iran",
    email: "hello@anes.dev",
    experience: "3+ years of shipping production software",
    footer_description: "Minimal black and white portfolio crafted for clarity, speed, and premium product presentation.",
  },
  social_links: [
    { label: "GitHub", url: "https://github.com", icon: "github" },
    { label: "Telegram", url: "https://t.me", icon: "telegram" },
    { label: "Instagram", url: "https://instagram.com", icon: "instagram" },
    { label: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
    { label: "Twitter", url: "https://twitter.com", icon: "twitter" },
  ],
  metrics: [
    { label: "Projects", value: "50+", icon: "projects" },
    { label: "Years Experience", value: "3+", icon: "experience" },
    { label: "Happy Clients", value: "30+", icon: "clients" },
    { label: "Commits", value: "10K+", icon: "commits" },
  ],
  skill_categories: [
    {
      name: "Frontend",
      skills: [
        { name: "React.js", icon: "react" },
        { name: "Next.js", icon: "next" },
        { name: "Tailwind", icon: "tailwind" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Framer Motion", icon: "motion" },
        { name: "Three.js", icon: "three" },
      ],
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js", icon: "node" },
        { name: "Express", icon: "express" },
        { name: "Python", icon: "python" },
        { name: "Django", icon: "django" },
        { name: "PHP", icon: "php" },
        { name: "Laravel", icon: "laravel" },
      ],
    },
    {
      name: "Database",
      skills: [
        { name: "MongoDB", icon: "mongodb" },
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "MySQL", icon: "mysql" },
        { name: "Redis", icon: "redis" },
      ],
    },
    {
      name: "Mobile",
      skills: [
        { name: "Flutter", icon: "flutter" },
        { name: "Dart", icon: "dart" },
        { name: "React Native", icon: "react-native" },
      ],
    },
    {
      name: "Tools",
      skills: [
        { name: "Git", icon: "git" },
        { name: "Docker", icon: "docker" },
        { name: "AWS", icon: "aws" },
        { name: "CI/CD", icon: "cicd" },
      ],
    },
  ],
  projects: [
    {
      title: "E-commerce Platform",
      description: "High-conversion storefront with product search, cart flows, and a fast checkout experience.",
      image_url: "/opengraph-image",
      live_url: "https://example.com/ecommerce",
      github_url: "https://github.com",
      tech_stack: ["Next.js", "Stripe", "Tailwind", "PostgreSQL"],
      accent: "from-white/[0.12] to-white/[0.04]",
    },
    {
      title: "AI Chat App",
      description: "Conversational workspace with threaded prompts, smart suggestions, and realtime responses.",
      image_url: "/opengraph-image",
      live_url: "https://example.com/ai-chat",
      github_url: "https://github.com",
      tech_stack: ["React", "OpenAI", "Node.js", "Redis"],
      accent: "from-white/[0.12] to-white/[0.04]",
    },
    {
      title: "Task Manager SaaS",
      description: "Team productivity dashboard with priorities, analytics, and seamless collaboration.",
      image_url: "/opengraph-image",
      live_url: "https://example.com/task-manager",
      github_url: "https://github.com",
      tech_stack: ["Next.js", "Framer Motion", "MongoDB", "Docker"],
      accent: "from-white/[0.12] to-white/[0.04]",
    },
  ],
  experiences: [
    {
      role: "Senior Full Stack Developer",
      company: "Studio Nova",
      period: "2024 - Present",
      description: "Leading product engineering, design-to-code execution, and performance-focused architecture for client launches.",
    },
    {
      role: "Freelance Developer",
      company: "Independent",
      period: "2022 - 2024",
      description: "Delivered landing pages, dashboards, booking systems, and custom platforms for startups and small businesses.",
    },
    {
      role: "Junior Developer",
      company: "Agency Lab",
      period: "2021 - 2022",
      description: "Built UI components, maintained internal tools, and learned production-grade workflows across modern stacks.",
    },
  ],
};
