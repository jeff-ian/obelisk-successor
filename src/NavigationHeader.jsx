import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hasJoinedWaitlist } from './utils/auth';
import PrimaryCTA from './components/PrimaryCTA';

const NavigationHeader = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(true);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    setHasJoined(hasJoinedWaitlist());
    
    let scrollTimer;
    
    const handleScroll = () => {
      setIsScrolling(true);
      setShowFloatingCTA(false);
      
      clearTimeout(scrollTimer);
      
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
        setShowFloatingCTA(true);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 bg-obsidian-950/95 border-b border-obsidian-700 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-h1 hover:text-accent-purple transition-colors duration-200">
              Obelisk
            </a>
          </div>

          {/* Floating CTA Button */}
          <AnimatePresence>
            {!hasJoined && (
              <motion.div 
                className={`transition-all duration-300 ${
                  showFloatingCTA ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <PrimaryCTA 
                  variant="nav"
                  label="Join Early Access — Save Your Ideas"
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Show checkmark if user has joined */}
          {hasJoined && (
            <motion.div 
              className="flex items-center gap-2 text-accent-green"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <span>✅</span>
              <span className="text-small font-medium">You're In!</span>
            </motion.div>
          )}
        </div>
      </motion.header>
    </>
  );
};

export default NavigationHeader;
