import React from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import PrimaryCTA from './components/PrimaryCTA';
import { hasJoinedWaitlist } from './utils/auth';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const HeroSection = () => {
  const hasJoined = hasJoinedWaitlist();

  // Enhanced Joined State
  if (hasJoined) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <ParticleBackground />
        <motion.div 
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          role="status"
        >
          <motion.div 
            className="text-6xl mb-6"
            variants={itemVariants}
          >
            🎉
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
            variants={itemVariants}
          >
            Welcome to Obelisk!
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-[#B3B3B3] mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            You're on the waitlist — watch your email for your invite.
          </motion.p>
          
          <motion.div 
            className="mt-6 max-w-md mx-auto p-6 bg-[#1A1A1A] border border-[#00A6FF]/20 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-2xl text-[#00A6FF] mb-4">What's next?</h3>
            <ul className="text-[#B3B3B3] space-y-2 text-left">
              <li>• Watch your email for an invite</li>
              <li>• Follow us on <a href="https://twitter.com/obelisk" className="text-[#00A6FF] hover:underline">X</a> for updates</li>
              <li>• Help shape features — reply to our onboarding email</li>
            </ul>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  // Regular State (Not Joined)
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <motion.div 
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-display mb-6 bg-gradient-to-r from-obsidian-50 to-obsidian-200 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          See Your Thoughts. Master Your Ideas.
        </motion.h1>
        
        <motion.p 
          className="text-h2 text-obsidian-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Obelisk organizes your AI interactions and personal insights in real time, mapping your knowledge so nothing is ever lost.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <PrimaryCTA 
            variant="hero"
            label="Join Early Access — Save Your Ideas"
          />
          <button 
            className="border border-obsidian-400 text-obsidian-200 hover:bg-obsidian-400 hover:text-obsidian-900 font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
          >
            Learn More
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
