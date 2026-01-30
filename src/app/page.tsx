import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DriverCard from '@/components/DriverCard';
import CountdownTimer from '@/components/CountdownTimer';
import siteData from '@/data/siteData.json';
import HeroSlider from '@/components/HeroSlider';

export default function Home() {
  const { site, car, drivers, races, news, sponsors } = siteData;
  const nextRace = races.calendar[0];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'short' 
    });
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Slider */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* season label remains above slider */}
        <div style={{ position: 'absolute', left: '2rem', top: '2.5rem', zIndex: 2 }}>
          <p className="section-label">Season {races.season} • {races.seasonName}</p>
        </div>
        {/* slider component */}
        <HeroSlider />
      </div>

      {/* Car Section - Ferrari Style */}
      <section className="car-section">
        <div className="container">
          <div className="car-showcase">
            <div className="car-info">
              <p className="section-label">{car.year} Season Car</p>
              <h2 className="spaced-title-large">
                C T R<br /><span>R A C E R</span>
              </h2>
              <p>
                Experience the power and precision of Chennai Turbo Riders' racing machine. 
                Built for speed, engineered for victory on both traditional circuits and 
                India's first street circuit night race.
              </p>
              <Link href="/about" className="btn btn-outline">
                Learn More
              </Link>
            </div>
            <div className="car-image">
              <div className="placeholder-img" style={{ height: '400px', borderRadius: '8px' }}>
                🏎️ {car.name}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drivers Section - Ferrari Style */}
      <section className="drivers-section">
        <div className="container">
          <div className="drivers-header">
            <p className="section-label">Official Drivers</p>
            <h2 className="spaced-title-large">O U R &nbsp; T E A M</h2>
          </div>
          
          <div className="drivers-grid">
            {drivers.map(driver => (
              <DriverCard key={driver.id} driver={driver} />
            ))}
          </div>
        </div>
      </section>

      {/* Countdown Section - Ferrari Style */}
      <section className="countdown-section">
        <div className="container">
          <p className="countdown-label">Next Race Starts In</p>
          <CountdownTimer targetDate={nextRace.dateStart} />
          
          <div className="next-race-info">
            <span className="next-race-flag">{nextRace.flagEmoji}</span>
            <div className="next-race-details">
              <p className="next-race-date">
                {formatDate(nextRace.dateStart)} - {formatDate(nextRace.dateEnd)} {new Date(nextRace.dateEnd).getFullYear()}
              </p>
              <p className="next-race-name">{nextRace.name}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Race Calendar Preview - Ferrari Style */}
      <section className="calendar-section">
        <div className="container">
          <div className="calendar-header">
            <p className="section-label">{races.seasonName}</p>
            <h2 className="spaced-title-large">R A C E &nbsp; C A L E N D A R</h2>
          </div>
          
          <div className="race-list">
            {races.calendar.slice(0, 5).map((race, index) => (
              <div key={race.round} className={`race-item ${index === 0 ? 'next' : ''}`}>
                <span className="race-round">Round {String(race.round).padStart(2, '0')}</span>
                <div className="race-info">
                  <span className="race-flag">{race.flagEmoji}</span>
                  <div className="race-details">
                    <h4>{race.name}</h4>
                    <p className="race-location">{race.location}, {race.country}</p>
                    {(race.isNightRace || race.isStreetCircuit) && (
                      <div className="race-badges">
                        {race.isNightRace && <span className="race-badge">Night Race</span>}
                        {race.isStreetCircuit && <span className="race-badge">Street</span>}
                      </div>
                    )}
                  </div>
                </div>
                <span className="race-date">
                  {formatDate(race.dateStart)} - {formatDate(race.dateEnd)}
                </span>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/schedule" className="btn btn-primary">View Full Calendar</Link>
          </div>
        </div>
      </section>

      {/* News Section - Ferrari Style */}
      <section className="news-section">
        <div className="container">
          <div className="news-header">
            <div>
              <p className="section-label">Latest Updates</p>
              <h2 className="spaced-title" style={{ fontSize: '2.5rem' }}>N E W S</h2>
            </div>
            <Link href="/news" className="view-all-link">
              View All
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </Link>
          </div>
          
          <div className="news-grid">
            {news.slice(0, 3).map(article => (
              <Link key={article.id} href={`/news/${article.slug}`} className="news-card">
                <div className="news-card-image">
                  <div className="placeholder-img">{article.category}</div>
                </div>
                <div className="news-card-content">
                  <span className="news-category">{article.category}</span>
                  <h3 className="news-title">{article.title}</h3>
                  <p className="news-excerpt">{article.excerpt}</p>
                  <span className="news-date">
                    {new Date(article.publishDate).toLocaleDateString('en-US', { 
                      day: '2-digit', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section - Ferrari Style */}
      <section className="sponsors-section">
        <div className="container">
          <div className="sponsors-header">
            <p className="section-label">Our Partners</p>
            <h2 className="spaced-title-large">S P O N S O R S</h2>
          </div>
          
          {sponsors.title.length > 0 && (
            <div className="sponsors-tier title">
              <p className="sponsors-tier-title">Title Sponsor</p>
              <div className="sponsors-grid">
                {sponsors.title.map(sponsor => (
                  <a key={sponsor.id} href={sponsor.website} target="_blank" rel="noopener noreferrer">
                    <img src={sponsor.logo} alt={sponsor.name} className="sponsor-logo" />
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {sponsors.official.length > 0 && (
            <div className="sponsors-tier">
              <p className="sponsors-tier-title">Official Partners</p>
              <div className="sponsors-grid">
                {sponsors.official.map(sponsor => (
                  <a key={sponsor.id} href={sponsor.website} target="_blank" rel="noopener noreferrer">
                    <img src={sponsor.logo} alt={sponsor.name} className="sponsor-logo" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
