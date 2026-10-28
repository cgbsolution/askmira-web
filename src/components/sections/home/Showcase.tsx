import { SpotCalendarClock, SpotChart, SpotDashboard, SpotPayslip, SpotRecruit, SpotTeam, SpotTile, type SpotIcon } from "@/components/illustrations/spots";
import { AppWindow } from "@/components/product/AppWindow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { screens, type Screen } from "@/lib/content/screens";

import { SectionHeading } from "../primitives";

/** A real screen, with an optional second window overlapping its corner. */
function Shot({ main, inset }: { main: Screen; inset?: Screen }) {
  return (
    <div className="relative xl:pb-10">
      <AppWindow screen={main} className="shadow-frame" sizes="(min-width: 1280px) 820px, 100vw" />
      {inset && (
        <AppWindow
          screen={inset}
          chrome="slim"
          className="absolute -right-6 -bottom-2 hidden w-[42%] shadow-frame xl:block"
          sizes="360px"
        />
      )}
    </div>
  );
}

const TOUR: {
  value: string;
  icon: SpotIcon;
  title: string;
  body: string;
  render: () => React.ReactNode;
}[] = [
  {
    value: "dashboard",
    icon: SpotDashboard,
    title: "HR admin home",
    body: "Headcount, approvals, today's punch and payroll status the moment you sign in.",
    render: () => <Shot main={screens.amHome} inset={screens.amApprovals} />,
  },
  {
    value: "people",
    icon: SpotTeam,
    title: "Directory and profiles",
    body: "Search everyone, filter by team or place, and open a complete profile.",
    render: () => <Shot main={screens.amDirectory} inset={screens.amProfile} />,
  },
  {
    value: "attendance",
    icon: SpotCalendarClock,
    title: "Attendance and leave",
    body: "A month at a glance, today's geofenced punch, and leave approvals with the team's week.",
    render: () => <Shot main={screens.amAttendance} inset={screens.amLeave} />,
  },
  {
    value: "payroll",
    icon: SpotPayslip,
    title: "Payroll run",
    body: "Step by step from locked attendance to approval, with statutory totals and exceptions.",
    render: () => <Shot main={screens.amPayrun} inset={screens.amPayslip} />,
  },
  {
    value: "hiring",
    icon: SpotRecruit,
    title: "Recruitment pipeline",
    body: "Every candidate by stage, with sources, interview slots and offers.",
    render: () => <Shot main={screens.amCandidates} />,
  },
  {
    value: "analytics",
    icon: SpotChart,
    title: "Analytics",
    body: "Headcount, movement, attrition and cost — from the records payroll uses.",
    render: () => <Shot main={screens.amReports} inset={screens.amHiringAnalytics} />,
  },
];

export function Showcase() {
  return (
    <section aria-labelledby="showcase-heading" className="section-y relative overflow-hidden bg-ink-950 text-white">
      <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[30rem] w-[40rem] rounded-full bg-brand-700/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 h-[28rem] w-[36rem] rounded-full bg-marigold-600/15 blur-3xl" />
      <div className="container-site relative">
        <SectionHeading
          id="showcase-heading"
          tone="dark"
          eyebrow="Product tour"
          title="See the screens your team will use every day"
          lead="The real AskMira screens, from a demo workspace with sample data."
        />

        <Tabs defaultValue="dashboard" orientation="vertical" className="mt-12 gap-8 sm:mt-16 lg:flex-row lg:gap-12">
          <TabsList
            aria-label="Product screens"
            className="mask-fade-x -mx-4 flex h-auto w-[calc(100%+2rem)] shrink-0 justify-start gap-2 overflow-x-auto bg-transparent p-1 px-4 [scrollbar-width:none] sm:mx-0 sm:w-full sm:px-1 lg:w-80 lg:flex-col lg:items-stretch lg:overflow-visible lg:[mask-image:none]"
          >
            {TOUR.map(({ value, icon: Icon, title, body }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="group h-auto min-w-max flex-none items-start justify-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left whitespace-normal text-white/80 hover:bg-white/[0.08] hover:text-white data-[state=active]:border-white/20 data-[state=active]:bg-white data-[state=active]:text-ink-950 data-[state=active]:shadow-float lg:min-w-0 lg:py-4"
              >
                <SpotTile icon={Icon} size="sm" tone="cream" />
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] font-semibold">{title}</span>
                  <span className="mt-1 hidden text-[0.8125rem] leading-snug font-normal text-white/60 group-data-[state=active]:text-ink-500 lg:block">
                    {body}
                  </span>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="min-w-0 flex-1">
            {TOUR.map((t) => (
              <TabsContent
                key={t.value}
                value={t.value}
                className="duration-500 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-[0.99]"
              >
                <p className="mb-4 text-[0.9375rem] text-white/70 lg:hidden">{t.body}</p>
                {t.render()}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
