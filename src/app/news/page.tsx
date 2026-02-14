import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import siteData from "@/data/siteData";

export const metadata = {
  title: "News | Chennai Turbo Riders",
  description: "Latest news and updates from Chennai Turbo Riders.",
};

export default function NewsPage() {
  const { news } = siteData;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-carbon-900 to-carbon-950" />
        <div className="absolute inset-0 bg-carbon-fiber opacity-30" />
        <div className="relative z-10 text-center">
          <span className="label-text">Latest Updates</span>
          <h1 className="heading-xl mt-3">
            <span className="text-white">LATEST </span>
            <span className="text-racing-red">NEWS</span>
          </h1>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-padding bg-carbon-950">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group carbon-card overflow-hidden hover:border-racing-red/30 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon-900 to-transparent" />
                  <span className="absolute bottom-3 right-3 px-3 py-1 text-[9px] uppercase tracking-wider font-heading bg-racing-red text-carbon-950">
                    {article.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-racing-red transition-colors mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-carbon-400 mb-3 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-carbon-500">{formatDate(article.publishDate)}</span>
                    <span className="text-xs text-racing-red font-heading uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
