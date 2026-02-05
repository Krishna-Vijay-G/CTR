import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CountdownTimer from '@/components/CountdownTimer';
import siteData from '@/data/siteData.json';

export const metadata = {
  title: 'Race Calendar | Chennai Turbo Riders',
  description: 'View the complete race calendar for Chennai Turbo Riders in the Indian Racing League',
};

export default function SchedulePage() {
  const { races } = siteData;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'short' 
    });
  };

  const nextRace = races.calendar[0];

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
            backgroundColor: 'transparent', 
            zIndex: 1 
          }}></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p className="section-label">{races.seasonName}</p>
            <h1 className="spaced-title-large">
              RACE&nbsp;<span>CALENDAR</span>
            </h1>
          </div>
        </section>

      {/* Countdown */}
      <section className="countdown-section" style={{ padding: '4rem 0' }}>
        <div className="container">
          <p className="countdown-label">Next Race Starts In</p>
          <CountdownTimer targetDate={nextRace.dateStart} />
          
          <div className="next-race-info">
            <span className="next-race-flag">{nextRace.flagEmoji}</span>
            <div className="next-race-details">
              <p className="next-race-date">
                {formatDate(nextRace.dateStart)} - {formatDate(nextRace.dateEnd)} {new Date(nextRace.dateEnd).getFullYear()}
              </p>
              <p className="next-race-name">{nextRace.name}, {nextRace.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Calendar */}
      <section className="calendar-section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="race-list">
            {races.calendar.map((race, index) => (
              <div key={race.round} className={`race-item ${index === 0 ? 'next' : ''}`}>
                <span className="race-round">Round {String(race.round).padStart(2, '0')}</span>
                <div className="race-info">
                  <span className="race-flag">{race.flagEmoji}</span>
                  <div className="race-details">
                    <h4>{race.name}</h4>
                    <p
                      className="race-location"
                      aria-label={`${race.location}, ${race.country}`}
                    >
                      <span className="race-location-flag" aria-hidden="true">
                        {race.flagEmoji}
                      </span>
                      <span>{race.location}</span>
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--ctr-text-gray)', marginTop: '0.25rem' }}>
                      Circuit: {race.circuitLength} • {race.laps} Laps
                    </p>
                    {(race.isNightRace || race.isStreetCircuit) && (
                      <div className="race-badges">
                        {race.isNightRace && <span className="race-badge">Night Race</span>}
                        {race.isStreetCircuit && <span className="race-badge">Street Circuit</span>}
                      </div>
                    )}
                  </div>
                </div>
                <span className="race-date">
                  {formatDate(race.dateStart)} - {formatDate(race.dateEnd)} {new Date(race.dateEnd).getFullYear()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Street Circuit Info */}
      <section className="street-section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <p className="section-label" style={{ textAlign: 'center' }}>Special Event</p>
          <h2 className="spaced-title" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>
            {races.streetCircuit.name.toUpperCase()}
          </h2>
          <div className="street-panel">
            {races.streetCircuit.image && (
              <div style={{ marginBottom: '2rem' }}>
                <img
                  src={races.streetCircuit.image}
                  alt={`${races.streetCircuit.name} map`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
            )}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '2rem', 
              marginBottom: '2rem' 
            }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--ctr-yellow)' }}>
                  {races.streetCircuit.length}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--ctr-text-gray)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Circuit Length
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--ctr-yellow)' }}>
                  {races.streetCircuit.capacity.toLocaleString()}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--ctr-text-gray)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Capacity
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--ctr-yellow)' }}>
                  {races.streetCircuit.stands}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--ctr-text-gray)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Grandstands
                </p>
              </div>
            </div>
            
            <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', letterSpacing: '0.1em' }}>Circuit Route</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {races.streetCircuit.route.map((point, index) => (
                <span key={index} style={{ 
                  padding: '0.5rem 1rem', 
                  background: 'var(--ctr-gray-medium)', 
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {point}
                  {index < races.streetCircuit.route.length - 1 && (
                    <span style={{ color: 'var(--ctr-yellow)' }}>→</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </div>
  );
}
