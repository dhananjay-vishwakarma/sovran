import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SubcategoryItem {
  id: string;
  title: string;
  link: string;
}

interface SubcategoryNavProps {
  category: string;
  subcategories: SubcategoryItem[];
  currentSubcategory?: string;
}

const SubcategoryNav: React.FC<SubcategoryNavProps> = ({ category, subcategories, currentSubcategory }) => {
  const location = useLocation();
  
  return (
    <div className="bg-dark-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center">
          <h3 className="text-white font-semibold mb-3 sm:mb-0 sm:mr-6">{category}</h3>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {subcategories.map((subcategory) => (
              <Link
                key={subcategory.id}
                to={subcategory.link}
                className={`px-4 py-2 rounded-full text-sm ${
                  (currentSubcategory === subcategory.id || location.pathname === subcategory.link)
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                } transition-colors duration-300`}
              >
                {subcategory.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryNav;
