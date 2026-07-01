from django.contrib import admin

from .models import Experience, Metric, Project, SiteSettings, Skill, SkillCategory, SocialLink


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("site_name", "logo_text", "email")


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ("label", "url", "icon", "order", "enabled")
    list_editable = ("order", "enabled")
    search_fields = ("label", "url")


@admin.register(Metric)
class MetricAdmin(admin.ModelAdmin):
    list_display = ("label", "value", "icon", "order", "enabled")
    list_editable = ("order", "enabled")


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "order", "enabled")
    list_editable = ("order", "enabled")
    inlines = [SkillInline]


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "icon", "order", "enabled")
    list_editable = ("order", "enabled")
    search_fields = ("name", "category__name")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "enabled")
    list_editable = ("order", "enabled")
    search_fields = ("title", "description")


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("role", "company", "period", "order", "enabled")
    list_editable = ("order", "enabled")
    search_fields = ("role", "company")
