import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowButton from "./ArrowButton";

gsap.registerPlugin(ScrollTrigger);

interface StorySectionProps {
  className?: string;
}

const StorySection: React.FC<StorySectionProps> = ({ className }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Images from the Chiswick/DBI folder - using require to ensure they exist
  const images = [
    require("../assets/images/Chiswick/DBI/Chiswick home- Sovran1.jpg"),
    require("../assets/images/Chiswick/DBI/Chiswick home- Sovran 2.jpg"),
    require("../assets/images/Chiswick/DBI/Chiswick home- Sovran 3.jpg"),
    require("../assets/images/Chiswick/DBI/Chiswick home- Sovran 4.jpg"),
    require("../assets/images/Chiswick/DBI/Chiswick home- Sovran 5.jpg"),
    require("../assets/images/Chiswick/DBI/Chiswick home- Sovran6.jpg"),
    require("../assets/images/Chiswick/DBI/Chiswick home- Sovran7.jpg"),
    require("../assets/images/Chiswick/DBI/Chiswick home- Sovran8.jpg")
  ];

  // Cycle through images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Setup animations
  useEffect(() => {
    if (!sectionRef.current) return;

    // Text animation
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
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

    // Image animation
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
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

  return (
    <section
      ref={sectionRef}
      className={`py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F4F0] ${className || ""}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text content on the left - modern styling */}
          <div ref={textRef} className="space-y-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-[#CDAD7D]"></div>
              <p className="text-sm uppercase tracking-wider text-gray-500 font-medium">Our Philosophy</p>
            </div>
            
            <h2 className="font-sans text-4xl md:text-5xl text-[#081E27] mb-8 ivymode leading-tight">
              Every Space<br/>Has a Story
            </h2>
            
            <p className="text-lg text-dark-900/85 leading-relaxed mb-4 border-l-4 border-[#CDAD7D] pl-5 italic">
              Behind every project is a story — of a family, a dream, and a vision for something better. 
              We listen, we understand, and we bring together the right minds and hands to make it real.
            </p>
            
            <p className="text-lg text-dark-900/85 leading-relaxed mb-6">
              For us, it's not just about building spaces — it's about creating places you'll love to live in, 
              grow in, and share with the people who matter most. Each room tells your unique story through 
              thoughtful design, quality materials, and expert craftsmanship.
            </p>
            
            <div className="pt-6 border-t border-gray-200">
              <ArrowButton
                text="Contact Us Today"
                to="/contact"
                className="text-[#081E27] hover:text-[#CDAD7D]"
              />
            </div>
          </div>

          {/* Modern image gallery on the right */}
          <div ref={imageRef} className="space-y-3">
            {/* Main image - large top image */}
            <div className="relative h-[320px] overflow-hidden border-2 border-white">
              <img
                src={images[currentImageIndex]}
                alt={`Interior design showcase featured`}
                className="w-full h-full object-cover"
              />
              
              {/* Image counter - minimalist style */}
              <div className="absolute bottom-3 right-3 bg-white text-[#081E27] px-3 py-1 text-xs font-medium">
                {currentImageIndex + 1}/{images.length}
              </div>
            </div>
            
            {/* Thumbnails row */}
            <div className="grid grid-cols-3 gap-3 h-[150px]">
              {[
                (currentImageIndex + 1) % images.length,
                (currentImageIndex + 2) % images.length,
                (currentImageIndex + 3) % images.length,
              ].map((imgIndex, i) => (
                <div 
                  key={i} 
                  className="relative overflow-hidden border-2 border-white cursor-pointer hover:border-[#CDAD7D] transition-all duration-200"
                  onClick={() => setCurrentImageIndex(imgIndex)}
                >
                  <img
                    src={images[imgIndex]}
                    alt={`Interior design thumbnail ${imgIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
