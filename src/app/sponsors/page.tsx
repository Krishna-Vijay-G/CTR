import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import siteData from '@/data/siteData';

export const metadata = {
  title: 'Sponsors | Chennai Turbo Riders',
  description: 'Our valued partners and sponsors who make CTR racing possible',
};

export default function SponsorsPage() {
  const { sponsors } = siteData;

  const groupedSponsors = {
    title: sponsors.title,
    principal: sponsors.principal,
    official: sponsors.official,
    technical: sponsors.technical || [],
  };

  return (
    <>
      <Navbar />
      
      {/* Page Hero */}
      <section className="page-hero">
        <p className="section-label">Our Partners</p>
        <h1 className="spaced-title-large">
          S P O N S O R S
        </h1>
      </section>

      {/* Partnership Message */}
      <section style={{ padding: '4rem 0', background: 'var(--ctr-black)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <p style={{ fontSize: '1.3rem', lineHeight: 1.8, color: 'var(--ctr-text-light)' }}>
            Chennai Turbo Riders is proud to partner with leading organizations that share our passion 
            for motorsport excellence. Together, we're driving the future of racing in India.
          </p>
        </div>
      </section>

      {/* Title Sponsor */}
      {groupedSponsors.title.length > 0 && (
        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <p className="section-label" style={{ textAlign: 'center' }}>Title Sponsor</p>
            
            {groupedSponsors.title.map(sponsor => (
              <div key={sponsor.id} className="title-sponsor-card" style={{
                display: 'grid',
                gridTemplateColumns: '300px 1fr',
                gap: '3rem',
                alignItems: 'center',
                padding: '3rem',
                background: 'var(--ctr-black)',
                marginTop: '2rem'
              }}>
                <div className="placeholder-img sponsor-logo-large" style={{ height: '200px' }}>
                  {sponsor.name}
                </div>
                <div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>{sponsor.name}</h3>
                  <p style={{ color: 'var(--ctr-text-light)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                    {sponsor.description}
                  </p>
                  <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Visit Website
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Principal Partners */}
      {groupedSponsors.principal.length > 0 && (
        <section style={{ padding: '4rem 0', background: 'var(--ctr-dark)' }}>
          <div className="container">
            <p className="section-label" style={{ textAlign: 'center' }}>Principal Partners</p>
            <h3 className="spaced-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              P R I N C I P A L &nbsp; P A R T N E R S
            </h3>
            
            <div className="sponsors-grid principal" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {groupedSponsors.principal.map(sponsor => (
                <div key={sponsor.id} className="sponsor-card" style={{
                  padding: '2rem',
                  background: 'var(--ctr-black)',
                  textAlign: 'center'
                }}>
                  <div className="placeholder-img" style={{ height: '120px', marginBottom: '1.5rem' }}>
                    {sponsor.name}
                  </div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem' }}>{sponsor.name}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--ctr-text-light)', marginBottom: '1rem' }}>
                    {sponsor.description}
                  </p>
                  <a href={sponsor.website} target="_blank" rel="noopener noreferrer" style={{
                    color: 'var(--ctr-yellow)',
                    fontSize: '0.85rem',
                    letterSpacing: '0.05em'
                  }}>
                    Visit →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Official Partners */}
      {groupedSponsors.official.length > 0 && (
        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <p className="section-label" style={{ textAlign: 'center' }}>Official Partners</p>
            <h3 className="spaced-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              O F F I C I A L &nbsp; P A R T N E R S
            </h3>
            
            <div className="sponsors-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {groupedSponsors.official.map(sponsor => (
                <a key={sponsor.id} href={sponsor.website} target="_blank" rel="noopener noreferrer" className="sponsor-card" style={{
                  padding: '2rem',
                  background: 'var(--ctr-black)',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                  border: '1px solid transparent'
                }}>
                  <div className="placeholder-img" style={{ height: '80px', marginBottom: '1rem' }}>
                    {sponsor.name}
                  </div>
                  <h4 style={{ color: 'var(--ctr-white)', fontSize: '1rem', fontWeight: 600 }}>{sponsor.name}</h4>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technical Partners */}
      {groupedSponsors.technical.length > 0 && (
        <section style={{ padding: '4rem 0', background: 'var(--ctr-dark)' }}>
          <div className="container">
            <p className="section-label" style={{ textAlign: 'center' }}>Technical Partners</p>
            <h3 className="spaced-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              T E C H N I C A L &nbsp; P A R T N E R S
            </h3>
            
            <div className="sponsors-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {groupedSponsors.technical.map((sponsor: any) => (
                <div key={sponsor.id} className="sponsor-card" style={{
                  padding: '1.5rem',
                  background: 'var(--ctr-black)',
                  textAlign: 'center'
                }}>
                  <div className="placeholder-img" style={{ height: '60px', marginBottom: '0.75rem', fontSize: '0.8rem' }}>
                    {sponsor.name}
                  </div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 500 }}>{sponsor.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partnership Inquiry */}
      <section style={{ padding: '6rem 0', textAlign: 'center', background: 'var(--ctr-black)' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <p className="section-label">Become a Partner</p>
          <h2 className="spaced-title" style={{ marginBottom: '1.5rem' }}>
            J O I N &nbsp; U S
          </h2>
          <p style={{ color: 'var(--ctr-text-light)', marginBottom: '2rem', lineHeight: 1.8 }}>
            Interested in partnering with Chennai Turbo Riders? Connect with us to explore 
            sponsorship opportunities and be part of India's premier racing team.
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
