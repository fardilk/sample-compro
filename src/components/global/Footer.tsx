import React from 'react';
import type { FooterProps } from '../types';
import Icon from './Icon';

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gray-800 text-white ${className}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <img src="/img/logo-excellence-plus-indonesia.png" alt="Excellence Plus Indonesia" className="h-auto w-[8rem]" />
            </div>
            <p className="text-gray-300 mb-4">
              Delivering excellence in every project. Your success is our commitment.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/6281292934488"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-gray-300 hover:text-white"
              >
                <Icon name="fa-comments" />
              </a>
              <a href="mailto:training@excellenceplus.id" aria-label="Email" className="text-gray-300 hover:text-white">
                <Icon name="fa-envelope" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/about-us" className="text-gray-300 hover:text-white">About</a></li>
              <li><a href="/services" className="text-gray-300 hover:text-white">Services</a></li>
              <li><a href="/home/contact" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="/services/training/leadership" className="text-gray-300 hover:text-white">Leadership Training</a></li>
              <li><a href="/services/consultancy/hotel-management" className="text-gray-300 hover:text-white">Business Consultancy</a></li>
              <li><a href="/services/coaching/executive-coaching" className="text-gray-300 hover:text-white">People Coaching</a></li>
              <li><a href="/services/employer-of-record/global-expansion" className="text-gray-300 hover:text-white">Employer of Record (EOR)</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Aldeoz Building,</li> 
              <li>Jl. Wr. Jati Barat No.39 6th Floor, </li>
              <li>Jati Padang, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12540</li>
                <li>
                <a
                  href="https://wa.me/6281292934488?text=Hello,%20Excellenceplus.id.%20I%27m%20interested%20your%20program%20in%20training%20and%20coaching.%20Would%20you%20like%20to%20tell%20me%20more%21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  Chat on WhatsApp: 0812 9293 4488
                </a>
                </li>
              <li>
                <a href="mailto:training@excellenceplus.id" className="text-gray-300 hover:text-white">
                  training@excellenceplus.id
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Excellence Plus Indonesia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
