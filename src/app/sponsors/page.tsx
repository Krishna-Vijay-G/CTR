import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import siteData from '@/data/siteData';

export const metadata = {
  title: 'Sponsors | Chennai Turbo Riders',
  description: 'Our valued partners and sponsors who make CTR racing possible',
};

export default function SponsorsPage() {
  const { sponsors } = siteData;

  const grouped = {
    title: sponsors.title,
    principal: sponsors.principal,
    official: sponsors.official,
    technical: sponsors.technical || [],
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="page-hero">
        <p className="section-label">Our Partners</p>
        <h1 className="spaced-title-large">SPONSORS</h1>
      </section>

      {/* Partnership Message */}
      <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 0', background: 'var(--ctr-black)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', lineHeight: 1.85, color: 'var(--ctr-text-light)' }}>
            Chennai Turbo Riders is proud to partner with leading organizations that share our passion
            for motorsport excellence. Together, we&apos;re driving the future of racing in India.
          </p>
        </div>
      </section>

      {/* Title Sponsor */}
      {grouped.title.length > 0 && (
        <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 0' }}>
          <div className="container">
            <p className="section-label" style={{ textAlign: 'center' }}>Title Sponsor</p>
            {grouped.title.map((s) => (
              <div key={s.id} className="title-sponsor-card grid-sidebar-content-lg" style={{ padding: 'clamp(1.5rem, 3vw, 3rem)', background: 'var(--ctr-gray-dark)', marginTop: '1.5rem', borderRadius: '12px' }}>
                <div className="sponsor-logo-large" style={{ height: 'clamp(120px, 18vw, 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={s.fullLogo || s.logo} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, marginBottom: '0.75rem' }}>{s.name}</h3>
                  <p style={{ color: 'var(--ctr-text-light)', marginBottom: '1.25rem', lineHeight: 1.8, fontSize: 'clamp(0.88rem, 1.1vw, 1rem)' }}>
                    {s.description}
                  </p>
                  <a href={s.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Visit Website
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Principal Partners */}
      {grouped.principal.length > 0 && (
        <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 0', background: 'var(--ctr-dark)' }}>
          <div className="container">
            <p className="section-label" style={{ textAlign: 'center' }}>Principal Partners</p>
            <h3 className="spaced-title" style={{ textAlign: 'center', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', marginBottom: '2rem' }}>
              PRINCIPAL PARTNERS
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
              {grouped.principal.map((s) => (
                <div key={s.id} className="sponsor-card">
                  <div style={{ height: 'clamp(80px, 12vw, 120px)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <img src={s.logo} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <h4 style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', fontWeight: 700, marginBottom: '0.5rem' }}>{s.name}</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--ctr-text-light)', marginBottom: '0.75rem', lineHeight: 1.7 }}>
                    {s.description}
                  </p>
                  <a href={s.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ctr-yellow)', fontSize: '0.82rem', letterSpacing: '0.05em' }}>
                    Visit &rarr;
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Official Partners */}
      {grouped.official.length > 0 && (
        <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 0' }}>
          <div className="container">
            <p className="section-label" style={{ textAlign: 'center' }}>Official Partners</p>
            <h3 className="spaced-title" style={{ textAlign: 'center', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', marginBottom: '2rem' }}>
              OFFICIAL PARTNERS
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
              {grouped.official.map((s) => (
                <a key={s.id} href={s.website} target="_blank" rel="noopener noreferrer" className="sponsor-card" style={{ textDecoration: 'none' }}>
                  <div style={{ height: 'clamp(50px, 8vw, 80px)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}>
                    <img src={s.logo} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <h4 style={{ color: 'var(--ctr-white)', fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', fontWeight: 600 }}>{s.name}</h4>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technical Partners */}
      {grouped.technical.length > 0 && (
        <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 0', background: 'var(--ctr-dark)' }}>
          <div className="container">
            <p className="section-label" style={{ textAlign: 'center' }}>Technical Partners</p>
            <h3 className="spaced-title" style={{ textAlign: 'center', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', marginBottom: '2rem' }}>
              TECHNICAL PARTNERS
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: 'clamp(0.5rem, 1vw, 1rem)' }}>
              {grouped.technical.map((s: any) => (
                <div key={s.id} className="sponsor-card">
                  <div style={{ height: 'clamp(40px, 6vw, 60px)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}>
                    <img src={s.logo} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <p style={{ fontSize: '0.82rem', fontWeight: 500 }}>{s.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partnership Inquiry */}
      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 0', textAlign: 'center', background: 'var(--ctr-black)' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <p className="section-label">Become a Partner</p>
          <h2 className="spaced-title" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', marginBottom: '1.25rem' }}>
            JOIN US
          </h2>
          <p style={{ color: 'var(--ctr-text-light)', marginBottom: '1.5rem', lineHeight: 1.8, fontSize: 'clamp(0.9rem, 1.1vw, 1rem)' }}>
            Interested in partnering with Chennai Turbo Riders? Connect with us to explore
            sponsorship opportunities and be part of India&apos;s premier racing team.
          </p>
          <a href="mailto:sponsors@chennaiturboriders.in" className="btn btn-primary">
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
