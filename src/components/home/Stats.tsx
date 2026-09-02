import React from 'react';

const Stats: React.FC = () => {
  return (
    <section className="stats-section relative" id="stats">
      <div className="container mx-auto px-4 py-12">
        <div className="-mt-12 relative z-20">
          <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-xl p-6 md:p-8 ring-1 ring-slate-200">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Excellence Plus dalam Angka</h2>
            </div>

            <div className="mt-4 grid md:grid-cols-3 gap-6 text-center">
              {/* Only claims supported by the About page: the founding year, the
                  founder's own track record and his certifications. The previous
                  figures — 10,000 projects, 1,000 clients, 15 years for a company
                  founded in 2017 — could not be substantiated and contradicted
                  each other. Replace these with audited numbers when you have
                  them; an unverifiable boast costs more than a modest fact. */}
              <div className="bg-white rounded-lg p-6 transform transition hover:-translate-y-1 hover:shadow-md">
                <div className="text-4xl font-bold mb-2 text-gray-900">2017</div>
                <div className="text-lg text-gray-700">Berdiri dan terus mendampingi klien</div>
              </div>

              <div className="bg-white rounded-lg p-6 transform transition hover:-translate-y-1 hover:shadow-md">
                <div className="text-4xl font-bold mb-2 text-gray-900">20+</div>
                <div className="text-lg text-gray-700">Tahun pengalaman pendiri di hospitality &amp; SDM</div>
              </div>

              <div className="bg-white rounded-lg p-6 transform transition hover:-translate-y-1 hover:shadow-md">
                <div className="text-4xl font-bold mb-2 text-gray-900">BNSP</div>
                <div className="text-lg text-gray-700">Trainer tersertifikasi, plus CHA, CPHRM, dan ICF</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
