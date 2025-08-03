import React, { useEffect, useRef } from 'react';
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
      // Category or subcategory page layout
      const categoryPage = pageData as CategoryData;
      return (
        <ContentSection 
          title={categoryPage.title}
          introduction={categoryPage.content.introduction}
          sections={categoryPage.content.sections}
          featuredProjects={categoryPage.content.featuredProjects}
        />
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

      {/* CTA Section */}
      {'ctaSection' in pageData && pageData.ctaSection && (
        <CtaSection 
          title={pageData.ctaSection.title}
          description={pageData.ctaSection.description}
          primaryCta={pageData.ctaSection.primaryCta}
          secondaryCta={pageData.ctaSection.secondaryCta}
        />
      )}

      <Footer />
    </div>
  );
};

export default SovranInteriorsTemplate;
