import React from "react";

const Services = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#8806CE] justify-center items-center">
            Our Career Services
          </h2>
          <p className="text-gray-500 mt-4 justify-center items-center">
            Helping students discover, prepare, and succeed in their careers.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-3 gap-8 justify-center items-center">
          
          {/* Service 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-3">
              Career Readiness Assessment
            </h3>
            <p className="text-gray-600 mb-4">
              Evaluate your skills, strengths, and career interests with our
              AI-powered assessment test.
            </p>

            <button className="text-[#8806CE] font-semibold hover:underline hover:text-[#65049C] transition duration-300">
              Read More →
            </button>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-3">
              Skill Gap Analysis
            </h3>
            <p className="text-gray-600 mb-4">
              Identify missing skills and get personalized recommendations to
              improve your employability.
            </p>

            <button className="text-[#8806CE] font-semibold hover:underline hover:text-[#65049C] transition duration-300">
              Read More →
            </button>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-3">
              Career Roadmap Guidance
            </h3>
            <p className="text-gray-600 mb-4">
              Receive a structured learning path and career roadmap tailored
              to your goals.
            </p>

            <button className="text-[#8806CE] font-semibold hover:underline hover:text-[#65049C] transition duration-300">
              Read More →
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
