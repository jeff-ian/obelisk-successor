import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from './NavigationHeader';
import Footer from './Footer';
import { markWaitlistJoined } from './utils/auth';
import { hashEmailSync } from './utils/analytics';

const WaitlistSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    markWaitlistJoined();
    
    // Track Google OAuth waitlist join
    const trackGoogleJoin = () => {
      // For Google OAuth, we don't have the email in localStorage
      // but we can track the join event without the email hash
      window?.dataLayer?.push?.({
        event: 'waitlist_joined',
        label: 'google_oauth',
        timestamp: new Date().toISOString()
      });
    };

    console.log('User successfully joined waitlist via Google OAuth');
    trackGoogleJoin();
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <NavigationHeader />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F10] to-[#1A1A1A]"></div>
        
        <div className="relative z-10 text-center max-w-2xl mx-auto w-full">
          <div className="bg-[#1A1A1A] rounded-2xl p-12 border border-[#00A6FF]/20 shadow-2xl">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Welcome to Obelisk!
            </h1>
            <p className="text-xl text-[#B3B3B3] mb-8">
              You're successfully on the waitlist! We'll notify you when early access begins.
            </p>
            
            <div className="space-y-6">
              <div className="bg-[#00A6FF]/10 rounded-xl p-6 border border-[#00A6FF]/30">
                <p className="text-[#00A6FF] font-semibold mb-3">What happens next?</p>
                <ul className="text-[#B3B3B3] space-y-2 text-left">
                  <li>• We'll email you when early access opens</li>
                  <li>• You'll get priority access to new features</li>
                  <li>• We may reach out for feedback</li>
                </ul>
              </div>
              
              <button
                onClick={() => navigate('/')}
                className="bg-[#00A6FF] hover:bg-[#0088CC] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Back to Homepage
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WaitlistSuccessPage;
