import React from 'react';
import type { BannerProps } from '../types';

const Banner: React.FC<BannerProps> = ({ 
  title = "Excellence Plus Indonesia",
  subtitle = "Transforming ideas into exceptional digital experiences. We deliver innovative solutions that drive your business forward.",
  className = '' 
}) => {
  return (
    <div className={`bg-gradient-to-r from-blue-600 to-purple-700 text-white ${className}`}>
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-yellow-300">{title}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white bg-opacity-10 rounded-lg p-6">
            <div className="text-4xl font-bold mb-2">100+</div>
            <div className="text-lg">Projects Completed</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-6">
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-lg">Happy Clients</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-6">
            <div className="text-4xl font-bold mb-2">5+</div>
            <div className="text-lg">Years Experience</div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="relative">
        <svg className="absolute bottom-0 w-full h-20" preserveAspectRatio="none" viewBox="0 0 1200 120">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
    </div>
  );
};

export default Banner;
