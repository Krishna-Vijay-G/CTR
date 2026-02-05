'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link href="/" className="nav-logo">
        <Image 
          src="/images/logos/CTR_yellow.png" 
          alt="Chennai Turbo Riders" 
          width={100} 
          height={100}
        />
      </Link>

      <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        <li><Link href="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link href="/team" className="nav-link" onClick={() => setMenuOpen(false)}>Team</Link></li>
        <li><Link href="/schedule" className="nav-link" onClick={() => setMenuOpen(false)}>Calendar</Link></li>
        <li><Link href="/news" className="nav-link" onClick={() => setMenuOpen(false)}>News</Link></li>
        <li><Link href="/sponsors" className="nav-link" onClick={() => setMenuOpen(false)}>Partners</Link></li>
        <li><Link href="/about" className="nav-link" onClick={() => setMenuOpen(false)}>About</Link></li>
      </ul>

      <button 
        className="nav-toggle" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
