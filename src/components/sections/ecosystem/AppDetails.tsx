import { Check, Link2 } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { AppWindow } from "@/components/product/AppWindow";
import { platformApps } from "@/lib/content/ecosystem";
import { appScreens } from "@/lib/content/screens";

import { IconChip } from "../primitives";
import { ConnectionBadge } from "./ConnectionBadge";

const DETAILED = platformApps.filter((a) => a.key !== "hrms" && a.key !== "mira");

/** Each connected app: what it does, and how it joins the HRMS today. Anchored for the menus. */
export function AppDetails() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[14rem_1fr] lg:gap-14">
      <nav aria-label="Apps on this page" className="hidden lg:block">
        <ul className="sticky top-28 grid gap-1 border-l border-cream-300">
          {DETAILED.map((app) => (
            <li key={app.key}>
              <a
                href={`#${app.key}`}
                className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm font-medium text-ink-600 outline-none hover:border-brand-500 hover:text-ink-950 focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {app.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="grid min-w-0 grid-cols-1 gap-6">
        {DETAILED.map((app) => {
          const Icon = app.icon;
          return (
            <Reveal key={app.key}>
              <article id={app.key} className="scroll-mt-28 rounded-[2rem] border border-cream-200 bg-white p-6 sm:p-9">
                <div className="flex flex-wrap items-start gap-4">
                  <IconChip icon={Icon} accent={app.accent} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold tracking-[0.08em] text-ink-400 uppercase">{app.kind}</p>
                    <h3 className="font-display text-display-4 font-semibold text-ink-950">{app.name}</h3>
                  </div>
                  <ConnectionBadge status={app.connection.status} />
                </div>
                <p className="mt-4 text-[0.9375rem] text-ink-700 sm:text-base">{app.summary}</p>
                {app.key in appScreens && (
                  <AppWindow
                    screen={appScreens[app.key as keyof typeof appScreens]}
                    className="mt-6"
                    sizes="(min-width: 1280px) 820px, 100vw"
                  />
                )}
                <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_1fr]">
                  <ul className="grid content-start gap-2.5">
                    {app.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-700">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-2xl bg-cream-50 p-5">
                    <p className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                      <Link2 className="size-4 text-ink-500" aria-hidden /> With AskMira HRMS
                    </p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{app.connection.detail}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
