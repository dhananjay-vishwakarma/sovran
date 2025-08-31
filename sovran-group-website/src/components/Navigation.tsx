import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import sovranInteriorsData from '../data/sovranInteriors.json';
import '../styles/megaMenu.css';
import '../styles/residential-submenu.css';
import '../styles/residential-dropdown.css';
import '../styles/mobile-menu.css';
import { Helmet } from 'react-helmet';
import LazyImage from './LazyImage';
import './NavigationStyles.css';
import sovranLogo from '../assets/logo/Sovran-03-03.png';

// Types
type MobileMenuState = 
  | 'mobile-about' 
  | 'mobile-design' 
  | 'mobile-build' 
  | 'mobile-interiors'
  | 'mobile-build-residential';

type DesktopMenuState = 
  | 'interiors'
  | 'build'
  | 'build-residential';

type DropdownType = MobileMenuState | DesktopMenuState;

// Helper function to check if a dropdown is part of the mobile build menu
const isMobileBuildMenu = (dropdown: DropdownType | null): boolean => {
  return dropdown === 'mobile-build' || dropdown === 'mobile-build-residential';
};

// Skeleton placeholder component for image loading
const ImageSkeleton = () => (
  <div className="animate-pulse bg-dark-600 w-full h-full rounded-lg"></div>
);

// LazyLoadImage component to handle image loading with skeleton
const LazyLoadImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate a much smaller thumbnail version path - we'll use query params to signal to CDN
  // This assumes your server or CDN can handle image resizing with query params
  // For direct file access without CDN, this will still load the original but we'll restrict size via CSS
  const thumbnailSrc = `${src}?width=150&quality=60`;

  useEffect(() => {
    // Reset loading state when source changes
    setLoaded(false);
    
    const img = imgRef.current;
    if (img && img.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <>
      {!loaded && <ImageSkeleton />}
      <img 
        ref={imgRef}
        src={thumbnailSrc} // Use smaller thumbnail version
        alt={alt} 
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        style={{ 
          transition: 'opacity 0.3s ease-in-out',
          maxWidth: '100%',  // Restrict size
          maxHeight: '100%', // Restrict size
          width: 'auto',     // Let browser handle aspect ratio
          height: 'auto'     // Let browser handle aspect ratio
        }}
        loading="eager" // Force eager loading to ensure images are ready
      />
    </>
  );
};

// State interface for better type organization
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface NavigationState {
  isScrolled: boolean;
  isMobileMenuOpen: boolean; 
  activeDropdown: DropdownType | null;
  isMegaMenuOpen: boolean;
}

// Image paths for mega menu
const megaMenuImages = {
  'bespoke-rooms': {
    main: '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249647-HDR.jpg',
    subcategories: {
      'tv-units': '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249572-HDR.jpg',
      'offices': '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249582-HDR.jpg',
      'bookshelves-displays': '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249597-HDR.jpg',
      'bars': '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1260088-HDR.jpg'
    }
  },
  'bespoke-wardrobes': {
    main: '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Bedroom 1/Photos/P1249418-HDR.jpg',
    subcategories: {
      'all-wardrobes': '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Bedroom 1/Photos/P1249428-HDR.jpg',
      'shop-by-room-type': '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Bedroom 1/Photos/P1249433-HDR.jpg',
      'shop-by-door-style': '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Bedroom 1/Photos/P1249468-HDR.jpg'
    }
  },
  'kitchens': {
    main: '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249592-HDR.jpg',
    subcategories: {
      'kitchen-collection': '/assets/images/Kitchen-Lounge-P1249557-HDR.jpg',
      'kitchen-features': '/assets/images/Kitchen-Lounge-P1249562-HDR.jpg',
      'luxury-kitchen-materials': '/assets/images/Kitchen-Lounge-P1249567-HDR.jpg',
      'projects': '/assets/images/Kitchen-Lounge-P1260053-HDR.jpg',
      'complete-home-solutions': '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1260063-HDR.jpg'
    }
  }
};

// Featured videos
const featuredVideos = [
  {
    title: 'Kitchen & Media Wall',
    src: '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Media Wall Reel.mp4',
    thumbnail: '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249682-HDR.jpg'
  },
  {
    title: 'Wardrobe Showcase',
    src: '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Wardrobe reel.mp4',
    thumbnail: '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Bedroom 1/Photos/P1249438-HDR.jpg'
  }
];

const Navigation: React.FC = () => {
  // Initialize state using NavigationState interface
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownType | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const residentialMenuRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const residentialSubmenuRef = useRef<HTMLDivElement>(null);
  
  // Log mobile menu state for debugging
  useEffect(() => {
    console.log('Mobile menu state changed:', isMobileMenuOpen);
  }, [isMobileMenuOpen]);
  
  // Create refs for the dropdown menus
  const buildMenuRef = useRef<HTMLDivElement>(null);
  const interiorsMenuRef = useRef<HTMLDivElement>(null);
  
  // Add timers for hover delays
  const hoverTimerRef = useRef<number | null>(null);
  const leaveTimerRef = useRef<number | null>(null);

  const handleDropdownToggle = (dropdown: DropdownType) => {
    setActiveDropdown(prevState => {
      if (prevState === dropdown) {
        return null;
      } else if (dropdown.startsWith('mobile-build')) {
        // For mobile build menu items, allow nested states
        return dropdown;
      } else {
        // For other dropdowns, close others when opening
        return dropdown;
      }
    });
  };

  // Get an array of critical images that should be preloaded
  const criticalImages = [
    megaMenuImages['bespoke-rooms'].main,
    megaMenuImages['bespoke-wardrobes'].main,
    megaMenuImages['kitchens'].main
  ];

  // Enhanced scroll handler with smoother behavior
  useEffect(() => {
    // Initial check in case page is loaded already scrolled
    setIsScrolled(window.scrollY > 50);
    
    const handleScroll = () => {
      // Apply scrolled state when scrolled past 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debounced hover handlers for better performance
  const handleInteriorsMouseEnter = () => {
    // Clear any pending close timer
    if (leaveTimerRef.current) {
      window.clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    
    // Set active dropdown immediately for better UX
    setActiveDropdown('interiors');
    setIsMegaMenuOpen(true);
  };

  const handleBuildMouseEnter = () => {
    // Clear any pending close timer
    if (leaveTimerRef.current) {
      window.clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    
    // Set active dropdown immediately for better UX
    setActiveDropdown('build');
    setIsMegaMenuOpen(true);
  };

  // Debounced close handler
  const handleMouseLeave = () => {
    // Use a short timeout to prevent accidental menu closing
    // when user briefly moves mouse outside the menu
    leaveTimerRef.current = window.setTimeout(() => {
      setActiveDropdown(null);
      setIsMegaMenuOpen(false);
    }, 150); // Short delay before closing
  };

useEffect(() => {
  const handleClickOutside = () => {
    setTimeout(() => {
      setActiveDropdown(null);
      setIsMegaMenuOpen(false);
    },);
  };

  if (activeDropdown) {
    document.addEventListener('click', handleClickOutside);
  }

  return () => {
    document.removeEventListener('click', handleClickOutside);
    
    // Clean up any pending timers
    // Copy to local variables to avoid the react-hooks/exhaustive-deps warning
    const currentHoverTimer = hoverTimerRef.current;
    const currentLeaveTimer = leaveTimerRef.current;
    
    if (currentHoverTimer) {
      window.clearTimeout(currentHoverTimer);
    }
    if (currentLeaveTimer) {
      window.clearTimeout(currentLeaveTimer);
    }
  };
}, [activeDropdown]);

  // No need for JS positioning as it's handled by CSS now
  useEffect(() => {
    // Just keep the ref initialization
  }, []);

  return (
    <nav className={`header-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'scrolled' : 'bg-transparent'
    }`}>
      <Helmet>
        {criticalImages.map((image, index) => (
          <link key={index} rel="preload" href={image} as="image" />
        ))}
      </Helmet>
  <div className="header-container max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex flex-col items-center">
          {/* Logo (centered) */}
          <div className="logo-container">
            <Link to="/">
              <img
                src={sovranLogo}
                alt="Sovran Group Logo"
                className="logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation (centered below logo) */}
          <div className="hidden md:flex items-center space-x-8 nav-menu">
            {/* Home */}
            <Link to="/" className="font-lato text-white hover:text-primary-400 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 hover:after:w-full after:transition-all after:duration-300">
              Home
            </Link>
            {/* About Us Dropdown */}
            <div className="relative group py-2">
              <Link to="/about" className="flex items-center font-lato text-white hover:text-primary-400 transition-colors focus:outline-none">
                <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 group-hover:after:w-full after:transition-all after:duration-300">
                  About Us
                </span>
                <ChevronDownIcon className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute left-0 mt-2 w-56 bg-[#081E27]/95 backdrop-blur-md shadow-xl rounded-lg overflow-hidden z-30 hidden group-hover:block">
                <Link to="/about#space-story" className="block px-4 py-2 text-white hover:bg-primary-600">
                  Every Space Has a Story
                </Link>
                <div className="border-t border-dark-600">
                  <Link to="/about#our-story" className="block px-4 py-2 text-white hover:bg-primary-600">
                    Our Story
                  </Link>
                </div>
                <div className="border-t border-dark-600">
                  <Link to="/about#our-ethos" className="block px-4 py-2 text-white hover:bg-primary-600">
                    Our Ethos
                  </Link>
                </div>
                <div className="border-t border-dark-600">
                  <Link to="/about#process" className="block px-4 py-2 text-white hover:bg-primary-600">
                    Our Process
                  </Link>
                </div>
                <div className="border-t border-dark-600">
                  <Link to="/about#contact" className="block px-4 py-2 text-white hover:bg-primary-600">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Architectural Design Dropdown */}
            <div className="relative group py-2">
              <Link to="/sovran-design" className="flex items-center font-lato text-white hover:text-primary-400 transition-colors focus:outline-none">
                <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 group-hover:after:w-full after:transition-all after:duration-300">
                  Architectural
                </span>
                <ChevronDownIcon className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute left-0 mt-2 w-64 bg-[#081E27]/95 backdrop-blur-md shadow-xl rounded-lg overflow-hidden z-30 hidden group-hover:block">
                <Link to="/sovran-design#overview" className="block px-4 py-2 text-white hover:bg-primary-600">
                  Architectural Services Overview
                </Link>
                <div className="border-t border-dark-600">
                  <Link to="/sovran-design#planning" className="block px-4 py-2 text-white hover:bg-primary-600">
                    Planning & Building Regulations
                  </Link>
                </div>
                <div className="border-t border-dark-600">
                  <Link to="/sovran-design#engineering" className="block px-4 py-2 text-white hover:bg-primary-600">
                    Structural Engineering
                  </Link>
                </div>
                <div className="border-t border-dark-600">
                  <Link to="/sovran-design#renders" className="block px-4 py-2 text-white hover:bg-primary-600">
                    3D Renders & Visualisation
                  </Link>
                </div>
                <div className="border-t border-dark-600">
                  <Link to="/sovran-design#portfolio" className="block px-4 py-2 text-white hover:bg-primary-600">
                    Projects / Portfolio
                  </Link>
                </div>
              </div>
            </div>

            {/* Build Mega Menu */}
            <div 
              className="relative mega-menu-wrapper group py-2" 
              onMouseEnter={handleBuildMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={buildMenuRef}
            >
              <button
                className="flex items-center font-lato text-white hover:text-primary-400 transition-colors focus:outline-none"
              >
                <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 group-hover:after:w-full after:transition-all after:duration-300">
                  Build
                </span>
                <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform group-hover:rotate-180`} />
              </button>
              
              {/* Mega Menu - always rendered but visibility controlled by CSS for better performance */}
              <div className={`absolute left-0 mt-2 w-screen max-w-2xl -ml-64 bg-[#081E27]/95 backdrop-blur-md shadow-2xl rounded-lg overflow-hidden z-20 mega-menu font-lato transition-opacity duration-150 ${activeDropdown === 'build' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="p-6">
                  {/* Two-column layout */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Column 1: Residential Construction */}
                    <div className="pr-6 border-r border-dark-600">
                      <Link 
                        to="/sovran-builders/residential" 
                        className="block text-white text-lg font-medium hover:text-primary-400 mb-4"
                      >
                        Residential Construction
                      </Link>
                      
                      <div className="space-y-2">
                        <Link 
                          to="/sovran-builders/residential/renovations" 
                          className="block text-sm text-gray-300 hover:text-primary-400"
                        >
                          Renovations
                        </Link>
                        <Link 
                          to="/sovran-builders/residential/new-builds" 
                          className="block text-sm text-gray-300 hover:text-primary-400"
                        >
                          New Builds
                        </Link>
                        <Link 
                          to="/sovran-builders/residential/extensions" 
                          className="block text-sm text-gray-300 hover:text-primary-400"
                        >
                          Extensions
                        </Link>
                        <Link 
                          to="/sovran-builders/residential/loft-conversions" 
                          className="block text-sm text-gray-300 hover:text-primary-400"
                        >
                          Loft Conversions
                        </Link>
                        <Link 
                          to="/sovran-builders/residential/basements" 
                          className="block text-sm text-gray-300 hover:text-primary-400"
                        >
                          Basements
                        </Link>
                        <Link 
                          to="/sovran-builders/residential/landscaping" 
                          className="block text-sm text-gray-300 hover:text-primary-400"
                        >
                          Landscaping
                        </Link>
                        <Link 
                          to="/sovran-builders/residential/swimming-pools" 
                          className="block text-sm text-gray-300 hover:text-primary-400"
                        >
                          Swimming Pools
                        </Link>
                      </div>
                    </div>

                    {/* Column 2: Commercial and Other Categories */}
                    <div>
                      <Link 
                        to="/sovran-builders/commercial" 
                        className="block text-white text-lg font-medium hover:text-primary-400 mb-4"
                      >
                        Commercial Construction
                      </Link>
                      
                      <div className="space-y-2 mb-6">
                        <Link 
                          to="/sovran-builders/commercial#office-spaces" 
                          className="block text-sm text-gray-300 hover:text-primary-400"
                        >
                          Office Spaces
                        </Link>
                        <Link 
                          to="/sovran-builders/commercial#retail" 
                          className="block text-sm text-gray-300 hover:text-primary-400"
                        >
                          Retail
                        </Link>
                      </div>

                      <div className="space-y-2">
                        <Link 
                          to="/sovran-builders/process" 
                          className="block text-sm text-white hover:text-primary-400"
                        >
                          Process and Approach
                        </Link>
                        <Link 
                          to="/sovran-builders/portfolio" 
                          className="block text-sm text-white hover:text-primary-400"
                        >
                          Projects / Portfolio
                        </Link>
                        <Link 
                          to="/sovran-builders/testimonials" 
                          className="block text-sm text-white hover:text-primary-400"
                        >
                          Testimonials
                        </Link>
                        <Link 
                          to="/sovran-builders/faq" 
                          className="block text-sm text-white hover:text-primary-400"
                        >
                          FAQ
                        </Link>
                        <Link 
                          to="/sovran-builders/contact" 
                          className="block text-sm text-white hover:text-primary-400"
                        >
                          Contact Us
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Image Grid */}
                  <div className="mt-6 grid grid-cols-4 gap-3">
                    <div className="relative rounded-lg overflow-hidden h-24">
                      <LazyLoadImage 
                        src="/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249677-HDR.jpg" 
                        alt="Kitchen Project" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="relative rounded-lg overflow-hidden h-24">
                      <LazyLoadImage 
                        src="/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249562-HDR.jpg" 
                        alt="Lounge Project" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="relative rounded-lg overflow-hidden h-24">
                      <LazyLoadImage 
                        src="/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249572-HDR.jpg" 
                        alt="Living Space" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="relative rounded-lg overflow-hidden h-24">
                      <LazyLoadImage 
                        src="/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Bedroom 1/Photos/P1249418-HDR.jpg" 
                        alt="Bedroom Project" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sovran Interiors Mega Menu */}
            <div 
              className="relative mega-menu-wrapper group py-2" 
              onMouseEnter={handleInteriorsMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={interiorsMenuRef}
            >
              <button
                className="flex items-center font-lato text-white hover:text-primary-400 transition-colors focus:outline-none"
              >
                <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 group-hover:after:w-full after:transition-all after:duration-300">
                  Interiors
                </span>
                <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform group-hover:rotate-180`} />
              </button>
              
              {/* Mega Menu - always rendered but visibility controlled by CSS for better performance */}
              <div className={`absolute left-0 mt-2 w-screen max-w-3xl -ml-96 bg-[#081E27]/95 backdrop-blur-md shadow-2xl rounded-lg overflow-hidden z-20 mega-menu font-lato transition-opacity duration-150 ${activeDropdown === 'interiors' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="p-6">
                  {/* Three-column categories layout */}
                  <div className="grid grid-cols-3 gap-6">
                    {sovranInteriorsData.navigation.mainCategories.map((category) => (
                      <div key={category.id} className="pr-6 last:border-r-0">
                        <Link 
                          to={category.link} 
                          className="block text-white text-lg font-medium hover:text-primary-400 mb-4"
                        >
                          {category.title}
                        </Link>
                        
                        <div className="space-y-2">
                          {category.subcategories.map((subcategory) => (
                            <Link 
                              key={subcategory.id} 
                              to={subcategory.link} 
                              className="block text-sm text-gray-300 hover:text-primary-400"
                            >
                              {subcategory.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Bottom image grid */}
                  <div className="mt-6 pt-4 border-t border-dark-600">
                    <h4 className="text-white text-base font-medium mb-3">Featured Projects</h4>
                    <div className="grid grid-cols-4 gap-3">
                      <div className="relative rounded-lg overflow-hidden h-24">
                        <LazyLoadImage 
                          src="/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249647-HDR.jpg" 
                          alt="Bespoke Room" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="relative rounded-lg overflow-hidden h-24">
                        <LazyLoadImage 
                          src="/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Bedroom 1/Photos/P1249428-HDR.jpg" 
                          alt="Bespoke Wardrobe" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="relative rounded-lg overflow-hidden h-24">
                        <LazyLoadImage 
                          src="/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249592-HDR.jpg" 
                          alt="Kitchen Design" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="relative rounded-lg overflow-hidden h-24">
                        <LazyLoadImage 
                          src="/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1260053-HDR.jpg" 
                          alt="Luxury Interior" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/careers" className="font-lato text-white hover:text-primary-400 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 hover:after:w-full after:transition-all after:duration-300">
              Careers
            </Link>
            <Link to="/contact" className="font-lato text-white hover:text-primary-400 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 hover:after:w-full after:transition-all after:duration-300">
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile menu button - positioned at bottom with fixed positioning */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMobileMenuOpen(!isMobileMenuOpen);
            console.log('Mobile menu toggled:', !isMobileMenuOpen); // Add logging
          }}
          className="md:hidden text-white mobile-menu-button transition-all duration-300"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Navigation - positioned as a floating menu */}
        <div 
          className={`md:hidden bg-[#081E27]/95 backdrop-blur-md mobile-menu mobile-menu-scrollbar ${isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`} 
          onClick={(e) => e.stopPropagation()}
          style={{ 
            transition: 'opacity 0.3s ease, visibility 0.3s ease',
            display: 'block' // Always display the element but control visibility with opacity
          }}
        >
            <div className="mobile-menu-header px-4 py-3 flex items-center justify-between">
              <h3 className="text-white font-medium text-lg">Menu</h3>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-menu-close"
              >
                <XMarkIcon className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-4 py-3 font-lato text-white hover:bg-dark-700 rounded-md mobile-menu-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              {/* Mobile About Us Menu */}
              <div className="space-y-1">
                <Link
                  to="/about"
                  className="flex items-center justify-between w-full px-4 py-3 font-lato text-white hover:bg-dark-700 rounded-md mobile-menu-link"
                  onClick={() => handleDropdownToggle('mobile-about')}
                >
                  <span>About Us</span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${activeDropdown === 'mobile-about' ? 'rotate-180' : ''}`} />
                </Link>
                {activeDropdown === 'mobile-about' && (
                  <div className="pl-4 space-y-1 pt-1 pb-2 bg-[#0a2732]/70 rounded-md ml-2 mr-2">
                    <Link
                      to="/about#space-story"
                      className="block px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Every Space Has a Story
                    </Link>
                    <Link
                      to="/about#our-story"
                      className="block px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Story
                    </Link>
                    <Link
                      to="/about#our-ethos"
                      className="block px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Ethos
                    </Link>
                    <Link
                      to="/about#process"
                      className="block px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Process
                    </Link>
                    <Link
                      to="/about#contact"
                      className="block px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Mobile Sovran Interiors Collapsible */}
              <div className="space-y-1">
                <button
                  onClick={() => handleDropdownToggle('mobile-interiors')}
                  className="flex items-center justify-between w-full px-4 py-3 font-lato text-white hover:bg-dark-700 rounded-md mobile-menu-link"
                >
                  <span>Interiors</span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${activeDropdown === 'mobile-interiors' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'mobile-interiors' && (
                  <div className="pl-4 space-y-3 py-2 bg-[#0a2732]/70 rounded-md ml-2 mr-2">
                    <Link 
                      to="/sovran-interiors" 
                      className="block px-4 py-2 text-sm text-white font-medium hover:bg-dark-700 hover:text-white rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      All Interiors
                    </Link>
                    
                    {/* Mobile menu category images */}
                    <div className="grid grid-cols-2 gap-2 px-3 py-2">
                      {sovranInteriorsData.navigation.mainCategories.map((category, index) => (
                        <div key={category.id} className="relative rounded-lg overflow-hidden aspect-video">
                          <LazyImage 
                            src={megaMenuImages[category.id as keyof typeof megaMenuImages]?.main} 
                            alt={category.title}
                            className="w-full h-full object-cover"
                            startLoading={activeDropdown === 'mobile-interiors'}
                            priority={index}
                          />
                          <div className="absolute inset-0 bg-[#081E27]/60 flex items-center justify-center z-10">
                            <Link 
                              to={category.link}
                              className="text-white text-xs font-medium hover:text-primary-400"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {category.title}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mobile category lists */}
                    {sovranInteriorsData.navigation.mainCategories.map((category) => (
                      <div key={category.id} className="space-y-1 mt-2 border-t border-dark-700 pt-2">
                        <Link 
                          to={category.link} 
                          className="block px-3 py-1.5 text-sm text-white font-medium hover:bg-dark-700 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {category.title}
                        </Link>
                        
                        <div className="grid grid-cols-2 gap-x-2">
                          {category.subcategories.map((subcategory) => (
                            <Link 
                              key={subcategory.id} 
                              to={subcategory.link} 
                              className="block px-5 py-1.5 text-xs text-gray-300 hover:bg-dark-700 hover:text-white rounded-md"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subcategory.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Featured video thumbnails */}
                    <div className="mt-4 border-t border-dark-700 pt-3">
                      <h4 className="px-3 text-sm font-medium text-white mb-2">Featured Videos</h4>
                      <div className="grid grid-cols-2 gap-2 px-3">
                        {featuredVideos.map((video, index) => (
                          <div key={index} className="relative rounded-lg overflow-hidden aspect-video">
                            <LazyImage 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="w-full h-full object-cover"
                              startLoading={activeDropdown === 'mobile-interiors'}
                              priority={index}
                            />
                            <div className="absolute inset-0 bg-[#081E27]/60 flex items-center justify-center z-10">
                              <Link 
                                to={`/sovran-interiors/videos/${index}`}
                                className="text-white text-xs font-medium hover:text-primary-400"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {video.title}
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Mobile Build Menu */}
              <div className="space-y-1">
                <button
                  className="flex items-center justify-between w-full px-4 py-3 font-lato text-white hover:bg-dark-700 rounded-md mobile-menu-link"
                  onClick={() => handleDropdownToggle('mobile-build')}
                >
                  <span>Build</span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${activeDropdown === 'mobile-build' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-build' && (
                  <div className="pl-4 space-y-1 pt-1 pb-2 bg-[#0a2732]/70 rounded-md ml-2 mr-2">
                    {/* Residential Construction Section */}
                    <button
                      onClick={() => handleDropdownToggle('mobile-build-residential' as DropdownType)}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                    >
                      <span>Residential Construction</span>
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${String(activeDropdown) === 'mobile-build-residential' ? 'rotate-180' : ''}`} />
                    </button>
                    {isMobileBuildMenu(activeDropdown) && (
                      <div className="pl-4 space-y-1 bg-[#081E27]/60 rounded-md py-2 my-1 mx-2">
                        <Link
                          to="/sovran-builders/residential/renovations"
                          className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-700 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Renovations
                        </Link>
                        <Link
                          to="/sovran-builders/residential/new-builds"
                          className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-700 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          New Builds
                        </Link>
                        <Link
                          to="/sovran-builders/residential/extensions"
                          className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-700 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Extensions
                        </Link>
                        <Link
                          to="/sovran-builders/residential/loft-conversions"
                          className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-700 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Loft Conversions
                        </Link>
                        <Link
                          to="/sovran-builders/residential/basements"
                          className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-700 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Basements
                        </Link>
                        <Link
                          to="/sovran-builders/residential/landscaping"
                          className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-700 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Landscaping
                        </Link>
                        <Link
                          to="/sovran-builders/residential/swimming-pools"
                          className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-700 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Swimming Pools
                        </Link>
                      </div>
                    )}
                    <Link
                      to="/sovran-builders/commercial"
                      className="block px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Commercial Construction
                    </Link>
                    <Link
                      to="/sovran-builders/process"
                      className="block px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Process and Approach
                    </Link>
                    <Link
                      to="/sovran-builders/portfolio"
                      className="block px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Projects / Portfolio
                    </Link>
                    <Link
                      to="/sovran-builders/testimonials"
                      className="block px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Testimonials
                    </Link>
                    <Link
                      to="/sovran-builders/faq"
                      className="block px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      FAQ
                    </Link>
                    <Link
                      to="/sovran-builders/contact"
                      className="block px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact Us
                    </Link>
                    
                    {/* Image grid at bottom of mobile menu */}
                    <div className="mt-3 px-3 grid grid-cols-2 gap-2">
                      <div className="relative rounded-lg overflow-hidden aspect-video">
                        <LazyLoadImage 
                          src="/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249677-HDR.jpg" 
                          alt="Kitchen Project" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="relative rounded-lg overflow-hidden aspect-video">
                        <LazyLoadImage 
                          src="/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Bathroom 1/Photos/P1259847-HDR.jpg" 
                          alt="Bathroom Design" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Mobile Architectural Design Menu */}
              <div className="space-y-1">
                <Link
                  to="/sovran-design"
                  className="flex items-center justify-between w-full px-4 py-3 font-lato text-white hover:bg-dark-700 rounded-md mobile-menu-link"
                  onClick={() => handleDropdownToggle('mobile-design')}
                >
                  <span>Architectural Design</span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${activeDropdown === 'mobile-design' ? 'rotate-180' : ''}`} />
                </Link>
                {activeDropdown === 'mobile-design' && (
                  <div className="pl-4 space-y-1 pt-1 pb-2 bg-[#0a2732]/70 rounded-md ml-2 mr-2">
                    <Link
                      to="/sovran-design#overview"
                      className="block px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Architectural Services Overview
                    </Link>
                    <Link
                      to="/sovran-design#planning"
                      className="block px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Planning & Building Regulations
                    </Link>
                    <Link
                      to="/sovran-design#engineering"
                      className="block px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Structural Engineering
                    </Link>
                    <Link
                      to="/sovran-design#renders"
                      className="block px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      3D Renders & Visualisation
                    </Link>
                    <Link
                      to="/sovran-design#portfolio"
                      className="block px-4 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Projects / Portfolio
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/careers"
                className="block px-4 py-3 font-lato text-white hover:bg-dark-700 rounded-md mobile-menu-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Careers
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-3 font-lato text-white hover:bg-dark-700 rounded-md mobile-menu-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
      </div>
    </nav>
  );
}

export default Navigation;
