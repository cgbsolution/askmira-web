import {
  Blocks,
  BookOpen,
  LayoutDashboard,
  Megaphone,
  MessageCircleQuestion,
  Newspaper,
  Plug,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { features, FEATURE_GROUPS } from "./features";
import { solutions } from "./solutions";

export type NavLink = { title: string; href: string; description?: string; icon?: LucideIcon };

/** Product: the platform-level pages. */
export const productLinks: NavLink[] = [
  { title: "Platform overview", href: "/platform", description: "How the modules fit together on one record.", icon: LayoutDashboard },
  { title: "Ask Mira AI", href: "/ai", description: "An HR companion that answers and acts — with guardrails.", icon: Sparkles },
  { title: "Integrations", href: "/integrations", description: "Devices, banks, identity, AI assistants and an API.", icon: Plug },
  { title: "Security & privacy", href: "/security", description: "Isolation, audit, sign-in controls and DPDP.", icon: ShieldCheck },
  { title: "What's new", href: "/resources/product-updates", description: "Recent product updates.", icon: Megaphone },
];

/** Features: the twelve module pages, grouped as in the mega menu. */
export const featureGroups = FEATURE_GROUPS.map((group) => ({
  title: group,
  links: features
    .filter((f) => f.group === group)
    .map((f) => ({ title: f.name, href: `/features/${f.slug}`, description: f.short, icon: f.icon })),
}));

export const solutionGroups = (["By role", "By size"] as const).map((group) => ({
  title: group,
  links: solutions
    .filter((s) => s.menuGroup === group)
    .map((s) => ({ title: s.label, href: `/solutions/${s.slug}`, description: s.short, icon: s.icon })),
}));

export const resourceLinks: NavLink[] = [
  { title: "Guides", href: "/resources", description: "Practical how-tos for payroll, attendance and setup.", icon: BookOpen },
  { title: "Product updates", href: "/resources/product-updates", description: "What we have shipped recently.", icon: Newspaper },
  { title: "FAQ", href: "/resources/faq", description: "Setup, payroll, security and AI questions.", icon: MessageCircleQuestion },
  { title: "Customer stories", href: "/customers", description: "How teams run HR on AskMira.", icon: Blocks },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { title: "Platform overview", href: "/platform" },
      { title: "Ask Mira AI", href: "/ai" },
      { title: "Integrations", href: "/integrations" },
      { title: "Security & privacy", href: "/security" },
      { title: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Features",
    links: features.slice(0, 7).map((f) => ({ title: f.name, href: `/features/${f.slug}` })),
  },
  {
    title: "More features",
    links: features.slice(7).map((f) => ({ title: f.name, href: `/features/${f.slug}` })),
  },
  {
    title: "Solutions",
    links: solutions.map((s) => ({ title: s.label, href: `/solutions/${s.slug}` })),
  },
  {
    title: "Resources & company",
    links: [
      { title: "Guides", href: "/resources" },
      { title: "Product updates", href: "/resources/product-updates" },
      { title: "FAQ", href: "/resources/faq" },
      { title: "Customer stories", href: "/customers" },
      { title: "About", href: "/about" },
      { title: "Contact", href: "/contact" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { title: "Privacy policy", href: "/privacy" },
  { title: "Terms of service", href: "/terms" },
  { title: "Security", href: "/security" },
];
