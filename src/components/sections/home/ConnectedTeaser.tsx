import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { SectionHeading } from "../primitives";
import { ScreenTour } from "../screens/ScreenTour";

/** Real screens from AskMira and every app around it. */
export function ConnectedTeaser() {
  return (
    <section aria-labelledby="connected-heading" className="section-y bg-cream-50">
      <div className="container-site">
        <SectionHeading
          id="connected-heading"
          eyebrow="See it for real"
          title="One HRMS, and the apps around it"
          lead="These are the actual screens. Hiring, expenses and IT support already connect to AskMira; sales and procurement are next."
        />
        <ScreenTour className="mt-12 sm:mt-14" />
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" variant="deep">
            <Link href="/connected-platform">
              How the apps connect <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
