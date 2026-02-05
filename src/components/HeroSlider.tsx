"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

interface Slide {
  id: string;
  image: string;
  title: string;
}

const slides: Slide[] = [
  { id: 's1', image: '/images/car/hero.jpg', title: 'THE SF-26 IS BACK ON TRACK' },
  { id: 's2', image: '/images/car/hero2.jpg', title: 'CHENNAI TURBO RIDERS' },
  { id: 's3', image: '/images/car/hero3.jpg', title: 'NIGHT RACE IN CHENNAI' }
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [index]);

  function startTimer() {
    stopTimer();
    timerRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
  }

  function stopTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  return (
    <section className="hero-slider">
      {slides.map((s, i) => (
        <div key={s.id} className={`hero-slide ${i === index ? 'active' : ''}`} style={{ backgroundImage: `url(${s.image})` }}>
          <div className="hero-slide-overlay">
            <h2 className="hero-slide-title">{s.title}</h2>
            <div className="hero-slide-cta">
              <Link href="/not-found" className="btn">
                DISCOVER
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="hero-dots">
        {slides.map((s, i) => (
          <button key={s.id} className={`dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} aria-label={`Go to slide ${i+1}`} />
        ))}
      </div>
    </section>
  );
}
