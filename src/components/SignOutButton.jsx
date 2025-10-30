import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const SignOutButton = () => {
  const [isResetting, setIsResetting] = useState(false);

  const handleCompleteReset = async () => {
    setIsResetting(true);
    console.log('🔁 Starting complete reset...');
    
    try {
      // Get current user email from localStorage for targeted deletion
      const userEmail = localStorage.getItem('obelisk_waitlist_email');
      
      // Step 1: Clear frontend localStorage
      localStorage.removeItem('obelisk_waitlist_joined');
      localStorage.removeItem('obelisk_waitlist_email');
      
      console.log('✅ Frontend localStorage cleared');
      
      // Step 2: If we have user email, try to delete from Supabase waitlist
      if (userEmail) {
        console.log('🗑️ Attempting to delete user from waitlist:', userEmail);
        
        const { error } = await supabase
          .from('waitlist')
          .delete()
          .eq('email', userEmail);
          
        if (error) {
          console.log('⚠️ Could not delete from waitlist (might not exist):', error.message);
        } else {
          console.log('✅ User removed from waitlist database');
        }
      }
      
      // Step 3: Sign out from Supabase auth (if user was logged in via Google)
      const { error: authError } = await supabase.auth.signOut();
      if (authError) {
        console.log('⚠️ Auth signout issue (might not be logged in):', authError.message);
      } else {
        console.log('✅ Signed out from Supabase auth');
      }
      
      // Step 4: Clear any session data
      sessionStorage.clear();
      
      console.log('🎉 Complete reset finished!');
      
      // Step 5: Force refresh to clean state
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
      
    } catch (error) {
      console.error('❌ Reset failed:', error);
      setIsResetting(false);
    }
  };

  return (
    <button
      onClick={handleCompleteReset}
      disabled={isResetting}
      className="fixed bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors duration-200 z-50 opacity-80 hover:opacity-100 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      title="COMPLETE Reset: Clears localStorage AND deletes from database"
    >
      {isResetting ? '🔄 Resetting...' : '🧹 Full Reset'}
    </button>
  );
};

export default SignOutButton;
