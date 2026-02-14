"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import siteData from "@/data/siteData";
import AnimatedSection from "./AnimatedSection";

export default function Contact() {
  const { contact, socialMedia, site } = siteData;
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${contact.email}?subject=Contact from ${formState.name}&body=${encodeURIComponent(formState.message)}`;
    window.open(mailtoLink);
  };

  return (
    <section id="contact" className="relative section-padding overflow-hidden bg-carbon-900">
      <div className="absolute inset-0 bg-carbon-fiber opacity-20" />

      {/* Red accent line top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-racing-red/50 to-transparent" />

      <div className="relative z-10 section-container">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[2px] bg-carbon-600" />
            <span className="label-text">Get In Touch</span>
            <div className="w-8 h-[2px] bg-carbon-600" />
          </div>
          <h2 className="heading-lg">
            <span className="text-white">CONTACT </span>
            <span className="text-racing-red">US</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Left: Contact Info */}
          <AnimatedSection direction="left">
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 flex items-center justify-center border border-carbon-600/30 text-racing-red flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-carbon-400 font-heading block mb-1">Email</span>
                  <a href={`mailto:${contact.email}`} className="text-white hover:text-racing-red transition-colors font-medium">
                    {contact.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 flex items-center justify-center border border-carbon-600/30 text-racing-red flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-carbon-400 font-heading block mb-1">Phone</span>
                  <span className="text-white font-medium">{contact.phone}</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 flex items-center justify-center border border-carbon-600/30 text-racing-red flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-carbon-400 font-heading block mb-1">Location</span>
                  <span className="text-white font-medium">{contact.address}</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-6 border-t border-carbon-700/30">
                <span className="text-[10px] uppercase tracking-[0.25em] text-carbon-400 font-heading block mb-4">Follow Us</span>
                <div className="flex gap-3">
                  {Object.entries(socialMedia).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center border border-carbon-600/30 text-carbon-400 
                      hover:border-racing-red hover:text-racing-red transition-all duration-300"
                      aria-label={platform}
                    >
                      <SocialIcon platform={platform} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Contact Form */}
          <AnimatedSection direction="right" delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-carbon-400 font-heading block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-5 py-3 bg-carbon-800 border border-carbon-600/30 text-white font-body 
                  focus:border-racing-red focus:outline-none transition-colors duration-300 placeholder:text-carbon-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-carbon-400 font-heading block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-5 py-3 bg-carbon-800 border border-carbon-600/30 text-white font-body 
                  focus:border-racing-red focus:outline-none transition-colors duration-300 placeholder:text-carbon-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-carbon-400 font-heading block mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-5 py-3 bg-carbon-800 border border-carbon-600/30 text-white font-body 
                  focus:border-racing-red focus:outline-none transition-colors duration-300 resize-none placeholder:text-carbon-500"
                  placeholder="Your message..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full justify-center"
              >
                Send Message
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  const size = "w-4 h-4";
  switch (platform) {
    case "instagram":
      return (
        <svg className={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "twitter":
      return (
        <svg className={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    default:
      return null;
  }
}
