import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: "🔄",
      title: "Spot Topic Changes Instantly",
      description: "Obelisk monitors your conversation and highlights where topics shift, keeping your ideas organized."
    },
    {
      icon: "↩️",
      title: "Return to Key Points",
      description: "Use Jumpback navigation to instantly revisit AI-detected topics and continue conversations seamlessly."
    },
    {
      icon: "💾",
      title: "Keep Your Most Important Messages",
      description: "Save individual messages or download them as text files for easy reference and action."
    }
  ];

  return (
    <section id="how-it-works" className="bg-[#121212] py-16 px-8">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 opacity-0 animate-fadeIn">
          <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-4">
            How Obelisk Works
          </h2>
          <p className="text-[20px] leading-[30px] text-[#B0B0B0] max-w-2xl mx-auto">
            Simple, intelligent workflow that organizes your conversations automatically
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className="bg-[#1A1A1A] rounded-2xl p-6 transition-all duration-150 ease-in-out hover:scale-105 hover:shadow-xl opacity-0"
              style={{ 
                boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
                animation: `fadeIn 0.3s ease-in-out ${300 + (index * 100)}ms forwards`
              }}
            >
              {/* Icon */}
              <div className="text-[32px] mb-4 text-[#00A6FF] transition-transform duration-150 ease-in-out hover:scale-105">
                {step.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-[28px] font-medium leading-[36px] text-[#FFFFFF] mb-3">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-[16px] leading-[24px] text-[#B3B3B3]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
