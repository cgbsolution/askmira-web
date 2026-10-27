import type { Metadata } from "next";

import { siteConfig } from "./site";

/** Title, description, canonical URL and Open Graph for one page. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: path,
      title: `${title} · AskMira`,
      description,
    },
    twitter: { card: "summary_large_image", title: `${title} · AskMira`, description },
  };
}
