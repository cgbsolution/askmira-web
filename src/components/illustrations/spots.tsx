import type * as React from "react";

import { cn } from "@/lib/utils";

/*
 * AskMira spot illustrations.
 *
 * Small flat pictures, one per idea, drawn on a 48×48 grid in four brand tones:
 *
 *   --spot-d  wine (AskMira Red, darkest)   the main mass
 *   --spot-r  AskMira Red                   one accent per picture
 *   --spot-p  soft pink                     the second layer
 *   --spot-m  marigold                      a small highlight, used sparingly
 *   --spot-w  cream                         details cut into dark shapes
 *
 * Where one shape sits on another it gets a "cut" — a thin outline in the
 * colour behind the picture (--spot-bg) — so layers read like printed paper,
 * not like a gradient. The tones are set in globals.css (`.spot`), so the same
 * drawing works on a blush tile, a dark card, or greyed out for "planned".
 */

export type SpotIcon = (props: { className?: string }) => React.JSX.Element;

const D = "var(--spot-d)";
const R = "var(--spot-r)";
const P = "var(--spot-p)";
const M = "var(--spot-m)";
const W = "var(--spot-w)";
const B = "var(--spot-bg)";

/** Outline in the background colour, painted under the fill. */
const cut = { stroke: B, strokeWidth: 3, paintOrder: "stroke", strokeLinejoin: "round" } as const;

/** A drawn line in one of the tones. */
function ln(color: string, width = 3) {
  return { stroke: color, strokeWidth: width, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" } as const;
}

function Svg({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("spot", className)} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

/** A four-point sparkle centred on (x, y). */
function sparkle(x: number, y: number, r: number) {
  return `M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`;
}

/** Short cream text lines, the shorthand for "words on a page". */
function Lines({ x, y, widths, gap = 5, color = W, h = 2.5 }: { x: number; y: number; widths: number[]; gap?: number; color?: string; h?: number }) {
  return (
    <>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w} height={h} rx={h / 2} fill={color} />
      ))}
    </>
  );
}

/** The rupee sign, drawn as strokes, centred near (x, y) for a coin of radius ~8. */
function Rupee({ x, y, s = 1, color = W }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M-3.4-4.4h6.8M-3.4-1.6h6.8M-2-4.4a2.9 2.9 0 0 1 0 5.8h-1.4l5.2 4.4"
      {...ln(color, 1.8 / s)}
    />
  );
}

function Check({ d, color = W, width = 3 }: { d: string; color?: string; width?: number }) {
  return <path d={d} {...ln(color, width)} />;
}

/* ------------------------------------------------------------------ people */

export const SpotIdCard: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="11" y="6" width="30" height="32" rx="4" fill={P} transform="rotate(8 26 22)" />
    <rect x="6" y="12" width="31" height="30" rx="4" fill={D} {...cut} />
    <rect x="17.5" y="8.5" width="8" height="6" rx="2" fill={R} {...cut} />
    <circle cx="15.5" cy="23.5" r="4" fill={R} />
    <path d="M9 36.5a6.5 6.5 0 0 1 13 0V37H9z" fill={P} />
    <Lines x={25} y={21} widths={[8, 6, 8]} />
  </Svg>
);

export const SpotRecruit: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="4" y="7" width="19" height="25" rx="3" fill={P} transform="rotate(-7 13 19)" />
    <Lines x={8} y={13} widths={[9, 6]} color={D} gap={5} h={2.2} />
    <circle cx="27" cy="17" r="6.5" fill={D} {...cut} />
    <path d="M15 42c0-7.2 5.4-12.5 12-12.5S39 34.8 39 42z" fill={D} {...cut} />
    <circle cx="37.5" cy="34.5" r="7" fill={R} {...cut} />
    <path d="M37.5 31.3v6.4M34.3 34.5h6.4" {...ln(W, 2.2)} />
  </Svg>
);

export const SpotTeam: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="17" r="5" fill={P} />
    <path d="M3 35c0-5.8 4-9.8 9-9.8s9 4 9 9.8z" fill={P} />
    <circle cx="36" cy="17" r="5" fill={R} />
    <path d="M27 35c0-5.8 4-9.8 9-9.8s9 4 9 9.8z" fill={R} />
    <circle cx="24" cy="20" r="6.5" fill={D} {...cut} />
    <path d="M11 42.5c0-7.6 5.8-13 13-13s13 5.4 13 13z" fill={D} {...cut} />
  </Svg>
);

export const SpotPerson: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="27" y="6" width="17" height="12" rx="4" fill={P} />
    <rect x="31" y="10.8" width="9" height="2.4" rx="1.2" fill={D} />
    <circle cx="22" cy="15" r="7" fill={D} {...cut} />
    <path d="M7 43c0-8.8 6.7-15 15-15s15 6.2 15 15z" fill={D} {...cut} />
    <path d="M17.5 29.5l4.5 6 4.5-6" {...ln(P, 2)} />
    <rect x="18" y="34" width="8" height="7.5" rx="1.6" fill={R} {...cut} />
    <rect x="20" y="36.5" width="4" height="1.6" rx=".8" fill={W} />
  </Svg>
);

export const SpotOrg: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M24 18v5M12 30v-3a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v3" {...ln(D, 2.5)} />
    <rect x="16" y="4" width="16" height="14" rx="4" fill={D} />
    <circle cx="24" cy="9.3" r="2.6" fill={W} />
    <path d="M19.4 16a4.6 4.6 0 0 1 9.2 0z" fill={W} />
    <rect x="4" y="30" width="16" height="14" rx="4" fill={P} />
    <circle cx="12" cy="35.3" r="2.6" fill={D} />
    <path d="M7.4 42a4.6 4.6 0 0 1 9.2 0z" fill={D} />
    <rect x="28" y="30" width="16" height="14" rx="4" fill={R} />
    <circle cx="36" cy="35.3" r="2.6" fill={W} />
    <path d="M31.4 42a4.6 4.6 0 0 1 9.2 0z" fill={W} />
  </Svg>
);

/* -------------------------------------------------------------- time & pay */

function CalendarBase({ badge }: { badge?: React.ReactNode }) {
  return (
    <>
      <rect x="5" y="9" width="31" height="30" rx="4" fill={D} />
      <path d="M5 13a4 4 0 0 1 4-4h23a4 4 0 0 1 4 4v4H5z" fill={R} />
      <rect x="11" y="5.5" width="3.2" height="7" rx="1.6" fill={D} {...cut} />
      <rect x="26.8" y="5.5" width="3.2" height="7" rx="1.6" fill={D} {...cut} />
      {[10, 17, 24].map((x) =>
        [22, 29].map((y) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="4.6" height="4.6" rx="1" fill={x === 17 && y === 22 ? M : P} />
        )),
      )}
      {badge}
    </>
  );
}

export const SpotCalendar: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <CalendarBase />
  </Svg>
);

export const SpotCalendarClock: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <CalendarBase
      badge={
        <>
          <circle cx="35.5" cy="35.5" r="8.5" fill={M} {...cut} />
          <path d="M35.5 30.8v4.7l3.2 2" {...ln(D, 2.2)} />
        </>
      }
    />
  </Svg>
);

export const SpotCalendarLock: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <CalendarBase
      badge={
        <>
          <path d="M32 33v-3a4 4 0 0 1 8 0v3" {...ln(B, 6.5)} />
          <path d="M32 33v-3a4 4 0 0 1 8 0v3" {...ln(D, 2.6)} />
          <rect x="28.5" y="32" width="15" height="12" rx="3" fill={M} {...cut} />
          <circle cx="36" cy="37.2" r="1.7" fill={D} />
          <rect x="35.2" y="37.5" width="1.6" height="3.4" rx=".8" fill={D} />
        </>
      }
    />
  </Svg>
);

export const SpotPayslip: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="14" y="4" width="24" height="32" rx="3" fill={P} transform="rotate(8 26 20)" />
    <rect x="7" y="9" width="24" height="33" rx="3" fill={D} {...cut} />
    <Lines x={11} y={15} widths={[12, 16, 9]} />
    <circle cx="33" cy="34" r="8.5" fill={R} {...cut} />
    <Rupee x={33.4} y={34} />
  </Svg>
);

export const SpotRupee: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="29" cy="28" r="14" fill={P} />
    <circle cx="21" cy="21" r="14" fill={R} {...cut} />
    <Rupee x={21.6} y={21} s={1.55} />
    <path d={sparkle(40, 9, 4.5)} fill={M} />
  </Svg>
);

export const SpotCash: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="9" y="9" width="35" height="21" rx="3" fill={P} transform="rotate(-8 26 20)" />
    <rect x="4" y="17" width="36" height="21" rx="3" fill={D} {...cut} />
    <circle cx="22" cy="27.5" r="5.5" fill={R} />
    <circle cx="9.5" cy="22.5" r="1.6" fill={W} />
    <circle cx="34.5" cy="32.5" r="1.6" fill={W} />
    <circle cx="38" cy="38" r="6.5" fill={M} {...cut} />
    <path d="M35.2 38l2 2 3.6-4" {...ln(D, 2)} />
  </Svg>
);

export const SpotCalculator: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <g transform="rotate(-6 24 24)">
      <rect x="10" y="4" width="27" height="39" rx="4.5" fill={D} />
      <rect x="14" y="8.5" width="19" height="8.5" rx="1.8" fill={P} />
      <rect x="24" y="11.5" width="6.5" height="2.6" rx="1.3" fill={D} />
      {[14, 21, 28].map((x) =>
        [21, 27.5, 34].map((y) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="5"
            height="4.5"
            rx="1.1"
            fill={x === 28 && y === 34 ? R : x === 28 && y === 21 ? M : W}
          />
        )),
      )}
    </g>
  </Svg>
);

export const SpotBank: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M24 4.5L42.5 14v3.5h-37V14z" fill={D} stroke={D} strokeWidth={1.5} strokeLinejoin="round" />
    <circle cx="24" cy="12.3" r="2.8" fill={M} />
    {[9.5, 18, 26, 34.5].map((x) => (
      <rect key={x} x={x} y="20" width="4" height="14.5" rx="1" fill={P} />
    ))}
    <rect x="6" y="35" width="36" height="3.6" rx="1.4" fill={D} />
    <rect x="3.5" y="40" width="41" height="3.6" rx="1.4" fill={R} />
  </Svg>
);

export const SpotReceipt: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path
      d="M9 8a2.5 2.5 0 0 1 2.5-2.5h18A2.5 2.5 0 0 1 32 8v33l-3.8-2.6-3.8 2.6-3.9-2.6-3.8 2.6-3.8-2.6L9 41z"
      fill={D}
    />
    <Lines x={13} y={11.5} widths={[14, 9, 12]} />
    <rect x="13" y="28" width="15" height="3.2" rx="1.6" fill={R} />
    <circle cx="35" cy="33" r="8.5" fill={M} {...cut} />
    <path d="M31.4 33l2.6 2.6 4.6-5" {...ln(D, 2.4)} />
  </Svg>
);

export const SpotPlane: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M10 41c4-1 6-4 9-7" {...ln(P, 2.4)} strokeDasharray="2.5 4" />
    <path d="M44 5L3.5 20.5 17 27z" fill={R} />
    <path d="M44 5L34 42.5 23.5 31z" fill={P} />
    <path d="M44 5L17 27l3.5 13.5 3-9.5z" fill={D} />
  </Svg>
);

export const SpotDevice: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="10" y="3.5" width="28" height="41" rx="6" fill={D} />
    <rect x="14" y="8.5" width="20" height="9.5" rx="2" fill={P} />
    <circle cx="30.5" cy="13.2" r="1.7" fill={R} />
    <rect x="16.5" y="12" width="9" height="2.4" rx="1.2" fill={D} />
    <path d="M15.5 31a8.5 8.5 0 0 1 17 0" {...ln(W, 2)} />
    <path d="M18.5 37v-6a5.5 5.5 0 0 1 11 0v2" {...ln(W, 2)} />
    <path d="M21.5 38.5V31a2.5 2.5 0 0 1 5 0v5.5" {...ln(M, 2)} />
    <path d="M29.5 36.5v2" {...ln(W, 2)} />
  </Svg>
);

export const SpotClock: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="20.5" y="3.5" width="7" height="6" rx="1.8" fill={R} />
    <circle cx="24" cy="27" r="17" fill={D} {...cut} />
    <circle cx="24" cy="27" r="12.5" fill={P} />
    <path d="M24 19v8l5.5 3.5" {...ln(D, 3)} />
    <path d={sparkle(41, 10, 4)} fill={M} />
  </Svg>
);

export const SpotPin: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <ellipse cx="24" cy="40" rx="18" ry="5.5" fill={P} />
    <ellipse cx="24" cy="40" rx="10.5" ry="3" {...ln(D, 1.8)} strokeDasharray="2.6 3" />
    <path d="M24 40.5S11.5 29.5 11.5 18.5a12.5 12.5 0 0 1 25 0c0 11-12.5 22-12.5 22z" fill={R} {...cut} />
    <circle cx="24" cy="18.5" r="4.8" fill={W} />
  </Svg>
);

/* --------------------------------------------------------------- documents */

export const SpotDocuments: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="16" y="4" width="25" height="31" rx="3" fill={P} />
    <path d="M7 12.5a3 3 0 0 1 3-3h14.5l7.5 7.5v24a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3z" fill={D} {...cut} />
    <path d="M24.5 9.5l7.5 7.5h-5a2.5 2.5 0 0 1-2.5-2.5z" fill={R} />
    <Lines x={11.5} y={21} widths={[14, 16, 10]} />
    <circle cx="34.5" cy="37" r="6.8" fill={M} {...cut} />
    <circle cx="34.5" cy="37" r="2.6" fill={D} />
  </Svg>
);

export const SpotFileSend: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M6 9a3 3 0 0 1 3-3h15l8 8v26a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z" fill={D} />
    <path d="M24 6l8 8h-5.5A2.5 2.5 0 0 1 24 11.5z" fill={P} />
    <Lines x={10.5} y={19} widths={[14, 16, 10, 12]} />
    <circle cx="35" cy="35" r="8.5" fill={R} {...cut} />
    <path d="M35 39.5v-9M31 34.3l4-4 4 4" {...ln(W, 2.4)} />
  </Svg>
);

export const SpotChecklist: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="8" y="7.5" width="30" height="36" rx="4" fill={D} />
    <rect x="16" y="4" width="14" height="7.5" rx="2.6" fill={P} {...cut} />
    {[18.5, 26.5].map((y) => (
      <g key={y}>
        <Check d={`M12.5 ${y}l2.3 2.3 4-4.3`} color={M} width={2.4} />
        <rect x="22" y={y - 1.2} width="11" height="2.5" rx="1.25" fill={W} />
      </g>
    ))}
    <circle cx="15.2" cy="34.6" r="2.4" {...ln(P, 1.8)} />
    <rect x="22" y="33.4" width="7" height="2.5" rx="1.25" fill={W} />
    <circle cx="38" cy="38" r="6.5" fill={R} {...cut} />
    <path d="M35.2 38l2 2 3.6-4" {...ln(W, 2)} />
  </Svg>
);

export const SpotAuditLog: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="5" y="5" width="29" height="37" rx="3.5" fill={P} />
    {[12, 19.5, 27].map((y, i) => (
      <g key={y}>
        <circle cx="10.5" cy={y + 1.2} r="2" fill={i === 0 ? R : D} />
        <rect x="15" y={y} width={i === 2 ? 9 : 14} height="2.5" rx="1.25" fill={D} />
      </g>
    ))}
    <circle cx="35" cy="34.5" r="9.5" fill={D} {...cut} />
    <path d="M35 29.2v5.3l3.6 2.2" {...ln(W, 2.4)} />
  </Svg>
);

export const SpotSheet: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="12" y="4" width="30" height="33" rx="3" fill={P} />
    <rect x="5" y="9" width="30" height="34" rx="3" fill={D} {...cut} />
    <rect x="9" y="13.5" width="22" height="4" rx="1.2" fill={R} />
    {[9, 16.5, 24].map((x) =>
      [20.5, 26.5, 32.5].map((y) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="6.4" height="4" rx="1" fill={W} opacity={x === 9 ? 1 : 0.8} />
      )),
    )}
    <circle cx="37" cy="37" r="8" fill={M} {...cut} />
    <path d="M37 32.5v8M33.5 37.3l3.5 3.5 3.5-3.5" {...ln(D, 2.2)} />
  </Svg>
);

export const SpotLedger: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="30" y="7.5" width="10" height="34" rx="2" fill={P} />
    <rect x="8" y="4.5" width="28" height="39" rx="3.5" fill={D} {...cut} />
    <rect x="14" y="11" width="16" height="9" rx="1.6" fill={W} />
    <rect x="17" y="14.3" width="10" height="2.4" rx="1.2" fill={D} />
    <rect x="8" y="30" width="28" height="3.4" fill={M} />
    <path d="M26 43.5V36h6v7.5l-3-2.3z" fill={R} {...cut} />
  </Svg>
);

export const SpotSign: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="5" y="5" width="28" height="38" rx="3.5" fill={P} />
    <Lines x={9.5} y={11} widths={[15, 18, 11]} color={D} />
    <path d="M9.5 34.5c2.5-4 4.5 1.5 7-2s3.5 2 6 .5" {...ln(D, 2)} />
    <g transform="rotate(40 34 24)">
      <rect x="30.5" y="6" width="7" height="25" rx="2.6" fill={R} {...cut} />
      <rect x="30.5" y="6" width="7" height="6.5" rx="2.6" fill={D} />
      <path d="M30.8 31h6.4L34 38.5z" fill={D} {...cut} />
    </g>
  </Svg>
);

export const SpotNews: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="11" y="4.5" width="32" height="35" rx="3" fill={P} />
    <rect x="5" y="9" width="32" height="34" rx="3" fill={D} {...cut} />
    <rect x="9" y="13.5" width="11" height="10" rx="1.6" fill={R} />
    <Lines x={23} y={14} widths={[10, 7]} />
    <Lines x={9} y={28} widths={[24, 24, 15]} />
    <path d={sparkle(41.5, 8.5, 5)} fill={M} {...cut} />
  </Svg>
);

export const SpotBook: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M3.5 13v25a2 2 0 0 0 2 2H20a4 4 0 0 1 4 2.5 4 4 0 0 1 4-2.5h14.5a2 2 0 0 0 2-2V13z" fill={D} />
    <path d="M7 9h11c3.3 0 6 2 6 4.5v24.5c0-1.7-2.7-3-6-3H7z" fill={P} />
    <path d="M41 9H30c-3.3 0-6 2-6 4.5v24.5c0-1.7 2.7-3 6-3h11z" fill={W} />
    <Lines x={10} y={15} widths={[10, 8, 10]} color={D} h={2.2} />
    <Lines x={28.5} y={21} widths={[9, 7]} color={D} h={2.2} />
    <path d="M34 9v10.5l2.8-2.2 2.8 2.2V9z" fill={R} />
  </Svg>
);

/* ------------------------------------------------------------- talent & culture */

export const SpotTarget: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="21" cy="27" r="17" fill={P} />
    <circle cx="21" cy="27" r="11.5" fill={D} />
    <circle cx="21" cy="27" r="6.5" fill={W} />
    <circle cx="21" cy="27" r="3.2" fill={R} />
    <path d="M22 26L39 9" {...ln(B, 6)} />
    <path d="M22 26L39 9" {...ln(D, 2.8)} />
    <path d="M36 5.5v6.5h6.5" {...ln(M, 3.2)} />
  </Svg>
);

export const SpotTrend: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="4" y="9" width="36" height="31" rx="4" fill={P} />
    <path d="M9 33l8-8.5 6.5 5L35 17" {...ln(D, 3)} />
    <path d="M29 16.5h6.5V23" {...ln(D, 3)} />
    <circle cx="17" cy="24.5" r="2.6" fill={R} />
    <circle cx="23.5" cy="29.5" r="2.6" fill={R} />
    <path d={sparkle(41, 9, 5)} fill={M} {...cut} />
  </Svg>
);

export const SpotChart: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="4" y="9" width="36" height="32" rx="4" fill={P} />
    <rect x="10" y="26" width="6" height="9" rx="1.5" fill={D} />
    <rect x="19.5" y="20" width="6" height="15" rx="1.5" fill={D} />
    <rect x="29" y="14" width="6" height="21" rx="1.5" fill={R} />
    <rect x="8" y="35" width="29" height="2.6" rx="1.3" fill={D} />
    <circle cx="40" cy="10" r="6" fill={M} {...cut} />
    <path d="M40 13V7.3M37.6 9.6L40 7.2l2.4 2.4" {...ln(D, 2)} />
  </Svg>
);

export const SpotCap: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M12 22v9.5c0 3 5.4 6 12 6s12-3 12-6V22l-12 5.5z" fill={P} />
    <path d="M24 8l20 9.5-20 9.5-20-9.5z" fill={D} {...cut} />
    <path d="M38.5 19.5v10" {...ln(R, 2.2)} />
    <circle cx="38.5" cy="32" r="2.8" fill={R} />
    <path d={sparkle(9, 33, 4)} fill={M} />
  </Svg>
);

export const SpotQuote: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M10 6h22a6 6 0 0 1 6 6v13a6 6 0 0 1-6 6H16l-7 6v-6.3A6 6 0 0 1 4 25V12a6 6 0 0 1 6-6z" fill={D} />
    <circle cx="14.5" cy="20.5" r="3.4" fill={W} />
    <path d="M11.2 20.5c0-4 2-6.5 5-7.5" {...ln(W, 2.4)} />
    <circle cx="24.5" cy="20.5" r="3.4" fill={W} />
    <path d="M21.2 20.5c0-4 2-6.5 5-7.5" {...ln(W, 2.4)} />
    <path
      d="M37 26.5l2.1 5.1 5.5.4-4.2 3.6 1.3 5.4-4.7-2.9-4.7 2.9 1.3-5.4-4.2-3.6 5.5-.4z"
      fill={M}
      {...cut}
    />
  </Svg>
);

export const SpotHeart: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M10 7h18a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H14l-6 5v-5.3A6 6 0 0 1 4 25V13a6 6 0 0 1 6-6z" fill={P} />
    <Lines x={9.5} y={13} widths={[14, 9]} color={D} />
    <path
      d="M31 42.5s-11-6.6-11-14.2a6 6 0 0 1 11-3.3 6 6 0 0 1 11 3.3c0 7.6-11 14.2-11 14.2z"
      fill={R}
      {...cut}
    />
    <path d={sparkle(41, 9, 5)} fill={M} />
  </Svg>
);

export const SpotMedal: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M12.5 4h8.5l7.5 15.5h-8.5z" fill={R} />
    <path d="M35.5 4H27l-7.5 15.5H28z" fill={D} />
    <circle cx="24" cy="30.5" r="12.5" fill={M} {...cut} />
    <circle cx="24" cy="30.5" r="8.5" fill={P} />
    <path
      d="M24 24.5l1.6 3.8 4.1.3-3.1 2.7 1 4-3.6-2.2-3.6 2.2 1-4-3.1-2.7 4.1-.3z"
      fill={D}
    />
  </Svg>
);

export const SpotPoll: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="4" y="6" width="34" height="34" rx="4" fill={P} />
    <rect x="9" y="12" width="23" height="5.5" rx="2.75" fill={R} />
    <rect x="9" y="21" width="16" height="5.5" rx="2.75" fill={D} />
    <rect x="9" y="30" width="9" height="5.5" rx="2.75" fill={D} />
    <circle cx="37.5" cy="36.5" r="7.5" fill={D} {...cut} />
    <path d="M34.3 36.5l2.3 2.3 4.1-4.6" {...ln(M, 2.4)} />
  </Svg>
);

export const SpotMegaphone: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="15.5" y="29" width="6" height="12" rx="2.2" fill={D} transform="rotate(-14 18.5 35)" />
    <rect x="4" y="17" width="10" height="14" rx="3" fill={D} />
    <path d="M13 18L32.5 8.2A2 2 0 0 1 35.4 10v28a2 2 0 0 1-2.9 1.8L13 30z" fill={R} {...cut} />
    <path d="M39.5 19.5a6.4 6.4 0 0 1 0 9" {...ln(P, 2.8)} />
    <path d="M42.5 15.5a11.8 11.8 0 0 1 0 17" {...ln(P, 2.8)} />
  </Svg>
);

export const SpotPhone: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="9" y="4" width="21" height="40" rx="4.5" fill={D} />
    <rect x="12" y="9" width="15" height="27" rx="1.8" fill={P} />
    <rect x="16.5" y="5.8" width="6" height="1.6" rx=".8" fill={W} />
    <circle cx="19.5" cy="40" r="1.7" fill={W} />
    <Lines x={14.5} y={29} widths={[8]} color={D} />
    <path
      d="M27.5 13h12a4 4 0 0 1 4 4v5.5a4 4 0 0 1-4 4h-6l-5 5v-5h-1a4 4 0 0 1-4-4V17a4 4 0 0 1 4-4z"
      fill={R}
      {...cut}
    />
    {[28.8, 33.3, 37.8].map((x) => (
      <circle key={x} cx={x} cy="19.8" r="1.5" fill={W} />
    ))}
  </Svg>
);

export const SpotChat: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M24 5h14a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6h-.5v5l-5.5-5H24a6 6 0 0 1-6-6v-8a6 6 0 0 1 6-6z" fill={P} />
    <path d="M10 16h16a6 6 0 0 1 6 6v9a6 6 0 0 1-6 6H15l-6 5.5V37A6 6 0 0 1 4 31v-9a6 6 0 0 1 6-6z" fill={D} {...cut} />
    {[11.5, 18, 24.5].map((x) => (
      <circle key={x} cx={x} cy="26.5" r="2" fill={x === 24.5 ? M : W} />
    ))}
  </Svg>
);

export const SpotQuestion: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M24 4h14a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6h-.5v5l-5.5-5H24a6 6 0 0 1-6-6v-8a6 6 0 0 1 6-6z" fill={P} />
    <path d="M11 14h16a7 7 0 0 1 7 7v10a7 7 0 0 1-7 7H16l-6.5 5.5V37.6A7 7 0 0 1 4 31V21a7 7 0 0 1 7-7z" fill={R} {...cut} />
    <path d="M15.3 22.6a3.9 3.9 0 1 1 5.5 3.5c-1.1.5-1.7 1.3-1.7 2.5v.6" {...ln(W, 2.6)} />
    <circle cx="19.1" cy="33.4" r="1.7" fill={W} />
  </Svg>
);

export const SpotMail: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="4" y="16" width="40" height="27" rx="3.5" fill={R} />
    <rect x="10" y="6" width="28" height="24" rx="2" fill={W} />
    <Lines x={14} y={11} widths={[14, 20, 11]} color={D} />
    <path d="M4 21l20 12.5L44 21v18.5a3.5 3.5 0 0 1-3.5 3.5h-33A3.5 3.5 0 0 1 4 39.5z" fill={D} {...cut} />
    <path d={sparkle(41, 8, 4.5)} fill={M} />
  </Svg>
);

export const SpotInbox: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="11" y="5" width="21" height="22" rx="2" fill={P} transform="rotate(-7 21 16)" />
    <rect x="17" y="9" width="21" height="17" rx="2" fill={R} transform="rotate(6 27 17)" />
    <path d="M5 24.5h12l2.5 4.5h9l2.5-4.5h12v14.5a3.5 3.5 0 0 1-3.5 3.5h-31A3.5 3.5 0 0 1 5 39z" fill={D} {...cut} />
  </Svg>
);

export const SpotBell: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="23" cy="39" r="4.2" fill={R} />
    <path
      d="M23 5.5a3 3 0 0 1 3 3v1.3c5.7 1.3 9 6 9 11.7v8.3l4 5H7l4-5v-8.3c0-5.7 3.3-10.4 9-11.7V8.5a3 3 0 0 1 3-3z"
      fill={D}
      {...cut}
    />
    <path d="M15.5 21.5c0-3 1.6-5.4 4.2-6.4" {...ln(P, 2.2)} />
    <circle cx="36.5" cy="10.5" r="5.8" fill={M} {...cut} />
  </Svg>
);

/* ------------------------------------------------------------------ platform */

export const SpotWorkflow: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M18 11.5h13.5a4.5 4.5 0 0 1 4.5 4.5v1.5M18 36.5h13.5a4.5 4.5 0 0 0 4.5-4.5v-1.5" {...ln(D, 3)} />
    <rect x="4" y="4.5" width="15" height="14" rx="3.5" fill={D} />
    <rect x="8" y="10.3" width="7" height="2.5" rx="1.25" fill={W} />
    <rect x="4" y="29.5" width="15" height="14" rx="3.5" fill={P} />
    <rect x="8" y="35.3" width="7" height="2.5" rx="1.25" fill={D} />
    <circle cx="36" cy="24" r="8" fill={R} {...cut} />
    <path d="M32.6 24l2.4 2.4 4.4-4.8" {...ln(W, 2.4)} />
  </Svg>
);

export const SpotConnected: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M10 10l28 28M38 10L10 38" {...ln(D, 2.6)} />
    <rect x="3.5" y="3.5" width="13" height="13" rx="3.5" fill={P} />
    <circle cx="38" cy="10" r="6.5" fill={R} />
    <circle cx="10" cy="38" r="6.5" fill={M} />
    <rect x="31.5" y="31.5" width="13" height="13" rx="3.5" fill={P} />
    <circle cx="24" cy="24" r="9" fill={D} {...cut} />
    <circle cx="24" cy="24" r="3.4" fill={W} />
  </Svg>
);

export const SpotDashboard: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="4" y="7" width="40" height="34" rx="4" fill={D} />
    {[9, 13, 17].map((x) => (
      <circle key={x} cx={x} cy="12" r="1.4" fill={W} />
    ))}
    <rect x="8" y="17" width="14" height="20" rx="2" fill={P} />
    <rect x="11" y="28" width="3" height="6" rx="1" fill={D} />
    <rect x="15.8" y="23" width="3" height="11" rx="1" fill={R} />
    <rect x="25" y="17" width="15" height="7" rx="2" fill={W} />
    <circle cx="32.5" cy="32.5" r="5.2" fill={M} />
    <path d="M32.5 27.3a5.2 5.2 0 0 1 5.2 5.2h-5.2z" fill={R} />
    <circle cx="32.5" cy="32.5" r="2" fill={D} />
  </Svg>
);

export const SpotMira: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M24 5h14a6 6 0 0 1 6 6v7a6 6 0 0 1-6 6h-.5v5l-5.5-5H24a6 6 0 0 1-6-6v-7a6 6 0 0 1 6-6z" fill={P} />
    <path d="M10 15h17a6.5 6.5 0 0 1 6.5 6.5v10A6.5 6.5 0 0 1 27 38H15.5l-6.5 5.5V37.8A6.5 6.5 0 0 1 3.5 31.5v-10A6.5 6.5 0 0 1 10 15z" fill={D} {...cut} />
    <path d={sparkle(18.5, 26.5, 6.5)} fill={W} />
    <path d="M30.5 14.5l1.5-4M35 16.5l3-3M36.5 21h4" {...ln(M, 2.4)} />
  </Svg>
);

export const SpotPlug: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M9 24H6.5A3 3 0 0 0 3.5 27v17" {...ln(P, 4)} />
    <rect x="21" y="18" width="7.5" height="3.2" rx="1.2" fill={D} />
    <rect x="21" y="26.8" width="7.5" height="3.2" rx="1.2" fill={D} />
    <rect x="8.5" y="14" width="14" height="20" rx="4" fill={D} />
    <rect x="12.5" y="19" width="6" height="2.4" rx="1.2" fill={W} opacity=".9" />
    <rect x="31" y="11" width="13.5" height="26" rx="4" fill={R} />
    <rect x="34" y="18" width="5" height="3.2" rx="1.2" fill={D} />
    <rect x="34" y="26.8" width="5" height="3.2" rx="1.2" fill={D} />
    <path d={sparkle(29.8, 7, 4)} fill={M} />
    <path d={sparkle(29.8, 41, 2.6)} fill={M} />
  </Svg>
);

export const SpotShield: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M24 3.5l17 6.4v12.3c0 10.4-7.3 18-17 21.8-9.7-3.8-17-11.4-17-21.8V9.9z" fill={D} />
    <path d="M24 3.5l17 6.4v12.3c0 10.4-7.3 18-17 21.8z" fill={R} />
    <path d="M16.5 23.5l5.2 5.2 9.8-10.4" {...ln(W, 3.4)} />
  </Svg>
);

export const SpotPrivacy: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M24 3.5l17 6.4v12.3c0 10.4-7.3 18-17 21.8-9.7-3.8-17-11.4-17-21.8V9.9z" fill={P} />
    <circle cx="24" cy="18.5" r="5" fill={D} />
    <path d="M14.5 33.5c0-5.6 4.3-9.6 9.5-9.6s9.5 4 9.5 9.6c-2.6 2.8-5.8 4.9-9.5 6.4-3.7-1.5-6.9-3.6-9.5-6.4z" fill={D} />
    <circle cx="38" cy="36.5" r="6.5" fill={R} {...cut} />
    <path d="M35.2 36.5l2 2 3.6-4" {...ln(W, 2)} />
  </Svg>
);

export const SpotLock: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M14.5 21v-5.5a9.5 9.5 0 0 1 19 0V21" {...ln(P, 4.5)} />
    <rect x="8" y="20" width="32" height="24" rx="4.5" fill={D} />
    <circle cx="24" cy="29.5" r="3.4" fill={W} />
    <rect x="22.6" y="30.5" width="2.8" height="7" rx="1.4" fill={W} />
    <circle cx="39" cy="38.5" r="7" fill={R} {...cut} />
    <circle cx="39" cy="36.2" r="2" fill={W} />
    <path d="M35.6 42.2a3.4 3.4 0 0 1 6.8 0z" fill={W} />
  </Svg>
);

export const SpotKey: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <g transform="rotate(-38 24 24)">
      <rect x="19" y="21.5" width="27" height="5.5" rx="2.75" fill={D} />
      <rect x="35" y="24" width="3.6" height="8.5" rx="1.2" fill={D} />
      <rect x="40.5" y="24" width="3.6" height="6.5" rx="1.2" fill={D} />
      <circle cx="13" cy="24.25" r="10" fill={D} {...cut} />
      <circle cx="13" cy="24.25" r="5.2" fill={R} />
      <circle cx="11.3" cy="24.25" r="2" fill={W} />
    </g>
    <path d={sparkle(40, 36, 4.5)} fill={M} />
  </Svg>
);

export const SpotIdLock: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="3.5" y="8" width="35" height="25" rx="3.5" fill={P} />
    <rect x="8" y="13" width="9.5" height="9.5" rx="1.6" fill={R} />
    <Lines x={21} y={14} widths={[13, 9]} color={D} />
    {[9.5, 13.8, 18.1, 22.4].map((x) => (
      <circle key={x} cx={x} cy="28" r="1.5" fill={D} />
    ))}
    <path d="M30.5 31.5v-3.5a5 5 0 0 1 10 0v3.5" {...ln(B, 6.5)} />
    <path d="M30.5 31.5v-3.5a5 5 0 0 1 10 0v3.5" {...ln(D, 2.8)} />
    <rect x="27" y="30.5" width="17" height="13.5" rx="3" fill={D} {...cut} />
    <circle cx="35.5" cy="36" r="1.9" fill={W} />
    <rect x="34.7" y="36.4" width="1.6" height="3.6" rx=".8" fill={W} />
  </Svg>
);

export const SpotVault: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="9.5" y="38" width="6" height="5.5" rx="1.4" fill={D} />
    <rect x="32.5" y="38" width="6" height="5.5" rx="1.4" fill={D} />
    <rect x="5" y="5" width="38" height="35" rx="4.5" fill={D} />
    <rect x="9.5" y="9.5" width="29" height="26" rx="2.6" fill={P} />
    <circle cx="23" cy="22.5" r="7.5" fill={R} />
    <circle cx="23" cy="22.5" r="2.6" fill={W} />
    <path d="M23 15v2.2M23 27.8V30M15.5 22.5h2.2M28.3 22.5h2.2" {...ln(W, 1.6)} />
    <rect x="33" y="17" width="2.6" height="11" rx="1.3" fill={D} />
  </Svg>
);

export const SpotAiTrail: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="5" y="4.5" width="27" height="36" rx="3.5" fill={D} />
    <Lines x={9.5} y={11} widths={[15, 18, 11, 14]} />
    <circle cx="34.5" cy="34.5" r="9.5" fill={R} {...cut} />
    <path d={sparkle(34.5, 34.5, 5.6)} fill={W} />
    <path d={sparkle(41, 10, 4)} fill={M} />
  </Svg>
);

export const SpotToggle: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="3.5" y="13.5" width="41" height="21" rx="10.5" fill={P} />
    <rect x="28" y="22.6" width="10" height="2.8" rx="1.4" fill={D} opacity=".35" />
    <circle cx="14" cy="24" r="8.5" fill={D} {...cut} />
    <path d="M14 18.8v4.4" {...ln(W, 2.2)} />
    <path d="M10.6 20.6a4.8 4.8 0 1 0 6.8 0" {...ln(W, 2.2)} />
    <path d={sparkle(40, 8, 4)} fill={M} />
  </Svg>
);

export const SpotLaptop: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="8" y="8" width="32" height="23" rx="2.6" fill={D} />
    <rect x="11.5" y="11.5" width="25" height="16" rx="1.2" fill={P} />
    <rect x="14.5" y="14.5" width="8" height="8" rx="1.2" fill={R} />
    <Lines x={25} y={15} widths={[8, 6]} color={D} h={2.2} />
    <path d="M3.5 33h41l-1.8 5a2.4 2.4 0 0 1-2.3 1.6H7.6A2.4 2.4 0 0 1 5.3 38z" fill={D} {...cut} />
    <rect x="20" y="33" width="8" height="2" rx="1" fill={W} />
    <path d="M38 22.5l5.5 2.6-2.6 5.5-5.5-2.6z" fill={M} {...cut} />
  </Svg>
);

export const SpotHeadset: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M9.5 28v-4a14.5 14.5 0 0 1 29 0v4" {...ln(D, 4)} />
    <path d="M37 38c0 3.8-2.8 5.6-7 5.6h-3" {...ln(P, 2.6)} />
    <rect x="21" y="41" width="8" height="5" rx="2.5" fill={P} />
    <rect x="5" y="24" width="10" height="15" rx="4.2" fill={R} {...cut} />
    <rect x="33" y="24" width="10" height="15" rx="4.2" fill={R} {...cut} />
    <path d={sparkle(24, 13.5, 4.5)} fill={M} />
  </Svg>
);

export const SpotBox: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M24 5.5l17.5 8.7-17.5 8.7-17.5-8.7z" fill={P} />
    <path d="M6.5 14.2l17.5 8.7v20.2L6.5 34.4z" fill={D} />
    <path d="M41.5 14.2L24 22.9v20.2l17.5-8.7z" fill={R} />
    <path d="M15.2 9.8l17.5 8.7v8.6l-4 2v-8.6L11.2 11.8z" fill={M} />
  </Svg>
);

export const SpotCode: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="4" y="7" width="40" height="34" rx="4" fill={D} />
    <path d="M4 11a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v3H4z" fill={R} />
    {[9, 13, 17].map((x) => (
      <circle key={x} cx={x} cy="10.6" r="1.3" fill={W} />
    ))}
    <path d="M17 21.5l-5.5 5.5 5.5 5.5M31 21.5l5.5 5.5-5.5 5.5" {...ln(W, 2.8)} />
    <path d="M26.5 19.5L21.5 34.5" {...ln(M, 2.8)} />
  </Svg>
);

export const SpotDatabase: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M8 10v27c0 3 7.2 5.5 16 5.5S40 40 40 37V10c0 3-7.2 5.5-16 5.5S8 13 8 10z" fill={D} />
    <ellipse cx="24" cy="10" rx="16" ry="5.5" fill={P} />
    <path d="M8 19.5c0 3 7.2 5.5 16 5.5s16-2.5 16-5.5M8 28.5c0 3 7.2 5.5 16 5.5s16-2.5 16-5.5" {...ln(B, 2)} />
    <circle cx="13.5" cy="25.5" r="1.6" fill={R} />
    <circle cx="13.5" cy="34.5" r="1.6" fill={M} />
  </Svg>
);

export const SpotBuildings: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="25" y="14" width="18" height="30" rx="2.2" fill={P} />
    {[29.5, 35.5].map((x) =>
      [19, 25, 31].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="3.4" height="3.4" rx=".8" fill={D} />),
    )}
    <rect x="6" y="4.5" width="21" height="39.5" rx="2.2" fill={D} {...cut} />
    {[10.5, 18.5].map((x) =>
      [9.5, 15.5, 21.5, 27.5].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="4.2" height="3.4" rx=".8" fill={W} />),
    )}
    <path d="M13.5 44v-6.5a3 3 0 0 1 6 0V44z" fill={R} />
    <path d={sparkle(38, 6.5, 4)} fill={M} />
  </Svg>
);

export const SpotGrowth: SpotIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="3.5" y="31" width="12" height="13" rx="2" fill={P} />
    <rect x="18" y="23" width="12" height="21" rx="2" fill={R} />
    <rect x="32.5" y="14.5" width="12" height="29.5" rx="2" fill={D} />
    <path d="M36 14.5V3.5" {...ln(D, 2)} />
    <path d="M36 3.8h8.5l-2.6 3.2 2.6 3.2H36z" fill={M} />
    <path d={sparkle(9.5, 21, 3.6)} fill={M} />
  </Svg>
);

/* ------------------------------------------------------------------- tiles */

const TILE_TONE = {
  blush: "bg-blush-100 [--spot-tile:var(--color-blush-100)]",
  marigold: "bg-marigold-100 [--spot-tile:var(--color-marigold-100)]",
  cream: "bg-cream-100 [--spot-tile:var(--color-cream-100)]",
  white: "bg-white [--spot-tile:var(--color-white)]",
  muted: "bg-cream-100 [--spot-tile:var(--color-cream-100)]",
} as const;

export type SpotTone = keyof typeof TILE_TONE;

const TILE_SIZE = {
  xs: "size-8 rounded-lg p-1",
  sm: "size-10 rounded-xl p-1.5",
  md: "size-12 rounded-2xl p-1.5",
  lg: "size-16 rounded-2xl p-2",
  xl: "size-20 rounded-3xl p-2.5",
} as const;

/**
 * A spot on its soft tile — the way illustrations appear in menus, cards and
 * lists. The tile colour is also the "cut" colour, so overlaps stay crisp.
 */
export function SpotTile({
  icon: Icon,
  size = "md",
  tone = "blush",
  className,
}: {
  icon: SpotIcon;
  size?: keyof typeof TILE_SIZE;
  tone?: SpotTone;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("grid shrink-0 place-items-center", TILE_SIZE[size], TILE_TONE[tone], tone === "muted" && "spot-muted", className)}
    >
      <Icon className="size-full" />
    </span>
  );
}
