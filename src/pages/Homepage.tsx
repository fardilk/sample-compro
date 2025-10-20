import React from 'react';
import { Header, Footer, FontAwesome } from '../components/global';
import { Banner, Stats, UpcomingEvent, About } from '../components/home';
import { H2, P } from '../utils/typography';
import ContactForm from '../components/ui/ContactForm';
import { mainMenu } from '../utils/hoverMenu';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/slugify';

const Homepage: React.FC = () => {
  return (
    <div className="homepage">
      <Header />
      

      <section className="hero-section">
        <Banner />
      </section>

      <section>
        <UpcomingEvent />
      </section>


      <section>
        <Stats />
      </section>
      <FontAwesome />

  <About />

      {/* Services Section */}
      <section className="services-section bg-gray-50" id="services">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <H2 className="mb-4">Our Services</H2>
            <P className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are experienced in Training, Coaching, Consulting & Recruitment Services and digital enablement services.
            </P>
          </div>
          {/* Render real service categories from menu */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(mainMenu.find(m => m.label === 'Our Services')?.children ?? []).map((cat) => {
              const catSlug = slugify(cat.label);
              const firstChild = (cat.children ?? [])[0];
              const firstChildSlug = firstChild ? slugify(firstChild.label) : undefined;
              return (
                <div key={cat.label} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="text-blue-600 mb-4">
                    <i className={`fa ${cat.icon ?? 'fa-briefcase'} text-3xl`} aria-hidden="true"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{cat.label}</h3>
                  <p className="text-gray-600">{(cat.description ?? '').slice(0, 120) || `Explore ${cat.label} offerings tailored to your goals.`}</p>
                  <div className="mt-4 flex gap-4">
                    {firstChildSlug && (
                      <Link to={`/services/${catSlug}/${firstChildSlug}`} className="text-blue-600 hover:underline">View Details</Link>
                    )}
                    <Link to={`/services#section-${catSlug}`} className="text-slate-700 hover:underline">Explore Category</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section (uses reusable form) */}
      <section className="contact-section bg-white" id="contact">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <H2 className="text-3xl md:text-4xl mb-4">Get In Touch</H2>
            <P className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ready to start your next project? Contact us today and let's discuss how we can help.
            </P>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
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
            <div className="bg-white rounded-lg shadow p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;
