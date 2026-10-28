"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { SpotCalendarClock, SpotMira, SpotPayslip, SpotTile } from "@/components/illustrations/spots";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { DARK_HERO_ROUTES, signInUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

import { LogoLink } from "./Logo";
import { MobileNav } from "./MobileNav";
import type { MenuGroup, MenuItem, SiteMenus } from "./nav-types";

/**
 * The site header.
 *
 * Over a dark hero it starts transparent with light text. Once the page
 * scrolls — or a menu opens — it becomes a floating white bar, the way the
 * reference does it. Menus are Radix Navigation Menu: hover or click to open,
 * arrow keys between triggers, Escape to close, focus returned to the trigger.
 */
export function HeaderBar({ menus }: { menus: SiteMenus }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState("");

  React.useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 12));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // A route change closes any open menu.
  React.useEffect(() => setOpenMenu(""), [pathname]);

  const floating = scrolled || openMenu !== "";
  const onDark = DARK_HERO_ROUTES.has(pathname) && !floating;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto max-w-[82rem] transition-[padding] duration-300",
          floating ? "px-2 pt-2 sm:px-3 sm:pt-3" : "px-0 pt-0 sm:px-1 sm:pt-1",
        )}
      >
        <div
          className={cn(
            "relative flex h-16 items-center gap-3 rounded-2xl border px-4 transition-[background-color,box-shadow,border-color] duration-300 sm:px-5 lg:h-[4.5rem] lg:gap-6",
            floating
              ? "border-cream-200/80 bg-white/95 shadow-card backdrop-blur-md supports-[backdrop-filter]:bg-white/85"
              : "border-transparent bg-transparent",
          )}
        >
          <LogoLink priority />

          <NavigationMenu
            value={openMenu}
            onValueChange={setOpenMenu}
            aria-label="Main"
            className="hidden lg:flex"
            delayDuration={80}
          >
            <NavigationMenuList>
              <MenuTrigger value="product" label="Product" onDark={onDark}>
                <ProductPanel items={menus.product} apps={menus.apps} pathname={pathname} />
              </MenuTrigger>
              <MenuTrigger value="features" label="Features" onDark={onDark}>
                <FeaturesPanel groups={menus.features} pathname={pathname} />
              </MenuTrigger>
              <MenuTrigger value="solutions" label="Solutions" onDark={onDark}>
                <SolutionsPanel groups={menus.solutions} pathname={pathname} />
              </MenuTrigger>
              <MenuTrigger value="resources" label="Resources" onDark={onDark}>
                <ResourcesPanel items={menus.resources} pathname={pathname} />
              </MenuTrigger>
              <NavigationMenuItem>
                <NavigationMenuLink asChild active={pathname === "/pricing"}>
                  <Link href="/pricing" className={cn(navigationMenuTriggerStyle(), triggerTone(onDark))}>
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className={cn("hidden lg:inline-flex", onDark && "text-white hover:bg-white/10 hover:text-white")}
            >
              <a href={signInUrl}>Sign in</a>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/demo">
                Book a demo
                <ArrowRight />
              </Link>
            </Button>
            <MobileNav menus={menus} onDark={onDark} pathname={pathname} />
          </div>
        </div>
      </div>
    </header>
  );
}

function triggerTone(onDark: boolean) {
  return onDark
    ? "text-white/90 hover:bg-white/10 hover:text-white focus-visible:bg-white/10 data-[state=open]:bg-white/10 data-[active]:text-white"
    : "text-ink-800 hover:bg-cream-100 hover:text-ink-950 focus-visible:bg-cream-100 data-[state=open]:bg-cream-100 data-[state=open]:text-ink-950 data-[active]:text-brand-700";
}

function MenuTrigger({
  value,
  label,
  onDark,
  children,
}: {
  value: string;
  label: string;
  onDark: boolean;
  children: React.ReactNode;
}) {
  return (
    <NavigationMenuItem value={value}>
      <NavigationMenuTrigger className={triggerTone(onDark)}>{label}</NavigationMenuTrigger>
      <NavigationMenuContent>{children}</NavigationMenuContent>
    </NavigationMenuItem>
  );
}

/** One link in a mega menu: icon chip, title, one-line description. */
function MenuLink({ item, pathname, compact = false }: { item: MenuItem; pathname: string; compact?: boolean }) {
  return (
    <NavigationMenuLink asChild active={pathname === item.href}>
      <Link
        href={item.href}
        className="group/link flex gap-3 rounded-2xl p-3 text-sm hover:bg-cream-100 focus-visible:bg-cream-100 data-[active]:bg-blush-50"
      >
        {item.icon && (
          <span className="shrink-0 transition-transform duration-200 group-hover/link:-rotate-6 group-focus-visible/link:-rotate-6 motion-reduce:transition-none">
            {item.icon}
          </span>
        )}
        <span className="min-w-0">
          <span className="block text-[0.9375rem] font-semibold text-ink-900">{item.title}</span>
          {item.description && !compact && (
            <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-500">{item.description}</span>
          )}
        </span>
      </Link>
    </NavigationMenuLink>
  );
}

function GroupTitle({ children }: { children: React.ReactNode }) {
  return <p className="px-3 pb-1 text-[0.6875rem] font-semibold tracking-[0.08em] text-ink-400 uppercase">{children}</p>;
}

function PromoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-deep relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 text-white">
      <div aria-hidden className="bg-glow pointer-events-none absolute inset-0 opacity-80" />
      <div className="relative">
        <div aria-hidden className="flex items-end">
          <SpotTile icon={SpotCalendarClock} size="md" tone="cream" className="-rotate-6" />
          <SpotTile icon={SpotMira} size="md" tone="marigold" className="-ml-2 mb-2 rotate-3" />
          <SpotTile icon={SpotPayslip} size="md" className="-ml-2 rotate-[8deg]" />
        </div>
        <p className="mt-4 font-display text-xl leading-tight font-semibold">{title}</p>
        <p className="mt-2 text-sm text-white/75">{body}</p>
      </div>
      <NavigationMenuLink asChild>
        <Link
          href="/demo"
          className="relative mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-cream-100"
        >
          Book a demo <ArrowRight className="size-4" aria-hidden />
        </Link>
      </NavigationMenuLink>
    </div>
  );
}

function ProductPanel({ items, apps, pathname }: { items: MenuItem[]; apps: MenuItem[]; pathname: string }) {
  return (
    <div className="grid w-[min(64rem,calc(100vw-3rem))] grid-cols-[1fr_1fr_15rem] gap-3 p-3">
      <div className="pt-2">
        <GroupTitle>AskMira HRMS</GroupTitle>
        <ul className="grid gap-0.5">
          {items.map((item) => (
            <li key={item.href}>
              <MenuLink item={item} pathname={pathname} />
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-2">
        <GroupTitle>Connected apps</GroupTitle>
        <ul className="grid gap-0.5">
          {apps.map((item) => (
            <li key={item.href}>
              <MenuLink item={item} pathname={pathname} />
            </li>
          ))}
        </ul>
      </div>
      <PromoCard title="See it with your own data" body="A 30-minute walkthrough of AskMira, shaped around how your company runs HR." />
    </div>
  );
}

function FeaturesPanel({ groups, pathname }: { groups: MenuGroup[]; pathname: string }) {
  return (
    <div className="w-[min(70rem,calc(100vw-3rem))] p-3">
      <div className="grid grid-cols-4 gap-2">
        {groups.map((group) => (
          <div key={group.title} className="pt-2">
            <GroupTitle>{group.title}</GroupTitle>
            <ul className="grid gap-0.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <MenuLink item={item} pathname={pathname} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl bg-cream-50 px-4 py-3 text-sm">
        <span className="text-ink-600">Every module runs on one employee record.</span>
        <NavigationMenuLink asChild>
          <Link href="/platform" className="inline-flex items-center gap-1 rounded-md font-semibold text-brand-700 hover:underline">
            Platform overview <ArrowRight className="size-4" aria-hidden />
          </Link>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <Link href="/integrations" className="inline-flex items-center gap-1 rounded-md font-semibold text-brand-700 hover:underline">
            Integrations <ArrowRight className="size-4" aria-hidden />
          </Link>
        </NavigationMenuLink>
      </div>
    </div>
  );
}

function SolutionsPanel({ groups, pathname }: { groups: MenuGroup[]; pathname: string }) {
  return (
    <div className="grid w-[min(52rem,calc(100vw-3rem))] grid-cols-[1fr_1fr_15rem] gap-3 p-3">
      {groups.map((group) => (
        <div key={group.title} className="pt-2">
          <GroupTitle>{group.title}</GroupTitle>
          <ul className="grid gap-0.5">
            {group.items.map((item) => (
              <li key={item.href}>
                <MenuLink item={item} pathname={pathname} />
              </li>
            ))}
          </ul>
        </div>
      ))}
      <PromoCard title="Not sure where to start?" body="Tell us how you run HR today and we will show you the parts of AskMira that matter to you." />
    </div>
  );
}

function ResourcesPanel({ items, pathname }: { items: MenuItem[]; pathname: string }) {
  return (
    <div className="w-[min(40rem,calc(100vw-3rem))] p-3">
      <ul className="grid grid-cols-2 gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <MenuLink item={item} pathname={pathname} />
          </li>
        ))}
      </ul>
      <NavigationMenuLink asChild>
        <Link
          href="/resources/guides/payroll-month-end-checklist-india"
          className="mt-2 flex flex-col gap-1 rounded-2xl bg-marigold-50 p-4 hover:bg-marigold-100"
        >
          <span className="text-[0.6875rem] font-semibold tracking-[0.08em] text-marigold-800 uppercase">Popular guide</span>
          <span className="font-display text-lg leading-snug font-semibold text-ink-900">
            The payroll month-end checklist for Indian HR teams
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
            Read the guide <ArrowRight className="size-4" aria-hidden />
          </span>
        </Link>
      </NavigationMenuLink>
    </div>
  );
}
