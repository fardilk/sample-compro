import React from 'react';
import type { BannerProps } from '../types';

const Banner: React.FC<BannerProps> = ({ 
  title = "Excellence Plus Indonesia",
  subtitle = "Training, coaching, dan konsultansi untuk perusahaan yang ingin timnya bekerja lebih baik — bukan sekadar lebih sibuk. Dibawakan praktisi bersertifikasi BNSP, dengan studi kasus dari industri Anda sendiri.",
  className = '' 
}) => {
  return (
    <div
      className={`relative bg-cover bg-center ${className}`}
      style={{ backgroundImage: "url('/img/hero-image-excellenceplus.jpg')" }}
    >
      {/* translucent overlay to keep text readable */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-xs"></div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Welcome to <span className="text-yellow-600">{title}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-700">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/home/contact" className="bg-orange-main text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-dark transition-colors">
              Konsultasi Gratis
            </a>
            <a href="/services" className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Lihat Program
            </a>
          </div>
        </div>
        
  {/* stats moved to separate Stats component */}
      </div>
      
    </div>
  );
};

export default Banner;
