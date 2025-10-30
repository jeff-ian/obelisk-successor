import React from 'react';

const BottomNavigation = () => {
  const navigationSections = [
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' }
      ]
    },
    {
      title: 'Follow Us',
      links: [
        { name: 'LinkedIn', href: 'https://linkedin.com/company/obelisk' },
        { name: 'X (formerly Twitter)', href: 'https://twitter.com/obelisk' },
        { name: 'GitHub', href: 'https://github.com/obelisk' }
      ]
    }
  ];

  return (
    <section className="bg-[#0F0F10] border-t border-[#FFFFFF]/10 py-16 px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {navigationSections.map((section, index) => (
            <div key={section.title} className="opacity-0 animate-fadeIn" style={{animationDelay: `${index * 100}ms`}}>
              <h3 className="text-[16px] font-semibold text-[#FFFFFF] mb-4 uppercase tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-[14px] text-[#B3B3B3] hover:text-[#00A6FF] transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Copyright - Clean, no location */}
        <div className="mt-12 pt-8 border-t border-[#FFFFFF]/10 text-center opacity-0 animate-fadeIn" style={{animationDelay: '400ms'}}>
          <p className="text-[14px] text-[#B3B3B3]">
            Obelisk — The Intelligent Knowledge Organization Platform
          </p>
          <p className="text-[12px] text-[#666666] mt-2">
            © 2025 Obelisk. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BottomNavigation;
