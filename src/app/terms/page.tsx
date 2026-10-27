import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of service",
  description: "The terms for using the AskMira website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      updated="27 October 2026"
      intro="These terms cover your use of this website. Use of the AskMira platform itself is governed by the agreement each customer signs with us."
      sections={[
        {
          heading: "Using this website",
          list: [
            "You may read, link to and share the pages of this website.",
            "Do not try to break, overload or gain unauthorised access to it, or submit forms automatically.",
            "Information you send us through a form must be your own, or shared with permission.",
          ],
        },
        {
          heading: "About the content",
          paragraphs: [
            "Product screens shown on this website are illustrations built with sample data. Guides are general information, not legal or tax advice; statutory rules and due dates change, so confirm them with your adviser.",
          ],
        },
        {
          heading: "Trademarks",
          paragraphs: [
            "AskMira and its logo are our marks. Other product names mentioned on this website belong to their owners and are used only to describe what AskMira works with.",
          ],
        },
        {
          heading: "Changes",
          paragraphs: ["We may update these terms. The date at the top of this page shows when they last changed."],
        },
      ]}
    />
  );
}
