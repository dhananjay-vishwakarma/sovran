import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  trigger?: string | React.RefObject<HTMLElement>;
  start?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className = '',
  delay = 0.2,
  speed = 0.04,
  trigger,
  start = 'top 80%',
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const textContent = useRef<string>(text);

  useEffect(() => {
    if (!textRef.current) return;

    // Reset text content to empty
    textRef.current.textContent = '';
    
    // Split the text into an array of characters
    const characters = textContent.current.split('');
    
    // Create a timeline for the typewriter effect
    const tl = gsap.timeline({
      scrollTrigger: trigger ? {
        trigger: typeof trigger === 'string' ? trigger : trigger.current,
        start: start,
        toggleActions: 'play none none none',
      } : null,
    });
    
    // Add a delay before starting
    tl.to({}, { duration: delay });
    
    // Add each character one by one
    characters.forEach((char) => {
      tl.add(() => {
        if (textRef.current) {
          textRef.current.textContent += char;
        }
      }, speed);
    });
    
    return () => {
      // Clean up
      tl.kill();
    };
  }, [text, delay, speed, trigger, start]);

  return <p ref={textRef} className={className}></p>;
};

export default TypewriterText;
