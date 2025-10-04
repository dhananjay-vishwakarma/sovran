import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "../styles/media-cards.css";

gsap.registerPlugin(MotionPathPlugin);

// Array containing image and video sources for media cards
const mediaSources = [
  "/assets/hero/1.png", // Image with zoom effect
  "/assets/hero/1.mp4", // Video
  "/assets/hero/3.png", // Video
];

const baseRotations = [0, 5, 10];
interface MediaCardsProps {
  className?: string;
}

const MediaCards: React.FC<MediaCardsProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVideoIndices, setActiveVideoIndices] = useState<number[]>([0, 1, 2]);

  const playVideo = (card: HTMLElement | null, reset = true) => {
    const video = card?.querySelector("video") as HTMLVideoElement | null;
    if (video) {
      video.muted = true;
      if (reset) video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const pauseAllVideos = () => {
    containerRef.current?.querySelectorAll("video")?.forEach((video) => {
      try {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
      } catch {}
    });
  };

  const isImage = (src: string): boolean => {
    return src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg');
  };

  const applyStackStyle = () => {
    const cards = Array.from(containerRef.current?.children || []);
    cards.slice(0, 3).forEach((card, i) => {
      const rotation = baseRotations[i] || 0;

      gsap.to(card, {
        rotation,
        zIndex: 3 - i,
        duration: 0.5 + i * 0.1,
        ease: "power3.out",
        display: "block"
      });
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const swipeCard = () => {
      const cards = Array.from(container.children) as HTMLElement[];
      const topCard = cards[0];
      if (!topCard) return;

      const rect = topCard.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const localX = rect.left - containerRect.left;
      const localY = rect.top - containerRect.top;

      pauseAllVideos();

      // Check if the next card has a video and play it
      const nextCard = cards[1];
      if (nextCard) {
        const nextVideo = nextCard.querySelector("video");
        if (nextVideo) {
          nextVideo.muted = true;
          nextVideo.play().catch(() => {});
        }
      }

      cards.slice(1).forEach((card, i) => {
        const targetRotation = (baseRotations[i + 1] ?? 0) - 5;
        gsap.to(card, {
          rotation: targetRotation,
          duration: 0.6 + i * 0.1,
          ease: "power3.out",
          delay: i * 0.05,
          display: i < 2 ? "block" : "none"
        });
      });

      gsap.set(topCard, { zIndex: 9999 });

      const tl = gsap.timeline({
        onComplete: () => {
          container.appendChild(topCard);
          applyStackStyle();
        },
      });

      tl.to(topCard, {
        duration: 2,
        motionPath: {
          path: [
            { x: localX + 360 + 300, y: localY, rotation: 18 },
            { x: localX, y: localY, rotation: 10, opacity: 0 },
          ],
          curviness: 1.2,
        },
        ease: "power2.inOut",
      });

      tl.call(() => {
        gsap.set(topCard, { zIndex: 0 });
      }, undefined, "<+1");
    };

    applyStackStyle();
    
    // Play video if the first card has one
    const firstCard = container.children[0] as HTMLElement;
    const firstVideo = firstCard?.querySelector("video");
    if (firstVideo) {
      firstVideo.muted = true;
      firstVideo.currentTime = 0;
      firstVideo.play().catch(() => {});
    }

    const interval = setInterval(swipeCard, 7000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Handle tab visibility change
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const cards = Array.from(container.children) as HTMLElement[];

        cards.forEach((card, i) => {
          gsap.set(card, {
            rotation: baseRotations[i] || 0,
            opacity: 1,
            zIndex: 3 - i,
            display: i < 3 ? "block" : "none"
          });
        });

        applyStackStyle();
        
        // Play video if first card has one
        const firstCard = cards[0];
        const firstVideo = firstCard?.querySelector("video");
        if (firstVideo) {
          firstVideo.muted = true;
          firstVideo.currentTime = 0;
          firstVideo.play().catch(() => {});
        }
      } else {
        pauseAllVideos();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative" }}
      className={`media-card-container w-full h-[300px] sm:h-[400px] md:h-[480px] md:w-[600px] ${className || ""}`}
    >
      {mediaSources.slice(0, 3).map((src, i) => (
        <div
          key={i}
          className="media-card absolute top-0 left-0 w-full h-full bg-gray-700 rounded-2xl shadow-xl overflow-hidden group"
          style={{ maxWidth: "100%" }}
        >
          {src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg') ? (
            // Image element with zoom effect
            <img 
              src={src} 
              alt={`Media card ${i+1}`}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 zoom-effect"
            />
          ) : (
            // Video element
            <video
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              muted
              playsInline
              preload="metadata"
              loop
            >
              <source src={src} type="video/mp4" />
            </video>
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaCards;
