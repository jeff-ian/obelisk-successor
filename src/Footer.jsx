import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#121212] border-t border-[#FFFFFF]/10 py-12 px-8">
      <div className="max-w-[1200px] mx-auto text-center">
        <p className="text-[14px] text-[#B3B3B3]">
          © 2025 Obelisk. All rights reserved. • {' '}
          <a 
            href="mailto:hello@obelisk.ai" 
            className="text-[#B3B3B3] hover:text-[#00A6FF] underline hover:no-underline transition-all duration-150"
          >
            hello@obelisk.ai
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
