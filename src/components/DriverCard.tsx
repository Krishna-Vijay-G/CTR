import Link from 'next/link';
import { Driver } from '@/types';

interface DriverCardProps {
  driver: Driver;
}

export default function DriverCard({ driver }: DriverCardProps) {
  return (
    <Link href={`/driver/${driver.id}`} className="driver-card">
      <div className="driver-card-image">
        {driver.image ? (
          <img
            src={driver.image}
            alt={`${driver.firstName} ${driver.lastName}`}
          />
        ) : (
          <div className="placeholder-img">
            {driver.firstName} {driver.lastName}
          </div>
        )}
      </div>
      <div className="driver-card-overlay">
        <span className="driver-number">{driver.number}</span>
        <h3 className="driver-name">{driver.lastName}</h3>
        <p className="driver-country">
          <span>{driver.flagEmoji}</span>
          {driver.nationality}
        </p>
        <span className="driver-cta">
          Discover
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
          </svg>
        </span>
      </div>
    </Link>
  );
}
