import { featureScreens } from "@/lib/content/screens";
import type { MockupKey } from "@/lib/content/types";

import { AppWindow, Phone } from "./AppWindow";

import { AnalyticsMock } from "./lazy";
import { DashboardMock } from "./mock-dashboard";
import { BankFileMock, ExpenseMock, PayrollMock, PayslipMock, StatutoryMock } from "./mock-pay";
import { AccessMock, AuditMock, DirectoryMock, ImportMock, ProfileMock } from "./mock-people";
import { DocumentMock, MiraChatMock, MobileMock, WorkflowMock } from "./mock-platform";
import {
  EngagementMock,
  GoalsMock,
  OnboardingMock,
  PerformanceMock,
  PipelineMock,
  SurveyMock,
} from "./mock-talent";
import { AttendanceMock, DevicesMock, LeaveMock } from "./mock-time";

const MOCKUPS: Record<MockupKey, React.ComponentType<{ className?: string }>> = {
  dashboard: DashboardMock,
  directory: DirectoryMock,
  profile: ProfileMock,
  import: ImportMock,
  attendance: AttendanceMock,
  devices: DevicesMock,
  leave: LeaveMock,
  payroll: PayrollMock,
  statutory: StatutoryMock,
  payslip: PayslipMock,
  bankfile: BankFileMock,
  pipeline: PipelineMock,
  onboarding: OnboardingMock,
  analytics: AnalyticsMock,
  performance: PerformanceMock,
  goals: GoalsMock,
  expense: ExpenseMock,
  document: DocumentMock,
  workflow: WorkflowMock,
  engagement: EngagementMock,
  survey: SurveyMock,
  access: AccessMock,
  audit: AuditMock,
  mira: MiraChatMock,
  mobile: MobileMock,
};

/** Panels (cards) look best narrower than full frames; callers use this to size them. */
const DRAWN_PANELS = new Set<MockupKey>([
  "import",
  "devices",
  "leave",
  "statutory",
  "payslip",
  "bankfile",
  "onboarding",
  "goals",
  "expense",
  "survey",
  "audit",
  "mira",
  "mobile",
]);

/** Drawn panels that have no real screenshot yet. A real screenshot is always shown full width. */
export const PANEL_MOCKUPS = new Set<MockupKey>([...DRAWN_PANELS].filter((k) => !featureScreens[k]));

/**
 * The product picture for a feature: the real screen in a window when we have
 * one (almost always), otherwise the drawn preview.
 */
export function ProductMockup({ name, className }: { name: MockupKey; className?: string }) {
  const real = featureScreens[name];
  if (real?.device === "phone") return <Phone screen={real.screen} className={className} />;
  if (real) {
    return (
      <AppWindow
        screen={real.screen}
        crop={real.crop}
        className={className}
        sizes="(min-width: 1280px) 720px, (min-width: 1024px) 50vw, 100vw"
      />
    );
  }
  const Mockup = MOCKUPS[name];
  return <Mockup className={className} />;
}
