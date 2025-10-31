import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const ConfirmEmailPage = () => {
  const [status, setStatus] = useState('loading');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      const token = searchParams.get('token');
      const email = searchParams.get('email');

      if (!token || !email) {
        setStatus('invalid');
        return;
      }

      try {
        // Verify the token and mark email as verified
        const { data, error } = await supabase
          .from('waitlist')
          .update({ 
            verified: true,
            verified_at: new Date().toISOString()
          })
          .eq('email', decodeURIComponent(email))
          .eq('verification_token', token)
          .eq('verified', false);

        if (error) {
          console.error('Confirmation error:', error);
          setStatus('error');
          return;
        }

        if (data && data.length > 0) {
          setStatus('success');
          // Send welcome email
          await sendWelcomeEmail(decodeURIComponent(email));
        } else {
          setStatus('invalid');
        }
      } catch (error) {
        console.error('Confirmation error:', error);
        setStatus('error');
      }
    };

    confirmEmail();
  }, [searchParams]);

  const sendWelcomeEmail = async (email) => {
    console.log('🎉 Sending welcome email to:', email);
    // TODO: Integrate with your email service
    // await fetch('/api/send-welcome-email', {
    //   method: 'POST',
    //   body: JSON.stringify({ email }),
    //   headers: { 'Content-Type': 'application/json' }
    // });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-center"
        >
          <div className="text-6xl mb-6">⏳</div>
          <h1 className="text-3xl font-bold mb-4">Confirming your email...</h1>
          <p className="text-gray-400">Please wait while we verify your spot.</p>
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
            Email Confirmed!
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Welcome to the Obelisk waitlist!
          </p>
          <p className="text-gray-400 mb-8">
            You're officially on our early access list. We'll send you updates and notify you when we launch.
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
        <h1 className="text-3xl font-bold mb-4">Confirmation Failed</h1>
        <p className="text-gray-400 mb-6">
          {status === 'invalid' 
            ? 'Invalid or expired confirmation link.'
            : 'There was an error confirming your email.'
          }
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-[#00A6FF] hover:bg-[#0088CC] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
        >
          Return to Homepage
        </button>
      </motion.div>
    </div>
  );
};

export default ConfirmEmailPage;
