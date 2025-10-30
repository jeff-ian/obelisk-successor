import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: "🔗",
      title: "Detect Topic Shifts",
      description: "Obelisk highlights changes in your conversation topics as you chat, keeping your ideas clearly organized."
    },
    {
      icon: "🗺️",
      title: "Jump Back Easily", 
      description: "Instantly revisit previous discussion points with AI-detected topics and Jumpback navigation — never lose track of your thinking."
    },
    {
      icon: "🌊",
      title: "Track Topic Flow",
      description: "Follow your conversation in chronological order by topic, giving you a clear view of your progress."
    },
    {
      icon: "💡",
      title: "Save Key Messages",
      description: "Capture important messages and download them as text or structured notes — all your insights, ready when you need them."
    }
  ];

  return (
    <section id="features" className="bg-[#121212] py-16 px-8">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 opacity-0 animate-fadeIn">
          <h2 className="text-[36px] font-semibold leading-[44px] text-[#FFFFFF] mb-4">
            How Obelisk Transforms Your Thinking
          </h2>
          <p className="text-[20px] leading-[30px] text-[#B0B0B0] max-w-2xl mx-auto">
            Obelisk organizes your AI interactions and personal insights in real time, mapping your knowledge so nothing is ever lost.
          </p>
        </div>

        {/* Features Grid - NO CTA BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-[#1A1A1A] rounded-2xl p-6 w-full transition-all duration-150 ease-in-out hover:scale-105 hover:shadow-xl opacity-0"
              style={{ 
                boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
                animation: `fadeIn 0.3s ease-in-out ${300 + (index * 100)}ms forwards`
              }}
            >
              {/* Icon */}
              <div className="text-[32px] mb-4">
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-[28px] font-medium leading-[34px] text-[#FFFFFF] mb-3">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-[16px] leading-[24px] text-[#B0B0B0]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* NO CTA BUTTON - Clean informational section only */}

      </div>
    </section>
  );
};

export default FeaturesSection;
