import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';

// IMPORTANT: Use the SAME supabase client instance everywhere
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const WaitlistModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const sendConfirmationEmail = async (email, token) => {
    try {
      console.log('📧 Calling email API for:', email);
      const response = await fetch('/api/send-confirmation-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token }),
      });

      const result = await response.json();
      console.log('📨 Email API response:', result);
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      return true;
    } catch (error) {
      console.error('❌ Error calling email API:', error);
      return true;
    }
  };

  const handleJoinWaitlist = async (e) => {
    if (e) e.preventDefault();
    
    if (!email.trim()) {
      setMessage('❌ Please enter your email');
      return;
    }

    if (!isValidEmail(email)) {
      setMessage('❌ Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const verificationToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
      
      console.log('🔑 Generated token:', verificationToken);
      
      const { data: existing, error: checkError } = await supabase
        .from('waitlist')
        .select('email, verified')
        .eq('email', email.trim())
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('❌ Check error:', checkError);
      }

      if (existing) {
        if (existing.verified) {
          setMessage('⚠️ This email is already on the waitlist!');
        } else {
          await sendConfirmationEmail(email.trim(), verificationToken);
          setMessage('✅ Confirmation email sent! Please check your inbox.');
        }
        setIsLoading(false);
        return;
      }

      console.log('💾 Inserting into waitlist...');
      const { data, error } = await supabase
        .from('waitlist')
        .insert([{ 
          email: email.trim(),
          created_at: new Date().toISOString(),
          verified: false,
          verification_token: verificationToken
        }]);

      if (error) {
        console.error('❌ Database error:', error);
        setMessage('❌ Failed to join waitlist. Please try again.');
        setIsLoading(false);
        return;
      }

      await sendConfirmationEmail(email.trim(), verificationToken);
      setMessage('✅ Check your email to confirm your spot!');
      setEmail('');
      
      setTimeout(() => {
        onClose();
      }, 4000);

    } catch (error) {
      console.error('💥 Unexpected error:', error);
      setMessage('❌ Unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    setMessage('');
    
    try {
      console.log('🔐 Starting Google OAuth...');
      
      // CRITICAL FIX: Use Supabase Auth for Google OAuth
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/waitlist-success`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) {
        console.error('❌ Google OAuth error:', error);
        throw error;
      }
      
      console.log('✅ Google OAuth initiated successfully');
      
    } catch (error) {
      console.error('💥 Google OAuth failed:', error);
      setMessage('❌ Failed to connect with Google. Please try email verification.');
      setIsGoogleLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-[#1A1A1A] rounded-2xl p-8 border border-[#FFFFFF]/10 shadow-2xl max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>

          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Join the Waitlist
            </h2>
            <p className="text-gray-400 mb-6">
              Secure your spot for early access.
            </p>

            {/* Google OAuth Button - FIXED */}
            <div className="mb-6">
              <button
                onClick={handleGoogleSignUp}
                disabled={isGoogleLoading}
                className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
              <p className="text-[#B3B3B3] text-xs mt-2">Instant verification</p>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#FFFFFF]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1A1A1A] text-[#B3B3B3]">Or use email</span>
              </div>
            </div>

            <form onSubmit={handleJoinWaitlist} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#2A2A2A] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-[#00A6FF] transition-colors"
                  disabled={isLoading}
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00A6FF] hover:bg-[#0088CC] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending Verification...' : 'Verify Email & Join'}
              </button>
            </form>

            {message && (
              <p className={`mt-4 text-sm ${
                message.includes('✅') ? 'text-green-400' : 
                message.includes('⚠️') ? 'text-yellow-400' : 
                'text-red-400'
              }`}>
                {message}
              </p>
            )}

            <p className="text-xs text-gray-500 mt-4">
              We'll send a confirmation email to prevent spam.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WaitlistModal;
