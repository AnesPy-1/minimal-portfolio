from __future__ import annotations

from urllib.error import URLError
from urllib.request import Request, urlopen

from django.core.files.base import ContentFile
from django.db import migrations, models
from django.utils.text import slugify


def _extension_from_content_type(content_type: str | None, fallback: str = ".jpg") -> str:
    mapping = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp",
        "image/gif": ".gif",
        "image/svg+xml": ".svg",
    }
    return mapping.get((content_type or "").split(";", 1)[0].lower(), fallback)


def _download_remote_image(url: str, label: str) -> tuple[str, bytes]:
    request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(request, timeout=20) as response:
        content = response.read()
        content_type = response.headers.get_content_type()
    extension = _extension_from_content_type(content_type)
    filename = f"{slugify(label) or 'image'}{extension}"
    return filename, content


def _fallback_svg(label: str) -> tuple[str, bytes]:
    safe_label = (label or "Image").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    svg = f"""
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#111111" />
          <stop offset="100%" stop-color="#2b2b2b" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#g)" />
      <circle cx="960" cy="180" r="180" fill="rgba(255,255,255,0.08)" />
      <circle cx="260" cy="680" r="220" fill="rgba(255,255,255,0.05)" />
      <text x="80" y="760" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700">{safe_label}</text>
      <text x="80" y="830" fill="#cfcfcf" font-family="Arial, Helvetica, sans-serif" font-size="28">anespy.xyz</text>
    </svg>
    """.strip()
    return f"{slugify(label) or 'image'}.svg", svg.encode("utf-8")


def _store_remote_image(instance, field_name: str, label: str) -> None:
    field_file = getattr(instance, field_name)
    source = getattr(field_file, "name", None)

    if not source or not str(source).startswith(("http://", "https://")):
        return

    try:
        filename, content = _download_remote_image(str(source), label)
    except (URLError, TimeoutError, OSError, ValueError):
        filename, content = _fallback_svg(label)

    field_file.save(filename, ContentFile(content), save=False)
    instance.save(update_fields=[field_name])


def convert_images_to_files(apps, schema_editor):
    SiteSettings = apps.get_model("portfolio_api", "SiteSettings")
    Project = apps.get_model("portfolio_api", "Project")

    site = SiteSettings.objects.first()
    if site:
        _store_remote_image(site, "favicon_url", "favicon")
        _store_remote_image(site, "profile_image_url", site.site_name or "profile")

    for project in Project.objects.all():
        _store_remote_image(project, "image_url", project.title)


def reverse_noop(apps, schema_editor):
    return None


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio_api", "0002_seed_content"),
    ]

    operations = [
        migrations.AlterField(
            model_name="sitesettings",
            name="favicon_url",
            field=models.ImageField(blank=True, null=True, upload_to="site/"),
        ),
        migrations.AlterField(
            model_name="sitesettings",
            name="profile_image_url",
            field=models.ImageField(blank=True, null=True, upload_to="site/"),
        ),
        migrations.AlterField(
            model_name="project",
            name="image_url",
            field=models.ImageField(blank=True, null=True, upload_to="projects/"),
        ),
        migrations.RunPython(convert_images_to_files, reverse_noop),
    ]
