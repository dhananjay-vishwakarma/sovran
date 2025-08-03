import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface Slide {
    id: number;
    title: string;
    subtitle: string;
    buttonText: string;
    backgroundImage: string;
    link?: string;
}

const slides: Slide[] = [
    {
        id: 1,
        title: "Sovran Builders – Crafting Foundations, Building Futures",
        subtitle: "Transforming Spaces, Creating Legacies. From concept to completion, Sovran Builders brings your vision to life with expert craftsmanship, precision, and dedication. Whether you're renovating or building from the ground up, we're here to make your dream a reality.",
        buttonText: "Start Your Project Today",
        backgroundImage: "https://taajdesignandbuild.co.uk/wp-content/uploads/2021/05/image-6-1-1.png.webp",
        link: "/contact"
    },
    {
        id: 2,
        title: "Sovran Design – Designing the Extraordinary",
        subtitle: "Bespoke Designs, Timeless Spaces. Our design philosophy merges aesthetics and functionality. Sovran Design creates luxurious, high-end designs that blend perfectly with your lifestyle and architectural vision. Let us redefine your space.",
        buttonText: "Bring Your Vision to Life",
        backgroundImage: "https://taajdesignandbuild.co.uk/wp-content/uploads/2021/02/Picturer-under-slider-1-1.jpg",
        link: "/contact"
    },
    {
        id: 3,
        title: "Sovran Interiors – Crafting Interiors with Purpose",
        subtitle: "Where Luxury Meets Functionality. Sovran Interiors specializes in custom-made furniture and luxury interior solutions. From bespoke wardrobes to elegant living spaces, we focus on creating stunning designs that reflect your unique style.",
        buttonText: "Design Your Dream Space",
        backgroundImage: "https://mrwardrobe.co.uk/wp-content/uploads/2023/06/Walk-in-wardrobe_MrWardrobe-scaled.jpg",
        link: "/contact"
    }
];

const SLIDE_DURATION = 8000; // 8 seconds

const HeroSlider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
    const progressRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        // Kill previous animations to prevent conflicts
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        const currentContent = contentRefs.current[currentSlide];
        const currentBg = bgRefs.current[currentSlide];
        const progress = progressRef.current;

        if (!currentContent || !currentBg || !progress) return;

        // Create a master timeline for all animations on the current slide
        const tl = gsap.timeline({
            onComplete: nextSlide, // Auto-advance to the next slide on completion
        });
        timelineRef.current = tl;

        // Content animation: animate title with scale effect, then subtitle and button
        const title = currentContent.querySelector('h1');
        const subtitle = currentContent.querySelector('p');
        const button = currentContent.querySelector('a');
        
        // Title animation with scale
        tl.fromTo(
            title,
            { opacity: 0, y: 50, scale: 1.2 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" },
            0 // Start immediately
        );
        // Subtitle and button animation
        tl.fromTo(
            [subtitle, button],
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
            0.4 // Start after title
        );

        // Background Ken Burns effect
        tl.fromTo(currentBg, 
            { scale: 1.15, x: 0, y: 0 },
            { scale: 1, x: 'random(-5, 5)%', y: 'random(-5, 5)%', duration: SLIDE_DURATION / 1000, ease: "none" },
            0
        );

        // Progress bar animation
        tl.fromTo(progress,
            { width: '0%' },
            { width: '100%', duration: SLIDE_DURATION / 1000, ease: 'linear' },
            0
        );

        return () => {
            // Cleanup timeline on component unmount or slide change
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
        };
    }, [currentSlide]);

    return (
        <section className="relative h-screen overflow-hidden">
            <div className="relative w-full h-full">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                        {/* Background Image Container */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div
                                ref={(el) => { bgRefs.current[index] = el; return undefined; }}
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${slide.backgroundImage})`
                                }}
                            >
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

                        {/* Content */}
                        <div className="relative z-20 flex items-center justify-center h-full">
                            <div 
                                ref={(el) => { contentRefs.current[index] = el; return undefined; }}
                                className="text-center max-w-5xl mx-auto px-6"
                            >
                                <h1 className="ivymode-regular text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-wide">
                                    {slide.title}
                                </h1>
                                <p className="font-lato text-lg md:text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
                                    {slide.subtitle}
                                </p>
                                <div className="flex justify-center">
                                    <Button text={slide.buttonText} to={slide.link || '/contact'} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-primary-600 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 z-20"
                aria-label="Previous slide"
            >
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
            
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-primary-600 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 z-20"
                aria-label="Next slide"
            >
                <ChevronRightIcon className="w-6 h-6" />
            </button>

            {/* Progress Bar Indicator */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/20 z-20">
                <div ref={progressRef} className="h-full bg-primary-500" />
            </div>
        </section>
    );
};

export default HeroSlider;
