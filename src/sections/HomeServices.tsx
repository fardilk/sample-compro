import React from 'react';
import { H2, P } from '../utils/typography';
import { mainMenu } from '../utils/hoverMenu';
import { categorySlug, serviceHref } from '../utils/serviceLinks';

const HomeServices: React.FC = () => (
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
              const catSlug = categorySlug(cat.label);
              const firstChild = (cat.children ?? [])[0];
              const firstHref = firstChild ? serviceHref(cat.label, firstChild.label) : undefined;
              return (
                <div key={cat.label} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="text-blue-600 mb-4">
                    <i className={`fa ${cat.icon ?? 'fa-briefcase'} text-3xl`} aria-hidden="true"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{cat.label}</h3>
                  <p className="text-gray-600">{(cat.description ?? '').slice(0, 120) || `Explore ${cat.label} offerings tailored to your goals.`}</p>
                  <div className="mt-4 flex gap-4">
                    {firstHref && (
                      <a href={firstHref} className="text-blue-600 hover:underline">View Details</a>
                    )}
                    <a href={`/services#section-${catSlug}`} className="text-slate-700 hover:underline">Explore Category</a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
);

export default HomeServices;
