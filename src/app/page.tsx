import type { Metadata } from "next";

import PortfolioClient from "@/components/portfolio-client";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_URL,
  fetchPortfolio,
} from "@/lib/portfolio";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const payload = await fetchPortfolio();
  const site = payload?.site;
  const title = site?.site_name || site?.hero_title || DEFAULT_TITLE;
  const description = site?.about_description || site?.hero_subtitle || DEFAULT_DESCRIPTION;
  const canonical = SITE_URL;
  const image = site?.profile_image_url || site?.favicon_url || `${SITE_URL}/opengraph-image`;

  return {
    title,
    description,
    keywords: [
      "anespy",
      "anespy.xyz",
      "Anes",
      "Portfolio",
      "Full Stack Developer",
      "Next.js Developer",
      "React Developer",
      "TypeScript Developer",
      "Django Developer",
      "Frontend Engineer",
    ],
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "anespy.xyz",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Page() {
  const payload = await fetchPortfolio();
  return <PortfolioClient initialPayload={payload} />;
}
