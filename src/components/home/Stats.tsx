import React from 'react';

const Stats: React.FC = () => {
  return (
    <section className="stats-section relative" id="stats">
      <div className="container mx-auto px-4 py-12">
        <div className="-mt-12 relative z-20">
          <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-xl p-6 md:p-8 ring-1 ring-slate-200">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Our Achievement in Stats!</h2>
            </div>

            <div className="mt-4 grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white rounded-lg p-6 transform transition hover:-translate-y-1 hover:shadow-md">
                <div className="text-4xl font-bold mb-2 text-gray-900">100+</div>
                <div className="text-lg text-gray-700">Projects Completed</div>
              </div>

              <div className="bg-white rounded-lg p-6 transform transition hover:-translate-y-1 hover:shadow-md">
                <div className="text-4xl font-bold mb-2 text-gray-900">50+</div>
                <div className="text-lg text-gray-700">Happy Clients</div>
              </div>

              <div className="bg-white rounded-lg p-6 transform transition hover:-translate-y-1 hover:shadow-md">
                <div className="text-4xl font-bold mb-2 text-gray-900">5+</div>
                <div className="text-lg text-gray-700">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
