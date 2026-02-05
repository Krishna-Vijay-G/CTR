import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import siteData from '@/data/siteData';

export const metadata = {
  title: 'About | Chennai Turbo Riders',
  description: 'Learn about Chennai Turbo Riders - India\'s premier racing team in the Indian Racing League',
};

export default function AboutPage() {
  const { site, teamPrincipal, drivers, races, sponsors } = siteData;

  return (
    <>
      <Navbar />
      
      {/* Page Hero */}
      <section className="page-hero" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <p className="section-label">Welcome to</p>
          <h1 className="spaced-title-large">
            C H E N N A I<br />
            <span>T U R B O &nbsp; <br />R I D E R S</span>
          </h1>
        </div>
      </section>

      {/* About Intro */}
      <section style={{ padding: '6rem 0', background: 'var(--ctr-black)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <p className="section-label">Our Story</p>
              <h2 className="spaced-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                T H E &nbsp; T E A M
              </h2>
              <p style={{ color: 'var(--ctr-text-light)', fontSize: '1.1rem', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                Chennai Turbo Riders represents the spirit of motorsport excellence in India. 
                Based in the vibrant city of Chennai, we compete in the prestigious Indian Racing League, 
                bringing together world-class talent and cutting-edge technology.
              </p>
              <p style={{ color: 'var(--ctr-text-light)', fontSize: '1.1rem', lineHeight: 1.9 }}>
                Our team combines international racing expertise with homegrown Indian talent, 
                creating a unique blend that pushes the boundaries of what's possible on the track.
              </p>
            </div>
            <div className="placeholder-img" style={{ height: '400px', borderRadius: '8px' }}>
              Team Image
            </div>
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div className="stat-block">
              <p style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--ctr-yellow)', lineHeight: 1 }}>
                {drivers.length}
              </p>
              <p style={{ fontSize: '0.85rem', letterSpacing: '0.1em', color: 'var(--ctr-text-gray)', marginTop: '0.5rem' }}>
                DRIVERS
              </p>
            </div>
            <div className="stat-block">
              <p style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--ctr-yellow)', lineHeight: 1 }}>
                {site.currentSeason}
              </p>
              <p style={{ fontSize: '0.85rem', letterSpacing: '0.1em', color: 'var(--ctr-text-gray)', marginTop: '0.5rem' }}>
                CURRENT SEASON
              </p>
            </div>
            <div className="stat-block">
              <p style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--ctr-yellow)', lineHeight: 1 }}>
                {races.calendar.length}
              </p>
              <p style={{ fontSize: '0.85rem', letterSpacing: '0.1em', color: 'var(--ctr-text-gray)', marginTop: '0.5rem' }}>
                RACES
              </p>
            </div>
            <div className="stat-block">
              <p style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--ctr-yellow)', lineHeight: 1 }}>
                {Object.values(sponsors).flat().length}
              </p>
              <p style={{ fontSize: '0.85rem', letterSpacing: '0.1em', color: 'var(--ctr-text-gray)', marginTop: '0.5rem' }}>
                SPONSORS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section style={{ padding: '4rem 0', background: 'var(--ctr-dark)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <p className="section-label" style={{ textAlign: 'center' }}>Leadership</p>
          <h2 className="spaced-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            T E A M &nbsp; P R I N C I P A L
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '250px 1fr', 
            gap: '3rem', 
            alignItems: 'center',
            padding: '2rem',
            background: 'var(--ctr-black)'
          }}>
            <div className="placeholder-img" style={{ height: '300px', borderRadius: '8px' }}>
              {teamPrincipal.name}
            </div>
            <div>
              <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {teamPrincipal.name}
              </h3>
              <p style={{ 
                color: 'var(--ctr-yellow)', 
                fontSize: '0.9rem', 
                letterSpacing: '0.1em', 
                marginBottom: '1.5rem' 
              }}>
                {teamPrincipal.title.toUpperCase()}
              </p>
              <p style={{ color: 'var(--ctr-text-light)', lineHeight: 1.8 }}>
                Leading Chennai Turbo Riders with a vision to establish the team as a dominant force 
                in Indian motorsport, our Team Principal brings together talent, technology, and teamwork 
                to achieve racing excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chennai Street Circuit */}
      <section style={{ padding: '6rem 0', background: 'var(--ctr-black)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <p className="section-label" style={{ textAlign: 'center' }}>Home Race</p>
          <h2 className="spaced-title-large" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            C H E N N A I &nbsp; <span>S T R E E T &nbsp; C I R C U I T</span>
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            {races.streetCircuit.image ? (
              <img
                src={races.streetCircuit.image}
                alt={`${races.streetCircuit.name} map`}
                style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '8px' }}
              />
            ) : (
              <div className="placeholder-img" style={{ height: '350px', borderRadius: '8px' }}>
                Street Circuit Map
              </div>
            )}
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                  <div>
                    <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--ctr-yellow)' }}>
                      {races.streetCircuit.length}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--ctr-text-gray)', letterSpacing: '0.1em' }}>
                      CIRCUIT LENGTH
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--ctr-yellow)' }}>
                      {races.streetCircuit.capacity.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--ctr-text-gray)', letterSpacing: '0.1em' }}>
                      SPECTATOR CAPACITY
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--ctr-yellow)' }}>
                      {races.streetCircuit.stands}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--ctr-text-gray)', letterSpacing: '0.1em' }}>
                      GRANDSTANDS
                    </p>
                  </div>
                </div>
              </div>
              
              <h4 style={{ fontSize: '0.9rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>CIRCUIT ROUTE</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {races.streetCircuit.route.map((point, index) => (
                  <span key={index} style={{ 
                    padding: '0.5rem 0.75rem', 
                    background: 'var(--ctr-gray-dark)', 
                    fontSize: '0.8rem'
                  }}>
                    {point}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indian Racing League */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <p className="section-label">The Championship</p>
          <h2 className="spaced-title" style={{ marginBottom: '2rem' }}>
            I N D I A N &nbsp; R A C I N G &nbsp; L E A G U E
          </h2>
          <p style={{ color: 'var(--ctr-text-light)', fontSize: '1.1rem', lineHeight: 1.9, marginBottom: '2rem' }}>
            The Indian Racing League (IRL) is India's premier single-seater racing championship, 
            featuring the Formula 4 South East Asia cars. With races across India's most iconic cities, 
            the IRL brings world-class motorsport action to the subcontinent.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
            <div>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ctr-yellow)' }}>F4</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--ctr-text-gray)' }}>CAR CATEGORY</p>
            </div>
            <div>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ctr-yellow)' }}>SEA</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--ctr-text-gray)' }}>SPECIFICATION</p>
            </div>
            <div>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ctr-yellow)' }}>FMSCI</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--ctr-text-gray)' }}>SANCTIONED BY</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: '4rem 0', background: 'var(--ctr-dark)' }}>
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <p className="section-label">Get in Touch</p>
          <h2 className="spaced-title" style={{ marginBottom: '2rem' }}>
            C O N T A C T
          </h2>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ color: 'var(--ctr-text-light)', marginBottom: '0.5rem' }}>
              <strong>Website:</strong> {site.officialWebsite}
            </p>
            <p style={{ color: 'var(--ctr-text-light)' }}>
              <strong>Base:</strong> Chennai, Tamil Nadu, India
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <a href="#" className="btn btn-outline">Instagram</a>
            <a href="#" className="btn btn-outline">Twitter</a>
            <a href="#" className="btn btn-outline">YouTube</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
