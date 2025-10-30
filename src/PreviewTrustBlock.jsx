import React from 'react';
import PrimaryCTA from './components/PrimaryCTA';

const PreviewTrustBlock = () => {
  return (
    <section id="preview-trust" className="bg-[#121212] py-16 px-6 border-t border-[#FFFFFF]/10">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 opacity-0 animate-fadeIn">
          <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-4">
            See Obelisk in Action
          </h2>
          <p className="text-[16px] leading-[24px] text-[#B3B3B3] max-w-2xl mx-auto">
            Interactive previews of V1 UI — static screenshots and guided micro-animations.
          </p>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Preview Column - Left */}
          <div className="bg-gradient-to-b from-[#121215] to-[#141416] rounded-[16px] p-6 border border-[#FFFFFF]/10 opacity-0 animate-fadeIn hover:scale-[1.02] transition-all duration-150">
            <h3 className="text-[28px] font-medium text-[#FFFFFF] mb-4">Preview</h3>
            <p className="text-[16px] text-[#B3B3B3] mb-6">
              Static UI previews and short walkthrough GIFs (if available).
            </p>
            
            {/* Preview Image Placeholder */}
            <div className="bg-[#1A1A1A] rounded-[12px] p-4 aspect-video flex items-center justify-center border border-[#FFFFFF]/5">
              <div className="text-center">
                <div className="text-[48px] mb-2">📱</div>
                <p className="text-[14px] text-[#B3B3B3]">V1 preview — static mock</p>
              </div>
            </div>
          </div>

          {/* Problem → Solution Cards - Center */}
          <div className="space-y-6 opacity-0 animate-fadeIn" style={{animationDelay: '100ms'}}>
            <div className="bg-[#1A1A1A] rounded-[16px] p-6 border border-[#FFFFFF]/5 hover:scale-[1.02] transition-all duration-150">
              <h3 className="text-[16px] font-medium text-[#FFFFFF] mb-2">Problem: Ideas get lost</h3>
              <p className="text-[14px] text-[#B3B3B3]">
                Solution: Obelisk detects topic shifts and keeps conversations organized.
              </p>
            </div>
            
            <div className="bg-[#1A1A1A] rounded-[16px] p-6 border border-[#FFFFFF]/5 hover:scale-[1.02] transition-all duration-150">
              <h3 className="text-[16px] font-medium text-[#FFFFFF] mb-2">Problem: Finding past insights is slow</h3>
              <p className="text-[14px] text-[#B3B3B3]">
                Solution: Jumpback navigation returns you to the exact discussion point.
              </p>
            </div>
          </div>

          {/* Trust Signals - Right */}
          <div className="bg-[#1A1A1A] rounded-[16px] p-6 border border-[#FFFFFF]/5 opacity-0 animate-fadeIn" style={{animationDelay: '200ms'}}>
            <h3 className="text-[20px] font-semibold text-[#FFFFFF] mb-4">Safety & Privacy</h3>
            <ul className="space-y-3 text-[14px] text-[#B3B3B3]">
              <li className="flex items-start">
                <span className="mr-2">🔒</span>
                EU storage (Supabase — Stockholm, Sweden; GDPR protections)
              </li>
              <li className="flex items-start">
                <span className="mr-2">🔐</span>
                Passwords hashed (bcrypt) — HTTPS/TLS in transit
              </li>
              <li className="flex items-start">
                <span className="mr-2">📤</span>
                You own & can delete/export all conversations
              </li>
            </ul>
            
            {/* Small CTA */}
            <div className="mt-6">
              <PrimaryCTA 
                variant="inline"
                label="Get Early Access"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewTrustBlock;
