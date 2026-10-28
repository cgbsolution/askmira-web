import { ArrowRight } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { connections } from "@/lib/content/ecosystem";

import { ConnectionBadge } from "./ConnectionBadge";

/** Every connection between the apps, and how far it is built. A table on wide screens, cards on phones. */
export function ConnectionMatrix() {
  return (
    <>
      <div className="hidden overflow-hidden rounded-3xl border border-cream-200 bg-white md:block">
        {/* table-ok: a static reference table on a marketing page, not a data grid */}
        <Table>
          <TableHeader>
            <TableRow className="bg-cream-50 hover:bg-cream-50">
              <TableHead className="h-12 px-5 font-semibold text-ink-700">Connection</TableHead>
              <TableHead className="h-12 px-5 font-semibold text-ink-700">Status</TableHead>
              <TableHead className="h-12 px-5 font-semibold text-ink-700">What exists</TableHead>
              <TableHead className="h-12 px-5 font-semibold text-ink-700">Still to build</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {connections.map((c) => (
              <TableRow key={c.from + c.to} className="hover:bg-cream-25">
                <TableCell className="px-5 py-4 align-top whitespace-normal">
                  <span className="flex flex-wrap items-center gap-1.5 font-semibold text-ink-900">
                    {c.from} <ArrowRight className="size-3.5 text-ink-300" aria-label="to" /> {c.to}
                  </span>
                </TableCell>
                <TableCell className="px-5 py-4 align-top">
                  <ConnectionBadge status={c.status} />
                </TableCell>
                <TableCell className="px-5 py-4 align-top text-[0.875rem] whitespace-normal text-ink-600">{c.what}</TableCell>
                <TableCell className="px-5 py-4 align-top text-[0.875rem] whitespace-normal text-ink-600">
                  {c.remaining ?? "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ul className="grid gap-3 md:hidden">
        {connections.map((c) => (
          <li key={c.from + c.to} className="rounded-3xl border border-cream-200 bg-white p-5">
            <p className="font-semibold text-ink-900">
              {c.from} → {c.to}
            </p>
            <ConnectionBadge status={c.status} className="mt-2" />
            <p className="mt-3 text-[0.875rem] text-ink-600">{c.what}</p>
            {c.remaining && (
              <p className="mt-2 text-[0.875rem] text-ink-600">
                <span className="font-semibold text-ink-800">Still to build: </span>
                {c.remaining}
              </p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
