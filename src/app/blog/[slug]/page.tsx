import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BlogFeaturedImage from "@/components/BlogFeaturedImage";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  author: string;
  category: string;
  tags: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string[];
  views: number;
  publishedAt: string | null;
  createdAt: string;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const blog = await prisma.blogPost.findFirst({
      where: { slug, published: true },
    });

    if (!blog) return null;

    await prisma.blogPost.update({
      where: { id: blog.id },
      data: { views: { increment: 1 } },
    });

    return {
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      featuredImage: blog.featuredImage,
      author: blog.author,
      category: blog.category,
      tags: blog.tags,
      metaTitle: blog.metaTitle,
      metaDescription: blog.metaDescription,
      metaKeywords: blog.metaKeywords,
      views: blog.views,
      publishedAt: blog.publishedAt?.toISOString() || null,
      createdAt: blog.createdAt.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

async function getRelatedPosts(category: string, currentSlug: string): Promise<BlogPost[]> {
  try {
    const blogs = await prisma.blogPost.findMany({
      where: { published: true, category, slug: { not: currentSlug } },
      take: 3,
      orderBy: { publishedAt: "desc" },
    });

    return blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      featuredImage: blog.featuredImage,
      author: blog.author,
      category: blog.category,
      tags: blog.tags,
      metaTitle: blog.metaTitle,
      metaDescription: blog.metaDescription,
      metaKeywords: blog.metaKeywords,
      views: blog.views,
      publishedAt: blog.publishedAt?.toISOString() || null,
      createdAt: blog.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

const SITE = "https://kigalicarhire.rw";
const OG_FALLBACK = "https://kigalicarhire.b-cdn.net/hero%20section%20cars.png";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) return { title: "Blog Post Not Found" };

  const image = post.featuredImage || OG_FALLBACK;
  const canonical = `${SITE}/blog/${post.slug}`;

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.metaKeywords.join(", "),
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
      type: "article",
      publishedTime: post.publishedAt || undefined,
      url: canonical,
      siteName: "Kigali Car Hire",
      locale: "en_RW",
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [image],
    },
  };
}

function formatCategory(cat: string) {
  return cat.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.category, post.slug);
  const publishDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const canonical = `${SITE}/blog/${post.slug}`;
  const image = post.featuredImage || OG_FALLBACK;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image,
    url: canonical,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.publishedAt || post.createdAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Kigali Car Hire",
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: OG_FALLBACK,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Kigali Car Hire", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Full-bleed hero: image fills the hero, title overlaid */}
      <div className="relative min-h-[60vh] md:min-h-[75vh] flex flex-col justify-end overflow-hidden">
        <BlogFeaturedImage src={post.featuredImage} alt={post.title} priority />
        {/* Gradient overlay — dark at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

        <div className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 md:pb-16 pt-32 md:pt-40">
          {/* Breadcrumb */}
          <nav className="mb-5">
            <ol className="flex items-center gap-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li>/</li>
              <li className="text-white/50 truncate max-w-[200px]">{post.title}</li>
            </ol>
          </nav>

          {/* Category badge */}
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-[#01B000] text-white text-sm font-semibold rounded-full tracking-wide">
              {formatCategory(post.category)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight font-[family-name:var(--font-plus-jakarta)]">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/75 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{publishDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Excerpt lead */}
        <p className="text-xl text-gray-500 leading-relaxed mb-10 border-l-4 border-[#01B000] pl-5 italic">
          {post.excerpt}
        </p>

        {/* Main content */}
        <div
          className="
            prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900 prose-headings:font-[family-name:var(--font-plus-jakarta)]
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-[1.9] prose-p:text-[1.05rem]
            prose-a:text-[#01B000] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900
            prose-ul:text-gray-700 prose-ol:text-gray-700
            prose-li:leading-relaxed
            prose-blockquote:border-l-4 prose-blockquote:border-[#01B000] prose-blockquote:bg-green-50 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:pr-4 prose-blockquote:text-gray-700 prose-blockquote:not-italic
            prose-img:rounded-2xl prose-img:shadow-lg
            prose-hr:border-gray-200
            prose-code:text-[#01B000] prose-code:bg-green-50 prose-code:px-1 prose-code:rounded
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-[#01B000] hover:text-white transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share / Back to blog */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#01B000] font-semibold hover:gap-3 transition-all"
          >
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-[#01B000] text-white font-semibold rounded-full hover:bg-[#019500] transition-colors text-sm"
          >
            Book a Car
          </Link>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 font-[family-name:var(--font-plus-jakarta)]">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <BlogFeaturedImage src={rp.featuredImage} alt={rp.title} className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#01B000] text-white text-xs font-semibold rounded-full">
                      {formatCategory(rp.category)}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#01B000] transition-colors line-clamp-2 leading-snug">
                      {rp.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">{rp.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-[#01B000] text-sm font-semibold">
                      Read article
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#01B000] to-[#019500]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-plus-jakarta)]">
            Ready to Explore Rwanda?
          </h2>
          <p className="text-lg text-white/85 mb-8">
            Book a reliable car hire in Kigali and start your adventure today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fleet"
              className="px-8 py-4 bg-white text-[#01B000] font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg"
            >
              Browse Our Fleet
            </Link>
            <Link
              href="/blog"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#01B000] transition-all"
            >
              More Articles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
