import type { MockupKey } from "@/lib/content/types";

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
export const PANEL_MOCKUPS = new Set<MockupKey>([
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

export function ProductMockup({ name, className }: { name: MockupKey; className?: string }) {
  const Mockup = MOCKUPS[name];
  return <Mockup className={className} />;
}
