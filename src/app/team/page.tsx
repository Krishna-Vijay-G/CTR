"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DriverCard from '@/components/DriverCard';
import siteData from '@/data/siteData.json';
import { HorizontalScrollCarousel } from '@/components/ui/horizontal-scroll-carousel';

export default function TeamPage() {
  const { site, teamPrincipal, drivers } = siteData;
  
  // Separate drivers by championship
  const irlDrivers = drivers.filter(driver => driver.championship === 'IRL');
  const f4Drivers = drivers.filter(driver => driver.championship === 'F4');
  
  const driverImages = drivers.map(driver => driver.image);

  // Calculate team stats
  const totalWins = drivers.reduce((sum, d) => sum + d.stats.raceWins, 0);
  const totalPodiums = drivers.reduce((sum, d) => sum + d.stats.podiums, 0);
  const totalPoints = drivers.reduce((sum, d) => sum + d.stats.points, 0);

  return (
    <>
      <Navbar />
      
      <div style={{ 
        backgroundImage: 'url(/images/car/hero.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Page Hero */}
        <section
          className="page-hero"
          style={{
            position: 'relative',
            background: 'none',
            backgroundColor: 'transparent'
          }}
        >
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 1 
          }}></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p className="section-label">Season {site.currentSeason}</p>
            <h1 className="spaced-title-large">
              O U R &nbsp; <span>T E A M</span>
            </h1>
          </div>
        </section>

        {/* Team Principal Section */}
        <section style={{ padding: '4rem 0', position: 'relative' }}>
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 1 
          }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '350px 1fr', 
              gap: '3rem', 
              alignItems: 'center' 
            }}>
              <img 
                src={teamPrincipal.image} 
                alt={teamPrincipal.name} 
                className="placeholder-img zoom-effect" 
                style={{ height: '400px', borderRadius: '8px', width: '100%', objectFit: 'cover' }} 
              />
              <div>
                <p className="section-label">{teamPrincipal.title}</p>
                <h2 className="spaced-title" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
                {teamPrincipal.name.toUpperCase()}
                </h2>
                <p style={{ color: 'var(--ctr-text-light)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Leading Chennai Turbo Riders with vision and passion, {teamPrincipal.name} has been 
                  instrumental in establishing the team as a competitive force in the Indian Racing League. 
                  Under their leadership, CTR has grown to include both local Chennai-based talent and 
                  international racing stars, making it one of India's most diverse and exciting racing teams.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Team Stats */}
      <section className="countdown-section" style={{ padding: '4rem 0' }}>
        <div className="container">
          <p className="section-label" style={{ textAlign: 'center' }}>Team Statistics</p>
          <h3 className="spaced-title" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>
            SEASON STATS
          </h3>
          
          <div className="countdown-timer" style={{ marginBottom: 0 }}>
            <div className="countdown-item">
              <span className="countdown-value" style={{ color: 'var(--ctr-yellow)' }}>{drivers.length}</span>
              <span className="countdown-unit">Drivers</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value" style={{ color: 'var(--ctr-yellow)' }}>{totalWins}</span>
              <span className="countdown-unit">Wins</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value" style={{ color: 'var(--ctr-yellow)' }}>{totalPodiums}</span>
              <span className="countdown-unit">Podiums</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value" style={{ color: 'var(--ctr-yellow)' }}>{totalPoints}</span>
              <span className="countdown-unit">Points</span>
            </div>
          </div>
        </div>
      </section>

      {/* IRL Drivers Section */}
      <section
        className="drivers-section"
        style={{
          padding: '4rem 0 0 0',
          position: 'relative',
          backgroundImage: 'url(/images/car/hero2.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 0
          }}
        ></div>
        <div className="container" style={{ marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
          <div className="drivers-header">
            <p className="section-label">2025 Indian Racing League (Wolf GB08)</p>
            <h2 className="spaced-title-large">IRL <span style={{ color: 'var(--ctr-yellow)' }}>DRIVERS</span></h2>
          </div>
        </div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <HorizontalScrollCarousel 
            items={irlDrivers.map(driver => ({
              id: driver.id,
              image: driver.image,
              lastName: driver.lastName,
              number: driver.number,
              flagEmoji: driver.flagEmoji
            }))} 
          />
        </div>
      </section>

      {/* F4 Drivers Section */}
      <section
        className="drivers-section"
        style={{
          padding: '4rem 0',
          position: 'relative',
          backgroundImage: 'url(/images/car/hero2.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 0
          }}
        ></div>
        <div className="container" style={{ marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
          <div className="drivers-header">
            <p className="section-label">2025 Indian F4 Championship</p>
            <h2 className="spaced-title-large">F4 <span style={{ color: 'var(--ctr-yellow)' }}>DRIVERS</span></h2>
          </div>
        </div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <HorizontalScrollCarousel 
            items={f4Drivers.map(driver => ({
              id: driver.id,
              image: driver.image,
              lastName: driver.lastName,
              number: driver.number,
              flagEmoji: driver.flagEmoji
            }))} 
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
