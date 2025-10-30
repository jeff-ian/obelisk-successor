import React from 'react';
import PrimaryCTA from './components/PrimaryCTA';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#121212] pt-20">
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-[48px] font-bold leading-[56px] text-[#FFFFFF] mb-6">
            About Obelisk
          </h1>
        </div>

        <div className="max-w-3xl mx-auto space-y-12">
          
          {/* Our Mission */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              Our mission
            </h2>
            <p className="text-[16px] leading-[24px] text-[#B0B0B0]">
              We help thoughtful people capture, organize, and return to their best ideas — automatically.
            </p>
          </section>

          {/* Why we built Obelisk */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              Why we built Obelisk
            </h2>
            <p className="text-[16px] leading-[24px] text-[#B0B0B0]">
              Ideas scatter across chats and files. Obelisk keeps your thinking coherent.
            </p>
          </section>

          {/* Who this is for */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              Who this is for
            </h2>
            <p className="text-[16px] leading-[24px] text-[#B0B0B0]">
              Founders, researchers, creators, and anyone working across many conversations.
            </p>
          </section>

          {/* The team */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              The team
            </h2>
            <p className="text-[16px] leading-[24px] text-[#B0B0B0]">
              Building privacy-first, simple tools for organized thinking.
            </p>
          </section>

          {/* CTA Section */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#00A6FF]/20 text-center">
            <h2 className="text-[28px] font-medium leading-[34px] text-[#FFFFFF] mb-6">
              Want to try?
            </h2>
            <div className="flex justify-center">
              <PrimaryCTA 
                variant="inline"
                label="Join Early Access →"
              />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;
