import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InstagramFeed from '@/components/InstagramFeed';

export const metadata = {
  title: 'News | Chennai Turbo Riders',
  description: 'Latest news and updates from Chennai Turbo Riders',
};

export default function NewsPage() {
  return (
    <>
      <Navbar />
      
      {/* Page Hero */}
      <section className="page-hero">
        <p className="section-label">Latest Updates</p>
        <h1 className="spaced-title-large">
          LATEST NEWS
        </h1>
      </section>

      {/* Instagram Feed Section */}
      <section style={{ padding: '6rem 0', background: 'var(--ctr-black)' }}>
        <div className="container">
          <InstagramFeed username="chennaiturboriders" limit={9} />
        </div>
      </section>

      <Footer />
    </>
  );
}
