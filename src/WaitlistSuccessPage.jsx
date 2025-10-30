import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const WaitlistSuccessPage = () => {
  const [status, setStatus] = useState('loading');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleAuthSuccess = async () => {
      try {
        console.log('🔄 Handling Google Auth callback...');
        
        // Get the current session after OAuth redirect
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        if (session?.user) {
          const userEmail = session.user.email;
          setUserEmail(userEmail);
          console.log('✅ User authenticated:', userEmail);

          // Check if user already exists in waitlist
          const { data: existingEntry, error: checkError } = await supabase
            .from('waitlist')
            .select('email')
            .eq('email', userEmail)
            .single();

          if (checkError && checkError.code !== 'PGRST116') {
            console.error('Check error:', checkError);
            throw checkError;
          }

          // If user doesn't exist in waitlist, add them
          if (!existingEntry) {
            console.log('📝 Adding user to waitlist:', userEmail);
            const { data: waitlistData, error: waitlistError } = await supabase
              .from('waitlist')
              .insert([{ 
                email: userEmail,
                created_at: new Date().toISOString()
              }])
              .select();

            if (waitlistError) {
              console.error('Waitlist insert error:', waitlistError);
              if (waitlistError.code !== '23505') { // Ignore duplicate key errors
                throw waitlistError;
              }
            }
            console.log('✅ Successfully added to waitlist:', waitlistData);
          } else {
            console.log('ℹ️ User already in waitlist');
          }

          setStatus('success');
          
          // Clear the redirect flag
          sessionStorage.removeItem('waitlist_redirect');
          
        } else {
          console.log('❌ No user session found');
          setStatus('no-session');
        }
      } catch (error) {
        console.error('💥 Error in Google Auth flow:', error);
        setStatus('error');
      }
    };

    handleGoogleAuthSuccess();
  }, []);

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-center"
        >
          <div className="text-6xl mb-6">⏳</div>
          <h1 className="text-3xl font-bold mb-4">Completing your signup...</h1>
          <p className="text-gray-400">Please wait while we add you to the waitlist.</p>
        </motion.div>
      </div>
    );
  }

  // Success state
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
            Thanks for signing up with Google, <strong>{userEmail}</strong>!
          </p>
          <p className="text-gray-400 mb-8">
            You've been successfully added to our early access list. We'll notify you when we launch.
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

  // Error states
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white text-center max-w-md w-full"
      >
        <div className="text-6xl mb-6">❌</div>
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-400 mb-6">
          {status === 'no-session' 
            ? 'Unable to verify your Google sign-in. Please try again.'
            : 'There was an error adding you to the waitlist. Please try again.'
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
