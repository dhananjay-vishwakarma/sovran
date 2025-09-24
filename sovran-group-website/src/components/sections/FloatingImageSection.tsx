import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FloatingImageSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tweensRef = useRef<any[]>([]);

  const getStyle = (base: { top?: string | number; left?: string | number; width?: string | number; zIndex?: number }) => {
    return {
      top: typeof base.top === 'number' ? `${base.top}px` : base.top,
      left: typeof base.left === 'number' ? `${base.left}px` : base.left,
      width: typeof base.width === 'number' ? `${base.width}px` : base.width,
      zIndex: base.zIndex,
    } as React.CSSProperties;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const killTweens = () => {
      tweensRef.current.forEach((t) => t?.kill?.());
      tweensRef.current = [];
      ScrollTrigger.getAll()
        .filter((st) => st.trigger && container.contains(st.trigger))
        .forEach((st) => st.kill());
    };

      const computeRelativePositions = (container: HTMLElement) => {
        const centerEl = container.querySelector<HTMLElement>('[data-role="center"]');
        if (!centerEl) return;

        const containerRect = container.getBoundingClientRect();

        const relativeItems = Array.from(container.querySelectorAll<HTMLElement>('[data-relative="center"]'));

        relativeItems.forEach((el) => {
          const dx = Number(el.dataset.dx ?? 0);
          const dy = Number(el.dataset.dy ?? 0);
          const anchor = (el.dataset.anchor || 'center') as
            | 'center'
            | 'topleft'
            | 'topright'
            | 'bottomleft'
            | 'bottomright';

          const cRect = centerEl.getBoundingClientRect();

          let anchorX = cRect.left - containerRect.left + cRect.width / 2;
          let anchorY = cRect.top - containerRect.top + cRect.height / 2;

          // adjust anchor to corners if requested
          if (anchor === 'topleft') {
            anchorX = cRect.left - containerRect.left;
            anchorY = cRect.top - containerRect.top;
          } else if (anchor === 'topright') {
            anchorX = cRect.left - containerRect.left + cRect.width;
            anchorY = cRect.top - containerRect.top;
          } else if (anchor === 'bottomleft') {
            anchorX = cRect.left - containerRect.left;
            anchorY = cRect.top - containerRect.top + cRect.height;
          } else if (anchor === 'bottomright') {
            anchorX = cRect.left - containerRect.left + cRect.width;
            anchorY = cRect.top - containerRect.top + cRect.height;
          }

          // final position centers the element on the anchor point plus dx/dy
          const left = Math.round(anchorX + dx - el.offsetWidth / 2);
          const top = Math.round(anchorY + dy - el.offsetHeight / 2);

          el.style.left = `${left}px`;
          el.style.top = `${top}px`;
        });
      };

      const initTweens = async () => {
      killTweens();

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

      const items = Array.from(container.querySelectorAll<HTMLElement>('.floating-image'));

      items.forEach((el, i) => {
        const direction = i % 2 === 0 ? -1 : 1;
        const distance = direction * window.innerHeight * (0.03 + i * 0.01);

        gsap.set(el, { y: 0, willChange: 'transform' });

        const tween = gsap.fromTo(
          el,
          { y: 0 },
          {
            y: distance,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );

        tweensRef.current.push(tween);
      });

      // position any relative items after images & layout settled
      computeRelativePositions(container);

      ScrollTrigger.refresh();
    };

    initTweens();

    const inViewObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.classList.add('in-view');
        });
      },
      { threshold: 0.15 }
    );

    const itemsForObserver = Array.from(container.querySelectorAll<HTMLElement>('.floating-image'));
    itemsForObserver.forEach((it) => inViewObserver.observe(it));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            initTweens();
          } else {
            killTweens();
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const onResize = () => {
      try {
        ScrollTrigger.refresh();
        // recompute positions for relative items
        try {
          computeRelativePositions(container);
        } catch {}
      } catch {}
    };
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      inViewObserver.disconnect();
      window.removeEventListener('resize', onResize);
      killTweens();
    };
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-[#e2d9ce]">
      <div ref={containerRef} className="relative h-[680px] max-w-full mx-auto px-4 sm:px-6 lg:px-8">
  <div className="floating-image absolute transform-gpu" data-relative="center" data-dx="-480" data-dy="-220" style={getStyle({ top: '6%', left: '10%', width: '350px', zIndex: 12 })}>
          <div className="floating-inner relative rounded-md overflow-hidden pointer-events-auto">
            <img src="/assets/section/1.png" alt="small top left" className="w-full h-auto object-cover block" />
          </div>
        </div>

  <div className="floating-image absolute transform-gpu" data-role="center" style={getStyle({ top: '26%', left: '33%', width: '520px', zIndex: 20 })}>
          <div className="floating-inner relative rounded-md overflow-hidden pointer-events-auto">
            <img src="/assets/section/2.png" alt="safe investment" className="w-full h-auto object-cover block" />
            <div className="absolute inset-0 bg-black/23">
              <div className="flex items-center justify-center h-full text-center px-6">
                <h4 className="text-white text-3xl md:text-4xl font-sans tracking-wide">SAFE INVESTMENT</h4>
              </div>
              <div className="absolute bottom-4 left-0 right-0 px-6 text-center">
                <p className="text-white/90 text-sm md:text-base max-w-[80%] mx-auto">
                  Guaranteed deadlines backed by airtight contracts. Milestones aligned payments—jointly signed off, so progress feels effortless.
                </p>
              </div>
            </div>
          </div>
        </div>

  <div className="floating-image absolute transform-gpu" data-relative="center" data-dx="-480" data-dy="100" style={getStyle({ top: '50%', left: '6%', width: '420px', zIndex: 18 })}>
          <div className="floating-inner relative rounded-md overflow-hidden pointer-events-auto">
            <img src="/assets/section/3.png" alt="design support" className="w-full h-auto object-cover block" />
            <div className="absolute inset-0 bg-black/23">
              <div className="flex items-center justify-center h-full text-center px-6">
                <h4 className="text-white text-3xl md:text-4xl font-sans tracking-wide">DESIGN SUPPORT</h4>
              </div>
              <div className="absolute bottom-4 left-0 right-0 px-6 text-center">
                <p className="text-white/90 text-sm md:text-base max-w-[80%] mx-auto">
                  Architectural & structural drawings, planning approvals and interior design, all under one roof.
                </p>
              </div>
            </div>
          </div>
        </div>

  <div className="floating-image absolute transform-gpu" data-relative="center" data-dx="400" data-dy="-200" style={getStyle({ top: '6%', left: '68%', width: '400px', zIndex: 39 })}>
          <div className="floating-inner relative rounded-md overflow-hidden pointer-events-auto">
            <img src="/assets/section/5.png" alt="build with confidence" className="w-full h-auto object-cover block" />
            <div className="absolute inset-0 bg-black/23">
              <div className="flex items-center justify-center h-full text-center px-4">
                <h4 className="text-white text-2xl md:text-3xl font-sans tracking-wide">BUILD WITH CONFIDENCE</h4>
              </div>
              <div className="absolute bottom-4 left-0 right-0 px-4 text-center">
                <p className="text-white/90 text-sm md:text-base max-w-[80%] mx-auto">Precision in build, discipline in safety & regulations.
Building structures that endure beyond generations.</p>
              </div>
            </div>
          </div>
        </div>

  <div className="floating-image absolute transform-gpu" data-relative="center" data-dx="500" data-dy="180" style={getStyle({ top: '66%', left: '78%', width: '320px', zIndex: 14 })}>
          <div className="floating-inner relative rounded-md overflow-hidden pointer-events-auto">
            <img src="/assets/section/4.png" alt="maintained quality" className="w-full h-auto object-cover block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FloatingImageSection;
