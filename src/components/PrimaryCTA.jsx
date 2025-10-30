// src/components/PrimaryCTA.jsx
import React, { useState } from 'react';
import { hasJoinedWaitlist } from '../utils/auth';
import WaitlistModal from './WaitlistModal';

const PrimaryCTA = ({ 
  variant = 'hero', 
  label = 'Join Early Access — Save Your Ideas',
  onClick 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasJoined = hasJoinedWaitlist();

  // Handle click based on joined state
  const handleClick = (e) => {
    if (hasJoined) {
      e.preventDefault();
      return;
    }

    // Push analytics
    window?.dataLayer?.push?.({
      event: 'cta_click',
      label: variant === 'nav' ? 'JoinEarlyAccess_Floating' : 'JoinEarlyAccess_Primary'
    });

    // Call custom onClick or default behavior (open modal)
    if (onClick) {
      onClick(e);
    } else {
      setIsModalOpen(true);
    }
  };

  // Base button styles from your existing buttons
  const getButtonClasses = () => {
    const baseClasses = "font-semibold text-white rounded-xl transition-all duration-300 transform shadow-lg";
    
    if (hasJoined) {
      return `${baseClasses} bg-gray-500 cursor-not-allowed opacity-70`;
    }

    switch (variant) {
      case 'hero':
        return `${baseClasses} bg-[#00A6FF] hover:bg-[#0088CC] py-4 px-12 text-[18px] hover:scale-105`;
      case 'nav':
        return `${baseClasses} bg-[#00A6FF] hover:bg-[#0088CC] py-3 px-8 text-[16px] hover:scale-105`;
      case 'inline':
        return `${baseClasses} bg-[#00A6FF] hover:bg-[#0088CC] py-2 px-4 text-[14px] hover:scale-105 border border-[#00A6FF]`;
      default:
        return `${baseClasses} bg-[#00A6FF] hover:bg-[#0088CC] py-4 px-8 text-[16px] hover:scale-105`;
    }
  };

  const getButtonText = () => {
    if (hasJoined) {
      return "You're on the list — Check your email";
    }
    return label;
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={hasJoined}
        className={getButtonClasses()}
        aria-label={hasJoined ? "You have already joined the waitlist" : label}
      >
        {getButtonText()}
      </button>
      
      <WaitlistModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default PrimaryCTA;
