import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/about', label: 'ABOUT US' },
    { path: '/sovran-builders', label: 'SOVRAN BUILDERS' },
    { path: '/sovran-interiors', label: 'MR. WARDROBE' },
    { path: '/sovran-design', label: 'TAAJ KITCHENS' },
    { path: '/careers', label: 'CAREERS' },
    { path: '/contact', label: 'CONTACT' },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] border-b border-[#2d4a6b]/30 sticky top-0 z-50 backdrop-blur-lg shadow-2xl">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="text-2xl font-light tracking-wider text-white group">
            <img 
              src="https://sovrangroup.co.uk/wp-content/uploads/2025/07/LOGO-2-scaled.png" 
              alt="Sovran Group" 
              className="h-14 w-auto transition-all duration-300 group-hover:scale-105 filter drop-shadow-lg"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 group ${
                  isActive(link.path)
                    ? 'text-[#f8f9fa] bg-white/10 rounded-lg backdrop-blur-sm'
                    : 'text-[#cbd5e1] hover:text-[#f8f9fa] hover:bg-white/5 rounded-lg'
                }`}
              >
                <span className="relative z-10 font-['Inter',_'system-ui',_sans-serif] font-semibold">
                  {link.label}
                </span>
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#60a5fa] to-[#34d399] transition-all duration-300 ${
                  isActive(link.path) 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#cbd5e1] hover:text-[#f8f9fa] transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-[#2d4a6b]/30 bg-gradient-to-b from-[#1a1a2e]/95 to-[#0f3460]/95 backdrop-blur-lg">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium tracking-wide transition-all duration-300 rounded-lg font-['Inter',_'system-ui',_sans-serif] ${
                    isActive(link.path)
                      ? 'text-[#f8f9fa] bg-white/15 backdrop-blur-sm'
                      : 'text-[#cbd5e1] hover:text-[#f8f9fa] hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;