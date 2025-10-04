import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import sovranLogo from '../assets/logo/Sovran-03-03.png';

type Props = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
  activeDropdown?: string | null;
  handleDropdownToggle?: (d: any) => void;
};

const FOCUSABLE_SELECTORS = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

const MobileNavigation: React.FC<Props> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const [openSection, setOpenSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const ANIM_DURATION = 300; // ms, keep in sync with tailwind duration class

  useEffect(() => {
    let timeout: number | undefined;
    if (isMobileMenuOpen) {
      setMounted(true);
      timeout = window.setTimeout(() => {
        window.requestAnimationFrame(() => setVisible(true));
      }, 10);
    } else if (mounted) {
      setVisible(false);
      timeout = window.setTimeout(() => setMounted(false), ANIM_DURATION + 50);
    }

    return () => { if (timeout) window.clearTimeout(timeout); };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!visible) return;
    previouslyFocused.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS) || [];
    if (focusable.length > 0) {
      firstFocusableRef.current = focusable[0];
      lastFocusableRef.current = focusable[focusable.length - 1];
      (firstFocusableRef.current as HTMLElement).focus();
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
      if (e.key === 'Tab') {
        const first = firstFocusableRef.current;
        const last = lastFocusableRef.current;
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus();
    };
  }, [visible]);

  const handleBackdropClick = (e: React.MouseEvent) => { if (e.target === e.currentTarget) closeMenu(); };

  const closeMenu = () => {
    setVisible(false);
    window.setTimeout(() => setIsMobileMenuOpen(false), ANIM_DURATION);
  };

  const toggleSection = (key: string) => setOpenSection(prev => (prev === key ? null : key));

  if (!mounted) return null;

  const content = (
    <div className="md:hidden fixed inset-0 z-[10005] flex" onClick={handleBackdropClick} aria-hidden={!visible}>
      <div className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-[10004]`} />

      <aside ref={panelRef} className={`relative ml-auto w-full max-w-sm h-full bg-[#07121a] text-white shadow-xl transform transition-transform duration-300 ease-out ${visible ? 'translate-x-0' : 'translate-x-full'} z-[10006]`} role="dialog" aria-modal="true" aria-label="Mobile menu">
        <div className="flex items-center justify-between p-4 border-b border-dark-700">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
            <img src={sovranLogo} alt="Sovran Group Logo" className="h-6 w-auto object-contain" />
          </Link>
          <button onClick={closeMenu} aria-label="Close menu" className="p-2 rounded hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary-600">
            ✕
          </button>
        </div>

        <nav className="p-4 overflow-auto h-[calc(100vh-64px)] text-white" style={{ zIndex: 10007 }}>
          <ul className="space-y-3">
            <li><Link to="/" onClick={closeMenu} className="block text-white text-base">Home</Link></li>

            <li>
              <button onClick={() => toggleSection('about')} className="w-full text-left flex items-center justify-between text-white text-base py-1" aria-expanded={openSection === 'about'}>
                <span>About Us</span>
                <span className="ml-4">{openSection === 'about' ? '−' : '+'}</span>
              </button>
              {openSection === 'about' && (
                <ul className="mt-2 pl-4 space-y-1">
                  <li><Link to="/about#space-story" onClick={closeMenu} className="block text-white/90">Every Space Has a Story</Link></li>
                  <li><Link to="/about#our-story" onClick={closeMenu} className="block text-white/90">Our Story</Link></li>
                  <li><Link to="/about#our-ethos" onClick={closeMenu} className="block text-white/90">Our Ethos</Link></li>
                  <li><Link to="/about#process" onClick={closeMenu} className="block text-white/90">Our Process</Link></li>
                  <li><Link to="/about#contact" onClick={closeMenu} className="block text-white/90">Contact</Link></li>
                </ul>
              )}
            </li>

            <li>
              <button onClick={() => toggleSection('design')} className="w-full text-left flex items-center justify-between text-white text-base py-1" aria-expanded={openSection === 'design'}>
                <span>Design</span>
                <span className="ml-4">{openSection === 'design' ? '−' : '+'}</span>
              </button>
              {openSection === 'design' && (
                <ul className="mt-2 pl-4 space-y-1">
                  <li><Link to="/sovran-design#overview" onClick={closeMenu} className="block text-white/90">Architectural overview</Link></li>
                  <li><Link to="/sovran-design#planning-approvals" onClick={closeMenu} className="block text-white/90">Planning approvals</Link></li>
                  <li><Link to="/sovran-design#structural-calculations" onClick={closeMenu} className="block text-white/90">Structural calculations</Link></li>
                </ul>
              )}
            </li>

            <li>
              <button onClick={() => toggleSection('build')} className="w-full text-left flex items-center justify-between text-white text-base py-1" aria-expanded={openSection === 'build'}>
                <span>Build</span>
                <span className="ml-4">{openSection === 'build' ? '−' : '+'}</span>
              </button>
              {openSection === 'build' && (
                <ul className="mt-2 pl-4 space-y-1">
                  <li><Link to="/sovran-builders/residential" onClick={closeMenu} className="block text-white/90">Residential</Link></li>
                  <li><Link to="/sovran-builders/commercial" onClick={closeMenu} className="block text-white/90">Commercial</Link></li>
                </ul>
              )}
            </li>

            <li><Link to="/sovran-interiors" onClick={closeMenu} className="block text-white text-base">Interiors</Link></li>
            <li><Link to="/careers" onClick={closeMenu} className="block text-white text-base">Careers</Link></li>
            <li><Link to="/contact" onClick={closeMenu} className="block text-white text-base">Contact</Link></li>
          </ul>
        </nav>
      </aside>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(content, document.body);
};

export default MobileNavigation;
