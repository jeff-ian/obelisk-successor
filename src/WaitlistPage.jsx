import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import NavigationHeader from './NavigationHeader';
import Footer from './Footer';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const WaitlistPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleJoinWaitlist = async () => {
    if (!email.trim()) {
      setMessage('❌ Please enter your email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('❌ Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setMessage('');

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ 
        email: email.trim(),
        signup_method: 'email',
        created_at: new Date().toISOString()
      }]);

    if (error) {
      if (error.code === '23505') {
        setMessage('⚠️ This email is already on the waitlist!');
      } else {
        setMessage('❌ Failed to join waitlist. Please try again.');
      }
    } else {
      setMessage('✅ Successfully joined the waitlist!');
      setEmail('');
    }

    setIsLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    setMessage('');
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/waitlist-success`,
        }
      });
      
      if (error) throw error;
      
    } catch (error) {
      console.error('Google OAuth error:', error);
      setMessage('❌ Failed to sign up with Google. Please try again.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <NavigationHeader />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F10] to-[#1A1A1A]"></div>
        
        <div className="relative z-10 text-center max-w-2xl mx-auto w-full">
          <div className="bg-[#1A1A1A] rounded-2xl p-12 border border-[#FFFFFF]/10 shadow-2xl">
            <div className="text-6xl mb-6">🚀</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Join Early Access
            </h1>
            <p className="text-xl text-[#B3B3B3] mb-8">
              Secure your spot with a verified account.
            </p>
            
            {/* Google OAuth Button */}
            <div className="mb-8">
              <button
                onClick={handleGoogleSignUp}
                disabled={isGoogleLoading}
                className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg flex items-center justify-center gap-3"
              >
                {isGoogleLoading ? (
                  'Connecting to Google...'
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign up with Google
                  </>
                )}
              </button>
              <p className="text-[#B3B3B3] text-sm mt-3">Recommended - instant verification</p>
            </div>
            
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#FFFFFF]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1A1A1A] text-[#B3B3B3]">Or continue with email</span>
              </div>
            </div>
            
            {/* Email Form */}
            <div className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleJoinWaitlist()}
                  className="w-full p-4 rounded-xl text-black border border-gray-300 focus:border-[#00A6FF] focus:outline-none transition-colors duration-200 text-lg"
                  disabled={isLoading}
                />
              </div>
              
              <button
                onClick={handleJoinWaitlist}
                disabled={isLoading}
                className="w-full bg-[#00A6FF] hover:bg-[#0088CC] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
              >
                {isLoading ? 'Joining Waitlist...' : 'Continue with Email'}
              </button>
              
              {message && (
                <p className={`text-lg ${
                  message.includes('✅') ? 'text-green-400' : 
                  message.includes('⚠️') ? 'text-yellow-400' : 
                  'text-red-400'
                }`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WaitlistPage;
