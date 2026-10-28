import type { MetadataRoute } from "next";

import { features } from "@/lib/content/features";
import { guides } from "@/lib/content/resources";
import { solutions } from "@/lib/content/solutions";
import { siteConfig } from "@/lib/site";

const STATIC = [
  "/",
  "/platform",
  "/connected-platform",
  "/ai",
  "/integrations",
  "/security",
  "/pricing",
  "/customers",
  "/resources",
  "/resources/product-updates",
  "/resources/faq",
  "/about",
  "/demo",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority,
  });
  return [
    ...STATIC.map((p) => entry(p, p === "/" ? 1 : p === "/demo" ? 0.9 : 0.7)),
    ...features.map((f) => entry(`/features/${f.slug}`, 0.8)),
    ...solutions.map((s) => entry(`/solutions/${s.slug}`, 0.8)),
    ...guides.map((g) => entry(`/resources/guides/${g.slug}`, 0.6)),
  ];
}
