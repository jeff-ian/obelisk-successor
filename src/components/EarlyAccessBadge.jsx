import React from 'react';

const EarlyAccessBadge = () => {
  // For now, using static text as specified - no fake numbers
  // Can be enhanced later with real data from Supabase if needed
  const badgeText = "Limited early access spots";
  
  const handleBadgeClick = () => {
    // Analytics for badge click
    window?.dataLayer?.push?.({
      event: 'cta_click',
      label: 'LimitedBadge_Click'
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleBadgeClick();
    }
  };

  return (
    <div 
      className="mb-6 opacity-0 animate-fadeIn"
      onClick={handleBadgeClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label="Limited early access spots - click to learn more about early access"
    >
      <span className="bg-[#00A6FF] text-[#0F0F10] text-[12px] font-medium py-2 px-3 rounded-[8px] animate-pulse hover:bg-[#0088CC] transition-colors duration-200 cursor-pointer">
        {badgeText}
      </span>
    </div>
  );
};

export default EarlyAccessBadge;
