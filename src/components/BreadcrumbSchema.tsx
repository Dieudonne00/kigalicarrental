import { SITE } from "@/lib/constants";

// Homepage and car detail pages already render their own BreadcrumbList
// inline - this is the same pattern for every other real page, so Google
// gets consistent site-hierarchy signal (and breadcrumb rich-result
// eligibility) across every page, not just two of them.
export default function BreadcrumbSchema({ name, path }: { name: string; path: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.URL },
      { "@type": "ListItem", position: 2, name, item: `${SITE.URL}${path}` },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
