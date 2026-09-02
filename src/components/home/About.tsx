import React from 'react';

const About: React.FC = () => {
  return (
    <section className="about-section" id="about">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Kenapa Excellence Plus</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Berdiri sejak 2017, kami bekerja dari lantai operasional, bukan dari ruang rapat.
            Materinya disusun ulang untuk tiap klien, dan hasilnya ditinjau setelah program selesai.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Praktisi, bukan pengajar teori</h3>
            <p className="text-gray-600">
              Dibawakan orang yang pernah memegang operasionalnya sendiri, dengan sertifikasi BNSP,
              CHA, dan CPHRM.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Disesuaikan, bukan paket jadi</h3>
            <p className="text-gray-600">
              Analisis kebutuhan dilakukan sebelum program, sehingga studi kasusnya memakai situasi
              nyata di tempat Anda.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Ditinjau setelah selesai</h3>
            <p className="text-gray-600">
              Program tidak berhenti di hari terakhir. Ada sesi tinjauan untuk memastikan
              perubahannya benar-benar jalan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
