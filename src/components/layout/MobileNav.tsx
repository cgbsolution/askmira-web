"use client";

import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { signInUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

import { AskMiraLogo } from "./Logo";
import type { MenuItem, SiteMenus } from "./nav-types";

/** The menu below the `lg` breakpoint: a full-height drawer with one section open at a time. */
export function MobileNav({ menus, onDark, pathname }: { menus: SiteMenus; onDark: boolean; pathname: string }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => setOpen(false), [pathname]);

  const sections: { value: string; label: string; groups: { title?: string; items: MenuItem[] }[] }[] = [
    {
      value: "product",
      label: "Product",
      groups: [
        { title: "AskMira", items: menus.product },
        { title: "Connected apps", items: menus.apps },
      ],
    },
    { value: "features", label: "Features", groups: menus.features },
    { value: "solutions", label: "Solutions", groups: menus.solutions },
    { value: "resources", label: "Resources", groups: [{ items: menus.resources }] },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("lg:hidden", onDark && "text-white hover:bg-white/10 hover:text-white")}
          aria-label="Open menu"
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full gap-0 bg-cream-50 p-0 sm:max-w-md">
        <div className="flex h-16 shrink-0 items-center border-b border-cream-200 px-5">
          <AskMiraLogo className="h-8" />
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-2">
          <Accordion type="single" collapsible>
            {sections.map((section) => (
              <AccordionItem key={section.value} value={section.value}>
                <AccordionTrigger className="py-4 text-lg">{section.label}</AccordionTrigger>
                <AccordionContent className="pr-0 pb-4">
                  {section.groups.map((group, i) => (
                    <div key={group.title ?? i} className={cn(i > 0 && "mt-3")}>
                      {group.title && (
                        <p className="mb-1 text-[0.6875rem] font-semibold tracking-[0.08em] text-ink-400 uppercase">
                          {group.title}
                        </p>
                      )}
                      <ul className="grid gap-0.5">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <SheetClose asChild>
                              <Link
                                href={item.href}
                                aria-current={pathname === item.href ? "page" : undefined}
                                className="flex min-h-11 items-center gap-3 rounded-xl px-2 py-2 text-[0.9375rem] font-medium text-ink-800 outline-none hover:bg-cream-100 focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-[current=page]:bg-blush-50 aria-[current=page]:text-brand-800"
                              >
                                {item.icon && (
                                  <span className="shrink-0 [&>span]:size-9 [&>span]:rounded-lg [&>span]:p-1">{item.icon}</span>
                                )}
                                {item.title}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <SheetClose asChild>
            <Link
              href="/pricing"
              className="flex min-h-14 items-center text-lg font-semibold text-ink-900 outline-none hover:text-brand-700 focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              Pricing
            </Link>
          </SheetClose>
        </nav>
        <div className="grid shrink-0 gap-2 border-t border-cream-200 bg-white p-5">
          <SheetClose asChild>
            <Button asChild size="lg">
              <Link href="/demo">
                Book a demo <ArrowRight />
              </Link>
            </Button>
          </SheetClose>
          <Button asChild size="lg" variant="outline">
            <a href={signInUrl}>Sign in</a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
