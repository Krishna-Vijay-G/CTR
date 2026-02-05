import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import siteData from '@/data/siteData';

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return siteData.news.map((article: any) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = siteData.news.find((a: any) => a.slug === params.slug);
  if (!article) return { title: 'Article Not Found' };
  
  return {
    title: `${article.title} | Chennai Turbo Riders`,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = siteData.news.find((a: any) => a.slug === params.slug);
  
  if (!article) {
    notFound();
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      
      {/* Article Hero */}
      <section className="article-hero">
        <div className="container" style={{ maxWidth: '900px' }}>
          <Link href="/news" className="back-link" style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--ctr-yellow)',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            marginBottom: '2rem'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'rotate(180deg)' }}>
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
            BACK TO NEWS
          </Link>
          
          <span className="news-category">{article.category}</span>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 900, 
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            {article.title}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--ctr-text-gray)' }}>
              {formatDate(article.publishDate)}
            </p>
            <span style={{ color: 'var(--ctr-text-gray)' }}>•</span>
            <p style={{ fontSize: '0.9rem', color: 'var(--ctr-text-gray)' }}>
              By {article.author}
            </p>
          </div>
        </div>
      </section>

      {/* Article Image */}
      <section style={{ padding: '0 0 4rem 0', background: 'var(--ctr-black)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div className="placeholder-img" style={{ height: '500px', borderRadius: '8px' }}>
            {article.title}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="article-content">
            <p className="lead-paragraph" style={{ 
              fontSize: '1.3rem', 
              lineHeight: 1.8, 
              color: 'var(--ctr-white)',
              marginBottom: '2rem',
              fontWeight: 500
            }}>
              {article.excerpt}
            </p>
            
            <div className="article-body" style={{ 
              fontSize: '1.1rem', 
              lineHeight: 1.9, 
              color: 'var(--ctr-text-light)' 
            }}>
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '1.5rem' }}>{paragraph}</p>
              ))}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="article-tags" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--ctr-gray-medium)' }}>
                <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1rem', color: 'var(--ctr-text-gray)' }}>
                  TAGS
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {article.tags.map((tag, index) => (
                    <span key={index} style={{ 
                      padding: '0.5rem 1rem', 
                      background: 'var(--ctr-gray-dark)', 
                      fontSize: '0.85rem',
                      textTransform: 'lowercase'
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* More Articles */}
      <section style={{ padding: '4rem 0', background: 'var(--ctr-dark)' }}>
        <div className="container">
          <h3 className="spaced-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            M O R E &nbsp; N E W S
          </h3>
          
          <div className="news-grid">
            {siteData.news
              .filter((a: any) => a.slug !== article.slug)
              .slice(0, 3)
              .map((article: any) => (
                <Link key={article.id} href={`/news/${article.slug}`} className="news-card">
                  <div className="news-card-img placeholder-img" style={{ height: '200px' }}>
                    {article.title}
                  </div>
                  <div className="news-card-content">
                    <span className="news-category">{article.category}</span>
                    <h4 className="news-card-title">{article.title}</h4>
                    <p className="news-date">{formatDate(article.publishDate)}</p>
                  </div>
                </Link>
              ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/news" className="btn btn-outline">
              View All News
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
