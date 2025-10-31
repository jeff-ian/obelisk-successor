import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const WaitlistSuccessPage = () => {
  const [status, setStatus] = useState('loading');
  const [userEmail, setUserEmail] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleVerification = async () => {
      try {
        console.log('🔄 Handling email verification callback...');
        
        // Check if this is an email verification (magic link)
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');
        
        if (token_hash && type === 'email') {
          // This is an email verification callback
          const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
            token_hash,
            type: 'email'
          });

          if (verifyError) {
            console.error('Email verification error:', verifyError);
            throw verifyError;
          }

          if (verifyData.user?.email) {
            const userEmail = verifyData.user.email;
            setUserEmail(userEmail);
            console.log('✅ Email verified:', userEmail);

            // Add verified email to waitlist
            await addToWaitlist(userEmail);
          }
        } else {
          // Handle Google OAuth or direct access
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            const userEmail = session.user.email;
            setUserEmail(userEmail);
            console.log('✅ User authenticated:', userEmail);
            await addToWaitlist(userEmail);
          } else {
            console.log('❌ No verification found');
            setStatus('no-verification');
          }
        }
      } catch (error) {
        console.error('💥 Error in verification flow:', error);
        setStatus('error');
      }
    };

    const addToWaitlist = async (email) => {
      try {
        // Check if email already exists in waitlist
        const { data: existingEntry, error: checkError } = await supabase
          .from('waitlist')
          .select('email')
          .eq('email', email)
          .single();

        if (checkError && checkError.code !== 'PGRST116') {
          throw checkError;
        }

        // If email doesn't exist in waitlist, add it
        if (!existingEntry) {
          console.log('📝 Adding verified email to waitlist:', email);
          const { data: waitlistData, error: waitlistError } = await supabase
            .from('waitlist')
            .insert([{ 
              email: email,
              created_at: new Date().toISOString(),
              verified: true
            }])
            .select();

          if (waitlistError) {
            console.error('Waitlist insert error:', waitlistError);
            if (waitlistError.code !== '23505') {
              throw waitlistError;
            }
          }
          console.log('✅ Successfully added to waitlist:', waitlistData);
        } else {
          console.log('ℹ️ Email already in waitlist');
        }

        setStatus('success');
        sessionStorage.removeItem('waitlist_redirect');
        
      } catch (error) {
        console.error('Error adding to waitlist:', error);
        throw error;
      }
    };

    handleVerification();
  }, [searchParams]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-center"
        >
          <div className="text-6xl mb-6">⏳</div>
          <h1 className="text-3xl font-bold mb-4">Verifying your email...</h1>
          <p className="text-gray-400">Please wait while we secure your spot.</p>
        </motion.div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white text-center max-w-md w-full"
        >
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome to the Waitlist!
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Your email <strong>{userEmail}</strong> has been verified!
          </p>
          <p className="text-gray-400 mb-8">
            You're officially on our early access list. We'll notify you when we launch.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="bg-[#00A6FF] hover:bg-[#0088CC] text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg"
          >
            Return to Homepage
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white text-center max-w-md w-full"
      >
        <div className="text-6xl mb-6">❌</div>
        <h1 className="text-3xl font-bold mb-4">Verification Failed</h1>
        <p className="text-gray-400 mb-6">
          {status === 'no-verification' 
            ? 'No verification found. Please use the signup form.'
            : 'There was an error verifying your email. Please try again.'
          }
        </p>
        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-[#00A6FF] hover:bg-[#0088CC] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            Return to Homepage
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default WaitlistSuccessPage;
