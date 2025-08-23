import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 text-center px-4 py-16">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-light text-gray-600 mt-4">Page Not Found</p>
        <p className="mt-2 text-gray-500">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Go to Homepage
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
