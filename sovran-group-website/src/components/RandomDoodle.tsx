import React, { useEffect, useState } from 'react';

interface RandomDoodleProps {
  className?: string;
}

const RandomDoodle: React.FC<RandomDoodleProps> = ({ className = '' }) => {
  const [doodlePath, setDoodlePath] = useState<string>('');
  
  useEffect(() => {
    // Array of available doodle SVGs
    const doodles = [
      '/svg/SVG/Asset 1.svg',
      '/svg/SVG/Asset 2.svg',
      '/svg/SVG/Asset 3.svg',
      '/svg/SVG/Asset 4.svg',
      '/svg/SVG/Asset 5.svg'
    ];
    
    // Select a random doodle
    const randomIndex = Math.floor(Math.random() * doodles.length);
    setDoodlePath(doodles[randomIndex]);
  }, []);
  
  if (!doodlePath) return null;
  
  return (
    <div className={`doodle-container ${className}`}>
      <img 
        src={doodlePath} 
        alt="Decorative doodle" 
        className="w-full h-full object-contain opacity-25"
      />
    </div>
  );
};

export default RandomDoodle;
