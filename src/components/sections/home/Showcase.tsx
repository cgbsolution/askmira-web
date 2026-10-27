import {
  CalendarDays,
  ChartColumn,
  IndianRupee,
  LayoutDashboard,
  UserPlus,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { AnalyticsMock } from "@/components/product/lazy";
import { DashboardMock } from "@/components/product/mock-dashboard";
import { PayrollMock, PayslipMock } from "@/components/product/mock-pay";
import { DirectoryMock } from "@/components/product/mock-people";
import { PipelineMock } from "@/components/product/mock-talent";
import { AttendanceMock, LeaveMock } from "@/components/product/mock-time";
import { MockPanel, Person, Status } from "@/components/product/primitives";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SectionHeading } from "../primitives";

function ProfileCard() {
  return (
    <MockPanel label="Preview of an employee's profile card, with sample data" className="w-64">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Person name="Meera Nair" size="lg" />
          <div>
            <p className="text-sm font-semibold">Meera Nair</p>
            <p className="text-[11px] text-ink-500">Product Designer · Design</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          <Status tone="success">Active</Status>
          <Status tone="muted">Bengaluru HQ</Status>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
          <div>
            <p className="text-ink-400">Reports to</p>
            <p className="font-medium">Rahul Iyer</p>
          </div>
          <div>
            <p className="text-ink-400">Joined</p>
            <p className="font-medium">12 Jun 2023</p>
          </div>
        </div>
      </div>
    </MockPanel>
  );
}

const TOUR: {
  value: string;
  icon: LucideIcon;
  title: string;
  body: string;
  render: () => React.ReactNode;
}[] = [
  {
    value: "dashboard",
    icon: LayoutDashboard,
    title: "HR admin home",
    body: "Headcount, approvals, today's punch and payroll status the moment you sign in.",
    render: () => <DashboardMock />,
  },
  {
    value: "people",
    icon: UsersRound,
    title: "Directory and profiles",
    body: "Search everyone, filter by team or place, and open a complete profile.",
    render: () => (
      <div className="relative">
        <DirectoryMock />
        <div className="absolute -right-6 -bottom-8 hidden xl:block">
          <ProfileCard />
        </div>
      </div>
    ),
  },
  {
    value: "attendance",
    icon: CalendarDays,
    title: "Attendance and leave",
    body: "A month at a glance, today's geofenced punch, and leave approvals with the team's week.",
    render: () => (
      <div className="relative">
        <AttendanceMock />
        <div className="absolute -right-6 -bottom-10 hidden w-80 xl:block">
          <LeaveMock />
        </div>
      </div>
    ),
  },
  {
    value: "payroll",
    icon: IndianRupee,
    title: "Payroll run",
    body: "Step by step from locked attendance to approval, with statutory totals and exceptions.",
    render: () => (
      <div className="relative">
        <PayrollMock />
        <div className="absolute -right-6 -bottom-10 hidden w-72 xl:block">
          <PayslipMock />
        </div>
      </div>
    ),
  },
  {
    value: "hiring",
    icon: UserPlus,
    title: "Recruitment pipeline",
    body: "Every candidate by stage, with sources, interview slots and offers.",
    render: () => <PipelineMock />,
  },
  {
    value: "analytics",
    icon: ChartColumn,
    title: "Analytics",
    body: "Headcount, movement, attrition and cost — from the records payroll uses.",
    render: () => <AnalyticsMock />,
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
          lead="Real AskMira screens, rebuilt here with sample data. Pick one to look closer."
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
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 text-marigold-300 group-data-[state=active]:bg-brand-500 group-data-[state=active]:text-white">
                  <Icon className="size-4" aria-hidden />
                </span>
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
