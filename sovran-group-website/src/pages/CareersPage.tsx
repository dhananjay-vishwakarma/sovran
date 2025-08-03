import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface JobPosition {
  id: number;
  title: string;
  department: 'Design' | 'Builders' | 'Interiors' | 'Operations';
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  posted: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const CareersPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cultureRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const jobCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const jobs: JobPosition[] = [
    {
      id: 1,
      title: 'Senior Interior Designer',
      department: 'Interiors',
      location: 'London, UK',
      type: 'Full-time',
      posted: 'July 15, 2025',
      description: 'We are looking for a senior interior designer with exceptional creative vision and project management skills to join our Sovran Interiors team.',
      responsibilities: [
        'Create detailed design concepts for high-end residential projects',
        'Collaborate with architects, contractors, and clients',
        'Manage multiple projects from concept to completion',
        'Select materials, finishes, furniture, and fixtures',
        'Prepare presentations and mood boards for client approvals'
      ],
      requirements: [
        'Bachelor\'s degree in Interior Design or related field',
        'Minimum 5 years of experience in luxury residential design',
        'Proficiency in AutoCAD, SketchUp, and Adobe Creative Suite',
        'Strong portfolio demonstrating creativity and technical skill',
        'Excellent communication and client management skills'
      ]
    },
    {
      id: 2,
      title: 'Construction Project Manager',
      department: 'Builders',
      location: 'London, UK',
      type: 'Full-time',
      posted: 'July 20, 2025',
      description: 'Sovran Builders is seeking an experienced construction project manager to oversee high-end residential renovation and new build projects.',
      responsibilities: [
        'Manage construction projects from planning to completion',
        'Develop and maintain project schedules and budgets',
        'Coordinate with subcontractors, suppliers, and regulatory bodies',
        'Ensure quality standards and compliance with building regulations',
        'Report regularly to senior management and clients'
      ],
      requirements: [
        'Bachelor\'s degree in Construction Management, Civil Engineering, or related field',
        'Minimum 7 years of experience in luxury residential construction',
        'Strong understanding of UK building regulations and planning processes',
        'Experience with construction management software',
        'Excellent problem-solving and team leadership skills'
      ]
    },
    {
      id: 3,
      title: 'Architectural Designer',
      department: 'Design',
      location: 'London, UK',
      type: 'Full-time',
      posted: 'July 22, 2025',
      description: 'Join our Sovran Design team as an Architectural Designer, creating beautiful and functional spaces for our discerning clients.',
      responsibilities: [
        'Develop architectural designs for high-end residential projects',
        'Create detailed CAD drawings and 3D visualizations',
        'Assist with planning applications and building regulation submissions',
        'Collaborate with interior designers and construction teams',
        'Conduct site visits and assessments'
      ],
      requirements: [
        'Part III qualified architect or equivalent',
        'Minimum 3 years of experience in residential architecture',
        'Proficiency in Revit, AutoCAD, and visualization software',
        'Understanding of UK planning and building regulations',
        'Strong design portfolio demonstrating creativity and technical competence'
      ]
    }
  ];

  useEffect(() => {
    // Hero section animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0.9, scale: 0.98 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        ease: 'power2.out' 
      }
    );
    
    // Culture section animation
    gsap.fromTo(
      cultureRef.current,
      { opacity: 0.9, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.7, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cultureRef.current,
          start: 'top 85%',
        }
      }
    );
    
    // Benefits section animation
    if (benefitsRef.current) {
      gsap.fromTo(
        benefitsRef.current.querySelectorAll('.benefit-card'),
        { opacity: 0.9, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1,
          duration: 0.5, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: 'top 85%',
          }
        }
      );
    }
    
    // Process section animation
    if (processRef.current) {
      gsap.fromTo(
        processRef.current.querySelectorAll('.process-step'),
        { opacity: 0.9, x: -15 },
        { 
          opacity: 1, 
          x: 0, 
          stagger: 0.1,
          duration: 0.5, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 85%',
          }
        }
      );
    }
    
    // Job cards animation
    jobCardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0.9, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5,
          delay: 0.05 * index,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          }
        }
      );
    });

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center" 
        style={{
          backgroundImage: "url('/images/MrWardrobe-unparalleled-craftmanship-scaled-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark-900/80 z-0"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Build your career with Sovran Group. We're looking for talented professionals who are passionate about design, construction, and creating exceptional spaces.
          </p>
          <Button 
            text="View Open Positions" 
            className="mx-auto font-medium text-white"
            onClick={() => {
              document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </section>

      {/* Our Culture Section */}
      <section 
        ref={cultureRef} 
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
        style={{
          backgroundImage: "url('/images/image-4-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-dark-900/70 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-white mb-6">Our Culture</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="/images/Executive-Office-furniture_MrWardrobe_0005-scaled.jpg" 
                alt="Team collaboration at Sovran Group" 
                className="w-full h-auto"
              />
            </div>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                At Sovran Group, we foster a culture of creativity, collaboration, and craftsmanship. We believe that exceptional spaces are created by exceptional people working together.
              </p>
              <p className="text-lg leading-relaxed">
                Our team comprises talented professionals from diverse backgrounds, all united by a passion for design excellence and client satisfaction. We encourage innovation, continuous learning, and personal growth.
              </p>
              <p className="text-lg leading-relaxed">
                When you join Sovran Group, you become part of a family that values your unique perspective and supports your professional development. We celebrate achievements together and tackle challenges as a team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        ref={benefitsRef} 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-white mb-6">Benefits & Perks</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We value our team members and offer a comprehensive benefits package to support your well-being and growth.
            </p>
            <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Professional Development",
                description: "Continuous learning opportunities, including workshops, conferences, and certification programs.",
                icon: "🎓"
              },
              {
                title: "Flexible Working",
                description: "Flexible working hours and hybrid work arrangements to support work-life balance.",
                icon: "⏰"
              },
              {
                title: "Health & Wellbeing",
                description: "Comprehensive health insurance, mental health support, and wellness programs.",
                icon: "💪"
              },
              {
                title: "Project Bonuses",
                description: "Performance-based bonuses and profit-sharing opportunities for successful projects.",
                icon: "💰"
              },
              {
                title: "Creative Environment",
                description: "Work in inspiring spaces with state-of-the-art tools and resources.",
                icon: "🎨"
              },
              {
                title: "Team Building",
                description: "Regular social events, team retreats, and collaborative activities.",
                icon: "🤝"
              }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="benefit-card bg-dark-900/70 border border-primary-600/20 rounded-xl p-6 shadow-xl backdrop-blur-sm"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-serif font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section 
        ref={processRef}
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
        style={{
          backgroundImage: "url('/images/Traditional-Craftmanship-Taaj-kitchens-Homepage-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark-900/80 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-white mb-6">Our Application Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We've designed a straightforward process to help us find the right talent for our team.
            </p>
            <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
          </div>
          
          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-4 md:gap-8">
            {[
              {
                step: "1",
                title: "Apply Online",
                description: "Submit your application through our careers portal with your CV and portfolio."
              },
              {
                step: "2",
                title: "Initial Review",
                description: "Our HR team will review your application and reach out if there's a potential match."
              },
              {
                step: "3",
                title: "Interview Process",
                description: "Multiple interviews to assess your skills, experience, and cultural fit."
              },
              {
                step: "4",
                title: "Welcome Aboard",
                description: "If successful, you'll receive an offer and join our onboarding program."
              }
            ].map((process, index) => (
              <div 
                key={index} 
                className="process-step relative p-6 rounded-xl bg-dark-800/60 border border-primary-600/20 backdrop-blur-sm"
              >
                <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-dark-900 font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-serif font-bold text-white mt-2 mb-3">{process.title}</h3>
                <p className="text-gray-300">{process.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-300 mb-6">
              Have questions about our hiring process? We're here to help!
            </p>
            <Button 
              text="Contact HR Team" 
              href="mailto:careers@sovrangroup.co.uk" 
              className="mx-auto font-medium text-white"
            />
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section 
        ref={jobsRef}
        id="open-positions" 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-white mb-6">Open Positions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join our team of talented professionals and help us create exceptional spaces.
            </p>
            <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {jobs.map((job, index) => (
              <div 
                key={job.id} 
                ref={el => {
                  jobCardRefs.current[index] = el;
                  return undefined;
                }}
                className="bg-dark-900/70 border border-primary-600/20 rounded-xl overflow-hidden shadow-xl backdrop-blur-sm"
              >
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-white">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm">
                          {job.department}
                        </span>
                        <span className="px-3 py-1 bg-dark-700/50 text-gray-300 rounded-full text-sm">
                          {job.location}
                        </span>
                        <span className="px-3 py-1 bg-dark-700/50 text-gray-300 rounded-full text-sm">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 text-sm text-gray-400">
                      Posted: {job.posted}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6">
                    {job.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-3">Responsibilities</h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        {job.requirements.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      text="Apply Now" 
                      href={`/apply/${job.id}`} 
                      className="font-medium text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* No positions notice - conditionally rendered if no jobs available */}
          {jobs.length === 0 && (
            <div className="bg-dark-900/70 border border-primary-600/20 rounded-xl p-8 text-center backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">No Open Positions Currently</h3>
              <p className="text-gray-300 mb-6">
                We don't have any open positions at the moment, but we're always looking for talented individuals to join our team.
              </p>
              <p className="text-gray-300">
                Send your CV to <a href="mailto:careers@sovrangroup.co.uk" className="text-primary-400 hover:underline">careers@sovrangroup.co.uk</a> and we'll keep your details on file for future opportunities.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
        style={{
          backgroundImage: "url('/images/Kensington-Residence-by-Taaj-kitchens-enterence-scaled.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark-900/80 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-white mb-6">What Our Team Says</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Joining Sovran Group was the best career decision I've made. The collaborative environment and challenging projects have helped me grow professionally.",
                name: "Sophia Chen",
                position: "Senior Interior Designer",
                image: "/images/Review-2-Em-Sheldon.jpg"
              },
              {
                quote: "What I love most about working here is the emphasis on craftsmanship and quality. We're encouraged to take the time to do things right.",
                name: "James Thompson",
                position: "Project Manager",
                image: "/images/Review-3-Mathew-and-Jason.jpg"
              },
              {
                quote: "The mentorship and professional development opportunities at Sovran Group are unparalleled. I've learned so much from the experienced team members.",
                name: "Olivia Martinez",
                position: "Architectural Designer",
                image: "/images/Review-1-Maria-Carolina-860x1024.jpg"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-dark-800/60 border border-primary-600/20 rounded-xl p-6 shadow-xl relative z-10"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary-500">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <blockquote className="text-gray-300 text-center italic mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-center">
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-primary-400 text-sm">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join Our Team?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Explore our open positions and take the next step in your career with Sovran Group.
          </p>
          <Button 
            text="View Open Positions" 
            className="mx-auto font-medium text-white"
            onClick={() => {
              document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;
