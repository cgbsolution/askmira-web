import type { Metadata } from "next";

import { DemoSection } from "@/components/sections/DemoSection";
import { AudienceCards } from "@/components/sections/home/AudienceCards";
import { FeatureMosaic } from "@/components/sections/home/FeatureMosaic";
import { Hero } from "@/components/sections/home/Hero";
import { IntegrationsCloud } from "@/components/sections/home/IntegrationsCloud";
import { MiraSection } from "@/components/sections/home/MiraSection";
import { PayrollBand } from "@/components/sections/home/PayrollBand";
import { PlatformTabs } from "@/components/sections/home/PlatformTabs";
import { ResourcesFaq } from "@/components/sections/home/ResourcesFaq";
import { SecurityGrid } from "@/components/sections/home/SecurityGrid";
import { Showcase } from "@/components/sections/home/Showcase";
import { TrustStrip } from "@/components/sections/home/TrustStrip";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  alternates: { canonical: "/" },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: siteConfig.url,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <PlatformTabs />
      <Showcase />
      <FeatureMosaic />
      <MiraSection />
      <PayrollBand />
      <AudienceCards />
      <IntegrationsCloud />
      <SecurityGrid />
      <ResourcesFaq />
      <DemoSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
    </>
  );
}
