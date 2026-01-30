"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
}

const slides: Slide[] = [
  { id: 's1', image: '/images/car/hero.jpg', title: 'THE SF-26 IS BACK ON TRACK', subtitle: 'FOR A FURTHER 174 LAPS' },
  { id: 's2', image: '/images/car/hero2.jpg', title: 'CHENNAI TURBO RIDERS', subtitle: 'SEASON 4 LINEUP' },
  { id: 's3', image: '/images/car/hero3.jpg', title: 'NIGHT RACE IN CHENNAI', subtitle: 'STREET CIRCUIT SPECIAL' }
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
            {s.subtitle && <p className="hero-slide-sub">{s.subtitle}</p>}
            <div className="hero-slide-cta">
              <Link href="/not-found" className="btn btn-outline">DISCOVER</Link>
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
