import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { markWaitlistJoined } from '../utils/auth';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const WaitlistModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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

    try {
      // EXACT SAME LOGIC AS YOUR CURRENT PAGE
      const { data, error } = await supabase
        .from('waitlist')
        .insert([{ 
          email: email.trim()
        }]);

      if (error) {
        if (error.code === '23505') {
          setMessage('⚠️ You have already joined the waitlist!');
        } else {
          setMessage('❌ Failed to join the waitlist');
          console.error(error);
        }
      } else {
        // Success
        markWaitlistJoined(email.trim());
        setMessage('✅ Successfully joined the waitlist!');
        
        // Analytics
        window?.dataLayer?.push?.({
          event: 'waitlist_joined',
          label: 'email_modal'
        });

        // Close modal after success
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      setMessage('❌ An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/waitlist-success`,
        }
      });
      
      if (error) {
        console.error('Google OAuth error:', error);
        setMessage('❌ Failed to sign up with Google. Please try again.');
        setIsLoading(false);
      }
      // If no error, the redirect will happen automatically
      
    } catch (error) {
      console.error('Unexpected Google OAuth error:', error);
      setMessage('❌ Failed to sign up with Google. Please try again.');
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#FFFFFF]/10 shadow-2xl max-w-md w-full relative"
        role="dialog"
        aria-labelledby="waitlist-modal-title"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#B3B3B3] hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-[#2A2A2A]"
          aria-label="Close modal"
          disabled={isLoading}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h2 id="waitlist-modal-title" className="text-2xl font-bold text-white mb-2">
            Join Early Access
          </h2>
          <p className="text-[#B3B3B3]">
            Secure your spot with a verified account.
          </p>
        </div>

        <div className="mb-6">
          <button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>
          <p className="text-[#B3B3B3] text-sm mt-2 text-center">Recommended - instant verification</p>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#FFFFFF]/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#1A1A1A] text-[#B3B3B3]">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full p-3 rounded-xl text-black border border-gray-300 focus:border-[#00A6FF] focus:outline-none transition-colors duration-200 text-base"
              aria-label="Email address for early access"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00A6FF] hover:bg-[#0088CC] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base"
          >
            {isLoading ? 'Joining Waitlist...' : 'Continue with Email'}
          </button>
        </form>

        {message && (
          <p 
            className={`mt-4 text-center ${
              message.includes('✅') ? 'text-green-400' : 
              message.includes('⚠️') ? 'text-yellow-400' : 
              'text-red-400'
            }`}
            role="alert"
          >
            {message}
          </p>
        )}

        <button
          onClick={onClose}
          className="w-full mt-4 text-[#B3B3B3] hover:text-white transition-colors duration-200 py-2"
          disabled={isLoading}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
};

export default WaitlistModal;
