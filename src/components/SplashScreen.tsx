'use client';

import { useEffect, useState } from 'react';

interface SplashScreenProps {
  children: React.ReactNode;
}

export default function SplashScreen({ children }: SplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000); // Show for 1 second

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <img
            src="/images/logos/CTR_yellow.png"
            alt="CTR Logo"
            className="loading-logo"
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}