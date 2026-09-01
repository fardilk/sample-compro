import React from 'react';

/** Phone, email and address block shown next to the contact form. */
const ContactInfo: React.FC<{ heading?: string }> = ({ heading = 'Contact Information' }) => (
  <div>
    <h3 className="text-2xl font-semibold mb-6">{heading}</h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>0821 1202 2999</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>edi.p@excellenceplus.id</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3">
                    <i className="fas fa-map-marker-alt" aria-hidden="true" />
                  </span>
                  <span>Jl. Wr. Jati Barat No.39 6th Floor, Jati Padang, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12540</span>
                </div>
              </div>
  </div>
);

export default ContactInfo;
