import sovranInteriorsData from '../data/sovranInteriors.json';
import subcategoriesData from '../data/subcategories.json';

export interface PageData {
  title: string;
  description?: string;
  heroImage?: string;
  ctaText?: string;
  ctaLink?: string;
  sections?: any[];
  ctaSection?: {
    title: string;
    description: string;
    primaryCta: {
      text: string;
      link: string;
    };
    secondaryCta?: {
      text: string;
      link: string;
    };
  };
}

export interface CategoryData {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  subcategories: {
    id: string;
    title: string;
    description: string;
    link: string;
  }[];
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
    }[];
    featuredProjects: {
      title: string;
      description: string;
      image: string;
    }[];
    testimonials?: {
      quote: string;
      author: string;
      company?: string;
      projectType?: string;
    }[];
    specifications?: {
      category: string;
      items: {
        name: string;
        value: string;
      }[];
    }[];
    processSteps?: {
      number: number;
      title: string;
      description: string;
    }[];
    designInspirations?: {
      title: string;
      image: string;
      description: string;
      link?: string;
    }[];
  };
}

export interface SubcategoryData extends CategoryData {
  parentId: string;
  testimonials?: {
    quote: string;
    author: string;
    company?: string;
    projectType?: string;
  }[];
  specifications?: {
    category: string;
    items: {
      name: string;
      value: string;
    }[];
  }[];
  processSteps?: {
    number: number;
    title: string;
    description: string;
  }[];
  designInspirations?: {
    title: string;
    image: string;
    description: string;
    link?: string;
  }[];
  finalCta?: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    secondaryText?: string;
    secondaryLink?: string;
  };
}

export interface NavigationItem {
  id: string;
  title: string;
  link: string;
  subcategories: {
    id: string;
    title: string;
    link: string;
  }[];
}

/**
 * Get page data based on category and subcategory IDs
 */
export const getPageData = (categoryId?: string, subcategoryId?: string): PageData => {
  if (!categoryId) {
    return sovranInteriorsData.mainPage;
  }

  const categoryData = sovranInteriorsData.categories.find(cat => cat.id === categoryId);
  
  if (!categoryData) {
    return sovranInteriorsData.mainPage;
  }

  // For now, we don't have specific subcategory content,
  // so we'll just return the category data
  return categoryData;
};

/**
 * Get navigation data for the given category
 */
export const getCategoryNav = (categoryId: string): NavigationItem | null => {
  return sovranInteriorsData.navigation.mainCategories.find(cat => cat.id === categoryId) || null;
};

/**
 * Get all navigation categories
 */
export const getAllCategories = (): NavigationItem[] => {
  return sovranInteriorsData.navigation.mainCategories;
};

/**
 * Update the content data (in a real app, this would save to a server or localStorage)
 */
export const updateContentData = (newData: any): boolean => {
  // In a real app, you would implement persistence here
  console.log('Data would be updated:', newData);
  return true;
};
