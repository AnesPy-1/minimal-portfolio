"use client";

import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Code2,
  Database,
  Dot,
  ExternalLink,
  Flame,
  Globe2,
  Hammer,
  Heart,
  LayoutGrid,
  Mail,
  MapPin,
  MonitorSmartphone,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Smartphone,
  CalendarDays,
  TerminalSquare,
  UserRound,
  WandSparkles,
  Braces,
  GitBranch,
  Layers3,
  Boxes,
  Cpu,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { createElement, useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type SocialLink = {
  label: string;
  url: string | null;
  icon: string | null;
};

type Metric = {
  label: string;
  value: string;
  icon: string | null;
};

type Skill = {
  name: string;
  icon: string | null;
};

type SkillCategory = {
  name: string;
  skills: Skill[];
};

type Project = {
  title: string;
  description: string | null;
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  tech_stack: string[];
  accent: string | null;
};

type Experience = {
  role: string;
  company: string | null;
  period: string | null;
  description: string | null;
};

type SiteSettings = {
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

type PortfolioPayload = {
  site: SiteSettings;
  social_links: SocialLink[];
  metrics: Metric[];
  skill_categories: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
};

const API_URL = process.env.NEXT_PUBLIC_PORTFOLIO_API_URL ?? "http://localhost:8000/api/site/";

const socialIconMap: Record<string, ComponentType<{ className?: string }>> = {
  github: FaGithub,
  telegram: FaTelegramPlane,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
};

const techIconMap: Record<string, ComponentType<{ className?: string }>> = {
  react: Code2,
  next: Globe2,
  tailwind: WandSparkles,
  typescript: Braces,
  motion: Sparkles,
  three: Layers3,
  node: Server,
  express: ShieldCheck,
  python: TerminalSquare,
  django: Database,
  php: Hammer,
  laravel: Flame,
  mongodb: Database,
  postgresql: Database,
  mysql: Database,
  redis: Database,
  flutter: Smartphone,
  dart: MonitorSmartphone,
  "react-native": Smartphone,
  git: GitBranch,
  docker: Boxes,
  aws: CloudIcon,
  cicd: Rocket,
};

const metricIconMap: Record<string, ComponentType<{ className?: string }>> = {
  projects: LayoutGrid,
  experience: CalendarDays,
  clients: Heart,
  commits: GitBranch,
};

const heroParticles = [
  { top: "14%", left: "12%", size: 3, delay: "0s", duration: "9s", opacity: 0.28 },
  { top: "22%", left: "52%", size: 2, delay: "1.4s", duration: "11s", opacity: 0.22 },
  { top: "36%", left: "80%", size: 3, delay: "2.2s", duration: "10s", opacity: 0.25 },
  { top: "58%", left: "18%", size: 2, delay: "0.8s", duration: "12s", opacity: 0.2 },
  { top: "68%", left: "62%", size: 3, delay: "1.8s", duration: "9.5s", opacity: 0.18 },
  { top: "76%", left: "84%", size: 2, delay: "2.8s", duration: "13s", opacity: 0.22 },
  { top: "8%", left: "72%", size: 2, delay: "1s", duration: "8.5s", opacity: 0.22 },
  { top: "48%", left: "34%", size: 1.5, delay: "3s", duration: "14s", opacity: 0.24 },
];

const orbitIcons = [
  { icon: Code2, label: "React" },
  { icon: Server, label: "Node" },
  { icon: TerminalSquare, label: "Python" },
  { icon: Braces, label: "JS" },
  { icon: Smartphone, label: "Flutter" },
  { icon: Layers3, label: "Three.js" },
];

function CloudIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17.5 19H7.2a4.7 4.7 0 1 1 1.1-9.3A6 6 0 0 1 21 12.3c0 3-2.4 6.7-3.5 6.7Z" />
    </svg>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/60">
        <Dot className="h-4 w-4 text-white" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 md:text-base">{description}</p>
    </div>
  );
}

function Pill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur ${className}`}
    >
      {children}
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`will-change-transform ${className}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Page() {
  const [payload, setPayload] = useState<PortfolioPayload | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const response = await fetch(API_URL, { cache: "no-store" });
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as PortfolioPayload;
        if (alive) {
          setPayload(data);
        }
      } catch {
        // Keep the page usable if the API is offline.
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const site = payload?.site;
    const title = site?.site_name || site?.hero_title || "Anes | Full Stack Developer";
    document.title = title;

    const iconUrl = site?.favicon_url;
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (iconUrl) {
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = iconUrl;
    }
  }, [payload]);

  const site = payload?.site;
  const socialLinks = payload?.social_links ?? [];
  const metrics = payload?.metrics ?? [];
  const skillCategories = payload?.skill_categories ?? [];
  const projects = payload?.projects ?? [];
  const experiences = payload?.experiences ?? [];
  const activeCategory = skillCategories[activeTab] ?? null;
  const showHeroVisual = Boolean(site?.profile_image_url);

  useEffect(() => {
    if (activeTab >= skillCategories.length) {
      setActiveTab(0);
    }
  }, [activeTab, skillCategories.length]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <motion.div className="fixed left-0 top-0 z-50 h-1 origin-left bg-white" style={{ width }} />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg text-white shadow-glow">
              {site?.logo_text?.slice(0, 1) || "A"}
            </span>
            {(site?.logo_text || site?.site_name || "ANES").toUpperCase()}
          </a>

          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-sm text-white/70 md:flex">
            {["Home", "About", "Projects", "Experience"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>

          {site?.hero_primary_cta_label && site?.hero_primary_cta_url ? (
            <a
              href={site?.hero_primary_cta_url || "#"}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-4 py-2 text-sm text-black transition hover:border-white/30 hover:bg-white/90 hover:text-black"
            >
              {site?.hero_primary_cta_label}
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </header>

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <section
          id="home"
          className={`relative grid items-center gap-12 overflow-hidden rounded-[36px] border border-white/5 bg-white/[0.01] px-6 py-10 pb-24 pt-8 lg:gap-16 lg:px-10 ${showHeroVisual ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-1"}`}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-white/12 blur-3xl animate-glowPulse" />
            <div className="absolute right-[12%] top-[10%] h-56 w-56 rounded-full bg-white/8 blur-3xl animate-glowPulse [animation-delay:1.5s]" />
            <div className="absolute bottom-[-14%] left-[18%] h-64 w-64 rounded-full bg-white/6 blur-3xl animate-glowPulse [animation-delay:3s]" />
          </div>

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {heroParticles.map((particle, index) => (
              <span
                key={index}
                className="absolute rounded-full bg-white/70 blur-[0.5px] animate-heroFloat"
                style={{
                  top: particle.top,
                  left: particle.left,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: particle.opacity,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                }}
              />
            ))}
          </div>

          <Reveal>
            <div className="relative space-y-8">
          {site?.hero_badge || site?.hero_greeting ? (
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-white/72 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.45)]" />
                  {site?.hero_badge || site?.hero_greeting}
                </div>
              ) : null}

              <div className="relative space-y-6">
                <div className="absolute -left-6 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl animate-glowPulse" />
                {site?.hero_greeting ? <p className="text-base font-medium tracking-[0.26em] text-white/45 uppercase">{site?.hero_greeting}</p> : null}
                {site?.hero_title ? (
                  <h1 className="max-w-2xl text-[clamp(3.5rem,8vw,6.8rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white">
                    {site?.hero_title}
                  </h1>
                ) : null}
                {site?.hero_subtitle ? (
                  <p className="max-w-xl text-base leading-8 text-white/60 sm:text-lg">{site?.hero_subtitle}</p>
                ) : null}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                {site?.hero_primary_cta_label && site?.hero_primary_cta_url ? (
                  <a
                    href={site?.hero_primary_cta_url || "#"}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-black shadow-[0_16px_40px_rgba(255,255,255,0.16)] transition hover:scale-[1.02] hover:bg-white/90"
                  >
                    {site?.hero_primary_cta_label}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : null}
                {site?.hero_secondary_cta_label && site?.hero_secondary_cta_url ? (
                  <a
                    href={site?.hero_secondary_cta_url || "#"}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-semibold text-white transition hover:scale-[1.02] hover:border-white/30 hover:bg-white/10"
                  >
                    {site?.hero_secondary_cta_label}
                  </a>
                ) : null}
              </div>

              <div className="grid max-w-xl gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">Next.js + React</div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">Clean UI systems</div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">Fast, polished delivery</div>
              </div>

                {socialLinks.length ? (
                <div className="flex flex-wrap items-center gap-3">
                  {socialLinks.map((item) => {
                    if (!item.url) {
                      return null;
                    }
                    const Icon = item.icon ? socialIconMap[item.icon] : null;
                    return (
                      <a
                        key={item.label}
                        href={item.url}
                        aria-label={item.label}
                        className="group inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 hover:text-white"
                      >
                        {Icon ? <Icon className="h-5 w-5 transition group-hover:scale-110" /> : <span className="h-2 w-2 rounded-full bg-white" />}
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </Reveal>

          {showHeroVisual ? (
            <Reveal delay={0.1}>
              <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-white/[0.05] blur-2xl animate-glowPulse" />
                <div className="absolute h-[380px] w-[380px] rounded-full border border-white/10 bg-white/5 animate-slowSpin" />
                <div className="absolute h-[320px] w-[320px] rounded-full border border-white/15 opacity-60 animate-pulse" />
                <div className="relative flex h-[300px] w-[300px] items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]/90 p-4 shadow-glass sm:h-[360px] sm:w-[360px]">
                  <div className="absolute inset-4 rounded-full bg-white/[0.06] blur-2xl" />
                  {site?.profile_image_url ? (
                    <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10">
                      <Image
                        src={site?.profile_image_url}
                        alt={site?.profile_image_alt || "Profile"}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  ) : null}
                </div>

                {orbitIcons.map((item, index) => {
                  const Icon = item.icon;
                  const positions = [
                    "left-[4%] top-[18%]",
                    "left-[14%] bottom-[12%]",
                    "right-[8%] top-[16%]",
                    "right-[2%] bottom-[20%]",
                    "top-0 left-1/2 -translate-x-1/2",
                    "bottom-0 left-1/2 -translate-x-1/2",
                  ];
                  return (
                    <div
                      key={item.label}
                      className={`absolute ${positions[index]} flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/85 shadow-glass backdrop-blur-md animate-float`}
                      style={{ animationDelay: `${index * 0.4}s` }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  );
                })}

                  {site?.profile_caption ? (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 backdrop-blur-md">
                    {site?.profile_caption}
                  </div>
                ) : null}
              </div>
            </Reveal>
          ) : null}
        </section>

        {metrics.length ? (
          <Reveal>
            <section className="grid gap-4 pb-24 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((item) => {
                return (
                  <div key={item.label} className="glass-panel glass-hover rounded-[22px] p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-3xl font-semibold tracking-tight text-white">{item.value}</p>
                        <p className="mt-2 text-sm text-white/60">{item.label}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/80">
                        {item.icon && metricIconMap[item.icon] ? (
                          createElement(metricIconMap[item.icon], { className: "h-5 w-5" })
                        ) : (
                          <LayoutGrid className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          </Reveal>
        ) : null}

        <section id="about" className="grid gap-8 pb-24 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="glass-panel rounded-[28px] p-8 md:p-10">
              <SectionTitle
                eyebrow="About"
                title={site?.about_title || "About"}
                description={site?.about_description || ""}
              />

              <div className="mt-8 grid gap-4 text-sm text-white/70">
                {site?.location ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <MapPin className="h-4 w-4 text-white/80" />
                    {site?.location}
                  </div>
                ) : null}
                {site?.email ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <Mail className="h-4 w-4 text-white/80" />
                    {site?.email}
                  </div>
                ) : null}
                {site?.experience ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <UserRound className="h-4 w-4 text-white/80" />
                    {site?.experience}
                  </div>
                ) : null}
              </div>

              {site?.about_link_label && site?.about_link_url ? (
                <a
                  href={site?.about_link_url || "#"}
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                >
                  {site?.about_link_label}
                  <ChevronRight className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </Reveal>

          {skillCategories.length ? (
            <Reveal delay={0.08}>
              <div className="glass-panel rounded-[28px] p-6 md:p-8">
                <div className="flex flex-wrap gap-2">
                  {skillCategories.map((tab, index) => (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(index)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        activeTab === index
                          ? "bg-white text-[#0b0f17]"
                          : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <AnimatePresence mode="wait">
                    {activeCategory ? (
                      <motion.div
                        key={activeCategory.name}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.25 }}
                        className="sm:col-span-2"
                      >
                        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.04] p-5">
                          <div className="mb-4 flex items-center justify-between">
                            <div>
                              <p className="text-sm uppercase tracking-[0.28em] text-white/40">Tech stack</p>
                              <h3 className="mt-2 text-xl font-semibold text-white">{activeCategory.name}</h3>
                            </div>
                            <BadgeCheck className="h-6 w-6 text-white/80" />
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {activeCategory.skills.map((item) => {
                              const Icon = item.icon ? techIconMap[item.icon] : null;
                              return (
                                <Pill key={item.name}>
                                  {Icon ? <Icon className="h-3.5 w-3.5 text-white/80" /> : null}
                                  {item.name}
                                </Pill>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </Reveal>
          ) : null}
        </section>

        {projects.length ? (
          <section id="projects" className="pb-24">
            <Reveal>
              <SectionTitle
                eyebrow="Projects"
                title="Selected work with product-grade visuals and motion."
                description="The cards below are built to feel like premium SaaS marketing tiles, with hover lift, glow borders, and responsive layouts that compress cleanly on mobile."
              />
            </Reveal>

            <div className="scrollbar-hidden mt-10 flex gap-5 overflow-x-auto pb-3 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal key={project.title} delay={index * 0.03} className="min-w-[84%] md:min-w-0">
                  <article className="group glass-panel glass-hover h-full overflow-hidden rounded-[28px]">
                    <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${project.accent || "from-white/[0.12] to-white/[0.04]"}`}>
                      {project.image_url ? (
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          fill
                          className="object-cover opacity-75 transition duration-500 group-hover:scale-105 group-hover:opacity-95"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-transparent" />
                    </div>

                    <div className="space-y-5 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                          {project.description ? <p className="mt-3 text-sm leading-7 text-white/60">{project.description}</p> : null}
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/80">
                          <Cpu className="h-5 w-5" />
                        </div>
                      </div>

                      {project.tech_stack.length ? (
                        <div className="flex flex-wrap gap-2">
                          {project.tech_stack.map((tech) => (
                            <Pill key={tech}>{tech}</Pill>
                          ))}
                        </div>
                      ) : null}

                      <div className="flex gap-3">
                        {project.live_url ? (
                          <a
                            href={project.live_url}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#0b0f17] transition hover:scale-[1.02]"
                          >
                            Live Demo
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ) : null}
                        {project.github_url ? (
                          <a
                            href={project.github_url}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                          >
                            GitHub
                            <FaGithub className="h-4 w-4" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        {experiences.length ? (
          <section id="experience" className="pb-24">
            <Reveal>
              <SectionTitle
                eyebrow="Experience"
                title="A focused path through product, freelance, and agency work."
                description="The timeline stays vertical on desktop and collapses cleanly on mobile, while reveal animations keep the flow feeling smooth without over-animating every detail."
              />
            </Reveal>

            <div className="relative mt-12 pl-2 md:pl-10">
              <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-white/40 via-white/10 to-transparent md:left-[2.1rem]" />
              <div className="space-y-6">
                {experiences.map((item, index) => (
                  <Reveal key={item.role} delay={index * 0.07}>
                    <div className="relative pl-8 md:pl-16">
                      <div className="absolute left-0 top-3 h-4 w-4 rounded-full border border-white/40 bg-[#0b0b0b] shadow-[0_0_20px_rgba(255,255,255,0.2)] md:left-[1.55rem]" />
                      <div className="glass-panel glass-hover rounded-[24px] p-6">
                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                          <div>
                            <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                            {item.company ? <p className="mt-1 text-sm text-white/70">{item.company}</p> : null}
                          </div>
                          {item.period ? <Pill className="text-white/70">{item.period}</Pill> : null}
                        </div>
                        {item.description ? <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60">{item.description}</p> : null}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </div>

      <footer className="border-t border-white/10 bg-black/20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_auto_auto] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg font-semibold text-white">
                {(site?.logo_text || site?.site_name || "A").slice(0, 1)}
              </span>
              <div>
                <p className="text-lg font-semibold text-white">{site?.site_name || site?.logo_text || "Anes"}</p>
                <p className="text-sm text-white/50">Full Stack Developer</p>
              </div>
            </div>
            {site?.footer_description ? <p className="mt-4 max-w-md text-sm leading-7 text-white/50">{site?.footer_description}</p> : null}
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/40">Quick Links</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              {["Home", "About", "Projects", "Experience"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/40">Social</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              {socialLinks
                .filter((item) => item.url)
                .map((item) => {
                  const Icon = item.icon ? socialIconMap[item.icon] : null;
                  return (
                    <a key={item.label} href={item.url || "#"} className="inline-flex items-center gap-2 transition hover:text-white">
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                      {item.label}
                    </a>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-5 text-center text-xs uppercase tracking-[0.25em] text-white/40">
          © 2026 {site?.site_name || "Anes"}. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
