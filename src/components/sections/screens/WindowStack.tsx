import { AppWindow } from "@/components/product/AppWindow";
import { APPS, screens, type Screen } from "@/lib/content/screens";
import { cn } from "@/lib/utils";

/** Real windows of the connected apps, stacked around AskMira, for a dark hero. */
export function WindowStack({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto max-w-6xl pb-6 lg:pb-24", className)}>
      <AppWindow screen={screens.amHome} priority className="relative z-10 shadow-frame lg:mx-auto lg:w-[80%]" sizes="(min-width: 1280px) 960px, 100vw" />
      <Floating screen={screens.athPipeline} className="top-[42%] left-0 z-20 [animation-delay:-2s]" />
      <Floating screen={screens.egDash} className="top-[2%] right-0 z-20" />
      <Floating screen={screens.hdTickets} className="top-[58%] right-[3%] z-20 [animation-delay:-4s]" />
      <ul className="mt-5 flex flex-wrap justify-center gap-2 lg:hidden" aria-label="Apps shown">
        {[screens.amHome, screens.athPipeline, screens.egDash, screens.hdTickets].map((s) => (
          <li key={s.id} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
            {APPS[s.app].name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Floating({ screen, className }: { screen: Screen; className?: string }) {
  return (
    <div className={cn("animate-float absolute hidden w-[30%] lg:block", className)}>
      <AppWindow screen={screen} chrome="slim" sizes="380px" className="shadow-frame" />
      <span className="absolute -top-3 left-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-ink-900 shadow-card">
        {APPS[screen.app].name}
      </span>
    </div>
  );
}
