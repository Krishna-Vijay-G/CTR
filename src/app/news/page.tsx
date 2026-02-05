import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import siteData from '@/data/siteData';

export const metadata = {
  title: 'News | Chennai Turbo Riders',
  description: 'Latest news and updates from Chennai Turbo Riders',
};

export default function NewsPage() {
  const { news } = siteData;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      
      {/* Page Hero */}
      <section className="page-hero">
        <p className="section-label">Latest Updates</p>
        <h1 className="spaced-title-large">
          N E W S
        </h1>
      </section>

      {/* Featured Article */}
      {news.length > 0 && (
        <section style={{ padding: '4rem 0', background: 'var(--ctr-black)' }}>
          <div className="container">
            <div className="featured-article">
              <Link href={`/news/${news[0].slug}`} className="featured-article-link">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                  <div className="placeholder-img" style={{ height: '400px' }}>
                    {news[0].title}
                  </div>
                  <div>
                    <span className="news-category">{news[0].category}</span>
                    <h2 style={{ 
                      fontSize: '2.5rem', 
                      fontWeight: 900, 
                      marginBottom: '1rem',
                      lineHeight: 1.2
                    }}>
                      {news[0].title}
                    </h2>
                    <p style={{ color: 'var(--ctr-text-light)', marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: 1.7 }}>
                      {news[0].excerpt}
                    </p>
                    <p className="news-date" style={{ fontSize: '0.9rem' }}>{formatDate(news[0].publishDate)}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="news-section">
        <div className="container">
          <p className="section-label">All Articles</p>
          <h3 className="spaced-title" style={{ marginBottom: '2rem' }}>
            R E C E N T &nbsp; S T O R I E S
          </h3>
          
          <div className="news-grid">
            {news.slice(1).map((article: any) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="news-card">
                <div className="news-card-img placeholder-img" style={{ height: '200px' }}>
                  {article.title}
                </div>
                <div className="news-card-content">
                  <span className="news-category">{article.category}</span>
                  <h4 className="news-card-title">{article.title}</h4>
                  <p className="news-card-excerpt">{article.excerpt}</p>
                  <p className="news-date">{formatDate(article.publishDate)}</p>
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
