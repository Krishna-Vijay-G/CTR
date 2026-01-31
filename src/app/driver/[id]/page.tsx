import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import siteData from '@/data/siteData.json';

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

  // Calculate percentages for charts
  const maxStats = { wins: 10, poles: 10, podiums: 15, points: 250 };
  const winsPercent = Math.min((driver.stats.raceWins / maxStats.wins) * 100, 100);
  const polesPercent = Math.min((driver.stats.polePositions / maxStats.poles) * 100, 100);
  const podiumsPercent = Math.min((driver.stats.podiums / maxStats.podiums) * 100, 100);
  const pointsPercent = Math.min((driver.stats.points / maxStats.points) * 100, 100);

  return (
    <>
      <Navbar />
      
      {/* Driver Hero - Professional Design */}
      <section className="driver-hero">
        <div className="driver-hero-bg" />
        
        <div className="driver-hero-content">
          <div className="driver-hero-inner">
            <div className="driver-hero-layout">
              <div className="driver-hero-text">
                <div className="driver-number-badge">{driver.number}</div>
                <p className="driver-label">Official CTR Driver</p>
                <h1 className="driver-hero-name">{spacedName}</h1>
                
                <div className="driver-stats-highlight">
                  <div className="stat-highlight">
                    <span className="stat-value">{driver.stats.raceWins}</span>
                    <span className="stat-label">Race Wins</span>
                  </div>
                  <div className="stat-highlight">
                    <span className="stat-value">{driver.stats.polePositions}</span>
                    <span className="stat-label">Pole Positions</span>
                  </div>
                  <div className="stat-highlight">
                    <span className="stat-value">{driver.stats.grandPrix}</span>
                    <span className="stat-label">Grand Prix</span>
                  </div>
                </div>
                
                <blockquote className="driver-quote">
                  "{driver.quote}"
                </blockquote>
              </div>

              <div className="driver-hero-figure">
                <div className="driver-hero-image-frame">
                  <img 
                    src={driver.heroImage} 
                    alt={`${driver.firstName} ${driver.lastName}`}
                  />
                </div>
                <div className="driver-hero-image-glow" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Details - Professional Design */}
      <section className="driver-details-section">
        <div className="container">
          
          {/* Driver Image & Info Split */}
          <div className="driver-profile-split">
            <div className="driver-profile-image">
              <img 
                src={driver.image} 
                alt={`${driver.firstName} ${driver.lastName}`}
              />
              <div className="driver-profile-overlay">
                <span className="driver-profile-number">#{driver.number}</span>
              </div>
            </div>
            
            <div className="driver-profile-info">
              <h2 className="section-title">
                <span className="section-label">Profile</span>
                Personal Information
              </h2>
              
              {/* Personal Info Grid */}
              <div className="driver-info-grid-compact">
                <div className="driver-info-item">
                  <span className="info-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.66 0-3 1.34-3 3v11c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3V7c0-1.66-1.34-3-3-3Zm1 14c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V10h16v8Zm0-10H4V7c0-.55.45-1 1-1h1v1h2V6h8v1h2V6h1c.55 0 1 .45 1 1v1Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="driver-info-value">{formatDate(driver.dateOfBirth)}</p>
                    <p className="driver-info-label">Date of Birth</p>
                  </div>
                </div>
                <div className="driver-info-item">
                  <span className="info-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M4 5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16v-2H4V5Zm6 0v3h2V5h-2Zm0 5v3h2v-3h-2Zm0 5v2h2v-2h-2Zm4-5v3h2v-3h-2Zm0 5v2h2v-2h-2Zm0-10v3h2V5h-2Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="driver-info-value">{driver.height}</p>
                    <p className="driver-info-label">Height</p>
                  </div>
                </div>
                <div className="driver-info-item">
                  <span className="info-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2c-1.1 0-2 .9-2 2v1H6l-2 5v.5C4 12.88 5.12 14 6.5 14S9 12.88 9 11.5V11L7.5 7H10v11H6v2h12v-2h-4V7h2.5L15 11v.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9l-2-5h-4V4c0-1.1-.9-2-2-2Zm-6 7.32L7.19 11H4.81L6 9.32ZM16.81 11 18 9.32 19.19 11h-2.38Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="driver-info-value">{driver.weight}</p>
                    <p className="driver-info-label">Weight</p>
                  </div>
                </div>
                <div className="driver-info-item">
                  <span className="info-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 2c.92 0 1.8.2 2.59.55-.23.21-.45.45-.63.71-.45.65-.63 1.47-.36 2.32.19.6.58 1.18 1.09 1.61.47.39.72.97.62 1.57-.17 1.05-1.15 1.66-2.09 1.35-.63-.21-1.08-.75-1.22-1.39l-.12-.54c-.14-.62-.76-1.02-1.38-.88-.62.14-1.02.76-.88 1.38l.12.54c.07.33.2.65.37.94-1.04.27-1.85 1.1-2.08 2.21-.06.31-.07.63-.04.94A7.97 7.97 0 0 1 4 12c0-4.41 3.59-8 8-8Zm0 16c-1.32 0-2.55-.32-3.64-.9.27-.46.45-.97.55-1.51.11-.54.55-.98 1.1-1.08 1.02-.19 2.01.47 2.2 1.49.12.62.62 1.1 1.25 1.2.96.15 1.85-.45 2.01-1.4.14-.87.54-1.66 1.14-2.28.24-.25.47-.52.68-.8.46.93.71 1.97.71 3.08 0 2.11-1.02 3.98-2.59 5.17-.83.27-1.71.43-2.63.43Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="driver-info-value">{driver.nationality}</p>
                    <p className="driver-info-label">Nationality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Stats Charts */}
          <div className="driver-charts-section">
            <h2 className="section-title">
              <span className="section-label">Performance</span>
              Career Statistics
            </h2>
            
            <div className="driver-charts-grid">
              {/* Circular Progress Charts */}
              <div className="chart-card">
                <div className="circular-chart">
                  <svg viewBox="0 0 100 100">
                    <circle className="chart-bg" cx="50" cy="50" r="45" />
                    <circle 
                      className="chart-progress chart-progress-wins" 
                      cx="50" cy="50" r="45"
                      style={{ '--progress': `${winsPercent}` } as React.CSSProperties}
                    />
                  </svg>
                  <div className="chart-center">
                    <span className="chart-value">{driver.stats.raceWins}</span>
                    <span className="chart-label">Wins</span>
                  </div>
                </div>
              </div>
              
              <div className="chart-card">
                <div className="circular-chart">
                  <svg viewBox="0 0 100 100">
                    <circle className="chart-bg" cx="50" cy="50" r="45" />
                    <circle 
                      className="chart-progress chart-progress-poles" 
                      cx="50" cy="50" r="45"
                      style={{ '--progress': `${polesPercent}` } as React.CSSProperties}
                    />
                  </svg>
                  <div className="chart-center">
                    <span className="chart-value">{driver.stats.polePositions}</span>
                    <span className="chart-label">Poles</span>
                  </div>
                </div>
              </div>
              
              <div className="chart-card">
                <div className="circular-chart">
                  <svg viewBox="0 0 100 100">
                    <circle className="chart-bg" cx="50" cy="50" r="45" />
                    <circle 
                      className="chart-progress chart-progress-podiums" 
                      cx="50" cy="50" r="45"
                      style={{ '--progress': `${podiumsPercent}` } as React.CSSProperties}
                    />
                  </svg>
                  <div className="chart-center">
                    <span className="chart-value">{driver.stats.podiums}</span>
                    <span className="chart-label">Podiums</span>
                  </div>
                </div>
              </div>
              
              <div className="chart-card">
                <div className="circular-chart">
                  <svg viewBox="0 0 100 100">
                    <circle className="chart-bg" cx="50" cy="50" r="45" />
                    <circle 
                      className="chart-progress chart-progress-points" 
                      cx="50" cy="50" r="45"
                      style={{ '--progress': `${pointsPercent}` } as React.CSSProperties}
                    />
                  </svg>
                  <div className="chart-center">
                    <span className="chart-value">{driver.stats.points}</span>
                    <span className="chart-label">Points</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bar Charts */}
            <div className="driver-bar-charts">
              <div className="bar-chart-item">
                <div className="bar-chart-header">
                  <span className="bar-chart-label">Race Wins</span>
                  <span className="bar-chart-value">{driver.stats.raceWins}</span>
                </div>
                <div className="bar-chart-track">
                  <div 
                    className="bar-chart-fill bar-fill-wins" 
                    style={{ '--fill-width': `${winsPercent}%` } as React.CSSProperties}
                  />
                </div>
              </div>
              
              <div className="bar-chart-item">
                <div className="bar-chart-header">
                  <span className="bar-chart-label">Pole Positions</span>
                  <span className="bar-chart-value">{driver.stats.polePositions}</span>
                </div>
                <div className="bar-chart-track">
                  <div 
                    className="bar-chart-fill bar-fill-poles" 
                    style={{ '--fill-width': `${polesPercent}%` } as React.CSSProperties}
                  />
                </div>
              </div>
              
              <div className="bar-chart-item">
                <div className="bar-chart-header">
                  <span className="bar-chart-label">Podiums</span>
                  <span className="bar-chart-value">{driver.stats.podiums}</span>
                </div>
                <div className="bar-chart-track">
                  <div 
                    className="bar-chart-fill bar-fill-podiums" 
                    style={{ '--fill-width': `${podiumsPercent}%` } as React.CSSProperties}
                  />
                </div>
              </div>
              
              <div className="bar-chart-item">
                <div className="bar-chart-header">
                  <span className="bar-chart-label">Fastest Laps</span>
                  <span className="bar-chart-value">{driver.stats.fastestLaps}</span>
                </div>
                <div className="bar-chart-track">
                  <div 
                    className="bar-chart-fill bar-fill-laps" 
                    style={{ '--fill-width': `${(driver.stats.fastestLaps / 10) * 100}%` } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="driver-bio-section">
            <div className="driver-bio">
              <h3>
                <span className="section-label">Biography</span>
                About {driver.firstName}
              </h3>
              <p>{driver.biography}</p>
            </div>
            
            <div className="driver-highlights">
              <h4>
                <span className="section-label">Achievements</span>
                Career Highlights
              </h4>
              <ul>
                {driver.careerHighlights.map((highlight, index) => (
                  <li key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="highlight-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17 3V2H7v1H2v3c0 2.76 2.24 5 5 5 .22 0 .43-.02.64-.05A5.97 5.97 0 0 0 11 15v3H9v2h6v-2h-2v-3a5.97 5.97 0 0 0 3.36-4.05c.21.03.42.05.64.05 2.76 0 5-2.24 5-5V3h-5Zm-8 6c-1.66 0-3-1.34-3-3V5h3v4Zm9-3c0 1.66-1.34 3-3 3V5h3v1Z" />
                      </svg>
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Team */}
      <section style={{ padding: '4rem 0', textAlign: 'center', background: 'var(--ctr-dark)' }}>
        <Link href="/team" className="btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'rotate(180deg)' }}>
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
          </svg>
          Back to Team
        </Link>
      </section>

      <Footer />
    </>
  );
}
