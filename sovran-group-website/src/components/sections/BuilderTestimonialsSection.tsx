import React from 'react';

const BuilderTestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl  text-dark-900 mb-4">Client Testimonials</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-dark-700 max-w-3xl mx-auto">
            Hear what our clients have to say about their experience working with Sovran Builders.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white shadow-lg p-8 rounded-lg">
            <div className="flex items-center mb-4">
              <img 
                src="/assets/images/Review-1-Maria-Carolina-860x1024.jpg" 
                alt="Maria C." 
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-lg  text-dark-900">Maria C.</h3>
                <p className="text-gray-600">Fulham</p>
              </div>
            </div>
            <div className="mb-4 flex">
              <span className="text-yellow-500">★★★★★</span>
            </div>
            <p className="text-dark-700 italic">
              "Sovran Builders transformed our house into the home of our dreams. Their attention to detail and commitment to quality was evident at every stage of the project. Highly recommended!"
            </p>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-white shadow-lg p-8 rounded-lg">
            <div className="flex items-center mb-4">
              <img 
                src="/assets/images/Review-2-Em-Sheldon.jpg" 
                alt="James T." 
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-lg  text-dark-900">Emily S.</h3>
                <p className="text-gray-600">Hampstead</p>
              </div>
            </div>
            <div className="mb-4 flex">
              <span className="text-yellow-500">★★★★★</span>
            </div>
            <p className="text-dark-700 italic">
              "Working with the team at Sovran Builders was a pleasure from start to finish. They listened to our ideas, offered valuable suggestions, and delivered a beautiful extension that has transformed how we use our home."
            </p>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-white shadow-lg p-8 rounded-lg">
            <div className="flex items-center mb-4">
              <img 
                src="/assets/images/Review-3-Mathew-and-Jason.jpg" 
                alt="Matthew & Jason" 
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-lg  text-dark-900">Matthew & Jason</h3>
                <p className="text-gray-600">Richmond</p>
              </div>
            </div>
            <div className="mb-4 flex">
              <span className="text-yellow-500">★★★★</span>
              <span className="text-yellow-500">★</span>
            </div>
            <p className="text-dark-700 italic">
              "The professionalism and craftsmanship displayed by Sovran Builders exceeded our expectations. Our new kitchen extension is not only beautiful but functional, and the process was managed seamlessly from start to finish."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderTestimonialsSection;
