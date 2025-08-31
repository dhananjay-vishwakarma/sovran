import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "../styles/media-cards.css";

gsap.registerPlugin(MotionPathPlugin);

const videoSources = [
  require("../assets/videos/output/Taaj_Dali_Kitchen_Media_V1_1.mp4"),
  require("../assets/videos/output/Taaj_Dali_Wardrobe_Media_V1_1.mp4"),
  require("../assets/videos/output/Loft Conversions Video Landscape_1.mp4"),
  require("../assets/videos/output/Bedroom + Wardrobe - Landscape_1.mp4"),
  require("../assets/videos/output/Taaj_Dali_Kitchen_Media_V1_1.mp4"),
];

const baseRotations = [0, 5, 10, 15, 20];

interface MediaCardsProps {
  className?: string;
}

const MediaCards: React.FC<MediaCardsProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ Play video with preload option
  const playVideo = (card: HTMLElement | null, reset = true) => {
    const video = card?.querySelector("video") as HTMLVideoElement | null;
    if (video) {
  // keep videos muted to remove music/audio
  video.muted = true;
  if (reset) video.currentTime = 0; // only reset if needed
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

  const applyStackStyle = () => {
    const cards = Array.from(containerRef.current?.children || []);

    cards.forEach((card, i) => {
      let rotation = 0;

      if (i === 0) rotation = 0;
      else if (i === 1) rotation = 5;
      else if (i === 2) rotation = 10;
      else if (i === 3) rotation = 15;
      else rotation = 20; // last card or any extra

      gsap.to(card, {
        rotation,
        zIndex: cards.length - i,
        duration: 0.5 + i * 0.1,
        ease: "power3.out",
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

      // 🔥 Preload next card muted (don’t reset time)
      if (cards[1]) playVideo(cards[1], false);

      // Animate next cards rotation
      cards.slice(1).forEach((card, i) => {
        const targetRotation = (baseRotations[i + 1] ?? 0) - 5;
        gsap.to(card, {
          rotation: targetRotation,
          duration: 0.6 + i * 0.1,
          ease: "power3.out",
          delay: i * 0.05,
        });
      });

      gsap.set(topCard, { zIndex: 9999 });

      const tl = gsap.timeline({
        onComplete: () => {
          container.appendChild(topCard);
          applyStackStyle();
          // ✅ no restart here — next card is already playing
        },
      });

      tl.to(topCard, {
        duration: 2,
        motionPath: {
          path: [
            { x: localX + 360 + 300, y: localY, rotation: 18 },
            { x: localX, y: localY, rotation: 20, opacity: 0 },
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
    playVideo(container.children[0] as HTMLElement); // first card starts normally

    const interval = setInterval(swipeCard, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative" }}
    className={`media-card-container w-full h-[480px] md:w-[480px]`}
    >
      {videoSources.map((src, i) => (
        <div
          key={i}
           className="media-card absolute top-0 left-0 w-full h-full bg-gray-700 rounded-2xl shadow-xl overflow-hidden"
          style={{ maxWidth: "calc(100vw - 40px)" }}
        >
          <video
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
            loop
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
};

export default MediaCards;
