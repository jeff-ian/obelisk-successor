import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-[#121212] pt-20">
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-[48px] font-bold leading-[56px] text-[#FFFFFF] mb-6">
            Privacy Policy
          </h1>
          <p className="text-[20px] leading-[30px] text-[#B0B0B0] max-w-3xl mx-auto">
            Last updated: 2025-10-29
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Who controls your data */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              Who controls your data
            </h2>
            <p className="text-[16px] leading-[24px] text-[#B0B0B0]">
              Controller: Obelisk. Contact: privacy@obelisk.app
            </p>
          </section>

          {/* Data we collect */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              Data we collect
            </h2>
            <ul className="space-y-3 text-[16px] leading-[24px] text-[#B0B0B0] list-disc list-inside">
              <li>Email</li>
              <li>Account data: username, hashed password (bcrypt)</li>
              <li>Conversation content & timestamps</li>
              <li>Technical data: IP, browser info, session</li>
            </ul>
          </section>

          {/* How we use data */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              How we use data
            </h2>
            <ul className="space-y-3 text-[16px] leading-[24px] text-[#B0B0B0] list-disc list-inside">
              <li>Provide service</li>
              <li>Authenticate & secure accounts</li>
              <li>Improve features (with consent)</li>
              <li>Send product updates</li>
            </ul>
          </section>

          {/* Hosting & third parties */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              Hosting & third parties
            </h2>
            <ul className="space-y-3 text-[16px] leading-[24px] text-[#B0B0B0] list-disc list-inside">
              <li>Supabase (AWS Stockholm)</li>
              <li>OpenRouter API</li>
              <li>No sale of personal data</li>
            </ul>
          </section>

          {/* Your rights */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              Your rights
            </h2>
            <ul className="space-y-3 text-[16px] leading-[24px] text-[#B0B0B0] list-disc list-inside">
              <li>Access, download, correct, request deletion</li>
              <li>Deleted accounts removed within 30 days; backups purged 90 days</li>
            </ul>
          </section>

          {/* Children */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              Children
            </h2>
            <ul className="space-y-3 text-[16px] leading-[24px] text-[#B0B0B0] list-disc list-inside">
              <li>Not for under 13; parental consent for 13–17</li>
            </ul>
          </section>

          {/* Changes */}
          <section className="bg-[#1A1A1A] rounded-2xl p-8">
            <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-6">
              Changes
            </h2>
            <ul className="space-y-3 text-[16px] leading-[24px] text-[#B0B0B0] list-disc list-inside">
              <li>Notify users via update date/email</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
