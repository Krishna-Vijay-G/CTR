"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import siteData from "@/data/siteData";

export default function NewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const news = siteData.news;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news.length]);

  const currentNews = news[currentIndex];

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <section className="py-16 md:py-24 bg-carbon-900 overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-12">
          <span className="label-text">Latest Updates</span>
          <h2 className="heading-lg mt-2">NEWS & ANNOUNCEMENTS</h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              {/* Left: Image */}
              <div className="relative overflow-hidden group order-2 lg:order-1">
                <div className="absolute -inset-1 bg-racing-red/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={currentNews.image1 || currentNews.image}
                  alt={currentNews.title}
                  className="relative w-full h-full min-h-[300px] max-h-[400px] object-contain border border-carbon-700/30 group-hover:border-racing-red/30 transition-all duration-300"
                />
              </div>

              {/* Right: Content */}
              <div className="space-y-6 order-1 lg:order-2">
                <div>
                  <span className="inline-block px-3 py-1 text-[9px] uppercase tracking-wider font-heading bg-racing-red text-carbon-950 mb-3">
                    {currentNews.category}
                  </span>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight leading-tight mb-4">
                    {currentNews.title}
                  </h3>
                </div>

                <p className="body-text text-base leading-relaxed">
                  {currentNews.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm text-carbon-500">
                  <span>{formatDate(currentNews.publishDate)}</span>
                  <span className="text-carbon-600">&middot;</span>
                  <span>By {currentNews.author}</span>
                </div>

                <Link
                  href={`/news/${currentNews.slug}`}
                  className="inline-flex items-center gap-2 btn-primary"
                >
                  Read Full Article
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1 transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-racing-red"
                    : "w-4 bg-carbon-600 hover:bg-carbon-500"
                }`}
                aria-label={`Go to news ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
