import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  text: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  to, 
  href, 
  onClick, 
  className = '',
  type = 'button'
}) => {
  const buttonContent = (
    <>
      <svg className="absolute left-0 top-0 w-full h-full" preserveAspectRatio="none">
        <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" className="bg-line" />
        <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" className="hl-line" />
      </svg>
      <span className="relative z-10 font-lato">{text}</span>
    </>
  );

  const baseClasses = "sovran-btn relative h-[60px] px-8 cursor-pointer bg-transparent outline-none transition-all duration-1000 overflow-hidden font-lato";
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
      <button type={type} onClick={onClick} className={combinedClasses}>
        {buttonContent}
      </button>
    );
  }
};

export default Button;
