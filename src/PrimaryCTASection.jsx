import React from 'react';
import PrimaryCTA from './components/PrimaryCTA';
import EarlyAccessBadge from './components/EarlyAccessBadge';

const PrimaryCTASection = () => {
  return (
    <section id="primary-cta" className="bg-[#121212] py-16 px-8 border-t border-[#FFFFFF]/10">
      <div className="max-w-[1200px] mx-auto text-center">
        
        {/* Urgency Badge */}
        <EarlyAccessBadge />
        
        {/* Headline */}
        <h2 className="text-[36px] font-bold leading-[44px] text-[#FFFFFF] mb-6 opacity-0 animate-fadeIn">
          Ready to Transform Your Thinking?
        </h2>
        
        {/* Subheadline */}
        <p className="text-[20px] leading-[30px] text-[#B0B0B0] mb-12 max-w-2xl mx-auto opacity-0 animate-fadeIn" style={{animationDelay: '200ms'}}>
          Join our early access community and be among the first to experience Obelisk.
        </p>
        
        {/* CTA Button */}
        <div className="opacity-0 animate-fadeIn" style={{animationDelay: '400ms'}}>
          <PrimaryCTA 
            variant="hero"
            label="Get Early Access"
          />
        </div>
      </div>
    </section>
  );
};

export default PrimaryCTASection;
