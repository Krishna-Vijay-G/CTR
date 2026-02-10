import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import siteData from '@/data/siteData';

interface DriverPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return siteData.drivers.map((driver) => ({
    id: driver.id,
  }));
}

export async function generateMetadata({ params }: DriverPageProps) {
  const { id } = await params;
  const driver = siteData.drivers.find(d => d.id === id);
  if (!driver) return { title: 'Driver Not Found' };
  
  return {
    title: `${driver.firstName} ${driver.lastName} | Chennai Turbo Riders`,
    description: driver.biography,
  };
}

export default async function DriverPage({ params }: DriverPageProps) {
  const { id } = await params;
  const driver = siteData.drivers.find(d => d.id === id);
  
  if (!driver) {
    notFound();
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const spacedName = `${driver.firstName} ${driver.lastName}`;

  // Calculate percentages for progress bars
  const maxStats = { wins: 10, poles: 10, podiums: 15, fastestLaps: 10 };
  const winsPercent = Math.min((driver.stats.raceWins / maxStats.wins) * 100, 100);
  const polesPercent = Math.min((driver.stats.polePositions / maxStats.poles) * 100, 100);
  const podiumsPercent = Math.min((driver.stats.podiums / maxStats.podiums) * 100, 100);
  const lapsPercent = Math.min((driver.stats.fastestLaps / maxStats.fastestLaps) * 100, 100);

  return (
    <div className="schedule-page">
      <video
        className="schedule-page-video"
        autoPlay
        muted
        loop
        playsInline
        poster="/video/background.mp4"
      >
        <source src="/video/background.mp4" type="video/mp4" />
      </video>
      <Navbar />
      
      <div className="schedule-page-content">
      {/* Immersive Hero */}
      <section className="driver-hero-immersive">
        <div className="driver-hero-immersive-bg">
          <img 
            src={driver.heroImage} 
            alt={`${driver.firstName} ${driver.lastName}`}
          />
        </div>
        <div className="driver-hero-immersive-overlay" />
        
        <div className="driver-hero-immersive-content">
          <div className="driver-hero-number-massive">{driver.number}</div>
          <div className="driver-hero-immersive-inner">
            <p className="driver-hero-immersive-label">Official CTR Driver</p>
            <h1 className="driver-hero-immersive-name">{spacedName}</h1>
            
            <div className="driver-hero-immersive-stats">
              <div className="driver-hero-stat-pill">
                <span className="driver-hero-stat-pill-value">{driver.stats.raceWins}</span>
                <span className="driver-hero-stat-pill-label">Wins</span>
              </div>
              <div className="driver-hero-stat-pill">
                <span className="driver-hero-stat-pill-value">{driver.stats.polePositions}</span>
                <span className="driver-hero-stat-pill-label">Poles</span>
              </div>
              <div className="driver-hero-stat-pill">
                <span className="driver-hero-stat-pill-value">{driver.stats.podiums}</span>
                <span className="driver-hero-stat-pill-label">Podiums</span>
              </div>
              <div className="driver-hero-stat-pill">
                <span className="driver-hero-stat-pill-value">{driver.stats.grandPrix}</span>
                <span className="driver-hero-stat-pill-label">Grand Prix</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Info & Content */}
      <section className="driver-details-section">
        <div className="container">
          
          {/* Info Ribbon */}
          <div className="driver-info-ribbon" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <div className="driver-info-ribbon-item">
              <div className="driver-info-ribbon-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.66 0-3 1.34-3 3v11c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3V7c0-1.66-1.34-3-3-3Zm1 14c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V10h16v8Zm0-10H4V7c0-.55.45-1 1-1h1v1h2V6h8v1h2V6h1c.55 0 1 .45 1 1v1Z" />
                </svg>
              </div>
              <div>
                <p className="driver-info-ribbon-value">{formatDate(driver.dateOfBirth)}</p>
                <p className="driver-info-ribbon-label">Date of Birth</p>
              </div>
            </div>
            
            <div className="driver-info-ribbon-item">
              <div className="driver-info-ribbon-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 2c.92 0 1.8.2 2.59.55-.23.21-.45.45-.63.71-.45.65-.63 1.47-.36 2.32.19.6.58 1.18 1.09 1.61.47.39.72.97.62 1.57-.17 1.05-1.15 1.66-2.09 1.35-.63-.21-1.08-.75-1.22-1.39l-.12-.54c-.14-.62-.76-1.02-1.38-.88-.62.14-1.02.76-.88 1.38l.12.54c.07.33.2.65.37.94-1.04.27-1.85 1.1-2.08 2.21-.06.31-.07.63-.04.94A7.97 7.97 0 0 1 4 12c0-4.41 3.59-8 8-8Zm0 16c-1.32 0-2.55-.32-3.64-.9.27-.46.45-.97.55-1.51.11-.54.55-.98 1.1-1.08 1.02-.19 2.01.47 2.2 1.49.12.62.62 1.1 1.25 1.2.96.15 1.85-.45 2.01-1.4.14-.87.54-1.66 1.14-2.28.24-.25.47-.52.68-.8.46.93.71 1.97.71 3.08 0 2.11-1.02 3.98-2.59 5.17-.83.27-1.71.43-2.63.43Z" />
                </svg>
              </div>
              <div>
                <p className="driver-info-ribbon-value">{driver.nationality}</p>
                <p className="driver-info-ribbon-label">Nationality</p>
              </div>
            </div>
            
            <div className="driver-info-ribbon-item">
              <div className="driver-info-ribbon-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4 5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16v-2H4V5Zm6 0v3h2V5h-2Zm0 5v3h2v-3h-2Zm0 5v2h2v-2h-2Zm4-5v3h2v-3h-2Zm0 5v2h2v-2h-2Zm0-10v3h2V5h-2Z" />
                </svg>
              </div>
              <div>
                <p className="driver-info-ribbon-value">{driver.height}</p>
                <p className="driver-info-ribbon-label">Height</p>
              </div>
            </div>
            
            <div className="driver-info-ribbon-item">
              <div className="driver-info-ribbon-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2c-1.1 0-2 .9-2 2v1H6l-2 5v.5C4 12.88 5.12 14 6.5 14S9 12.88 9 11.5V11L7.5 7H10v11H6v2h12v-2h-4V7h2.5L15 11v.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9l-2-5h-4V4c0-1.1-.9-2-2-2Zm-6 7.32L7.19 11H4.81L6 9.32ZM16.81 11 18 9.32 19.19 11h-2.38Z" />
                </svg>
              </div>
              <div>
                <p className="driver-info-ribbon-value">{driver.weight}</p>
                <p className="driver-info-ribbon-label">Weight</p>
              </div>
            </div>
          </div>

          <div className="section-divider-diagonal" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }} />

          {/* Performance Stats Showcase */}
          <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <h2 className="section-title">
              <span className="section-label">Performance</span>
              Career Statistics
            </h2>
            
            <div className="driver-stat-showcase">
              <div className="driver-stat-showcase-item">
                <p className="driver-stat-showcase-label">Race Wins</p>
                <p className="driver-stat-showcase-value">{driver.stats.raceWins}</p>
                <div className="driver-stat-showcase-bar">
                  <div 
                    className="driver-stat-showcase-bar-fill" 
                    style={{ width: `${winsPercent}%` }}
                  />
                </div>
              </div>
              
              <div className="driver-stat-showcase-item">
                <p className="driver-stat-showcase-label">Pole Positions</p>
                <p className="driver-stat-showcase-value">{driver.stats.polePositions}</p>
                <div className="driver-stat-showcase-bar">
                  <div 
                    className="driver-stat-showcase-bar-fill" 
                    style={{ width: `${polesPercent}%` }}
                  />
                </div>
              </div>
              
              <div className="driver-stat-showcase-item">
                <p className="driver-stat-showcase-label">Podiums</p>
                <p className="driver-stat-showcase-value">{driver.stats.podiums}</p>
                <div className="driver-stat-showcase-bar">
                  <div 
                    className="driver-stat-showcase-bar-fill" 
                    style={{ width: `${podiumsPercent}%` }}
                  />
                </div>
              </div>
              
              <div className="driver-stat-showcase-item">
                <p className="driver-stat-showcase-label">Fastest Laps</p>
                <p className="driver-stat-showcase-value">{driver.stats.fastestLaps}</p>
                <div className="driver-stat-showcase-bar">
                  <div 
                    className="driver-stat-showcase-bar-fill" 
                    style={{ width: `${lapsPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="section-divider-diagonal--reverse" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }} />

          {/* Biography & Image Split */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))', 
            gap: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)'
          }}>
            <div className="driver-bio-card">
              <div className="driver-bio-card-header">
                <h3 className="driver-bio-card-title">Biography</h3>
                <p className="driver-bio-card-subtitle">About {driver.firstName}</p>
              </div>
              <div className="driver-bio-card-content">
                <p className="driver-bio-card-text">{driver.biography}</p>
                <blockquote className="driver-bio-card-quote">
                  "{driver.quote}"
                </blockquote>
              </div>
            </div>
            
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 16px 50px rgba(0, 0, 0, 0.4)'
            }}>
              <img 
                src={driver.image} 
                alt={`${driver.firstName} ${driver.lastName}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  minHeight: '400px'
                }}
              />
            </div>
          </div>

          {/* Career Highlights */}
          <div>
            <h3 className="section-title">
              <span className="section-label">Achievements</span>
              Career Highlights
            </h3>
            <div className="achievement-cards">
              {driver.careerHighlights.map((highlight, index) => (
                <div key={index} className="achievement-card">
                  <div className="achievement-card-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17 3V2H7v1H2v3c0 2.76 2.24 5 5 5 .22 0 .43-.02.64-.05A5.97 5.97 0 0 0 11 15v3H9v2h6v-2h-2v-3a5.97 5.97 0 0 0 3.36-4.05c.21.03.42.05.64.05 2.76 0 5-2.24 5-5V3h-5Zm-8 6c-1.66 0-3-1.34-3-3V5h3v4Zm9-3c0 1.66-1.34 3-3 3V5h3v1Z" />
                    </svg>
                  </div>
                  <p className="achievement-card-text">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back to Team */}
      <section style={{ padding: '4rem 0', textAlign: 'center', background: 'transparent' }}>
        <Link href="/team" className="btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'rotate(180deg)' }}>
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
          </svg>
          Back to Team
        </Link>
      </section>

      <Footer />
      </div>
    </div>
  );
}
