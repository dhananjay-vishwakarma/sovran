import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import sovranInteriorsData from '../data/sovranInteriors.json';
import '../styles/megaMenu.css';
import { Helmet } from 'react-helmet';
import LazyImage from './LazyImage';

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
      'kitchen-collection': '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249557-HDR.jpg',
      'kitchen-features': '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249562-HDR.jpg',
      'luxury-kitchen-materials': '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1249567-HDR.jpg',
      'projects': '/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Kitchen & Lounge/Photos/P1260053-HDR.jpg',
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Get an array of critical images that should be preloaded
  const criticalImages = [
    megaMenuImages['bespoke-rooms'].main,
    megaMenuImages['bespoke-wardrobes'].main,
    megaMenuImages['kitchens'].main
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownToggle = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const handleClickOutside = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    if (!isHovering) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isHovering]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <Helmet>
        {criticalImages.map((image, index) => (
          <link key={index} rel="preload" href={image} as="image" />
        ))}
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://sovrangroup.co.uk/wp-content/uploads/2025/07/LOGO-2-scaled.png"
              alt="Sovran Group Logo"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 nav-menu">
            <Link to="/" className="font-lato text-white hover:text-primary-400 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 hover:after:w-full after:transition-all after:duration-300">
              Home
            </Link>
            <Link to="/about" className="font-lato text-white hover:text-primary-400 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 hover:after:w-full after:transition-all after:duration-300">
              About Us
            </Link>
            
            {/* Sovran Interiors Mega Menu */}
            <div 
              className="relative mega-menu-wrapper group" 
              onMouseEnter={() => {
                setActiveDropdown('interiors');
                setIsHovering(true);
              }}
              onMouseLeave={() => {
                // Immediately hide the dropdown when mouse leaves
                setActiveDropdown(null);
                setIsHovering(false);
              }}
            >
              <button
                className="flex items-center font-lato text-white hover:text-primary-400 transition-colors focus:outline-none"
              >
                <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 group-hover:after:w-full after:transition-all after:duration-300">
                  Sovran Interiors
                </span>
                <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform group-hover:rotate-180`} />
              </button>
              
              {/* Mega Menu */}
              <div className="absolute left-0 mt-2 w-screen max-w-7xl -ml-96 bg-dark-800/95 backdrop-blur-md shadow-2xl rounded-lg overflow-hidden z-20 flex flex-col mega-menu font-lato">
                <div className="p-6 grid grid-cols-4 gap-6">
                    {/* Left column - Categories */}
                    <div className="col-span-1 border-r border-dark-600 pr-6">
                      <Link 
                        to="/sovran-interiors" 
                        className="block mb-4 text-lg font-semibold text-white hover:text-primary-400"
                      >
                        All Sovran Interiors
                      </Link>
                      
                      {sovranInteriorsData.navigation.mainCategories.map((category) => (
                        <div key={category.id} className="mb-4">
                          <Link 
                            to={category.link} 
                            className="block text-white font-medium hover:text-primary-400 mb-2"
                          >
                            {category.title}
                          </Link>
                          
                          <div className="space-y-1 pl-2">
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

                    {/* Middle - Images Grid */}
                    <div className="col-span-2 grid grid-cols-2 grid-rows-3 gap-4">
                      {/* First row */}
                      <div className="relative aspect-video rounded-lg overflow-hidden group/img category-image">
                        <LazyImage 
                          src={megaMenuImages['bespoke-rooms'].main} 
                          alt="Bespoke Rooms" 
                          className="transform transition-transform duration-500 group-hover/img:scale-110"
                          shouldLoad={activeDropdown === 'interiors'}
                          priority={0} // First image to load
                        />
                        <div className="absolute inset-0 bg-dark-900/60 flex flex-col items-center justify-center z-10">
                          <h3 className="text-white font-semibold mb-2 text-center">Bespoke Rooms</h3>
                          <Link to="/sovran-interiors/bespoke-rooms" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-lg text-sm transition-colors">
                            Explore
                          </Link>
                        </div>
                      </div>
                      <div className="relative aspect-video rounded-lg overflow-hidden group/img category-image">
                        <LazyImage 
                          src={megaMenuImages['bespoke-wardrobes'].main} 
                          alt="Bespoke Wardrobes" 
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover/img:scale-110"
                          shouldLoad={activeDropdown === 'interiors'}
                          priority={1} // Second image to load
                        />
                        <div className="absolute inset-0 bg-dark-900/60 flex flex-col items-center justify-center z-10">
                          <h3 className="text-white font-semibold mb-2 text-center">Bespoke Wardrobes</h3>
                          <Link to="/sovran-interiors/bespoke-wardrobes" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-lg text-sm transition-colors">
                            Explore
                          </Link>
                        </div>
                      </div>
                      {/* Second row */}
                      <div className="relative aspect-video rounded-lg overflow-hidden group/img category-image">
                        <LazyImage 
                          src={megaMenuImages['kitchens'].main} 
                          alt="Kitchens" 
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover/img:scale-110"
                          shouldLoad={activeDropdown === 'interiors'}
                          priority={2} // Third image to load
                        />
                        <div className="absolute inset-0 bg-dark-900/60 flex flex-col items-center justify-center z-10">
                          <h3 className="text-white font-semibold mb-2 text-center">Kitchens</h3>
                          <Link to="/sovran-interiors/kitchens" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-lg text-sm transition-colors">
                            Explore
                          </Link>
                        </div>
                      </div>
                      <div className="relative aspect-video rounded-lg overflow-hidden group/img category-image">
                        <LazyImage 
                          src={megaMenuImages['kitchens'].subcategories['projects']} 
                          alt="Projects" 
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover/img:scale-110"
                          shouldLoad={activeDropdown === 'interiors'}
                          priority={3} // Fourth image to load
                        />
                        <div className="absolute inset-0 bg-dark-900/60 flex flex-col items-center justify-center z-10">
                          <h3 className="text-white font-semibold mb-2 text-center">Our Projects</h3>
                          <Link to="/sovran-interiors/kitchens/projects" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-lg text-sm transition-colors">
                            View Projects
                          </Link>
                        </div>
                      </div>
                      {/* Third row (using subcategories for more examples) */}
                      <div className="relative aspect-video rounded-lg overflow-hidden group/img category-image">
                        <LazyImage 
                          src={megaMenuImages['bespoke-rooms'].subcategories['tv-units']} 
                          alt="TV Units" 
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover/img:scale-110"
                          shouldLoad={activeDropdown === 'interiors'}
                          priority={4} // Fifth image to load
                        />
                        <div className="absolute inset-0 bg-dark-900/60 flex flex-col items-center justify-center z-10">
                          <h3 className="text-white font-semibold mb-2 text-center">TV Units</h3>
                          <Link to="/sovran-interiors/bespoke-rooms/tv-units" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-lg text-sm transition-colors">
                            Discover
                          </Link>
                        </div>
                      </div>
                      <div className="relative aspect-video rounded-lg overflow-hidden group/img category-image">
                        <LazyImage 
                          src={megaMenuImages['bespoke-rooms'].subcategories['bars']} 
                          alt="Home Bars" 
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover/img:scale-110"
                          shouldLoad={activeDropdown === 'interiors'}
                          priority={5} // Sixth image to load
                        />
                        <div className="absolute inset-0 bg-dark-900/60 flex flex-col items-center justify-center z-10">
                          <h3 className="text-white font-semibold mb-2 text-center">Home Bars</h3>
                          <Link to="/sovran-interiors/bespoke-rooms/bars" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-lg text-sm transition-colors">
                            Discover
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Right column - Featured video/content */}
                    <div className="col-span-1 pl-6 border-l border-dark-600">
                      <h3 className="text-lg font-semibold text-white mb-4">Featured</h3>
                      <div className="space-y-4">
                        {featuredVideos.map((video, index) => (
                          <div key={index} className="group/video">
                            <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                              <LazyImage 
                                src={video.thumbnail} 
                                alt={video.title} 
                                className="w-full h-full object-cover"
                                shouldLoad={activeDropdown === 'interiors'}
                                priority={6 + index} // Load after grid images
                              />
                              <div className="absolute inset-0 bg-dark-900/50 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 z-10">
                                <Link to={`/sovran-interiors/videos/${index}`} className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </Link>
                              </div>
                            </div>
                            <p className="text-sm text-white font-medium">{video.title}</p>
                          </div>
                        ))}

                        <Link 
                          to="/sovran-interiors/contact" 
                          className="block mt-6 bg-primary-600 hover:bg-primary-700 text-white text-center px-4 py-2 rounded-lg transition-colors"
                        >
                          Request Consultation
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom bar with additional links */}
                  <div className="bg-dark-700/50 p-4 flex justify-between items-center">
                    <div className="flex space-x-6">
                      <Link to="/sovran-interiors/gallery" className="text-sm text-gray-300 hover:text-white">Full Gallery</Link>
                      <Link to="/sovran-interiors/testimonials" className="text-sm text-gray-300 hover:text-white">Client Testimonials</Link>
                      <Link to="/sovran-interiors/process" className="text-sm text-gray-300 hover:text-white">Our Process</Link>
                      <Link to="/sovran-interiors/faqs" className="text-sm text-gray-300 hover:text-white">FAQs</Link>
                    </div>
                    <div>
                      <Link to="/sovran-interiors/blog" className="text-sm text-primary-400 hover:text-primary-300">
                        Read our interior design blog →
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

            <Link to="/sovran-builders" className="font-lato text-white hover:text-primary-400 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 hover:after:w-full after:transition-all after:duration-300">
              Sovran Builders
            </Link>
            <Link to="/sovran-design" className="font-lato text-white hover:text-primary-400 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 hover:after:w-full after:transition-all after:duration-300">
              Sovran Design
            </Link>
            <Link to="/careers" className="font-lato text-white hover:text-primary-400 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 hover:after:w-full after:transition-all after:duration-300">
              Careers
            </Link>
            <Link to="/contact" className="font-lato text-white hover:text-primary-400 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-400 after:w-0 hover:after:w-full after:transition-all after:duration-300">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-dark-900/95 backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 font-lato text-white hover:bg-dark-700 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 font-lato text-white hover:bg-dark-700 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              
              {/* Mobile Sovran Interiors Collapsible */}
              <div className="space-y-1">
                <button
                  onClick={() => handleDropdownToggle('mobile-interiors')}
                  className="flex items-center justify-between w-full px-3 py-2 font-lato text-white hover:bg-dark-700 rounded-md"
                >
                  <span>Sovran Interiors</span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${activeDropdown === 'mobile-interiors' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'mobile-interiors' && (
                  <div className="pl-4 space-y-3 py-2">
                    <Link 
                      to="/sovran-interiors" 
                      className="block px-3 py-2 text-sm text-white font-medium hover:bg-dark-700 hover:text-white rounded-md"
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
                            shouldLoad={activeDropdown === 'mobile-interiors'}
                            priority={index} // Load in sequence
                          />
                          <div className="absolute inset-0 bg-dark-900/60 flex items-center justify-center z-10">
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
                              shouldLoad={activeDropdown === 'mobile-interiors'}
                              priority={sovranInteriorsData.navigation.mainCategories.length + index} // Load after category images
                            />
                            <div className="absolute inset-0 bg-dark-900/60 flex items-center justify-center z-10">
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
              
              <Link
                to="/sovran-builders"
                className="block px-3 py-2 font-lato text-white hover:bg-dark-700 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sovran Builders
              </Link>
              <Link
                to="/sovran-design"
                className="block px-3 py-2 font-lato text-white hover:bg-dark-700 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sovran Design
              </Link>
              <Link
                to="/careers"
                className="block px-3 py-2 font-lato text-white hover:bg-dark-700 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Careers
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 font-lato text-white hover:bg-dark-700 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
