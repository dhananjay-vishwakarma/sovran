import React from 'react';
import { Link } from 'react-router-dom';

interface ArrowButtonProps {
  text: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ 
  text, 
  to, 
  href, 
  onClick, 
  className = ''
}) => {
  const buttonContent = (
    <>
      <span className="group-hover:text-primary-500 transition-colors duration-300">{text}</span>
      <div className="inline-flex ml-2 group-hover:ml-3 transition-all duration-300">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
          className="w-6 h-6 group-hover:text-primary-500 group-hover:rotate-45 transition-all duration-500 transform-gpu">
          <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1" className="group-hover:stroke-primary-500" />
          <path d="M10 8L14 12L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-primary-500" />
        </svg>
      </div>
    </>
  );

  const baseClasses = "group inline-flex items-center text-white font-lato text-lg hover:text-primary-500 transition-all duration-300";
  const combinedClasses = `${baseClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {buttonContent}
      </Link>
    );
  } else if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {buttonContent}
      </a>
    );
  } else {
    return (
      <button onClick={onClick} className={combinedClasses}>
        {buttonContent}
      </button>
    );
  }
};

export default ArrowButton;
