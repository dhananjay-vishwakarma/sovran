import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BuilderHeroSection from '../components/BuilderHeroSection';
import SubcategoryNav from '../components/SubcategoryNav';
import ContentSection from '../components/sections/ContentSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ProcessSection from '../components/sections/ProcessSection';
import FinalCtaSection from '../components/sections/FinalCtaSection';
import sovranBuildersData from '../data/sovranBuilders.json';
import ScrollToTop from '../components/ScrollToTop';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface PageTemplateProps {
  pageType?: 'main' | 'category' | 'subcategory';
}

// Type definitions for our data structure
interface CategoryData {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
    }[];
    featuredProjects: {
      title: string;
      description: string;
      image: string;
    }[];
    testimonials?: {
      quote: string;
      author: string;
      company?: string;
      projectType?: string;
    }[];
    processSteps?: {
      number: number;
      title: string;
      description: string;
    }[];
    gallery?: {
      image: string;
      caption: string;
    }[];
  };
}

const SovranBuildersTemplate: React.FC<PageTemplateProps> = ({ pageType = 'category' }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const heroRef = useRef<HTMLDivElement>(null);

  // Find the category data based on the URL parameter
  const categoryData = sovranBuildersData.categories.find(cat => cat.id === categoryId) as CategoryData | undefined;
  
  // If category doesn't exist, use the first category as a fallback
  const pageData = categoryData || sovranBuildersData.categories[0];

  // Generate navigation items from the residential categories
  const residentialNav = sovranBuildersData.navigation.residential.map(item => ({
    id: item.id,
    title: item.title,
    link: item.link
  }));

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
  }, [categoryId]);

  // Default data for process steps if not provided
  const defaultProcessSteps = [
    {
      number: 1,
      title: "Initial Consultation",
      description: "We meet to discuss your requirements, preferences, and budget to understand your vision."
    },
    {
      number: 2,
      title: "Design & Planning",
      description: "Our design team creates detailed plans and visualizations of your project."
    },
    {
      number: 3,
      title: "Building Regulations & Permits",
      description: "We handle all necessary permits and ensure compliance with building regulations."
    },
    {
      number: 4,
      title: "Construction Phase",
      description: "Our skilled craftsmen execute the project with precision and attention to detail."
    },
    {
      number: 5,
      title: "Quality Inspection & Handover",
      description: "A thorough quality check ensures everything meets our high standards before project completion."
    }
  ];

  // Gallery section for showcasing project images
  const GallerySection = ({ images }: { images: { image: string; caption: string }[] }) => {
    return (
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 reveal-up">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((item, index) => (
              <div 
                key={index} 
                className="overflow-hidden rounded-lg shadow-lg reveal-image"
              >
                <div className="relative h-64">
                  <img 
                    src={item.image} 
                    alt={item.caption} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white">
                  <p className="text-gray-700">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <ScrollToTop />
      <Navigation />
      
      {/* Hero Section */}
      <BuilderHeroSection 
        title={pageData.title}
        description={pageData.description}
        backgroundImage={pageData.heroImage}
      />

      {/* Subcategory Navigation */}
      <SubcategoryNav 
        category="Residential Construction" 
        subcategories={residentialNav.map(item => ({
          id: item.id,
          title: item.title,
          description: "",
          link: item.link
        }))} 
        currentSubcategory={categoryId}
      />

      {/* Main Content Section */}
      <ContentSection 
        title=""
        introduction={pageData.content.introduction}
        sections={pageData.content.sections}
        featuredProjects={pageData.content.featuredProjects}
      />

      {/* Process Steps Section */}
      <ProcessSection steps={pageData.content.processSteps || defaultProcessSteps} />

      {/* Gallery Section if available */}
      {pageData.content.gallery && (
        <GallerySection images={pageData.content.gallery} />
      )}

      {/* Testimonials Section if available */}
      {pageData.content.testimonials && (
        <TestimonialsSection testimonials={pageData.content.testimonials} />
      )}
      
      {/* Final CTA Section */}
      <FinalCtaSection
        title={`Ready to Start Your ${pageData.title} Project?`}
        description="Contact our team today to schedule a consultation and bring your vision to life."
        buttonText="Schedule Consultation"
        buttonLink="/contact"
        secondaryText="View Our Portfolio"
        secondaryLink="/sovran-builders#portfolio"
        background="dark"
      />

      <Footer />
    </div>
  );
};

export default SovranBuildersTemplate;
