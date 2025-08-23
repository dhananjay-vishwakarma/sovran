import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ArrowButton from './ArrowButton';


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
        title: "Sovran Builders",
        subtitle: "Transforming Spaces, Creating Legacies. Expert craftsmanship for renovations and new builds.",
        buttonText: "Start Your Project",
        backgroundImage: "https://taajdesignandbuild.co.uk/wp-content/uploads/2021/05/image-6-1-1.png.webp",
        link: "/contact"
    },
    {
        id: 2,
        title: "Sovran Design",
        subtitle: "Bespoke Designs, Timeless Spaces. Luxury designs tailored to your lifestyle and vision.",
        buttonText: "Explore Our Designs",
        backgroundImage: "https://taajdesignandbuild.co.uk/wp-content/uploads/2021/02/Picturer-under-slider-1-1.jpg",
        link: "/contact"
    },
    {
        id: 3,
        title: "Sovran Interiors",
        subtitle: "Where Luxury Meets Functionality. Custom furniture and interiors that reflect your unique style.",
        buttonText: "Transform Your Space",
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
        
        // Title animation with opacity and blur effect
        tl.fromTo(
            title,
            { opacity: 0, filter: 'blur(20px)', y: -10 },
            { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.4, ease: "power2.out" },
            0 // Start immediately
        );
        // Subtitle animation with opacity and blur
        tl.fromTo(
            subtitle,
            { opacity: 0, filter: 'blur(15px)', y: -5 },
            { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.2, ease: "power2.out" },
            0.3 // Start slightly after title
        );
        // Button animation with fade in and slight slide
        tl.fromTo(
            button,
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
            0.6 // Start after subtitle
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
        <section className="relative h-[100vh] overflow-hidden">
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
                                style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                            >
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

                        {/* Content */}
                        <div className="relative z-20 flex items-center justify-center h-full">
                            <div 
                                ref={(el) => { contentRefs.current[index] = el; return undefined; }}
                                className="text-center max-w-4xl mx-auto px-6"
                            >
                                <h1 className="ivymode-regular text-5xl md:text-7xl  text-white mb-8 leading-tight tracking-wide">
                                    {slide.title}
                                </h1>
                                <p className="font-lato text-lg md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                                    {slide.subtitle}
                                </p>
                                <div className="flex justify-center">
                                    <ArrowButton text={slide.buttonText} to={slide.link || '/contact'} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-primary-600/90 text-white p-3 rounded-full backdrop-blur transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 z-20"
                aria-label="Previous slide"
            >
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
            
            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-primary-600/90 text-white p-3 rounded-full backdrop-blur transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 z-20"
                aria-label="Next slide"
            >
                <ChevronRightIcon className="w-6 h-6" />
            </button>

            {/* Progress Bar Indicator */}
            <div className="absolute bottom-8 left-0 right-0 w-1/3 mx-auto h-0.5 bg-white/10 rounded-full overflow-hidden z-20">
                <div ref={progressRef} className="h-full bg-primary-500" />
            </div>
        </section>
    );
};

export default HeroSlider;
