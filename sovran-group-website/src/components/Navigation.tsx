import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import sovranInteriorsData from '../data/sovranInteriors.json';
import '../styles/megaMenu.css';
import '../styles/residential-submenu.css';
import '../styles/residential-dropdown.css';
import './NavigationStyles.css';
import '../styles/dropdown-blur.css';
import sovranLogo from '../assets/logo/Sovran-03-03.png';
import MobileNavigation from './MobileNavigation';

// Types
type DesktopMenuState = 
  | 'interiors'
  | 'build'
  | 'build-residential';

type DropdownType = 
  | DesktopMenuState
  | 'mobile-about' 
  | 'mobile-design' 
  | 'mobile-build' 
  | 'mobile-interiors'
  | 'mobile-build-residential';

// Helper function to check if a dropdown is part of the mobile build menu
const isMobileBuildMenu = (dropdown: DropdownType | null): boolean => {
  return dropdown === 'mobile-build' || dropdown === 'mobile-build-residential';
};

// Enhanced Skeleton placeholder component for image loading
const ImageSkeleton = () => (
  <div className="skeleton-loader bg-dark-700/50 w-full h-full rounded-lg relative overflow-hidden">
    <div className="skeleton-shimmer"></div>
  </div>
);

// Progressive LazyLoadImage: skeleton → thumbnail → full image, full image loads after 1s or on hover
const LazyLoadImage = ({
  src,
  alt,
  className,
  priority = false
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) => {
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const [fullLoaded, setFullLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [triggerFull, setTriggerFull] = useState(priority); // full image load trigger
  const fullImgRef = useRef<HTMLImageElement | null>(null);
  const decodeStarted = useRef(false);
  const decodePromise = useRef<Promise<void> | null>(null);
  const timerRef = useRef<number | null>(null);

  // Generate a much smaller thumbnail version path
  const thumbnailSrc = `${src}?width=150&quality=40`;

  // Reset states on src change
  useEffect(() => {
    setThumbLoaded(false);
    setFullLoaded(false);
    setError(false);
    setTriggerFull(priority);
    decodeStarted.current = false;
    decodePromise.current = null;
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    // Only set timer if not priority
    if (!priority) {
      timerRef.current = window.setTimeout(() => {
        setTriggerFull(true);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, priority]);

  // On hover: trigger full image load immediately
  const handleMouseEnter = () => {
    if (!triggerFull) setTriggerFull(true);
  };

  // Pre-decode full image offscreen once triggered
  useEffect(() => {
    if (triggerFull && !fullLoaded && !decodeStarted.current && !error) {
      decodeStarted.current = true;
      const img = new window.Image();
      img.src = src;
      img.decoding = "async";
      img.onload = () => {
        // Only set loaded if still mounted and not error
        setFullLoaded(true);
      };
      img.onerror = () => {
        setError(true);
      };
      // try to decode
      if (img.decode) {
        decodePromise.current = img.decode()
          .then(() => setFullLoaded(true))
          .catch(() => setError(true));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFull, src]);

  // If full image loads via <img> onLoad, also set loaded
  const handleFullImgLoad = () => {
    setFullLoaded(true);
  };

  // If full image errors, show error
  const handleFullImgError = () => {
    setError(true);
  };

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={handleMouseEnter}
    >
      {/* Always show skeleton at mount, until thumb or error */}
      {!thumbLoaded && !error && <ImageSkeleton />}
      {/* Error state */}
      {error && (
        <div className="w-full h-full bg-dark-700/50 flex items-center justify-center text-sm text-gray-400">
          Image not available
        </div>
      )}
      {/* Thumbnail: loads immediately, visible until full image loaded */}
      <img
        src={thumbnailSrc}
        alt={alt}
        className={`${className} absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${thumbLoaded && !fullLoaded && !error ? 'opacity-100' : 'opacity-0'}`}
        style={{
          zIndex: 1,
          objectFit: 'cover'
        }}
        onLoad={() => setThumbLoaded(true)}
        onError={() => setThumbLoaded(true)}
        draggable={false}
        loading={priority ? 'eager' : 'lazy'}
      />
      {/* Full-res image, fades in on load, loads after triggerFull */}
      {!error && triggerFull && (
        <img
          ref={fullImgRef}
          src={src}
          alt={alt}
          className={`${className} absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${fullLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            zIndex: 2,
            objectFit: 'cover'
          }}
          onLoad={handleFullImgLoad}
          onError={handleFullImgError}
          draggable={false}
          decoding="async"
          {...({ fetchpriority: "low" } as any)}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
    </div>
  );
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
  const [activeAboutImage, setActiveAboutImage] = useState('default'); // Track which about us image is active
  const [activeArchitecturalImage, setActiveArchitecturalImage] = useState('default'); // Track which architectural image is active
  const [hoveredAboutItem, setHoveredAboutItem] = useState<string | null>(null);
  const [hoveredArchitecturalItem, setHoveredArchitecturalItem] = useState<string | null>(null);
  const aboutMenuRef = useRef<HTMLDivElement>(null); // Reference to About Us dropdown
  
  // For mobile menu positioning
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Log mobile menu state for debugging
  useEffect(() => {
    console.log('Mobile menu state changed:', isMobileMenuOpen);
  }, [isMobileMenuOpen]);
  
  // Create refs for the dropdown menus
  const buildMenuRef = useRef<HTMLDivElement>(null);
  const interiorsMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  // menu alignment is handled purely with CSS now; remove runtime adjustment
  const [isDesktopDropdownHover, setIsDesktopDropdownHover] = useState(false);
  const blurTimerRef = useRef<number | null>(null);
  
  // Add timers for hover delays
  const leaveTimerRef = useRef<number | null>(null);
  // Configurable timings for ultra-fast but smooth UX
  const HOVER_CLOSE_DELAY = 150; // ms

  // Toggle dropdown function for mobile menus
  const handleDropdownToggle = (dropdown: DropdownType) => {
    setActiveDropdown(prevDropdown => {
      const next = prevDropdown === dropdown ? null : dropdown;
      // If opening mobile-about, set about image to first item
      if (next === 'mobile-about') setActiveAboutImage('space-story');
      // If closing mobile-about, reset about image
      if (prevDropdown === 'mobile-about' && next === null) setActiveAboutImage('default');
      // If opening mobile-design, set architectural image to first item
      if (next === 'mobile-design') setActiveArchitecturalImage('overview');
      if (prevDropdown === 'mobile-design' && next === null) setActiveArchitecturalImage('default');
      return next;
    });
  };

  // Get an array of critical images that should be preloaded
  const aboutUsDropdownImages = [
    "https://sovrangroup.co.uk/images/1.jpg",
    "https://sovrangroup.co.uk/images/2.jpg",
    "https://sovrangroup.co.uk/images/3.jpg",
    "https://sovrangroup.co.uk/images/4.jpg",
    "https://sovrangroup.co.uk/images/2.jpg",
    "https://sovrangroup.co.uk/images/1.jpg"
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
  
  // Refactored About Us menu item hover handler (React way) with debug logging
  const handleMenuItemHover = (itemId: string) => {
    console.log("Hover on item:", itemId);
    setActiveAboutImage(itemId);
    setHoveredAboutItem(itemId);
  };

  // Handler for mouse leaving the About Us dropdown
  const handleAboutMenuMouseLeave = () => {
    console.log("Mouse left About Us menu, reverting to default image");
    setActiveAboutImage('default');
    setHoveredAboutItem(null);
  };

  // Handler for Architectural menu image reset
  const handleArchitecturalMouseLeave = () => {
    console.log("Mouse left Architectural menu, reverting to default image");
    setActiveArchitecturalImage('default');
    setHoveredArchitecturalItem(null);
  };

  // Enhanced hover handlers: open instantly, no delay for build/interiors menus
  const handleInteriorsMouseEnter = (_event: React.MouseEvent) => {
    // Open instantly, no delay
    setActiveDropdown('interiors');
    setIsMegaMenuOpen(true);
    // Clear any pending close timer
    if (leaveTimerRef.current) {
      window.clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  const handleBuildMouseEnter = (_event: React.MouseEvent) => {
    // Open instantly, no delay
    setActiveDropdown('build');
    setIsMegaMenuOpen(true);
    // Clear any pending close timer
    if (leaveTimerRef.current) {
      window.clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  // Track when non-mega, CSS-driven desktop dropdowns (About, Architectural) are hovered
  // so we can apply the global blur class while they're open.

  // Improved mouse leave handler with precise boundary checking
  const handleMouseLeave = (event: React.MouseEvent) => {
    // Get current bounds of both menu elements
    const buildRect = buildMenuRef.current?.getBoundingClientRect();
    const interiorsRect = interiorsMenuRef.current?.getBoundingClientRect();
    
    // Get coordinates of where the mouse is moving to
    const { clientX, clientY } = event;
    
    // Check if mouse is truly leaving all menu areas
    const isLeavingBuildMenu = !buildRect || 
      clientX < buildRect.left || 
      clientX > buildRect.right || 
      clientY < buildRect.top || 
      clientY > buildRect.bottom;
      
    const isLeavingInteriorsMenu = !interiorsRect || 
      clientX < interiorsRect.left || 
      clientX > interiorsRect.right || 
      clientY < interiorsRect.top || 
      clientY > interiorsRect.bottom;
    
    // Only close if we're truly leaving all menu areas
    if (isLeavingBuildMenu && isLeavingInteriorsMenu) {
      // Use a short timeout to prevent accidental menu closing
      leaveTimerRef.current = window.setTimeout(() => {
        setActiveDropdown(null);
        setIsMegaMenuOpen(false);
        leaveTimerRef.current = null;
      }, HOVER_CLOSE_DELAY);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
    // Check if the click is outside both menu refs
    const isClickOutsideBuildMenu = buildMenuRef.current && !buildMenuRef.current.contains(event.target as Node);
    const isClickOutsideInteriorsMenu = interiorsMenuRef.current && !interiorsMenuRef.current.contains(event.target as Node);
    
    if (isClickOutsideBuildMenu && isClickOutsideInteriorsMenu) {
      setTimeout(() => {
        setActiveDropdown(null);
        setIsMegaMenuOpen(false);
      }, 100); // Add proper timeout value
    }
  };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

  return () => {
    document.removeEventListener('click', handleClickOutside);
    
    // Clean up any pending timers
    const currentLeaveTimer = leaveTimerRef.current;
    if (currentLeaveTimer) {
      window.clearTimeout(currentLeaveTimer);
      leaveTimerRef.current = null;
    }
  };
}, [activeDropdown]);

  // Toggle the .blurred class on the root .App element when a desktop dropdown is active.
  useEffect(() => {
    const root = document.querySelector('.App');
    if (!root) return;

    const desktopOpen = activeDropdown === 'build' || activeDropdown === 'interiors' || isDesktopDropdownHover;

    // If opening, apply immediately and clear any close timer
    if (desktopOpen) {
      if (blurTimerRef.current) {
        window.clearTimeout(blurTimerRef.current);
        blurTimerRef.current = null;
      }
      root.classList.add('blurred');
      return;
    }

    // If closing, delay removal slightly to allow mouse to move between elements
    if (blurTimerRef.current) window.clearTimeout(blurTimerRef.current);
    blurTimerRef.current = window.setTimeout(() => {
      root.classList.remove('blurred');
      blurTimerRef.current = null;
    }, 120);

    return () => {
      if (blurTimerRef.current) {
        window.clearTimeout(blurTimerRef.current);
        blurTimerRef.current = null;
      }
      // Don't force remove here as we handle removal via timer
    };
  }, [activeDropdown, isDesktopDropdownHover]);




  return (
    <nav 
      className={`header-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'scrolled' : 'bg-transparent'
      }`}
    >

      

  <div className="header-container max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
       
        {/* Mobile header row: logo left, hamburger right */}
        <div className="w-full flex items-center justify-between md:justify-center mb-0">
          <a href="/" onClick={() => {}} className="md:hidden flex items-center">
            <img src={sovranLogo} alt="Sovran Group Logo" className="h-8 w-auto object-contain" />
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-white mobile-menu-button"
            aria-label="Open mobile menu"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col hidden md:block md:flex-col items-center header-inner">
          {/* Logo (centered on desktop, right on mobile) */}
          <div className="logo-container ">
            {/* Use a real anchor with full reload to force hard refresh when returning to home */}
            <a href="/" onClick={(e) => { /* allow normal navigation which will hard reload */ }}>
              <img
                src={sovranLogo}
                alt="Sovran Group Logo"
                className="logo"
              />
            </a>
          </div>

          {/* Desktop Navigation (centered below logo) */}
          <div className="hidden md:flex items-center space-x-8 nav-menu">
            {/* Small sticky logo placed inline before Home (visible when scrolled) */}
            <div className={`sticky-logo hidden md:block ${isScrolled ? 'visible' : ''}`}>
              <a href="/">
                <img src={sovranLogo} alt="Sovran small logo" className="sticky-logo-img" />
              </a>
            </div>
            {/* Home */}
            <a href="/" className="font-lato text-white hover:text-primary-400 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 hover:after:w-full after:transition-all after:duration-300">
              Home
            </a>
            {/* About Us Dropdown - Enhanced with Images */}
            <div className="relative group py-2" ref={aboutMenuRef}
              onMouseEnter={() => { setActiveAboutImage('space-story'); setIsDesktopDropdownHover(true); }}
              onMouseLeave={() => { handleAboutMenuMouseLeave(); setIsDesktopDropdownHover(false); }}
            >
              <Link to="/about" className="flex items-center font-lato text-white hover:text-primary-400 transition-colors focus:outline-none">
                <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 group-hover:after:w-full after:transition-all after:duration-300">
                  About Us
                </span>
                <ChevronDownIcon className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
              </Link>
              <div
                className="absolute left-0 mt-2 w-[700px] bg-[#081E27]/95 backdrop-blur-md shadow-xl rounded-lg overflow-hidden z-30 hidden group-hover:flex flex-row items-stretch transform transition-all duration-150 ease-out origin-top-left"
                onMouseLeave={handleAboutMenuMouseLeave}
              >
                {/* Left column: menu items */}
                <div className="w-64 border-r border-dark-700 flex-shrink-0">
                  <Link
                    to="/about#space-story"
                    className={`block px-4 py-3 font-lato text-white hover:bg-primary-600 relative about-menu-item first-about-item ${hoveredAboutItem ? '' : 'selected-first'}`}
                    data-item="space-story"
                    onMouseEnter={() => handleMenuItemHover("space-story")}
                    onMouseLeave={() => setHoveredAboutItem(null)}
                  >
                    <span className="relative z-10">Every Space Has a Story</span>
                  </Link>
                  <div className="border-t border-dark-700">
                    <Link
                      to="/about#our-story"
                      className="block px-4 py-3 font-lato text-white hover:bg-primary-600 relative about-menu-item"
                      data-item="our-story"
                      onMouseEnter={() => { handleMenuItemHover("our-story"); }}
                      onMouseLeave={() => setHoveredAboutItem(null)}
                    >
                      <span className="relative z-10">Our Story</span>
                    </Link>
                  </div>
                  <div className="border-t border-dark-700">
                    <Link
                      to="/about#our-ethos"
                      className="block px-4 py-3 font-lato text-white hover:bg-primary-600 relative about-menu-item"
                      data-item="our-ethos"
                      onMouseEnter={() => { handleMenuItemHover("our-ethos"); }}
                      onMouseLeave={() => setHoveredAboutItem(null)}
                    >
                      <span className="relative z-10">Our Ethos</span>
                    </Link>
                  </div>
                  <div className="border-t border-dark-700">
                    <Link
                      to="/about#process"
                      className="block px-4 py-3 font-lato text-white hover:bg-primary-600 relative about-menu-item"
                      data-item="process"
                      onMouseEnter={() => { handleMenuItemHover("process"); }}
                      onMouseLeave={() => setHoveredAboutItem(null)}
                    >
                      <span className="relative z-10">Our Process</span>
                    </Link>
                  </div>
                  <div className="border-t border-dark-700">
                    <Link
                      to="/about#contact"
                      className="block px-4 py-3 font-lato text-white hover:bg-primary-600 relative about-menu-item"
                      data-item="contact"
                      onMouseEnter={() => { handleMenuItemHover("contact"); }}
                      onMouseLeave={() => setHoveredAboutItem(null)}
                    >
                      <span className="relative z-10">Contact Us</span>
                    </Link>
                  </div>
                </div>
                {/* Right column: image panel */}
                <div className="flex-1 h-[280px] relative overflow-hidden bg-dark-800">
                  {/* Default image when menu first appears */}
                  <div
                    className={`absolute inset-0 about-image transition-all duration-200 ease-out ${activeAboutImage === "default" ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    data-for="default"
                  >
                    <img
                      src="https://sovrangroup.co.uk/images/1.jpg"
                      alt="About Sovran Group"
                      className="w-full h-full object-cover scale-120 relative z-30"
                      onLoad={(e) => { console.log('About dropdown image loaded:', (e.target as HTMLImageElement).src); }}
                      onError={(e) => { console.error('About dropdown image failed to load:', (e.target as HTMLImageElement).src); }}
                    />
                    <div className="absolute inset-0 bg-[#CDAD7D]/70 z-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                      <div className="text-lg font-lato font-medium">About Sovran Group</div>
                      <p className="text-sm font-lato text-white/80">Crafting exceptional spaces since 2015</p>
                    </div>
                  </div>
                  {/* Every Space Has a Story image */}
                  <div
                    className={`absolute inset-0 about-image transition-all duration-200 ease-out ${activeAboutImage === "space-story" ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    data-for="space-story"
                  >
                    <img
                      src="https://sovrangroup.co.uk/images/2.jpg"
                      alt="Every Space Has a Story"
                      className="w-full h-full object-cover relative z-30"
                      onLoad={(e) => { console.log('About dropdown image loaded:', (e.target as HTMLImageElement).src); }}
                      onError={(e) => { console.error('About dropdown image failed to load:', (e.target as HTMLImageElement).src); }}
                    />
                    <div className="absolute inset-0 bg-[#CDAD7D]/70 z-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                      <div className="text-lg font-lato font-medium">Every Space Has a Story</div>
                      <p className="text-sm font-lato text-white/80">How we transform your vision into reality</p>
                    </div>
                  </div>
                  {/* Our Story image */}
                  <div
                    className={`absolute inset-0 about-image transition-all duration-200 ease-out ${activeAboutImage === "our-story" ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    data-for="our-story"
                  >
                    <img
                      src="https://sovrangroup.co.uk/images/3.jpg"
                      alt="Our Story"
                      className="w-full h-full object-cover relative z-30"
                      onLoad={(e) => { console.log('About dropdown image loaded:', (e.target as HTMLImageElement).src); }}
                      onError={(e) => { console.error('About dropdown image failed to load:', (e.target as HTMLImageElement).src); }}
                    />
                    <div className="absolute inset-0 bg-[#CDAD7D]/70 z-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                      <div className="text-lg font-lato font-medium">Our Story</div>
                      <p className="text-sm font-lato text-white/80">The journey of Sovran Group</p>
                    </div>
                  </div>
                  {/* Our Ethos image */}
                  <div
                    className={`absolute inset-0 about-image transition-all duration-200 ease-out ${activeAboutImage === "our-ethos" ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    data-for="our-ethos"
                  >
                    <img
                      src="https://sovrangroup.co.uk/images/4.jpg"
                      alt="Our Ethos"
                      className="w-full h-full object-cover relative z-30"
                      onLoad={(e) => { console.log('About dropdown image loaded:', (e.target as HTMLImageElement).src); }}
                      onError={(e) => { console.error('About dropdown image failed to load:', (e.target as HTMLImageElement).src); }}
                    />
                    <div className="absolute inset-0 bg-[#CDAD7D]/70 z-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                      <div className="text-lg font-lato font-medium">Our Ethos</div>
                      <p className="text-sm font-lato text-white/80">The values that drive our work</p>
                    </div>
                  </div>
                  {/* Process image */}
                  <div
                    className={`absolute inset-0 about-image transition-all duration-200 ease-out ${activeAboutImage === "process" ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    data-for="process"
                  >
                    <img
                      src="https://sovrangroup.co.uk/images/2.jpg"
                      alt="Our Process"
                      className="w-full h-full object-cover relative z-30"
                      onLoad={(e) => { console.log('About dropdown image loaded:', (e.target as HTMLImageElement).src); }}
                      onError={(e) => { console.error('About dropdown image failed to load:', (e.target as HTMLImageElement).src); }}
                    />
                    <div className="absolute inset-0 bg-[#CDAD7D]/70 z-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                      <div className="text-lg font-lato font-medium">Our Process</div>
                      <p className="text-sm font-lato text-white/80">How we bring your project to life</p>
                    </div>
                  </div>
                  {/* Contact image */}
                  <div
                    className={`absolute inset-0 about-image transition-all duration-200 ease-out ${activeAboutImage === "contact" ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    data-for="contact"
                  >
                    <img
                      src="https://sovrangroup.co.uk/images/1.jpg"
                      alt="Contact Us"
                      className="w-full h-full object-cover relative z-30"
                      onLoad={(e) => { console.log('About dropdown image loaded:', (e.target as HTMLImageElement).src); }}
                      onError={(e) => { console.error('About dropdown image failed to load:', (e.target as HTMLImageElement).src); }}
                    />
                    <div className="absolute inset-0 bg-[#CDAD7D]/70 z-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                      <div className="text-lg font-lato font-medium">Contact Us</div>
                      <p className="text-sm font-lato text-white/80">Get in touch to start your project</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Architectural Design Dropdown (now with image panel) */}
            <div className="relative group py-2"
              onMouseEnter={() => { setActiveArchitecturalImage('overview'); setIsDesktopDropdownHover(true); }}
              onMouseLeave={() => { handleArchitecturalMouseLeave(); setIsDesktopDropdownHover(false); }}
            >
              <Link to="/sovran-design" className="flex items-center font-lato text-white hover:text-primary-400 transition-colors focus:outline-none">
                <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 group-hover:after:w-full after:transition-all after:duration-300">
                  Architectural
                </span>
                <ChevronDownIcon className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute left-0 mt-2 w-[700px] bg-[#081E27]/95 backdrop-blur-md shadow-xl rounded-lg overflow-hidden z-30 hidden group-hover:flex flex-row items-stretch transform transition-all duration-150 ease-out origin-top-left"
                onMouseLeave={handleArchitecturalMouseLeave}
              >
                {/* Left: links */}
                <div className="w-64 border-r border-dark-700 flex-shrink-0">
                  <Link
                    to="/sovran-design#overview"
                    className={`block px-4 py-3 font-lato text-white hover:bg-primary-600 relative arch-menu-item first-arch-item ${hoveredArchitecturalItem ? '' : 'selected-first'}`}
                    data-item="overview"
                    onMouseEnter={() => { setActiveArchitecturalImage('overview'); setHoveredArchitecturalItem('overview'); }}
                    onMouseLeave={() => setHoveredArchitecturalItem(null)}
                  >
                    <span className="relative z-10">Architectural services overview</span>
                  </Link>
                  <div className="border-t border-dark-700">
                    <Link
                      to="/sovran-design#planning-approvals"
                        className="block px-4 py-3 font-lato text-white hover:bg-primary-600 relative arch-menu-item"
                        data-item="planning-approvals"
                        onMouseEnter={() => { setActiveArchitecturalImage('planning-approvals'); setHoveredArchitecturalItem('planning-approvals'); }}
                        onMouseLeave={() => setHoveredArchitecturalItem(null)}
                    >
                      <span className="relative z-10">Planning approvals</span>
                    </Link>
                  </div>
                  <div className="border-t border-dark-700">
                    <Link
                      to="/sovran-design#structural-calculations"
                        className="block px-4 py-3 font-lato text-white hover:bg-primary-600 relative arch-menu-item"
                        data-item="structural-calculations"
                        onMouseEnter={() => { setActiveArchitecturalImage('structural-calculations'); setHoveredArchitecturalItem('structural-calculations'); }}
                        onMouseLeave={() => setHoveredArchitecturalItem(null)}
                    >
                      <span className="relative z-10">Structural calculations &amp; building regulations</span>
                    </Link>
                  </div>
                  <div className="border-t border-dark-700">
                    <Link
                      to="/sovran-design#private-building-control"
                      className="block px-4 py-3 font-lato text-white hover:bg-primary-600 relative arch-menu-item"
                      data-item="private-building-control"
                      onMouseEnter={() => { setActiveArchitecturalImage('private-building-control'); setHoveredArchitecturalItem('private-building-control'); }}
                      onMouseLeave={() => setHoveredArchitecturalItem(null)}
                    >
                      <span className="relative z-10">Private building control</span>
                    </Link>
                  </div>
                  <div className="border-t border-dark-700">
                    <Link
                      to="/sovran-design#renders-vr"
                      className="block px-4 py-3 font-lato text-white hover:bg-primary-600 relative arch-menu-item"
                      data-item="renders-vr"
                      onMouseEnter={() => { setActiveArchitecturalImage('renders-vr'); setHoveredArchitecturalItem('renders-vr'); }}
                      onMouseLeave={() => setHoveredArchitecturalItem(null)}
                    >
                      <span className="relative z-10">3D Renders and VR</span>
                    </Link>
                  </div>
                </div>
                {/* Right: image panel */}
                <div className="flex-1 h-[280px] relative overflow-hidden bg-dark-800">
                  <div className={`absolute inset-0 arch-image transition-all duration-200 ease-out ${activeArchitecturalImage === 'overview' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} data-for="overview">
                    <img src="https://sovrangroup.co.uk/images/1.jpg" alt="Architectural overview" className="w-full h-full object-cover relative z-30" />
                    <div className="absolute inset-0 bg-[#CDAD7D]/60 z-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                      <div className="text-lg font-lato font-medium">Architectural Overview</div>
                      <p className="text-sm font-lato text-white/80">Comprehensive architectural services</p>
                    </div>
                  </div>
                  <div className={`absolute inset-0 arch-image transition-all duration-200 ease-out ${activeArchitecturalImage === 'planning-approvals' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} data-for="planning-approvals">
                    <img src="https://sovrangroup.co.uk/images/2.jpg" alt="Planning approvals" className="w-full h-full object-cover relative z-30" />
                    <div className="absolute inset-0 bg-[#CDAD7D]/60 z-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                      <div className="text-lg font-lato font-medium">Planning approvals</div>
                      <p className="text-sm font-lato text-white/80">Navigating planning approvals with expertise</p>
                    </div>
                  </div>
                  <div className={`absolute inset-0 arch-image transition-all duration-200 ease-out ${activeArchitecturalImage === 'structural-calculations' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} data-for="structural-calculations">
                    <img src="https://sovrangroup.co.uk/images/3.jpg" alt="Structural calculations" className="w-full h-full object-cover relative z-30" />
                    <div className="absolute inset-0 bg-[#CDAD7D]/60 z-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                      <div className="text-lg font-lato font-medium">Structural Calculations</div>
                      <p className="text-sm font-lato text-white/80">Compliance &amp; engineering support</p>
                    </div>
                  </div>
                  <div className={`absolute inset-0 arch-image transition-all duration-200 ease-out ${activeArchitecturalImage === 'private-building-control' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} data-for="private-building-control">
                    <img src="https://sovrangroup.co.uk/images/4.jpg" alt="Private building control" className="w-full h-full object-cover relative z-30" />
                    <div className="absolute inset-0 bg-[#CDAD7D]/60 z-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                      <div className="text-lg font-lato font-medium">Private Building Control</div>
                      <p className="text-sm font-lato text-white/80">End-to-end private building control services</p>
                    </div>
                  </div>
                  <div className={`absolute inset-0 arch-image transition-all duration-200 ease-out ${activeArchitecturalImage === 'renders-vr' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} data-for="renders-vr">
                    <img src="https://sovrangroup.co.uk/images/2.jpg" alt="Renders and VR" className="w-full h-full object-cover relative z-30" />
                    <div className="absolute inset-0 bg-[#CDAD7D]/60 z-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                      <div className="text-lg font-lato font-medium">3D Renders &amp; VR</div>
                      <p className="text-sm font-lato text-white/80">Visualise your project in immersive detail</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Build Mega Menu */}
            <div 
              className="relative mega-menu-wrapper group py-2" 
              onMouseEnter={(e) => { handleBuildMouseEnter(e); setIsDesktopDropdownHover(true); }}
              onMouseLeave={(e) => { handleMouseLeave(e); setIsDesktopDropdownHover(false); }}
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
              <div className={`absolute left-0 mt-2 w-screen max-w-2xl -ml-64 bg-[#081E27]/95 backdrop-blur-md shadow-2xl rounded-lg overflow-hidden z-20 mega-menu font-lato transition-all duration-150 transform ${activeDropdown === 'build' ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible -translate-y-2 scale-98'}`}>
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
                  
                  {/* Bottom Image Grid with improved lazy loading and skeleton */}
                  <div className="mt-6 grid grid-cols-4 gap-3">
                    <div className="relative rounded-lg overflow-hidden h-24">
                      <LazyLoadImage 
                        src="https://sovrangroup.co.uk/images/1.jpg" 
                        alt="Kitchen Project" 
                        className="w-full h-full object-cover"
                        priority={false}
                      />
                    </div>
                    <div className="relative rounded-lg overflow-hidden h-24">
                      <LazyLoadImage 
                        src="https://sovrangroup.co.uk/images/2.jpg" 
                        alt="Lounge Project" 
                        className="w-full h-full object-cover"
                        priority={false}
                      />
                    </div>
                    <div className="relative rounded-lg overflow-hidden h-24">
                      <LazyLoadImage 
                        src="https://sovrangroup.co.uk/images/3.jpg" 
                        alt="Living Space" 
                        className="w-full h-full object-cover"
                        priority={false}
                      />
                    </div>
                    <div className="relative rounded-lg overflow-hidden h-24">
                      <LazyLoadImage 
                        src="https://sovrangroup.co.uk/images/4.jpg" 
                        alt="Bedroom Project" 
                        className="w-full h-full object-cover"
                        priority={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sovran Interiors Mega Menu */}
            <div 
              className="relative mega-menu-wrapper group py-2" 
              onMouseEnter={(e) => { handleInteriorsMouseEnter(e); setIsDesktopDropdownHover(true); }}
              onMouseLeave={(e) => { handleMouseLeave(e); setIsDesktopDropdownHover(false); }}
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
              <div className={`absolute left-0 mt-2 w-screen max-w-3xl -ml-96 bg-[#081E27]/95 backdrop-filter backdrop-blur-lg shadow-2xl rounded-lg overflow-hidden z-20 mega-menu font-lato transition-all duration-150 transform ${activeDropdown === 'interiors' ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible -translate-y-2 scale-98'}`}>
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
                  
                  {/* Bottom image grid with improved lazy loading and skeleton */}
                  <div className="mt-6 pt-4 border-t border-dark-600">
                    <h4 className="text-white text-base font-lato font-medium mb-3">Featured Projects</h4>
                    <div className="grid grid-cols-4 gap-3">
                      <div className="relative rounded-lg overflow-hidden h-24">
                        <LazyLoadImage 
                          src="https://sovrangroup.co.uk/images/1.jpg" 
                          alt="Bespoke Room" 
                          className="w-full h-full object-cover"
                          priority={false}
                        />
                      </div>
                      <div className="relative rounded-lg overflow-hidden h-24">
                        <LazyLoadImage 
                          src="https://sovrangroup.co.uk/images/2.jpg" 
                          alt="Bespoke Wardrobe" 
                          className="w-full h-full object-cover"
                          priority={false}
                        />
                      </div>
                      <div className="relative rounded-lg overflow-hidden h-24">
                        <LazyLoadImage 
                          src="https://sovrangroup.co.uk/images/3.jpg" 
                          alt="Kitchen Design" 
                          className="w-full h-full object-cover"
                          priority={false}
                        />
                      </div>
                      <div className="relative rounded-lg overflow-hidden h-24">
                        <LazyLoadImage 
                          src="https://sovrangroup.co.uk/images/4.jpg" 
                          alt="Luxury Interior" 
                          className="w-full h-full object-cover"
                          priority={false}
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

        {/* Mobile Navigation extracted to its own component */}
        <MobileNavigation
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          activeDropdown={activeDropdown}
          handleDropdownToggle={handleDropdownToggle}
        />
      </div>
    </nav>
  );
}

export default Navigation;

