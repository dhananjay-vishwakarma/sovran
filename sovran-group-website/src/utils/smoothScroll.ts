// Global smooth scrolling with easing for wheel, keyboard and anchor navigation.
// Usage: Import this module once (e.g. in index.tsx) to enable site-wide smoothing.

type Options = {
  ease?: number; // easing factor, lower is smoother (0.05 default)
  frameRate?: number; // ms per frame (16 ~ 60fps)
};

const defaultOptions: Options = {
  ease: 0.08,
  frameRate: 16,
};

let running = false;

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

export default function initSmoothScroll(opts?: Options) {
  if (running) return;
  running = true;
  const options = { ...defaultOptions, ...(opts || {}) };

  // Use CSS fallback for basic smooth behavior for anchor & programmatic scrolls
  try {
    document.documentElement.style.scrollBehavior = 'auto';
  } catch (e) {
    // ignore
  }

  let targetY = window.scrollY || window.pageYOffset;
  let currentY = targetY;

  let ticking = false;

  function update() {
    currentY = lerp(currentY, targetY, options.ease!);
    const rounded = Math.round(currentY * 100) / 100;
    if (Math.abs(currentY - targetY) < 0.5) {
      window.scrollTo(0, targetY);
      ticking = false;
      return;
    }
    window.scrollTo(0, rounded);
    requestAnimationFrame(update);
  }

  function onWheel(e: WheelEvent) {
    // If the user holds a data attribute on body to disable smoothing, skip
    if (document.body.dataset['noSmooth'] === 'true') return;
    e.preventDefault();
    targetY += e.deltaY;
    targetY = Math.max(0, Math.min(targetY, document.documentElement.scrollHeight - window.innerHeight));
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function onKey(e: KeyboardEvent) {
    if (document.body.dataset['noSmooth'] === 'true') return;
    const ARROW = 40; // px per arrow key
    const PAGE = window.innerHeight * 0.9;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        targetY = Math.min(targetY + ARROW, document.documentElement.scrollHeight - window.innerHeight);
        break;
      case 'ArrowUp':
        e.preventDefault();
        targetY = Math.max(targetY - ARROW, 0);
        break;
      case 'PageDown':
        e.preventDefault();
        targetY = Math.min(targetY + PAGE, document.documentElement.scrollHeight - window.innerHeight);
        break;
      case 'PageUp':
        e.preventDefault();
        targetY = Math.max(targetY - PAGE, 0);
        break;
      case 'Home':
        e.preventDefault();
        targetY = 0;
        break;
      case 'End':
        e.preventDefault();
        targetY = document.documentElement.scrollHeight - window.innerHeight;
        break;
      default:
        return;
    }
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  // Smooth anchor navigation
  function onClickAnchor(e: MouseEvent) {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!anchor) return;
    const hash = anchor.getAttribute('href') || '';
    if (!hash.startsWith('#')) return;
    const el = document.querySelector(hash) as HTMLElement | null;
    if (!el) return;
    e.preventDefault();
    const rect = el.getBoundingClientRect();
    targetY = Math.max(0, window.scrollY + rect.top);
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  // initialize
  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('keydown', onKey, { passive: false });
  document.addEventListener('click', onClickAnchor);

  // Keep targetY in sync when user resizes or when code sets scroll directly
  window.addEventListener('resize', () => {
    targetY = Math.max(0, Math.min(targetY, document.documentElement.scrollHeight - window.innerHeight));
  });

  // Expose a small API for disabling/enabling
  return {
    destroy() {
      window.removeEventListener('wheel', onWheel as EventListener);
      window.removeEventListener('keydown', onKey as EventListener);
      document.removeEventListener('click', onClickAnchor as EventListener);
      running = false;
    },
  };
}
