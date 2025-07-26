import React from 'react';
import Hero from '../components/Hero';

const About = () => {
  return (
    <div>
      <Hero
        title="About Us"
        subtitle="Excellence Through Innovation"
        description="Founded on principles of quality, integrity, and innovation, Sovran Group has established itself as a leader in the construction and design industry."
        backgroundImage="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600"
        height="h-96"
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light tracking-wider uppercase mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Established with a vision to revolutionize the construction and design industry, Sovran Group has grown from a single-discipline firm to a comprehensive solutions provider.
                </p>
                <p className="text-lg">
                  Our journey began with a simple belief: that exceptional spaces require exceptional expertise. This philosophy has guided our evolution into three specialized divisions, each excelling in their respective fields while maintaining seamless integration.
                </p>
                <p className="text-lg">
                  Today, we stand as a testament to what can be achieved when passion meets precision, and creativity meets craftsmanship.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Story"
                className="w-full h-96 object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-wider uppercase mb-6">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-light tracking-wide uppercase mb-4">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We pursue perfection in every detail, ensuring that our work exceeds industry standards and client expectations.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-light tracking-wide uppercase mb-4">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                We embrace cutting-edge technologies and methodologies to deliver solutions that push the boundaries of possibility.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-light tracking-wide uppercase mb-4">Integrity</h3>
              <p className="text-gray-600 leading-relaxed">
                We build lasting relationships through transparency, honesty, and unwavering commitment to our promises.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-wider uppercase mb-6">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our success is driven by a team of visionary leaders who bring decades of experience and unwavering dedication to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/3184434/pexels-photo-3184434.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Leadership Team"
                className="w-48 h-48 mx-auto object-cover shadow-lg mb-6"
              />
              <h3 className="text-xl font-light tracking-wide uppercase mb-2">Michael Chen</h3>
              <p className="text-gray-600 mb-4">Chief Executive Officer</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                With over 20 years of industry experience, Michael leads our vision for innovative construction solutions.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Leadership Team"
                className="w-48 h-48 mx-auto object-cover shadow-lg mb-6"
              />
              <h3 className="text-xl font-light tracking-wide uppercase mb-2">Sarah Williams</h3>
              <p className="text-gray-600 mb-4">Chief Design Officer</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Sarah's architectural expertise and design vision have shaped our aesthetic philosophy and creative direction.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/3184435/pexels-photo-3184435.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Leadership Team"
                className="w-48 h-48 mx-auto object-cover shadow-lg mb-6"
              />
              <h3 className="text-xl font-light tracking-wide uppercase mb-2">David Rodriguez</h3>
              <p className="text-gray-600 mb-4">Chief Operations Officer</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                David ensures operational excellence across all divisions, maintaining our commitment to quality and efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;