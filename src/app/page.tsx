"use client";

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DriverCard from '@/components/DriverCard';
import CountdownTimer from '@/components/CountdownTimer';
import InstagramFeed from '@/components/InstagramFeed';
import siteData from '@/data/siteData';
import HeroSlider from '@/components/HeroSlider';
import { HorizontalScrollCarousel } from '@/components/ui/horizontal-scroll-carousel';

export default function Home() {
  const { site, car, drivers, races, news, sponsors } = siteData;
  const nextRace = races.calendar[0];
  const driverImages = drivers.map(driver => driver.image);

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
        <div className="hero-season-label" style={{ position: 'absolute', left: '2rem', top: '5rem', zIndex: 2 }}>
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
                CTR<br /><span>RACING</span>
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
              <img src={car.image} alt={car.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Drivers Section - Ferrari Style */}
      <section className="drivers-section" style={{ padding: 0 }}>
        <div className="container" style={{ marginBottom: '2rem' }}>
          <div className="drivers-header">
            <p className="section-label">Official Drivers</p>
            <h2 className="spaced-title-large">OUR TEAM</h2>
          </div>
        </div>
        
        <HorizontalScrollCarousel 
          items={drivers.map(driver => ({
            id: driver.id,
            image: driver.image,
            firstName: driver.firstName,
            lastName: driver.lastName,
            number: driver.number,
            flagEmoji: driver.flagEmoji
          }))} 
        />
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
            <h2 className="spaced-title-large">RACE CALENDER</h2>
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

      {/* News Section - Instagram Feed */}
      <section className="news-section">
        <div className="container">
          <div className="news-header">
            <div>
              <p className="section-label">Latest Updates</p>
              <h2 className="spaced-title resp-section-title">N E W S</h2>
            </div>
            <Link href="/news" className="view-all-link">
              View All Posts
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </Link>
          </div>
          
          <InstagramFeed username="chennaiturboriders" limit={3} />
        </div>
      </section>

      {/* Sponsors Section - Ferrari Style */}
      <section className="sponsors-section">
        <div className="container">
          <div className="sponsors-header">
            <p className="section-label">Our Partners</p>
            <h2 className="spaced-title-large">SPONSORS</h2>
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
          
          {sponsors.principal.length > 0 && (
            <div className="sponsors-tier">
              <p className="sponsors-tier-title">Principal Partners</p>
              <div className="sponsors-grid">
                {sponsors.principal.map(sponsor => (
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
