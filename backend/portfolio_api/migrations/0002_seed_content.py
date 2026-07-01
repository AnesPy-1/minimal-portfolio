from django.db import migrations


def seed_content(apps, schema_editor):
    SiteSettings = apps.get_model("portfolio_api", "SiteSettings")
    SocialLink = apps.get_model("portfolio_api", "SocialLink")
    Metric = apps.get_model("portfolio_api", "Metric")
    SkillCategory = apps.get_model("portfolio_api", "SkillCategory")
    Skill = apps.get_model("portfolio_api", "Skill")
    Project = apps.get_model("portfolio_api", "Project")
    Experience = apps.get_model("portfolio_api", "Experience")

    settings, _ = SiteSettings.objects.get_or_create(
        id=1,
        defaults={
            "site_name": "Anes",
            "logo_text": "Anes",
            "favicon_url": "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=128&q=80",
            "hero_badge": "Full Stack Developer",
            "hero_greeting": "Hi, I’m Anes",
            "hero_title": "Full Stack Developer",
            "hero_subtitle": "I design and build modern web applications with sharp interfaces, fast interactions, and production-grade engineering.",
            "hero_primary_cta_label": "Let’s Build Something",
            "hero_primary_cta_url": "#contact",
            "hero_secondary_cta_label": "View Projects",
            "hero_secondary_cta_url": "#projects",
            "profile_image_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
            "profile_image_alt": "Anes profile portrait",
            "profile_caption": "Code • Motion • Mobile • UI Systems",
            "about_title": "I turn product ideas into sharp, modern interfaces.",
            "about_description": "My work focuses on performance, clarity, and interaction design. I like compact systems, clean architecture, and visual details that make digital products feel premium.",
            "about_link_label": "More About Me",
            "about_link_url": "#experience",
            "location": "Tehran, Iran",
            "email": "hello@anes.dev",
            "experience": "3+ years of shipping production software",
            "footer_description": "Minimal black and white portfolio crafted for clarity, speed, and premium product presentation.",
        },
    )

    social_rows = [
        ("GitHub", "https://github.com", "github", 1),
        ("Telegram", "https://t.me", "telegram", 2),
        ("Instagram", "https://instagram.com", "instagram", 3),
        ("LinkedIn", "https://linkedin.com", "linkedin", 4),
        ("Twitter", "https://twitter.com", "twitter", 5),
    ]
    SocialLink.objects.filter().delete()
    for label, url, icon, order in social_rows:
        SocialLink.objects.create(label=label, url=url, icon=icon, order=order, enabled=True)

    metric_rows = [
        ("Projects", "50+", "projects", 1),
        ("Years Experience", "3+", "experience", 2),
        ("Happy Clients", "30+", "clients", 3),
        ("Commits", "10K+", "commits", 4),
    ]
    Metric.objects.filter().delete()
    for label, value, icon, order in metric_rows:
        Metric.objects.create(label=label, value=value, icon=icon, order=order, enabled=True)

    SkillCategory.objects.all().delete()
    frontend = SkillCategory.objects.create(name="Frontend", order=1, enabled=True)
    backend = SkillCategory.objects.create(name="Backend", order=2, enabled=True)
    database = SkillCategory.objects.create(name="Database", order=3, enabled=True)
    mobile = SkillCategory.objects.create(name="Mobile", order=4, enabled=True)
    tools = SkillCategory.objects.create(name="Tools", order=5, enabled=True)

    skill_rows = [
        (frontend, "React.js", "react", 1),
        (frontend, "Next.js", "next", 2),
        (frontend, "Tailwind", "tailwind", 3),
        (frontend, "TypeScript", "typescript", 4),
        (frontend, "Framer Motion", "motion", 5),
        (frontend, "Three.js", "three", 6),
        (backend, "Node.js", "node", 1),
        (backend, "Express", "express", 2),
        (backend, "Python", "python", 3),
        (backend, "Django", "django", 4),
        (backend, "PHP", "php", 5),
        (backend, "Laravel", "laravel", 6),
        (database, "MongoDB", "mongodb", 1),
        (database, "PostgreSQL", "postgresql", 2),
        (database, "MySQL", "mysql", 3),
        (database, "Redis", "redis", 4),
        (mobile, "Flutter", "flutter", 1),
        (mobile, "Dart", "dart", 2),
        (mobile, "React Native", "react-native", 3),
        (tools, "Git", "git", 1),
        (tools, "Docker", "docker", 2),
        (tools, "AWS", "aws", 3),
        (tools, "CI/CD", "cicd", 4),
    ]
    Skill.objects.all().delete()
    for category, name, icon, order in skill_rows:
        Skill.objects.create(category=category, name=name, icon=icon, order=order, enabled=True)

    Project.objects.all().delete()
    project_rows = [
        (
            "E-commerce Platform",
            "High-conversion storefront with product search, cart flows, and a fast checkout experience.",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
            "https://example.com/ecommerce",
            "https://github.com",
            ["Next.js", "Stripe", "Tailwind", "PostgreSQL"],
            "from-white/[0.12] to-white/[0.04]",
            1,
        ),
        (
            "AI Chat App",
            "Conversational workspace with threaded prompts, smart suggestions, and realtime responses.",
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
            "https://example.com/ai-chat",
            "https://github.com",
            ["React", "OpenAI", "Node.js", "Redis"],
            "from-white/[0.12] to-white/[0.04]",
            2,
        ),
        (
            "Task Manager SaaS",
            "Team productivity dashboard with priorities, analytics, and seamless collaboration.",
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
            "https://example.com/task-manager",
            "https://github.com",
            ["Next.js", "Framer Motion", "MongoDB", "Docker"],
            "from-white/[0.12] to-white/[0.04]",
            3,
        ),
        (
            "Mobile Banking App",
            "Secure finance product interface for transfers, analytics, biometric auth, and cards.",
            "https://images.unsplash.com/photo-1556742205-9f3d0f4f6b12?auto=format&fit=crop&w=1200&q=80",
            "https://example.com/banking",
            "https://github.com",
            ["Flutter", "Dart", "Firebase", "Supabase"],
            "from-white/[0.12] to-white/[0.04]",
            4,
        ),
        (
            "TensorPix Register",
            "Dynamic registration entry point powered by a backend-driven link and premium motion treatment.",
            "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
            "https://app.tensorpix.ai/register",
            "https://github.com",
            ["Next.js", "UI", "Backend", "Integration"],
            "from-white/[0.12] to-white/[0.04]",
            5,
        ),
    ]
    for title, description, image_url, live_url, github_url, tech_stack, accent, order in project_rows:
        Project.objects.create(
            title=title,
            description=description,
            image_url=image_url,
            live_url=live_url,
            github_url=github_url,
            tech_stack=tech_stack,
            accent=accent,
            order=order,
            enabled=True,
        )

    Experience.objects.all().delete()
    experience_rows = [
        ("Senior Full Stack Developer", "Studio Nova", "2024 - Present", "Leading product engineering, design-to-code execution, and performance-focused architecture for client launches.", 1),
        ("Freelance Developer", "Independent", "2022 - 2024", "Delivered landing pages, dashboards, booking systems, and custom platforms for startups and small businesses.", 2),
        ("Junior Developer", "Agency Lab", "2021 - 2022", "Built UI components, maintained internal tools, and learned production-grade workflows across modern stacks.", 3),
    ]
    for role, company, period, description, order in experience_rows:
        Experience.objects.create(role=role, company=company, period=period, description=description, order=order, enabled=True)


def unseed_content(apps, schema_editor):
    Experience = apps.get_model("portfolio_api", "Experience")
    Metric = apps.get_model("portfolio_api", "Metric")
    Project = apps.get_model("portfolio_api", "Project")
    SiteSettings = apps.get_model("portfolio_api", "SiteSettings")
    Skill = apps.get_model("portfolio_api", "Skill")
    SkillCategory = apps.get_model("portfolio_api", "SkillCategory")
    SocialLink = apps.get_model("portfolio_api", "SocialLink")

    Experience.objects.all().delete()
    Metric.objects.all().delete()
    Project.objects.all().delete()
    Skill.objects.all().delete()
    SkillCategory.objects.all().delete()
    SocialLink.objects.all().delete()
    SiteSettings.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio_api", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_content, unseed_content),
    ]
