import React, { useState, useEffect } from 'react';
import NavigationHeader from './NavigationHeader';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import PreviewTrustBlock from './PreviewTrustBlock';
import HowItWorksSection from './HowItWorksSection';
import PrimaryCTASection from './PrimaryCTASection';
import BottomNavigation from './BottomNavigation';
import Footer from './Footer';
import { hasJoinedWaitlist } from './utils/auth';

function LandingPage() {
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    setHasJoined(hasJoinedWaitlist());
  }, []);

  if (hasJoined) {
    return (
      <div className="min-h-screen bg-[#121212] text-white">
        <NavigationHeader />
        
        {/* Success State Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 px-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F10] to-[#1A1A1A]"></div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Welcome to Obelisk!
            </h1>
            <p className="text-xl md:text-2xl text-[#B3B3B3] mb-8 max-w-3xl mx-auto leading-relaxed">
              You're on the waitlist! We'll notify you when early access begins.
            </p>
            
            <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#00A6FF]/20 max-w-md mx-auto">
              <h3 className="text-2xl font-semibold text-[#00A6FF] mb-4">What's Next?</h3>
              <ul className="text-[#B3B3B3] space-y-3 text-left">
                <li>• Watch your email for early access invite</li>
                <li>• Follow us for product updates</li>
                <li>• Spread the word about Obelisk</li>
              </ul>
            </div>
          </div>
        </section>

        <FeaturesSection />
        <PreviewTrustBlock />
        <HowItWorksSection />
        <BottomNavigation />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <NavigationHeader />
      <HeroSection />
      <FeaturesSection />
      <PreviewTrustBlock />
      <HowItWorksSection />
      <PrimaryCTASection />
      <BottomNavigation />
      <Footer />
    </div>
  );
}

export default LandingPage;
