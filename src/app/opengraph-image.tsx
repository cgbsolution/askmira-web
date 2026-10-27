import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

export const alt = "AskMira — HR, payroll and culture for Indian companies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The social card: the logo on the deep brand red, lit by the two logo colours. */
export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "src/assets/brand/askmira-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(60% 70% at 15% 110%, rgba(235,6,29,0.65), transparent 70%), radial-gradient(55% 70% at 90% 110%, rgba(248,160,26,0.6), transparent 70%), linear-gradient(180deg, #5c0a11, #34040a)",
          color: "white",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={300} height={101} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5, maxWidth: 960 }}>
            From punch-in to payslip, HR that runs on one record
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.75)" }}>
            Attendance · Leave · Indian statutory payroll · People analytics
          </div>
        </div>
      </div>
    ),
    size,
  );
}
