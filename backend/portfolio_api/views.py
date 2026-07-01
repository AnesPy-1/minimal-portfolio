from django.http import JsonResponse
from django.views.decorators.http import require_GET

from .models import Experience, Metric, Project, SiteSettings, SkillCategory, SocialLink


def _clean(value):
    return value if value not in ("", [], {}, None) else None


def _file_url(file_field, request):
    if not file_field:
        return None

    try:
        url = file_field.url
    except ValueError:
        return None

    if not url:
        return None

    return request.build_absolute_uri(url)


def _social_icon_map(icon_key: str | None) -> str | None:
    if not icon_key:
        return None
    return icon_key.strip() or None


@require_GET
def site_payload(request):
    settings = SiteSettings.objects.first()

    if settings:
        site = {
            "site_name": _clean(settings.site_name),
            "logo_text": _clean(settings.logo_text),
            "favicon_url": _file_url(settings.favicon_url, request),
            "hero_badge": _clean(settings.hero_badge),
            "hero_greeting": _clean(settings.hero_greeting),
            "hero_title": _clean(settings.hero_title),
            "hero_subtitle": _clean(settings.hero_subtitle),
            "hero_primary_cta_label": _clean(settings.hero_primary_cta_label),
            "hero_primary_cta_url": _clean(settings.hero_primary_cta_url),
            "hero_secondary_cta_label": _clean(settings.hero_secondary_cta_label),
            "hero_secondary_cta_url": _clean(settings.hero_secondary_cta_url),
            "profile_image_url": _file_url(settings.profile_image_url, request),
            "profile_image_alt": _clean(settings.profile_image_alt),
            "profile_caption": _clean(settings.profile_caption),
            "about_title": _clean(settings.about_title),
            "about_description": _clean(settings.about_description),
            "about_link_label": _clean(settings.about_link_label),
            "about_link_url": _clean(settings.about_link_url),
            "location": _clean(settings.location),
            "email": _clean(settings.email),
            "experience": _clean(settings.experience),
            "footer_description": _clean(settings.footer_description),
        }
    else:
        site = {}

    payload = {
        "site": site,
        "social_links": [
            {
                "label": link.label,
                "url": _clean(link.url),
                "icon": _social_icon_map(link.icon),
            }
            for link in SocialLink.objects.filter(enabled=True)
        ],
        "metrics": [
            {
                "label": metric.label,
                "value": metric.value,
                "icon": _social_icon_map(metric.icon),
            }
            for metric in Metric.objects.filter(enabled=True)
        ],
        "skill_categories": [
            {
                "name": category.name,
                "skills": [
                    {
                        "name": skill.name,
                        "icon": _social_icon_map(skill.icon),
                    }
                    for skill in category.skills.filter(enabled=True)
                ],
            }
            for category in SkillCategory.objects.filter(enabled=True)
        ],
        "projects": [
            {
                "title": project.title,
                "description": _clean(project.description),
                "image_url": _file_url(project.image_url, request),
                "live_url": _clean(project.live_url),
                "github_url": _clean(project.github_url),
                "tech_stack": [item for item in project.tech_stack if item],
                "accent": _clean(project.accent),
            }
            for project in Project.objects.filter(enabled=True)
        ],
        "experiences": [
            {
                "role": exp.role,
                "company": _clean(exp.company),
                "period": _clean(exp.period),
                "description": _clean(exp.description),
            }
            for exp in Experience.objects.filter(enabled=True)
        ],
    }
    return JsonResponse(payload)
