"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

interface Slide {
  id: string;
  image: string;
  title: string;
}

const slides: Slide[] = [
  { id: 's1', image: '/images/car/hero.jpg', title: 'THE GEN2-F4 IS BACK ON TRACK' },
  { id: 's2', image: '/images/team/team.jpg', title: 'CHENNAI TURBO RIDERS' },
  { id: 's3', image: '/images/calender/goa.jpg', title: 'STREET RACE IN GOA' },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function startTimer() {
    stopTimer();
    timerRef.current = setTimeout(() => {
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
    <section className="hero-slider" aria-label="Hero image slider">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`hero-slide ${i === index ? 'active' : ''}`}
          style={{ backgroundImage: `url(${s.image})` }}
          aria-hidden={i !== index}
        >
          <div className="hero-slide-overlay">
            <h2 className="hero-slide-title">{s.title}</h2>
            <div className="hero-slide-cta">
              <Link href="/news" className="btn btn-primary">
                DISCOVER
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="hero-dots" role="tablist" aria-label="Slide navigation">
        {slides.map((s, i) => (
          <button
            key={s.id}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
