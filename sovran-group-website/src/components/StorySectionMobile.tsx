import React, { useState } from 'react';

const StorySectionMobile: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  // no fixed aspect ratio on mobile; we'll let the background cover a padded hero block

  const textGlowStyle = {
    textShadow: '0 0 12px rgba(255,255,255,0.8)'
  } as React.CSSProperties;

  return (
    <section
      id="space-story-mobile"
      className="block md:hidden relative bg-cover bg-center py-12 sm:py-16"
      style={{ backgroundImage: "url('/assets/everyspacehasstory/bg.png')" }}
    >
      {/* dark overlay covering entire section */}
      <div className="absolute inset-0 bg-black" style={{ opacity: 0.65 }} />

      {/* Content sits above the overlay */}
      <div className="relative z-10 px-4">
        <div className="max-w-2xl mx-auto text-center pt-4">
          <h2 className="font-sans text-2xl sm:text-3xl text-white mb-3 font-light leading-tight" style={textGlowStyle}>
            EVERY SPACE HAS A STORY...
          </h2>
          <div className="w-16 h-1 bg-[#CDAD7D] mx-auto mb-6" />

          <p className="text-white text-base leading-relaxed mb-4">
            BEHIND EVERY PROJECT IS A STORY — OF A FAMILY, A DREAM, AND A VISION FOR SOMETHING BETTER. WE LISTEN, WE UNDERSTAND, AND WE BRING TOGETHER THE RIGHT MINDS AND HANDS TO MAKE IT REAL.
          </p>

          {expanded ? (
            <div className="text-white text-base leading-relaxed space-y-4">
              <p>
                FOR US, IT'S NOT JUST ABOUT BUILDING SPACES — IT'S ABOUT CREATING PLACES YOU'LL LOVE TO LIVE IN, GROW IN, AND SHARE WITH THE PEOPLE WHO MATTER MOST.
              </p>
              <p>
                WE APPROACH EACH PROJECT WITH THE UNDERSTANDING THAT THE SPACES WE CREATE WILL BECOME THE BACKDROP FOR COUNTLESS MEMORIES.
              </p>
              <button onClick={() => setExpanded(false)} className="mt-4 text-[#CDAD7D] underline">Read less...</button>
            </div>
          ) : (
            <button onClick={() => setExpanded(true)} className="text-[#CDAD7D] underline">Read more...</button>
          )}
        </div>
      </div>
    </section>
  );
};

export default StorySectionMobile;
