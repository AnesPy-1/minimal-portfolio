# AnesPy Minimal Portfolio

A clean, motion-driven portfolio for **anespy.xyz**.

This repository powers a minimal full-stack portfolio with a Next.js front end and a Django backend that serves all portfolio content through a single API.

## Highlights

- Built for `anespy.xyz`
- Elegant dark visual language with responsive motion
- Backend-driven content for easy updates
- Image fields now support file uploads through Django admin
- Portfolio sections for hero, about, skills, projects, experience, metrics, and social links

## Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- Backend: Django, SQLite, django-cors-headers
- Media handling: Django `ImageField` uploads served from `/media/`

## Local Setup

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 8000
```

## Media Uploads

The backend image fields are file-based now:

- `SiteSettings.favicon_url`
- `SiteSettings.profile_image_url`
- `Project.image_url`

Upload new images in the Django admin, then the API will return absolute media URLs for the frontend.

## API

- `GET /api/site/`

## Notes

- The frontend is configured to load backend media from `localhost:8000` during development.
- The seeded content is centered around the `anespy.xyz` brand and presentation.
