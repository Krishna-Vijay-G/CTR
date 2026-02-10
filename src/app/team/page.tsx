"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import siteData from '@/data/siteData';
import { HorizontalScrollCarousel } from '@/components/ui/horizontal-scroll-carousel';

export default function TeamPage() {
  const { site, teamPrincipal, drivers } = siteData;

  const irlDrivers = drivers.filter((d) => d.championship === 'IRL');
  const f4Drivers = drivers.filter((d) => d.championship === 'F4');

  const totalWins = drivers.reduce((s, d) => s + d.stats.raceWins, 0);
  const totalPodiums = drivers.reduce((s, d) => s + d.stats.podiums, 0);
  const totalPoints = drivers.reduce((s, d) => s + d.stats.points, 0);

  return (
    <>
      <Navbar />

      {/* Hero — with watermark */}
      <div style={{ backgroundImage: 'url(/images/car/hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <section className="page-hero" style={{ position: 'relative', background: 'none', overflow: 'hidden' }}>
          <div className="hero-watermark">CTR</div>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p className="section-label">Season {site.currentSeason}</p>
            <h1 className="spaced-title-large">OUR <span>TEAM</span></h1>
          </div>
        </section>
      </div>

      {/* Team Principal — Card layout */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0', background: 'var(--ctr-dark)' }}>
        <div className="container">
          <div className="principal-card">
            <div className="principal-card-image">
              <img
                src={teamPrincipal.image}
                alt={teamPrincipal.name}
                loading="lazy"
              />
            </div>
            <div className="principal-card-content">
              <p className="section-label">{teamPrincipal.title}</p>
              <h2 className="spaced-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', marginBottom: '1rem' }}>
                {teamPrincipal.name.toUpperCase()}
              </h2>
              <p style={{ color: 'var(--ctr-text-light)', fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)', lineHeight: 1.8 }}>
                Leading Chennai Turbo Riders with vision and passion, {teamPrincipal.name} has been
                instrumental in establishing the team as a competitive force in the Indian Racing League.
                Under their leadership, CTR has grown to include both local Chennai-based talent and
                international racing stars.
              </p>
              <div className="principal-quote">
                &ldquo;Racing is in our DNA. CTR represents the future of Indian motorsport —
                where talent meets opportunity on the world stage.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider-diagonal" />

      {/* Team Stats — Dashboard strip */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', background: 'var(--ctr-black)' }}>
        <div className="container">
          <p className="section-label" style={{ textAlign: 'center' }}>Team Statistics</p>
          <h3 className="spaced-title" style={{ textAlign: 'center', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', marginBottom: '1.5rem' }}>
            SEASON STATS
          </h3>
          <div className="stats-dashboard">
            {[
              { val: drivers.length, label: 'Drivers' },
              { val: totalWins, label: 'Wins' },
              { val: totalPodiums, label: 'Podiums' },
              { val: totalPoints, label: 'Points' },
            ].map((item) => (
              <div className="stats-dashboard-item" key={item.label}>
                <p className="stats-dashboard-value">{item.val}</p>
                <p className="stats-dashboard-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-diagonal--reverse" />

      {/* IRL Drivers */}
      <section
        className="drivers-section"
        style={{
          padding: 'clamp(2rem, 5vw, 4rem) 0 0 0',
          position: 'relative',
          backgroundImage: 'url(/images/car/hero2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 0 }} />
        <div className="container" style={{ marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
          <div className="drivers-header">
            <div className="championship-ribbon">
              <span className="championship-ribbon-dot" />
              <span className="championship-ribbon-text">2025 Indian Racing League &bull; Wolf GB08</span>
            </div>
            <h2 className="spaced-title-large">IRL <span style={{ color: 'var(--ctr-yellow)' }}>DRIVERS</span></h2>
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <HorizontalScrollCarousel
            items={irlDrivers.map((d) => ({ id: d.id, image: d.image, firstName: d.firstName, lastName: d.lastName, number: d.number, flagEmoji: d.flagEmoji }))}
          />
        </div>
      </section>

      {/* F4 Drivers */}
      <section
        className="drivers-section"
        style={{
          padding: 'clamp(2rem, 5vw, 4rem) 0',
          position: 'relative',
          backgroundImage: 'url(/images/car/hero2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 0 }} />
        <div className="container" style={{ marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
          <div className="drivers-header">
            <div className="championship-ribbon">
              <span className="championship-ribbon-dot" />
              <span className="championship-ribbon-text">2025 Indian F4 Championship</span>
            </div>
            <h2 className="spaced-title-large">F4 <span style={{ color: 'var(--ctr-yellow)' }}>DRIVERS</span></h2>
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <HorizontalScrollCarousel
            items={f4Drivers.map((d) => ({ id: d.id, image: d.image, firstName: d.firstName, lastName: d.lastName, number: d.number, flagEmoji: d.flagEmoji }))}
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
