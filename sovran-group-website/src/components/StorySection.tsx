import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowButton from "./ArrowButton";

gsap.registerPlugin(ScrollTrigger);

interface StorySectionProps {
  className?: string;
}

// Define control parameters with defaults
interface ControlSettings {
  textGlowAmount: number;
  overlayOpacity: number;
  aspectRatio: string;
  bgPosition: string;
  textPositionY: string;
  titlePositionY: string;
  paragraphPositionY: string;
  textMaxWidth: string;
  headingSize: string;
  paragraphSize: string;
  showControls: boolean;
}

// Check if we're in development mode
const isDev = process.env.NODE_ENV === 'development';

const StorySection: React.FC<StorySectionProps> = ({ className }) => {
  const [showFullText, setShowFullText] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  // Developer controls state
  const [controls, setControls] = useState<ControlSettings>({
    textGlowAmount: 15,
    overlayOpacity: 0.65,
    aspectRatio: '2.15:1',
    bgPosition: 'center',
    textPositionY: '0',
    titlePositionY: '0',
    paragraphPositionY: '100',
    textMaxWidth: '4xl',
    headingSize: 'text-5xl md:text-7xl',
    paragraphSize: 'text-xl md:text-2xl',
    showControls: isDev
  });

  // Handle control changes
  const handleControlChange = (setting: keyof ControlSettings, value: any) => {
    setControls(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Toggle controls visibility
  const toggleControls = () => {
    setControls(prev => ({
      ...prev,
      showControls: !prev.showControls
    }));
  };

  // Setup animations
  useEffect(() => {
    if (!sectionRef.current) return;

    // Text animation
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleReadMore = () => {
    setShowFullText(!showFullText);
  };

  // Text glow effect style
  const textGlowStyle = {
    textShadow: controls.textGlowAmount > 0 
      ? `0 0 ${controls.textGlowAmount}px rgba(255, 255, 255, 0.8)` 
      : 'none'
  };

  // Calculate aspect ratio based on the selected ratio
  const getAspectRatioPadding = (ratio: string) => {
    // Extract the ratio values and calculate padding percentage
    const [width, height] = ratio.split(':').map(Number);
    return `${(height / width) * 100}%`;
  };
  
  // Apply the aspect ratio style
  const sectionStyle = {
    backgroundImage: "url('/assets/everyspacehasstory/bg.png')",
    backgroundSize: "cover",
    backgroundPosition: controls.bgPosition,
    height: 0,
    paddingBottom: getAspectRatioPadding(controls.aspectRatio),
    width: "100%"
  };

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${className || ""}`}
      style={sectionStyle}
    >
      {/* Developer toggle button - visible only in dev mode */}
      {isDev && (
        <button 
          onClick={toggleControls}
          className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded z-50 text-xs"
          title="Toggle developer controls"
        >
          {controls.showControls ? 'Hide Controls' : 'Show Controls'}
        </button>
      )}

      {/* Dark overlay with adjustable opacity */}
      <div 
        className="absolute inset-0 bg-black"
        style={{ opacity: controls.overlayOpacity }}
      ></div>

      <div className="absolute inset-0 flex items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Main heading */}
        <div 
          ref={textRef} 
          className={`space-y-8 ${controls.textPositionY !== '0' ? `pt-${controls.textPositionY}` : ''}`}
        >
          <h2 
            className={`font-sans ${controls.headingSize} text-white mb-8 ivymode tracking-wider font-light`}
            style={{
              ...textGlowStyle,
              marginTop: `${controls.titlePositionY}px`,
            }}
          >
            EVERY SPACE HAS A STORY...
          </h2>
          
          <div className={`max-w-${controls.textMaxWidth} mx-auto`}>
            <p 
              className={`text-white ${controls.paragraphSize} leading-relaxed font-light mb-8`}
              style={{
                marginTop: `${controls.paragraphPositionY}px`,
              }}
            >
              BEHIND EVERY PROJECT IS A STORY — OF A FAMILY, A DREAM, AND A VISION FOR SOMETHING BETTER. WE LISTEN, WE UNDERSTAND, AND WE BRING TOGETHER THE RIGHT MINDS AND HANDS TO MAKE IT REAL.
            </p>
            
            {showFullText ? (
              <div 
                className={`mt-10 text-white text-lg md:text-xl leading-relaxed max-w-${controls.textMaxWidth} mx-auto transition-opacity duration-500`}
              >
                <p className="mb-6 leading-relaxed font-light mb-8">
                  FOR US, IT'S NOT JUST ABOUT BUILDING SPACES — IT'S ABOUT CREATING PLACES YOU'LL LOVE TO LIVE IN, 
                  GROW IN, AND SHARE WITH THE PEOPLE WHO MATTER MOST. EACH ROOM TELLS YOUR UNIQUE STORY THROUGH 
                  THOUGHTFUL DESIGN, QUALITY MATERIALS, AND EXPERT CRAFTSMANSHIP.
                </p>
                <p className="mb-6 leading-relaxed font-light mb-8">
                  WE APPROACH EACH PROJECT WITH THE UNDERSTANDING THAT THE SPACES WE CREATE WILL BECOME THE BACKDROP
                  FOR COUNTLESS MEMORIES, MOMENTS OF JOY, AND THE DAILY LIVES OF OUR CLIENTS. THIS RESPONSIBILITY
                  DRIVES OUR COMMITMENT TO EXCELLENCE IN EVERY DETAIL.
                </p>
                <button 
                  onClick={handleReadMore}
                  className="mt-8 text-white underline hover:text-gray-300 transition-colors"
                >
                  Read less...
                </button>
              </div>
            ) : (
              <button 
                onClick={handleReadMore}
                className="text-white underline hover:text-gray-300 transition-colors"
              >
                Read more...
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Developer control panel - only visible in dev mode and when controls are shown */}
      {isDev && controls.showControls && (
        <div className="absolute left-4 top-4 bg-gray-900 bg-opacity-90 p-4 rounded-lg z-50 text-left text-xs w-64 overflow-auto max-h-[90vh]">
          <h3 className="text-white font-bold mb-4 text-sm">Developer Controls</h3>
          
          <div className="space-y-4">
            {/* Text Glow Control */}
            <div>
              <label className="text-white block mb-1">Text Glow: {controls.textGlowAmount}px</label>
              <input 
                type="range" 
                min="0" 
                max="20" 
                step="1" 
                value={controls.textGlowAmount}
                onChange={(e) => handleControlChange('textGlowAmount', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Overlay Opacity Control */}
            <div>
              <label className="text-white block mb-1">Overlay Opacity: {controls.overlayOpacity}</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05" 
                value={controls.overlayOpacity}
                onChange={(e) => handleControlChange('overlayOpacity', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Aspect Ratio Control */}
            <div>
              <label className="text-white block mb-1">Aspect Ratio</label>
              <select 
                value={controls.aspectRatio}
                onChange={(e) => handleControlChange('aspectRatio', e.target.value)}
                className="w-full bg-gray-800 text-white p-1 rounded"
              >
                <option value="2.35:1">Cinematic Widescreen (2.35:1)</option>
                <option value="16:9">HD Video (16:9)</option>
                <option value="3:2">Classic Film (3:2)</option>
                <option value="4:3">Standard (4:3)</option>
                <option value="1:1">Square (1:1)</option>
                <option value="21:9">Ultra-wide (21:9)</option>
              </select>
            </div>

            {/* Background Position Control */}
            <div>
              <label className="text-white block mb-1">Background Position</label>
              <select 
                value={controls.bgPosition}
                onChange={(e) => handleControlChange('bgPosition', e.target.value)}
                className="w-full bg-gray-800 text-white p-1 rounded"
              >
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>

            {/* Text Position Y Control */}
            <div>
              <label className="text-white block mb-1">Content Block Y Position</label>
              <select 
                value={controls.textPositionY}
                onChange={(e) => handleControlChange('textPositionY', e.target.value)}
                className="w-full bg-gray-800 text-white p-1 rounded"
              >
                <option value="0">Centered (default)</option>
                <option value="12">Small (pt-12)</option>
                <option value="16">Medium (pt-16)</option>
                <option value="20">Large (pt-20)</option>
                <option value="24">X-Large (pt-24)</option>
                <option value="32">XX-Large (pt-32)</option>
              </select>
            </div>
            
            {/* Title Position Y Control */}
            <div>
              <label className="text-white block mb-1">Title Y Offset: {controls.titlePositionY}px</label>
              <input 
                type="range" 
                min="-100" 
                max="100" 
                step="5" 
                value={controls.titlePositionY}
                onChange={(e) => handleControlChange('titlePositionY', e.target.value)}
                className="w-full"
              />
            </div>
            
            {/* Paragraph Position Y Control */}
            <div>
              <label className="text-white block mb-1">Paragraph Y Offset: {controls.paragraphPositionY}px</label>
              <input 
                type="range" 
                min="-100" 
                max="100" 
                step="5" 
                value={controls.paragraphPositionY}
                onChange={(e) => handleControlChange('paragraphPositionY', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Text Max Width Control */}
            <div>
              <label className="text-white block mb-1">Text Container Width</label>
              <select 
                value={controls.textMaxWidth}
                onChange={(e) => handleControlChange('textMaxWidth', e.target.value)}
                className="w-full bg-gray-800 text-white p-1 rounded"
              >
                <option value="3xl">Narrow</option>
                <option value="4xl">Medium</option>
                <option value="5xl">Wide</option>
                <option value="6xl">X-Wide</option>
                <option value="7xl">Full Width</option>
              </select>
            </div>

            {/* Heading Size Control */}
            <div>
              <label className="text-white block mb-1">Heading Size</label>
              <select 
                value={controls.headingSize}
                onChange={(e) => handleControlChange('headingSize', e.target.value)}
                className="w-full bg-gray-800 text-white p-1 rounded"
              >
                <option value="text-4xl md:text-5xl">Small</option>
                <option value="text-5xl md:text-6xl">Medium</option>
                <option value="text-5xl md:text-7xl">Large</option>
                <option value="text-6xl md:text-8xl">X-Large</option>
              </select>
            </div>

            {/* Paragraph Size Control */}
            <div>
              <label className="text-white block mb-1">Paragraph Size</label>
              <select 
                value={controls.paragraphSize}
                onChange={(e) => handleControlChange('paragraphSize', e.target.value)}
                className="w-full bg-gray-800 text-white p-1 rounded"
              >
                <option value="text-base md:text-lg">Small</option>
                <option value="text-lg md:text-xl">Medium</option>
                <option value="text-xl md:text-2xl">Large</option>
                <option value="text-2xl md:text-3xl">X-Large</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StorySection;
