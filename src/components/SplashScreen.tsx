'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Fade in logo after a brief delay
    const fadeInTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 100);

    // Fade out logo
    const fadeOutTimer = setTimeout(() => {
      setLogoVisible(false);
    }, 1000); // Show for 1 seconds

    // Complete splash screen
    const completeTimer = setTimeout(() => {
      setShowSplash(false);
      // Small delay before showing content for smooth transition
      setTimeout(() => {
        setShowContent(true);
      }, 100);
    }, 2000); // Total 2 seconds

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-carbon-950">
            {/* Glow rings */}
            <AnimatePresence>
              {logoVisible && (
                <>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: [0.8, 1.2, 1.2],
                      opacity: [0, 0.3, 0.3]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1,
                      ease: "easeOut"
                    }}
                    className="absolute blur-3xl bg-racing-red rounded-full w-96 h-96"
                  />

                  {/* Logo */}
                  <motion.img
                    src="/images/logos/CTR_New_yellow.svg"
                    alt="Chennai Turbo Riders"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{
                      duration: 1,
                      ease: "easeOut"
                    }}
                    className="relative w-64 h-auto drop-shadow-[0_0_40px_rgba(247,214,25,0.4)] z-10"
                  />
                </>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
