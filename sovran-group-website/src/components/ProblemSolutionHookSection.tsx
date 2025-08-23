import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const ProblemSolutionHookSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const headingTextPart1 = "One vision, A dozen specialists, A hundred moving parts. We bring them all – the best architects, designers, project managers, and suppliers.";
  const headingTextPart2 = "One team. One roof. One smooth journey.";
  const paragraphText = "With Sovran, you’re not chasing quotes or managing chaos. From planning permissions to final finishes, our in-house specialists and trusted partners work in perfect harmony — so every stage of your project moves forward with clarity, precision, and care.";

  useEffect(() => {
    if (!sectionRef.current) return;

    const heading = sectionRef.current.querySelector("h2");
    const paragraph = sectionRef.current.querySelector("p");

    if (!heading) return;

    const splitHeading = new SplitText(heading, { type: "words" });

    // start with heading words slightly down and hidden
    gsap.set([...splitHeading.words], { opacity: 0, y: 50 });

    // hide paragraph until heading animation completes
    if (paragraph) {
      gsap.set(paragraph, { opacity: 0, y: 15, pointerEvents: 'none' });
    }

    // Timeline with numeric scrub (smooth) and staggered per-word animation for heading only
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1000', // adjust as needed
        scrub: 0.6,    // numeric scrub smooths the animation
        pin: true,
      }
    });

    tl.to([...splitHeading.words], {
      opacity: 1,
      y: 0,
      ease: 'power2.inOut',
      stagger: {
        each: 0.04,
        from: 'start'
      }
    });

    // after heading words finish, fade in the paragraph
    if (paragraph) {
      tl.to(paragraph, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        pointerEvents: 'auto'
      }, '+=0.1');
    }

    return () => {
      tl.kill();
      splitHeading.revert();
      if (paragraph) gsap.set(paragraph, { clearProps: 'all' });
    };
  }, []);

  return (
 <section
  ref={sectionRef}
  className="pt-40 px-4 sm:px-6 lg:px-8 bg-primary-50 text-black reveal-npm up py-32"
>
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-4xl md:text-5xl lg:text-[72px] mb-8 leading-[1.25]">
      {headingTextPart1}
      <br />
      <span className="text-4xl sm:text-4xl pt-16 pb-8 block">{headingTextPart2}</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
      <div className="md:col-span-7"></div>

      <div className="md:col-span-5 md:text-left">
        <p className="text-xl text-black/90">{paragraphText}</p>
      </div>
    </div>
  </div>
</section>
  );
};

export default ProblemSolutionHookSection;
