import React, { useEffect, useRef, useState } from 'react';
import '../styles/testimonial-carousel.css';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  position: string;
  avatar?: string;
  clientAvatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: '"5 Years of Successfull Partnership"\n\nWe\'ve worked with Sovran for over five years on multiple developments. Their consistency, attention to detail, and reliability keep us coming back...they deliver exactly what high-value projects demand.',
    author: "Marcus O'Neill",
    position: 'Prestigious real estate Developer',
    avatar: '/assets/avatar/1.png',
    clientAvatar: '/assets/avatar/Marcus-O-Neill.png'
  },
  {
    id: 2,
    text: '"Went Beyond Our Expectation"\n\nThey understood our vision and went above and beyond their limits to deliver it. The final results are even better than our expectations. I would definitely recommend / use the team again for future renovations!',
    author: 'Nyla Idrissi',
    position: 'Contemporary New Build',
    avatar: '/assets/avatar/2.png',
    clientAvatar: '/assets/avatar/Nyla-Idrissi.png'
  },
  {
    id: 3,
    text: '"MILITARY LEVEL PRECISION"\n\nWhat impressed us most was discretion. Sovran worked in our home quietly, respectfully, with military precision. The result is stunning, but the experience itself was priceless — a team you can truly trust.',
    author: 'Shiv Patel',
    position: 'Extension & Renovation',
    avatar: '/assets/avatar/3.png',
    clientAvatar: '/assets/avatar/Shiv-Patel.png'
  }
];

const truncateText = (text: string, maxLength = 180) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  const lastSpace = text.substring(0, maxLength).lastIndexOf(' ');
  return text.substring(0, lastSpace > 0 ? lastSpace : maxLength) + '...';
};

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; content: string; author: string; position: string; }> = ({ isOpen, onClose, title, content, author, position }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOutside = (e: React.MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={handleOutside}>
      <div ref={ref} className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-medium text-[#081E27]">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="p-1 rounded-md text-gray-600">✕</button>
        </div>
        <div className="mb-4 text-gray-800 whitespace-pre-line">{content}</div>
        <div className="pt-4 border-t">
          <h4 className="text-[#081E27] font-medium">{author}</h4>
          <p className="text-sm text-gray-600">{position}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialSectionMobile: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: '', content: '', author: '', position: '' });
  const autoRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, []);

  const startAuto = () => {
    stopAuto();
    autoRef.current = window.setInterval(() => {
      setIndex(i => (i + 1) % testimonials.length);
    }, 4000);
  };

  const stopAuto = () => {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  };

  const openModal = (t: Testimonial) => {
    const parts = t.text.split('\n\n');
    setModalData({ title: parts[0].replace(/\"/g, ''), content: parts[1] || t.text, author: t.author, position: t.position });
    setIsOpen(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    stopAuto();
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    if (start == null) return startAuto();
    const end = e.changedTouches[0].clientX;
    const delta = end - start;
    if (Math.abs(delta) > 40) {
      if (delta > 0) setIndex(i => (i === 0 ? testimonials.length - 1 : i - 1));
      else setIndex(i => (i + 1) % testimonials.length);
    }
    touchStartX.current = null;
    startAuto();
  };

  return (
    <section className="py-8 bg-gray-50 sm:hidden"> {/* hide on sm+ since this is mobile-only */}
      <div className="max-w-md mx-auto px-4">
        <div className="mb-2">
          <span className="text-primary-500 text-xs uppercase tracking-wider">TESTIMONIAL</span>
        </div>
        <h2 className="text-2xl text-[#081E27] mb-6">Proven Expertise, Tangible Results</h2>

        <div className="relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {testimonials.map((t, i) => (
            <div key={t.id} className={`transition-all duration-400 ${i === index ? 'opacity-100 translate-x-0' : 'opacity-0 hidden'}`}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Project image with overlaid unique title (mimics desktop) */}
                <div className="relative w-full h-40 sm:h-48 bg-gray-100">
                  {t.avatar && (
                    <img src={t.avatar} alt={`project-${t.id}`} className="w-full h-full object-cover" />
                  )}
                  {t.text.includes('"') && (
                    <>
                      {/* full-image gradient overlay (dark at bottom -> transparent at top) */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                      {/* title at the very bottom of the image, no boxed background */}
                      <div className="absolute left-0 right-0 bottom-3 px-4 pointer-events-none">
                        <h3 className="text-white text-base font-medium truncate text-center">{t.text.split("\n\n")[0].replace(/\"/g, '')}</h3>
                      </div>
                    </>
                  )}
                </div>

                <div className="p-4">
                  {/* Quote box (truncated) */}
                  <p className="text-gray-800 text-sm leading-relaxed mb-3 whitespace-pre-line">{truncateText((t.text.split('\n\n')[1] || t.text), 140)}</p>

                  {/* Rating and Read more */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, s) => (
                        <img key={s} src="/assets/icon/500w/SVG/8GoPIo.svg" alt="star" className="w-4 h-4 mr-1" />
                      ))}
                    </div>
                    <div className="flex items-center">
                      <button onClick={() => openModal(t)} className="text-primary-500 text-sm mr-3">Read more</button>
                      <button onClick={() => setIndex((index + 1) % testimonials.length)} aria-label="Next" className="p-2 bg-gray-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#081E27]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                      </button>
                    </div>
                  </div>

                  {/* Client avatar + name + role (bottom) */}
                  <div className="flex items-center mt-2">
                    {t.clientAvatar && <img src={t.clientAvatar} alt={t.author} className="w-12 h-12 rounded-full mr-3 object-cover" />}
                    <div>
                      <h4 className="text-[#081E27] font-medium">{t.author}</h4>
                      <p className="text-sm text-gray-600">{t.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i === index ? 'bg-primary-500' : 'bg-gray-300'}`} aria-label={`Go to testimonial ${i+1}`} />
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={modalData.title} content={modalData.content} author={modalData.author} position={modalData.position} />
    </section>
  );
};

export default TestimonialSectionMobile;
