import { featureGroups, productLinks, resourceLinks, solutionGroups, type NavLink } from "@/lib/content/nav";

import { HeaderBar } from "./HeaderBar";
import type { MenuItem, SiteMenus } from "./nav-types";

function toItem(link: NavLink): MenuItem {
  const Icon = link.icon;
  return {
    title: link.title,
    href: link.href,
    description: link.description,
    icon: Icon ? <Icon className="size-[1.125rem]" aria-hidden /> : undefined,
  };
}

/**
 * Builds the menus on the server — the feature and solution content stays out
 * of the browser bundle — and hands them to the interactive bar.
 */
export function SiteHeader() {
  const menus: SiteMenus = {
    product: productLinks.map(toItem),
    features: featureGroups.map((g) => ({ title: g.title, items: g.links.map(toItem) })),
    solutions: solutionGroups.map((g) => ({ title: g.title, items: g.links.map(toItem) })),
    resources: resourceLinks.map(toItem),
  };
  return <HeaderBar menus={menus} />;
}
