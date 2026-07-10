import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import siteData from "@/data/siteData";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return siteData.news.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = siteData.news.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} | Chennai Turbo Riders`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = siteData.news.find((a) => a.slug === slug);
  if (!article) notFound();

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const otherArticles = siteData.news
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <Navbar />

      {/* Article Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={article.image}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/80 to-carbon-950/50" />
        </div>
        <div className="relative z-10 section-container pb-16 pt-32 max-w-4xl">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-racing-yellow text-sm font-heading uppercase tracking-wider mb-6 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            Back to News
          </Link>

          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-carbon-400">
            <span>{formatDate(article.publishDate)}</span>
            <span className="text-carbon-600">&middot;</span>
            <span>By {article.author}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24 bg-carbon-950">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left: Content */}
            <div className="lg:col-span-2">
              <p className="text-xl text-white font-medium leading-relaxed mb-8">
                {article.excerpt}
              </p>

              <div className="space-y-6 body-text text-justify">
                {article.content.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Instagram Link */}
              {article.instagramUrl && (
                <a
                  href={article.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 mt-4"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.01 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.065.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.01 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.25a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5zm5.25-8.5a1.25 1.25 0 10.001-2.501A1.25 1.25 0 0017.25 6.75z" />
                  </svg>
                  View on Instagram
                </a>
              )}

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-carbon-700/30">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-carbon-500 font-heading block mb-3">
                    Tags
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-carbon-800 text-sm text-carbon-300 font-heading"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Portrait Image */}
            <div className="lg:col-span-1 sticky top-24">
              <div className="relative overflow-hidden group">
                <div className="absolute -inset-1 bg-racing-yellow/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={article.image1}
                  alt={article.title}
                  className="relative w-full h-auto aspect-[3/4] object-cover border border-carbon-700/30 group-hover:border-racing-yellow/30 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Articles */}
      {otherArticles.length > 0 && (
        <section className="py-16 md:py-24 bg-carbon-900">
          <div className="section-container">
            <h3 className="heading-md text-center mb-12 text-white">
              MORE NEWS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {otherArticles.map((a) => (
                <Link
                  key={a.id}
                  href={`/news/${a.slug}`}
                  className="group carbon-card overflow-hidden hover:border-racing-yellow/30 transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[9px] uppercase tracking-wider text-racing-yellow font-heading">
                      {a.category}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-white mt-1 group-hover:text-racing-yellow transition-colors line-clamp-2">
                      {a.title}
                    </h4>
                    <p className="text-xs text-carbon-500 mt-2">
                      {formatDate(a.publishDate)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/news" className="btn-outline">
                View All News
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
