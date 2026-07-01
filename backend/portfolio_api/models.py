from django.db import models


class SiteSettings(models.Model):
    site_name = models.CharField(max_length=120, blank=True, null=True)
    logo_text = models.CharField(max_length=80, blank=True, null=True)
    favicon_url = models.ImageField(upload_to="site/", blank=True, null=True)

    hero_badge = models.CharField(max_length=120, blank=True, null=True)
    hero_greeting = models.CharField(max_length=120, blank=True, null=True)
    hero_title = models.CharField(max_length=160, blank=True, null=True)
    hero_subtitle = models.TextField(blank=True, null=True)

    hero_primary_cta_label = models.CharField(max_length=80, blank=True, null=True)
    hero_primary_cta_url = models.CharField(max_length=255, blank=True, null=True)
    hero_secondary_cta_label = models.CharField(max_length=80, blank=True, null=True)
    hero_secondary_cta_url = models.CharField(max_length=255, blank=True, null=True)

    profile_image_url = models.ImageField(upload_to="site/", blank=True, null=True)
    profile_image_alt = models.CharField(max_length=160, blank=True, null=True)
    profile_caption = models.CharField(max_length=160, blank=True, null=True)

    about_title = models.CharField(max_length=160, blank=True, null=True)
    about_description = models.TextField(blank=True, null=True)
    about_link_label = models.CharField(max_length=80, blank=True, null=True)
    about_link_url = models.CharField(max_length=255, blank=True, null=True)

    location = models.CharField(max_length=120, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    experience = models.CharField(max_length=120, blank=True, null=True)

    footer_description = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def __str__(self) -> str:
        return self.site_name or "Site Settings"


class SocialLink(models.Model):
    label = models.CharField(max_length=80)
    url = models.CharField(max_length=255, blank=True, null=True)
    icon = models.CharField(max_length=40, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    enabled = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return self.label


class Metric(models.Model):
    label = models.CharField(max_length=80)
    value = models.CharField(max_length=40)
    icon = models.CharField(max_length=40, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    enabled = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return f"{self.label}: {self.value}"


class SkillCategory(models.Model):
    name = models.CharField(max_length=80)
    order = models.PositiveIntegerField(default=0)
    enabled = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return self.name


class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, related_name="skills", on_delete=models.CASCADE)
    name = models.CharField(max_length=80)
    icon = models.CharField(max_length=40, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    enabled = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(blank=True, null=True)
    image_url = models.ImageField(upload_to="projects/", blank=True, null=True)
    live_url = models.CharField(max_length=255, blank=True, null=True)
    github_url = models.CharField(max_length=255, blank=True, null=True)
    tech_stack = models.JSONField(default=list, blank=True)
    accent = models.CharField(max_length=120, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    enabled = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return self.title


class Experience(models.Model):
    role = models.CharField(max_length=120)
    company = models.CharField(max_length=120, blank=True, null=True)
    period = models.CharField(max_length=80, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    enabled = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return self.role
