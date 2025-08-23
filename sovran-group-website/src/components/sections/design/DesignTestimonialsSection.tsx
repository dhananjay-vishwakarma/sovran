import React from 'react';

const DesignTestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "The 3D visualizations created by Sovran Design were incredibly detailed and helped us make critical design decisions before construction began. The final result matched the renders perfectly.",
      author: "Michael Johnson",
      role: "Residential Client",
      image: "/assets/images/Review-3-Mathew-and-Jason.jpg"
    },
    {
      quote: "Working with Sovran Design transformed our renovation project. Their architectural expertise and planning permission assistance saved us time and ensured our vision was realized.",
      author: "Emily Parker",
      role: "Home Renovation Client",
      image: "/assets/images/Review-1-Maria-Carolina-860x1024.jpg"
    },
    {
      quote: "The virtual walkthrough technology provided by Sovran Design gave us an immersive experience of our future office space, allowing us to make informed decisions and adjustments.",
      author: "David Williams",
      role: "Commercial Client",
      image: "/assets/images/Review-2-Em-Sheldon.jpg"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl  text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from our satisfied clients who have experienced the Sovran Design difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className=" text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="text-gray-600 italic">{testimonial.quote}</div>
              <div className="mt-4 text-amber-500">
                ★★★★★
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl  text-center mb-8">Our Success in Numbers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <div className="text-4xl  text-amber-500 mb-2">250+</div>
                <p className="text-gray-600">Projects Completed</p>
              </div>
              <div className="p-4">
                <div className="text-4xl  text-amber-500 mb-2">98%</div>
                <p className="text-gray-600">Client Satisfaction</p>
              </div>
              <div className="p-4">
                <div className="text-4xl  text-amber-500 mb-2">15+</div>
                <p className="text-gray-600">Design Awards</p>
              </div>
              <div className="p-4">
                <div className="text-4xl  text-amber-500 mb-2">12</div>
                <p className="text-gray-600">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl  mb-8">Featured In</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="grayscale hover:grayscale-0 transition-all">
              <img src="/assets/images/MrWardrobe-Magazine--739x1024.jpg" alt="Architecture Magazine" className="h-12 object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all">
              <img src="/assets/images/Press-1-min.jpg" alt="Design Journal" className="h-12 object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all">
              <div className="text-2xl font-serif ">Home & Design</div>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all">
              <div className="text-2xl font-serif ">ArchDaily</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignTestimonialsSection;
