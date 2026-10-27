"use server";

import { headers } from "next/headers";

import { demoRequestSchema } from "@/lib/demo-schema";

export type DemoResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

const GENERIC_ERROR =
  "We couldn't send your request just now. Please try again in a minute — nothing you typed has been lost.";

/**
 * Validates a demo request again on the server, then hands it to the AskMira
 * API, which stores it for the platform team and emails them.
 *
 * The browser never talks to the API. When `PROXY_SHARED_SECRET` is set, the
 * visitor's address is forwarded with it, so the API's per-address rate limit
 * applies to each visitor rather than to this server as a whole.
 */
export async function submitDemoRequest(input: unknown): Promise<DemoResult> {
  const parsed = demoRequestSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { ok: false, message: "Please check the highlighted fields.", fieldErrors };
  }
  const data = parsed.data;

  // A bot filled the hidden field. Say thank you and send nothing.
  if (data.website) return { ok: true };

  const apiBase = process.env.ASKMIRA_API_BASE?.replace(/\/+$/, "");
  if (!apiBase) {
    console.error("[demo-request] ASKMIRA_API_BASE is not set; the request was not sent.");
    return { ok: false, message: GENERIC_ERROR };
  }

  const requestHeaders = await headers();
  const forwarded: Record<string, string> = {};
  const secret = process.env.PROXY_SHARED_SECRET;
  const address =
    requestHeaders.get("x-real-ip")?.trim() || requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (secret && address) {
    forwarded["x-askmira-proxy-secret"] = secret;
    forwarded["x-askmira-client-ip"] = address;
  }

  try {
    const response = await fetch(`${apiBase}/api/v1/public/demo-requests`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json", ...forwarded },
      body: JSON.stringify({
        full_name: data.fullName,
        work_email: data.workEmail,
        company: data.company,
        phone: data.phone || null,
        company_size: data.companySize,
        role: data.role || null,
        interests: data.interests,
        message: data.message || null,
        topic: data.topic,
        consent: data.consent,
        source_path: data.sourcePath || null,
        website: "",
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (response.ok) return { ok: true };
    if (response.status === 429) {
      return {
        ok: false,
        message: "We've had several requests from your connection. Please wait a few minutes and try again.",
      };
    }
    console.error(`[demo-request] API answered ${response.status}: ${await response.text().catch(() => "")}`);
    return { ok: false, message: GENERIC_ERROR };
  } catch (error) {
    console.error("[demo-request] API unreachable:", error);
    return { ok: false, message: GENERIC_ERROR };
  }
}
