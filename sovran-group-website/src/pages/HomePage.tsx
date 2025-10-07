import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import HeroSectionMobile from '../components/HeroSectionMobile';
import TestimonialSection from '../components/TestimonialSection';
import BusinessVerticalsSection from '../components/BusinessVerticalsSection';
import ProblemSolutionHookSection from '../components/ProblemSolutionHookSection';
import SuccessStorySection from '../components/SuccessStorySection';
import RecentProjectsSection from '../components/RecentProjectsSection';
import StorySection from '../components/StorySection';
import ContactFormSection from '../components/ContactFormSection';
import BackgroundSection from '../components/BackgroundSection';
import FloatingImageSection from '../components/sections/FloatingImageSection';

// Register ScrollTrigger and ScrollToPlugin plugins
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const HomePage: React.FC = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('smooth-scroll');

    const handleScroll = () => {
      requestAnimationFrame(() => {
        if (pageRef.current) {
          const scrollY = window.scrollY;
          const parallaxElements = document.querySelectorAll('.parallax-element');
          parallaxElements.forEach((element: any) => {
            const speed = element.dataset.speed || 0.1;
            element.style.transform = `translateY(${scrollY * speed}px)`;
          });
        }
      });
    };

    const smoothScrollToAnchor = (e: any) => {
      const anchor = e.target.closest && e.target.closest('a');
      if (anchor && anchor.getAttribute && anchor.getAttribute('href')?.startsWith('#')) {
        const targetId = anchor.getAttribute('href') as string;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = Math.round(elementPosition + window.scrollY - headerOffset);
          gsap.to(window, {
            scrollTo: { y: offsetPosition, autoKill: false },
            duration: 0.8,
            ease: "power2.inOut",
            overwrite: true,
          });
        }
      }
    };

    // Robust GSAP animation setup
    const setupGSAPAnimations = () => {
      // Reveal-up elements
      const elements = document.querySelectorAll('.reveal-up');
      console.log('[GSAP] .reveal-up elements found:', elements.length);
      elements.forEach((element) => {
        if (!element) return;
        gsap.fromTo(
          element,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              onEnter: () => console.log('[GSAP] reveal-up entered:', element),
              onLeave: () => console.log('[GSAP] reveal-up left:', element),
            },
          }
        );
      });

      // Reveal-image elements
      const imageElements = document.querySelectorAll('.reveal-image');
      console.log('[GSAP] .reveal-image elements found:', imageElements.length);
      imageElements.forEach((element) => {
        if (!element) return;
        gsap.fromTo(
          element,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              onEnter: () => console.log('[GSAP] reveal-image entered:', element),
              onLeave: () => console.log('[GSAP] reveal-image left:', element),
            },
          }
        );
      });

      // Reveal-opacity elements
      const fadeElements = document.querySelectorAll('.reveal-opacity');
      console.log('[GSAP] .reveal-opacity elements found:', fadeElements.length);
      fadeElements.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
              onEnter: () => console.log('[GSAP] reveal-opacity entered:', el),
              onLeave: () => console.log('[GSAP] reveal-opacity left:', el),
            },
          }
        );
      });
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Add click event listener for anchor links
    document.addEventListener('click', smoothScrollToAnchor);

    // Delay GSAP setup to ensure all elements are rendered
    setTimeout(setupGSAPAnimations, 0);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', smoothScrollToAnchor);
      document.body.classList.remove('smooth-scroll');
    };
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#081E27]">
      <Navigation />
      {/* Desktop / tablet hero */}
      <div className="hidden md:block">
        <HeroSection />
      </div>
      {/* Mobile-only hero (reordered with video between text and CTAs) */}
      <div className="block md:hidden">
        <HeroSectionMobile />
      </div>
      <StorySection />
      {/* <ProblemSolutionHookSection /> */}
      <BusinessVerticalsSection />

      {/* Success Story Section */}
      <SuccessStorySection />
      {/* Case Studies Section */}
      <div ref={caseStudiesRef} id="case-studies">
        <RecentProjectsSection />
      </div>

   {/* Client Testimonials Section 1 */}
      <section ref={testimonialsRef} id="testimonials">
      <TestimonialSection />
      </section>

      <FloatingImageSection />

      {/* Contact Form Section */}
  
  <ContactFormSection />
      <Footer />
    </div>
  );
};

export default HomePage;
