import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Helper to safely parse the CSS variable --header-height
    const getHeaderHeightFromCSS = (): number => {
      try {
        const val = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
        if (val) {
          const n = parseInt(val.trim().replace('px', ''), 10);
          if (!isNaN(n)) return n;
        }
      } catch (e) {
        // ignore
      }
      return 160; // fallback
    };

    // If there's a hash in the URL, scroll to that element
    if (hash) {
      // Small delay to ensure the DOM is fully rendered
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // No hash: for home page scroll to very top, for other pages scroll down so the logo hides
      setTimeout(() => {
        if (pathname === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Try to find the logo or logo container
        const logoEl = document.querySelector('.logo') as HTMLElement | null;
        const logoContainer = document.querySelector('.logo-container') as HTMLElement | null;

        let scrollTarget = 0;

        if (logoContainer) {
          // Get distance from top of document to bottom of logo container
          const rect = logoContainer.getBoundingClientRect();
          scrollTarget = window.scrollY + rect.bottom;
        } else if (logoEl) {
          const rect = logoEl.getBoundingClientRect();
          scrollTarget = window.scrollY + rect.bottom;
        } else {
          // fallback to CSS var
          scrollTarget = getHeaderHeightFromCSS();
        }

        // Add a small offset to ensure the logo is fully hidden
        scrollTarget = Math.ceil(scrollTarget + 8);

        // Clamp to document height
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        if (scrollTarget > maxScroll) scrollTarget = maxScroll;

        window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
      }, 120);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
