import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ServicesSection from '../components/sections/ServicesSection';
import GallerySection from '../components/sections/GallerySection';
import HeroSection from '../components/sections/HeroSection';
import CtaSection from '../components/sections/CtaSection';
import SubcategoryNav from '../components/SubcategoryNav';
import ContentSection from '../components/sections/ContentSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import SpecificationsSection from '../components/sections/SpecificationsSection';
import ProcessSection from '../components/sections/ProcessSection';
import DesignInspirationSection from '../components/sections/DesignInspirationSection';
import FinalCtaSection from '../components/sections/FinalCtaSection';
import RandomDoodle from '../components/RandomDoodle';
import { getPageData, getCategoryNav, PageData, CategoryData } from '../utils/contentUtils';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface PageTemplateProps {
  pageType?: 'main' | 'category' | 'subcategory';
}

const SovranInteriorsTemplate: React.FC<PageTemplateProps> = ({ pageType = 'main' }) => {
  const { categoryId, subcategoryId } = useParams<{ categoryId?: string; subcategoryId?: string }>();
  const heroRef = useRef<HTMLDivElement>(null);

  // Get page data based on URL parameters
  const pageData = getPageData(categoryId, subcategoryId);
  const currentCategoryNav = categoryId ? getCategoryNav(categoryId) : null;

  useEffect(() => {
    // GSAP ScrollTrigger animations
    const elements = document.querySelectorAll('.reveal-up');
    
    elements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
        },
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
          },
        }
      );
    });

    // Image reveal animations
    const imageElements = document.querySelectorAll('.reveal-image');
    
    imageElements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          scale: 0.9,
        },
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
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [categoryId, subcategoryId]);

  // Default data for sections if not provided in category data
  const [defaultTestimonials] = useState([
    {
      quote: "The attention to detail and quality of craftsmanship exceeded our expectations. Our project has become the highlight of our home.",
      author: "Michael Johnson",
      company: "London",
      projectType: "Interior Design Project"
    },
    {
      quote: "The team at Sovran Interiors transformed our space with a stunning design that perfectly complements our home style.",
      author: "Emily Parker",
      company: "Surrey",
      projectType: "Home Renovation"
    },
    {
      quote: "Professional service from start to finish. The design process was collaborative and the final result is exactly what we envisioned.",
      author: "David Williams",
      company: "Kent",
      projectType: "Custom Interior Design"
    }
  ]);

  const [defaultSpecifications] = useState([
    {
      category: "Materials",
      items: [
        { name: "Construction Materials", value: "Premium quality, sustainably sourced where possible" },
        { name: "Finishes", value: "Custom selections based on project requirements" },
        { name: "Hardware", value: "Designer options in various metal finishes" },
        { name: "Accessories", value: "Bespoke selections tailored to your project" }
      ]
    },
    {
      category: "Features",
      items: [
        { name: "Design", value: "Fully customized to meet specific requirements" },
        { name: "Lighting", value: "Integrated solutions for ambiance and functionality" },
        { name: "Storage", value: "Tailored organization systems for maximum efficiency" },
        { name: "Smart Features", value: "Optional integration with home automation systems" }
      ]
    }
  ]);

  const [defaultProcessSteps] = useState([
    {
      number: 1,
      title: "Initial Consultation",
      description: "We meet to discuss your requirements, preferences, and budget to understand your vision."
    },
    {
      number: 2,
      title: "Design & Planning",
      description: "Our designers create detailed plans and 3D visualizations to ensure they meet your expectations."
    },
    {
      number: 3,
      title: "Material Selection",
      description: "Choose from our premium materials, finishes, and hardware options for your project."
    },
    {
      number: 4,
      title: "Crafting & Construction",
      description: "Our skilled craftsmen build your custom components with precision and attention to detail."
    },
    {
      number: 5,
      title: "Installation",
      description: "Professional installation team carefully completes your project, ensuring perfect fit and functionality."
    }
  ]);

  const [defaultDesignInspirations] = useState([
    {
      title: "Contemporary Design",
      image: "/assets/images/Media-unit-Wine-lovers-dream-by-taaj-kitchens-scaled.jpg",
      description: "Modern elegance with clean lines and minimalist aesthetic.",
      link: "/sovran-interiors"
    },
    {
      title: "Classic Styling",
      image: "/assets/images/Kensington-Residence-by-Taaj-kitchens-front-view-scaled.jpg",
      description: "Traditional designs with timeless appeal and superior craftsmanship.",
      link: "/sovran-interiors"
    },
    {
      title: "Luxury Features",
      image: "/assets/images/Copy-of-Luxury-London-Penthouse-Dark-kitchen-front-view-scaled.jpg",
      description: "Premium design elements for discerning clients seeking the extraordinary.",
      link: "/sovran-interiors"
    }
  ]);

  // Render sections based on the page data
  const renderSections = () => {
    if (pageType === 'main' || (!categoryId && !subcategoryId)) {
      // Main page layout with sections property
      const mainPage = pageData as PageData;
      return (
        <>
          {mainPage.sections && mainPage.sections.map((section: any, index: number) => {
            if (section.type === 'services') {
              return <ServicesSection key={index} data={section} />;
            } else if (section.type === 'gallery') {
              return <GallerySection key={index} data={section} />;
            }
            return null;
          })}
        </>
      );
    } else if ('content' in pageData) {
      // Category or subcategory page layout with enhanced sections
      const categoryPage = pageData as CategoryData;
      return (
        <>
          <ContentSection 
              title=""
              introduction={categoryPage.content.introduction}
              sections={categoryPage.content.sections}
              featuredProjects={[]}
            />



          
          {/* Show these sections for all category and subcategory pages */}
          <ProcessSection steps={categoryPage.content.processSteps || defaultProcessSteps} />
          <SpecificationsSection specifications={categoryPage.content.specifications || defaultSpecifications} />
          <TestimonialsSection testimonials={categoryPage.content.testimonials || defaultTestimonials} />
          <DesignInspirationSection designs={categoryPage.content.designInspirations || defaultDesignInspirations} />
        </>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection 
        ref={heroRef}
        title={pageData.title}
        description={pageData.description || ''}
        backgroundImage={pageData.heroImage || ''}
        ctaText={'ctaText' in pageData ? pageData.ctaText : undefined}
        ctaLink={'ctaLink' in pageData ? pageData.ctaLink : undefined}
      />

      {/* Subcategory Navigation (only for category pages) */}
      {categoryId && currentCategoryNav && (
        <SubcategoryNav 
          category={currentCategoryNav.title} 
          subcategories={currentCategoryNav.subcategories} 
          currentSubcategory={subcategoryId}
        />
      )}

      {/* Dynamic Sections */}
      {renderSections()}

      {/* Standard CTA Section from page data */}
      {'ctaSection' in pageData && pageData.ctaSection && (
        <CtaSection 
          title={pageData.ctaSection.title}
          description={pageData.ctaSection.description}
          primaryCta={pageData.ctaSection.primaryCta}
          secondaryCta={pageData.ctaSection.secondaryCta}
        />
      )}
      
      {/* Final CTA Section - show for all subcategory pages */}
      {subcategoryId && (
        <FinalCtaSection
          title={`Ready to Create Your Dream ${subcategoryId.charAt(0).toUpperCase() + subcategoryId.slice(1).replace(/-/g, ' ')}?`}
          description="Contact our design team today to schedule a consultation and bring your vision to life."
          buttonText="Schedule Consultation"
          buttonLink="/contact"
          secondaryText="View More Designs"
          secondaryLink={`/sovran-interiors/${categoryId}`}
          background="white"
        />
      )}

      <Footer />
    </div>
  );
};

export default SovranInteriorsTemplate;
