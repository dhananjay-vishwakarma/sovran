import React from 'react';

const FloatingImageSectionMobile: React.FC = () => {
  const cards = [
    { id: 1, src: '/assets/section/1.png', title: '', text: '' },
    { id: 2, src: '/assets/section/2.png', title: 'SAFE INVESTMENT', text: 'Guaranteed deadlines backed by airtight contracts. Milestones aligned payments—jointly signed off, so progress feels effortless.' },
    { id: 3, src: '/assets/section/3.png', title: 'DESIGN SUPPORT', text: 'Architectural & structural drawings, planning approvals and interior design, all under one roof.' },
    { id: 5, src: '/assets/section/5.png', title: 'BUILD WITH CONFIDENCE', text: 'Precision in build, discipline in safety & regulations. Building structures that endure beyond generations.' },
    { id: 4, src: '/assets/section/4.png', title: '', text: '' },
  ];

  return (
  <section className="py-10 bg-[#e2d9ce] block sm:hidden">{/* visible only on small screens */}
      <div className="max-w-md mx-auto px-4 space-y-6">
        {cards.map((c) => (
          <div key={c.id} className="relative bg-white rounded-lg overflow-hidden shadow-md">
            <img src={c.src} alt={c.title || 'image'} className="w-full h-auto object-cover block" />
            {c.title && (
              <div className="absolute inset-0 flex flex-col items-center p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white rounded-lg">
                <div className="flex-1 flex items-center justify-center">
                  <h4 className="text-lg font-medium text-center">{c.title}</h4>
                </div>
                {c.text && (
                  <div className="w-full mt-auto">
                    <p className="text-sm text-white/90 text-center">{c.text}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FloatingImageSectionMobile;
