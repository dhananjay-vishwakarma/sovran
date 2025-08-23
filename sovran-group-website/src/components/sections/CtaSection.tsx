import React from 'react';
import { Link } from 'react-router-dom';

interface CtaButtonProps {
  text: string;
  link: string;
}

interface CtaSectionProps {
  title: string;
  description: string;
  primaryCta: CtaButtonProps;
  secondaryCta?: CtaButtonProps;
}

const CtaSection: React.FC<CtaSectionProps> = ({ title, description, primaryCta, secondaryCta }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-primary-900/30 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-primary-700/50">
        <div className="text-center reveal-up">
          <h2 className="text-3xl md:text-4xl  text-white mb-6">
            {title}
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to={primaryCta.link} 
              className="bg-white text-primary-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-all duration-300"
            >
              {primaryCta.text}
            </Link>
            {secondaryCta && (
              <Link 
                to={secondaryCta.link} 
                className="border border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                {secondaryCta.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
