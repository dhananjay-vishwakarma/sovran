import React, { useState } from 'react';
import Hero from '../components/Hero';
import { MapPin, Clock, Users } from 'lucide-react';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Project Manager',
      department: 'Construction',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Lead complex construction projects from conception to completion, ensuring quality, timeline, and budget adherence.',
      requirements: ['8+ years project management experience', 'PMP certification preferred', 'Construction industry background']
    },
    {
      id: 2,
      title: 'Interior Design Specialist',
      department: 'Interior Design',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Create innovative interior design solutions for residential and commercial spaces, working closely with clients to realize their vision.',
      requirements: ['Bachelor\'s degree in Interior Design', '5+ years experience', 'Proficiency in AutoCAD, SketchUp, and Adobe Creative Suite']
    },
    {
      id: 3,
      title: 'Architectural Designer',
      department: 'Architecture',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Develop architectural designs and 3D visualizations for diverse projects, collaborating with engineering and construction teams.',
      requirements: ['Bachelor\'s degree in Architecture', 'Proficiency in Revit, Rhino, and 3D rendering software', '3+ years experience']
    },
    {
      id: 4,
      title: 'Construction Supervisor',
      department: 'Construction',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Oversee daily construction operations, manage subcontractors, and ensure safety compliance on job sites.',
      requirements: ['5+ years construction supervision experience', 'OSHA 30 certification', 'Strong leadership skills']
    },
    {
      id: 5,
      title: '3D Visualization Artist',
      department: 'Architecture',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Create photorealistic 3D renderings and animations for architectural and interior design projects.',
      requirements: ['Proficiency in 3ds Max, V-Ray, and Photoshop', 'Strong portfolio of architectural visualization', '2+ years experience']
    }
  ];

  const departments = ['all', 'Construction', 'Interior Design', 'Architecture'];

  const filteredJobs = selectedDepartment === 'all' 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === selectedDepartment);

  return (
    <div>
      <Hero
        title="Careers"
        subtitle="Join Our Team of Innovators"
        description="Build your career with Sovran Group and help shape the future of construction, design, and architecture."
        backgroundImage="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600"
        height="h-96"
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-wider uppercase mb-6">
              Why Choose Sovran Group
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We believe our people are our greatest asset. Join a team where innovation meets excellence, and your career can flourish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-light tracking-wide uppercase mb-4">Collaborative Culture</h3>
              <p className="text-gray-600 leading-relaxed">
                Work alongside industry experts in a supportive environment that values creativity and innovation.
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-light tracking-wide uppercase mb-4">Growth Opportunities</h3>
              <p className="text-gray-600 leading-relaxed">
                Advance your career with continuous learning opportunities and leadership development programs.
              </p>
            </div>
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-light tracking-wide uppercase mb-4">Premium Projects</h3>
              <p className="text-gray-600 leading-relaxed">
                Work on high-profile projects that challenge your skills and showcase your talent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light tracking-wider uppercase mb-6">
              Open Positions
            </h2>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-6 py-2 text-sm font-medium tracking-wide uppercase transition-colors ${
                    selectedDepartment === dept
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {dept === 'all' ? 'All Departments' : dept}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-light tracking-wide uppercase mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Users size={16} className="mr-1" />
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 lg:mt-0 bg-black text-white px-8 py-3 font-medium tracking-wide uppercase hover:bg-gray-800 transition-colors">
                    Apply Now
                  </button>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-4">{job.description}</p>
                
                <div>
                  <h4 className="text-sm font-medium tracking-wide uppercase mb-2 text-gray-800">Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light tracking-wider uppercase mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-xl leading-relaxed mb-8 opacity-90">
            Don't see a position that matches your expertise? We're always looking for exceptional talent.
          </p>
          <button className="bg-white text-black px-8 py-4 font-medium tracking-wide uppercase hover:bg-gray-100 transition-colors">
            Send Us Your Resume
          </button>
        </div>
      </section>
    </div>
  );
};

export default Careers;