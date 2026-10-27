"use client";

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";

/**
 * The analytics preview is the only one that draws real charts (Recharts). It
 * is split into its own chunk and fetched in the browser only when it is
 * rendered — a closed tab in the product tour never downloads it.
 */
export const AnalyticsMock = dynamic(() => import("./mock-analytics").then((m) => m.AnalyticsMock), {
  loading: () => <Skeleton className="aspect-[16/10] w-full rounded-2xl bg-cream-100" />,
});
