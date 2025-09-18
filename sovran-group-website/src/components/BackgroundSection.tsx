import React from 'react';

const BackgroundSection: React.FC = () => {
  return (
    <section
      className="relative w-full h-[650px] md:h-[950px] bg-contain bg-center"
      style={{
        backgroundImage: "url('/assets/section/5.png')",
      }}
    >
      {/* overlay to darken image for text legibility */}
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 w-full h-full max-w-6xl mx-auto px-6 flex flex-col">
        {/* Title container - centered both horizontally and vertically */}
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-thin text-center leading-tight tracking-wide">
            BUILD WITH CONFIDENCE
          </h1>
        </div>

        {/* Description pinned to bottom */}
        <div className="pb-8">
          <p className="text-white text-xl md:text-2xl max-w-3xl mx-auto text-center font-medium opacity-95 px-6">
            PRECISION IN BUILD, DISCIPLINE IN SAFETY & REGULATIONS. BUILDING STRUCTURES
            THAT ENDURE BEYOND GENERATIONS.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BackgroundSection;
