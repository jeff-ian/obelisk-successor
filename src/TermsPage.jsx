import React from 'react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#121212] pt-20">
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-[48px] font-bold leading-[56px] text-[#FFFFFF] mb-6">
            Terms of Service
          </h1>
          <p className="text-[20px] leading-[30px] text-[#B0B0B0] max-w-3xl mx-auto">
            Effective date: 2025-10-29
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Service overview */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              Service overview
            </h2>
            <p className="text-[16px] leading-[24px] text-[#B0B0B0]">
              Obelisk is AI-powered, in testing, may change.
            </p>
          </section>

          {/* Accounts & access */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              Accounts & access
            </h2>
            <ul className="space-y-3 text-[16px] leading-[24px] text-[#B0B0B0] list-disc list-inside">
              <li>Account required</li>
              <li>Users responsible for security</li>
            </ul>
          </section>

          {/* Ownership & content */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              Ownership & content
            </h2>
            <ul className="space-y-3 text-[16px] leading-[24px] text-[#B0B0B0] list-disc list-inside">
              <li>Users retain ownership</li>
              <li>Obelisk may store/process content to provide service</li>
            </ul>
          </section>

          {/* AI use & disclaimers */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              AI use & disclaimers
            </h2>
            <ul className="space-y-3 text-[16px] leading-[24px] text-[#B0B0B0] list-disc list-inside">
              <li>AI responses may be imperfect</li>
              <li>Service "AS IS"; no uptime warranty</li>
            </ul>
          </section>

          {/* Payments & refunds */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              Payments & refunds
            </h2>
            <ul className="space-y-3 text-[16px] leading-[24px] text-[#B0B0B0] list-disc list-inside">
              <li>Free during testing; monetization planned</li>
            </ul>
          </section>

          {/* Termination */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              Termination
            </h2>
            <ul className="space-y-3 text-[16px] leading-[24px] text-[#B0B0B0] list-disc list-inside">
              <li>Suspension for violations; users can delete accounts</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              Contact
            </h2>
            <p className="text-[16px] leading-[24px] text-[#B0B0B0]">
              support@obelisk.app
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsPage;
