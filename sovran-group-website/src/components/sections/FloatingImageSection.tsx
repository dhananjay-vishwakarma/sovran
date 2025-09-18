import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
// The section renders five hardcoded floating image cards. No runtime editor or localStorage.

const FloatingImageSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tweensRef = useRef<any[]>([]);
  // cards are hardcoded via explicit JSX below
  const isDev = process.env.NODE_ENV !== 'production';
  // Always use GSAP + ScrollTrigger for parallax in this build. Debug logs added below.

  type Pos = { top?: string | number; left?: string | number; width?: string | number; zIndex?: number };
  const [overrides, setOverrides] = useState<Record<string, Pos>>({});
  const [selectedCard, setSelectedCard] = useState<string>('c2');
  const [panelOpen, setPanelOpen] = useState<boolean>(true);

  const getStyle = (id: string, base: Pos) => {
    const o = overrides[id] || {};
    const top = typeof o.top === 'number' ? `${o.top}px` : o.top ?? base.top;
    const left = typeof o.left === 'number' ? `${o.left}px` : o.left ?? base.left;
    const width = typeof o.width === 'number' ? `${o.width}px` : o.width ?? base.width;
    const zIndex = o.zIndex ?? base.zIndex;
    return { top, left, width, zIndex } as React.CSSProperties;
  };

  const updateOverride = (id: string, patch: Pos) => {
    setOverrides((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), ...patch } }));
  };

  // on mount (dev only) compute numeric defaults from container size so sliders feel natural
  useEffect(() => {
    if (!isDev) return;
    const container = containerRef.current;
    const rect = container ? container.getBoundingClientRect() : { width: window.innerWidth, height: 680 };
    const cw = rect.width || window.innerWidth;
    const ch = rect.height || 680;

    // User-requested initial positions (exact px values)
    const initial: Record<string, Pos> = {
      // top-left image
      c1: { top: -22, left: 111, width: 267, zIndex: 12 },
      // center image
      c2: { top: 130, left: 454, width: 513, zIndex: 27 },
      // left-bottom image
      c3: { top: 228, left: -140, width: 478, zIndex: 8 },
      // top-right image (user didn't supply zIndex; choosing 16 as a reasonable default)
      c4: { top: -94, left: 883, width: 444, zIndex: 16 },
      // bottom-right image
      c5: { top: 404, left: 1006, width: 246, zIndex: 8 },
    };

    setOverrides((prev) => ({ ...initial, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // initialize / reinitialize GSAP tweens whenever cards change
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      console.debug('[FloatingImageSection] containerRef is null');
      return;
    }

    // helper to kill only tweens and scrollTriggers tied to this container
    const killTweens = () => {
      tweensRef.current.forEach((t) => t && t.kill && t.kill());
      tweensRef.current = [];

      // kill only ScrollTriggers that reference this container as trigger
      try {
          ScrollTrigger.getAll()
            // keep triggers that are not children of this container
            .filter((st: any) => st.trigger && container.contains(st.trigger))
            .forEach((st: any) => {
              console.debug('[FloatingImageSection] killing ScrollTrigger for', st.trigger);
              st.kill();
            });
      } catch (e) {
        // ignore
      }
    };

    const initTweens = async () => {
      console.debug('[FloatingImageSection] initTweens - starting');
      killTweens();

      // Wait for images inside the container to finish loading so measurements are accurate
      try {
        const imgs = Array.from(container.querySelectorAll('img')) as HTMLImageElement[];
        await Promise.all(
          imgs.map((img) =>
            img.complete
              ? Promise.resolve()
              : new Promise<void>((resolve) => {
                  img.addEventListener('load', () => resolve(), { once: true });
                  img.addEventListener('error', () => resolve(), { once: true });
                })
          )
        );
        console.debug('[FloatingImageSection] all images loaded or errored; proceeding');
      } catch (e) {
        console.warn('[FloatingImageSection] image load waiting failed', e);
      }

      const items = Array.from(container.querySelectorAll<HTMLElement>('.floating-image'));
      console.debug('[FloatingImageSection] found items:', items.length);
      items.forEach((el, i) => {
        try {
          // keep movement subtle: small vertical parallax based on viewport height
          const direction = i % 2 === 0 ? -1 : 1;
          const distanceMultiplier = 0.03 + i * 0.01;
          const distance = direction * window.innerHeight * distanceMultiplier;

          const rect = el.getBoundingClientRect();
          console.debug(`[FloatingImageSection] item ${i} rect: top=${rect.top.toFixed(1)} height=${rect.height.toFixed(1)} distance=${distance.toFixed(1)}`);

          gsap.set(el, { y: 0, willChange: 'transform' });
          const st = gsap.fromTo(
            el,
            { y: 0 },
            {
              y: distance,
              ease: 'power1.out',
              scrollTrigger: {
                // switch to per-element trigger so each card animates with its own viewport position
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
                markers: isDev,
                onEnter: () => console.debug('[FloatingImageSection] ScrollTrigger onEnter for item', i),
                onLeave: () => console.debug('[FloatingImageSection] ScrollTrigger onLeave for item', i),
                // use the self argument to avoid depending on `this` which can be undefined in some environments
                onRefresh: function (self: any) {
                  try {
                    console.debug('[FloatingImageSection] ScrollTrigger onRefresh for item', i, 'start', self?.start, 'end', self?.end);
                  } catch (e) {
                    console.debug('[FloatingImageSection] ScrollTrigger onRefresh for item', i, 'start/end unavailable');
                  }
                },
                onUpdate: (self: any) => console.debug('[FloatingImageSection] onUpdate item', i, 'progress', self.progress.toFixed(3)),
              },
            }
          );
          tweensRef.current.push(st);
          // log safely - scrollTrigger may not be attached immediately in some cases
          try {
            const stTrigger = (st as any).scrollTrigger;
            console.debug(
              '[FloatingImageSection] created tween for item',
              i,
              'distance',
              distance.toFixed(1),
              'start',
              stTrigger?.start,
              'end',
              stTrigger?.end
            );
          } catch (e) {
            console.debug('[FloatingImageSection] created tween for item', i, 'distance', distance.toFixed(1), 'scrollTrigger not available yet');
          }
        } catch (err) {
          console.error('[FloatingImageSection] error creating tween for item', i, err);
        }
      });

      try {
        const stAll = ScrollTrigger.getAll();
        console.debug('[FloatingImageSection] ScrollTrigger count after init:', stAll.length);
        ScrollTrigger.refresh();
      } catch (e) {
        console.error('[FloatingImageSection] ScrollTrigger.refresh error', e);
      }
    };

    // Initialize immediately if the section is already in view
    initTweens();

    // Simple IntersectionObserver to toggle 'in-view' class for CSS entrance animations
    const inViewObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('in-view');
          } else {
            // keep the element visible once it has been revealed; remove this line to allow hide on exit
            // el.classList.remove('in-view');
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.15 }
    );

    const itemsForObserver = Array.from(container.querySelectorAll<HTMLElement>('.floating-image'));
    itemsForObserver.forEach((it) => inViewObserver.observe(it));

    // Re-init when section enters viewport, kill when it leaves
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.debug('[FloatingImageSection] IntersectionObserver entry', entry.isIntersecting, entry.intersectionRatio);
          if (entry.isIntersecting) {
            initTweens();
          } else {
            killTweens();
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0 }
    );
    observer.observe(container);

    const onResize = () => {
      try {
        ScrollTrigger.refresh();
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      killTweens();
      inViewObserver.disconnect();
      window.removeEventListener('resize', onResize);
      console.debug('[FloatingImageSection] cleanup complete');
    };
  }, [overrides]);

  // Note: CSS fallback removed — using GSAP + ScrollTrigger only in this debug build.

  // no runtime card editing in this build - cards are hardcoded above

  return (
    <section className="py-24 relative overflow-hidden bg-[#F7F7F7]">

      <div ref={containerRef} className="relative h-[680px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Small top-left */}
        <div className="floating-image from-left-top absolute transform-gpu" style={getStyle('c1', { top: '6%', left: '10%', width: '220px', zIndex: 12 })}>
          <div className="floating-inner relative rounded-md  overflow-hidden pointer-events-auto">
            <img src="/assets/section/1.png" alt="small top left" className="w-full h-auto object-cover block" />
          </div>
        </div>

        {/* Center large - SAFE INVESTMENT */}
        <div className="floating-image from-center-top absolute transform-gpu" style={getStyle('c2', { top: '26%', left: '28%', width: '520px', zIndex: 20 })}>
          <div className="floating-inner relative rounded-md  overflow-hidden pointer-events-auto">
            <img src="/assets/section/2.png" alt="safe investment" className="w-full h-auto object-cover block" />
            <div className="absolute inset-0 bg-black/30">
              <div className="flex items-center justify-center h-full text-center px-6">
                <h4 className="text-white text-3xl md:text-4xl font-sans tracking-wide">SAFE INVESTMENT</h4>
              </div>
              <div className="absolute bottom-4 left-0 right-0 px-6 text-center">
                <p className="text-white/90 text-sm md:text-base max-w-[80%] mx-auto">Guaranteed deadlines backed by airtight contracts. Milestones aligned payments—jointly signed off, so progress feels effortless.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Left-bottom large - DESIGN SUPPORT */}
        <div className="floating-image from-bottom-left absolute transform-gpu" style={getStyle('c3', { top: '50%', left: '6%', width: '420px', zIndex: 18 })}>
          <div className="floating-inner relative rounded-md  overflow-hidden pointer-events-auto">
            <img src="/assets/section/3.png" alt="design support" className="w-full h-auto object-cover block" />
            <div className="absolute inset-0 bg-black/30">
              <div className="flex items-center justify-center h-full text-center px-6">
                <h4 className="text-white text-3xl md:text-4xl font-sans tracking-wide">DESIGN SUPPORT</h4>
              </div>
              <div className="absolute bottom-4 left-0 right-0 px-6 text-center">
                <p className="text-white/90 text-sm md:text-base max-w-[80%] mx-auto">Architectural & structural drawings, planning approvals and interior design, all under one roof.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top-right large - BUILD WITH CONFIDENCE */}
        <div className="floating-image from-right-top absolute transform-gpu" style={getStyle('c4', { top: '6%', left: '68%', width: '360px', zIndex: 19 })}>
          <div className="floating-inner relative rounded-md  overflow-hidden pointer-events-auto">
            <img src="/assets/section/5.png" alt="build with confidence" className="w-full h-auto object-cover block" />
            <div className="absolute inset-0 bg-black/30">
              <div className="flex items-center justify-center h-full text-center px-4">
                <h4 className="text-white text-2xl md:text-3xl font-sans tracking-wide">BUILD WITH CONFIDENCE</h4>
              </div>
              <div className="absolute bottom-4 left-0 right-0 px-4 text-center">
                <p className="text-white/90 text-sm md:text-base max-w-[80%] mx-auto">Precision in build, discipline in safety & regulations.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Small bottom-right */}
        <div className="floating-image from-bottom-right absolute transform-gpu" style={getStyle('c5', { top: '66%', left: '78%', width: '160px', zIndex: 14 })}>
          <div className="floating-inner relative rounded-md  overflow-hidden pointer-events-auto">
            <img src="/assets/section/4.png" alt="maintained quality" className="w-full h-auto object-cover block" />
          </div>
        </div>
      </div>

      {/* Dev slider controls (mirrors TestimonialSection pattern) */}
      {process.env.NODE_ENV === 'development' && (
        <>
          {panelOpen ? (
            <div className="fixed top-4 right-4 z-50 w-72 p-3 rounded bg-white/95 border border-gray-200 ">
              <div className="flex items-center justify-between mb-2">
                <strong className="text-sm text-black">Floating images</strong>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPanelOpen(false)} className="text-xs px-2 py-1 rounded bg-gray-100">Hide</button>
                </div>
              </div>
              <div className="mb-2">
                <select value={selectedCard} onChange={(e) => setSelectedCard(e.target.value)} className="w-full p-1 text-sm border rounded">
                  <option value="c1">C1 — Top-left</option>
                  <option value="c2">C2 — Center</option>
                  <option value="c3">C3 — Left-bottom</option>
                  <option value="c4">C4 — Top-right</option>
                  <option value="c5">C5 — Bottom-right</option>
                </select>
              </div>
              {(() => {
                const o = overrides[selectedCard] || {};
                return (
                  <div className="text-xs">
                    <div className="mb-1 text-black">Top <span className="float-right text-gray-600">{o.top ?? 0}px</span></div>
                    <input type="range" min={-200} max={800} value={String(o.top ?? 0)} onChange={(e) => updateOverride(selectedCard, { top: Number(e.target.value) })} className="w-full mb-2" />
                    <div className="mb-1 text-black">Left <span className="float-right text-gray-600">{o.left ?? 0}px</span></div>
                    <input type="range" min={-300} max={1400} value={String(o.left ?? 0)} onChange={(e) => updateOverride(selectedCard, { left: Number(e.target.value) })} className="w-full mb-2" />
                    <div className="mb-1 text-black">Width <span className="float-right text-gray-600">{o.width ?? 0}px</span></div>
                    <input type="range" min={80} max={900} value={String(o.width ?? 200)} onChange={(e) => updateOverride(selectedCard, { width: Number(e.target.value) })} className="w-full mb-2" />
                    <div className="mb-1 text-black">Z-index <span className="float-right text-gray-600">{o.zIndex ?? 0}</span></div>
                    <input type="range" min={0} max={50} value={String(o.zIndex ?? 0)} onChange={(e) => updateOverride(selectedCard, { zIndex: Number(e.target.value) })} className="w-full" />
                  </div>
                );
              })()}
            </div>
          ) : (
            <button onClick={() => setPanelOpen(true)} className="fixed top-4 right-4 z-50 p-2 rounded bg-white/90 border border-gray-200 shadow text-xs">Edit floating images</button>
          )}
        </>
      )}
    </section>
  );
};

export default FloatingImageSection;

