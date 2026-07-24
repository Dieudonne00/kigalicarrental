import Link from "next/link";

// A small, page-specific sentence pointing back to the homepage - each
// landing page is its own real content page competing for its own long-tail
// term, but none of them reinforced the homepage for the site's core phrase
// at all before this. One natural, varied link per page (not a repeated
// boilerplate block) is the same pattern used for the blog posts' internal
// links.
export default function HomeLinkCTA({ before, after }: { before: string; after?: string }) {
  return (
    <section className="bg-white border-t border-gray-100 py-6">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600">
        {before}{" "}
        <Link href="/" className="text-blue-600 font-semibold hover:underline">
          Kigali Car Rental
        </Link>
        {after ? ` ${after}` : ""}
      </div>
    </section>
  );
}
