import type * as React from "react";

/** A menu link with its icon already rendered, so menus can be built on the server. */
export type MenuItem = {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
};

export type MenuGroup = { title: string; items: MenuItem[] };

export type SiteMenus = {
  product: MenuItem[];
  apps: MenuItem[];
  features: MenuGroup[];
  solutions: MenuGroup[];
  resources: MenuItem[];
};
