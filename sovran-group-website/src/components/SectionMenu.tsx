import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/section-menu.css';

interface SectionMenuProps {
  sections: {
    id: string;
    title: string;
    ref: React.RefObject<HTMLElement | null>;
  }[];
}

const SectionMenu: React.FC<SectionMenuProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find the section that is currently in view
      const scrollPosition = window.scrollY + 200; // 200px offset to trigger earlier
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const offsetTop = section.ref.current.offsetTop;
          
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check for active section
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const section = sections.find(s => s.id === id);
    if (section && section.ref.current) {
      window.scrollTo({
        top: section.ref.current.offsetTop - 100, // 100px offset to account for fixed header
        behavior: 'smooth'
      });
    }
    
    // Close menu on mobile after selection
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50">
      {/* Mobile toggle button */}
      <button 
        className="md:hidden absolute top-0 left-0 p-2 text-white rounded-r-lg shadow-lg section-menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {/* Menu */}
      <div 
        className={`rounded-r-lg py-2 shadow-xl transition-all duration-300 ease-in-out section-menu section-menu-container ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 section-menu-mobile-closed'
        }`}
      >
        <ul className="px-1">
          {sections.map((section, index) => (
            <React.Fragment key={section.id}>
              {index > 0 && <div className="section-menu-button-divider mx-2"></div>}
              {section.id === 'contact' ? (
                <li>
                  <Link
                    to="/contact"
                    className={`flex items-center w-full text-left text-xs rounded transition-colors duration-200 section-menu-button ${
                      activeSection === section.id
                        ? 'text-[#CDAD7D] font-medium'
                        : 'text-gray-300 hover:text-[#CDAD7D]'
                    }`}
                  >
                    <span className="whitespace-nowrap">{section.title}</span>
                  </Link>
                </li>
              ) : (
                <li>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center w-full text-left text-xs rounded transition-colors duration-200 section-menu-button ${
                      activeSection === section.id
                        ? 'text-[#CDAD7D] font-medium'
                        : 'text-gray-300 hover:text-[#CDAD7D]'
                    }`}
                  >
                    <span className="whitespace-nowrap">{section.title}</span>
                  </button>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SectionMenu;
