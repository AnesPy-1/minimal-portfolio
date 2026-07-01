import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AnesPy",
    short_name: "AnesPy",
    description: "A minimal, motion-driven portfolio for anespy.xyz.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "en",
    id: SITE_URL,
    icons: [
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
