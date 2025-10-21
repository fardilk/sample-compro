import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer, FontAwesome } from '../components/global';
import { mainMenu } from '../utils/hoverMenu';
import type { HoverMenuItem } from '../utils/hoverMenu';

const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const getServicesRoot = (): HoverMenuItem | undefined =>
  mainMenu.find((m) => m.label === 'Our Services');

const ServicesPage: React.FC = () => {
  const servicesRoot = getServicesRoot();
  const categories = servicesRoot?.children ?? [];

  const heroDesc = 'Training, Coaching, Consulting & Recruitment Services and Digital Enablement — technology-backed solutions for measurable impact and sustainable growth.';

  // Soft color palettes per index
  const colorSets = [
    { from: 'from-blue-100', to: 'to-blue-50', text: 'text-blue-600' },
    { from: 'from-green-100', to: 'to-green-50', text: 'text-green-600' },
    { from: 'from-purple-100', to: 'to-purple-50', text: 'text-purple-600' },
    { from: 'from-rose-100', to: 'to-rose-50', text: 'text-rose-600' },
    { from: 'from-amber-100', to: 'to-amber-50', text: 'text-amber-600' },
  ];

  return (
    <div className="services-page">
      <FontAwesome />
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white pt-16 pb-14">
        <div className="mx-auto" style={{ width: '90%' }}>
          <p className="text-yellow-400 font-semibold tracking-wide mb-2">Excellence Plus Indonesia</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">Innovative Solutions To Move Your Business Forward.</h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mb-6">{heroDesc}</p>
          <Link to="/services" className="inline-block bg-white text-slate-900 px-6 py-3 rounded-md font-semibold hover:bg-slate-100 transition-colors">Get Started</Link>
        </div>
      </section>

      {/* Catalog of Categories */}
      <section className="bg-white py-12">
        <div className="mx-auto" style={{ width: '90%' }}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold">Explore Our Services</h2>
            <span className="text-slate-500">Browse by category</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {categories.map((cat, idx) => {
              const palette = colorSets[idx % colorSets.length];
              const catSlug = slugify(cat.label);
              const firstChild = (cat.children ?? [])[0];
              const firstChildSlug = firstChild ? slugify(firstChild.label) : undefined;
              const description = (cat.description ?? `Discover ${cat.label} programs tailored to your goals—designed to elevate capabilities, accelerate outcomes, and deliver results.`).slice(0, 120);

              return (
                <div key={cat.label} className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col">
                  <div className={`w-14 h-14 rounded-md bg-gradient-to-r ${palette.from} ${palette.to} flex items-center justify-center mb-4`}>
                    <i className={`fa ${cat.icon ?? 'fa-briefcase'} ${palette.text} text-2xl`} aria-hidden="true"></i>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{cat.label}</h3>
                  <p className="text-slate-600 text-sm flex-1">{description}</p>
                  <div className="mt-4 flex gap-2">
                    {firstChildSlug ? (
                      <Link to={`/services/${catSlug}/${firstChildSlug}`} className="text-blue-600 hover:underline text-sm">View Details</Link>
                    ) : null}
                    <a href={`#section-${catSlug}`} className="text-slate-700 hover:underline text-sm">Explore Category</a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sections per Category */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto space-y-14" style={{ width: '90%' }}>
          {categories.map((cat, idx) => {
            const catSlug = slugify(cat.label);
            const palette = colorSets[idx % colorSets.length];
            const niceCopy = cat.description ?? `Experience ${cat.label} crafted to transform performance with practical frameworks, hands-on guidance, and outcomes you can measure.`;
            const children = cat.children ?? [];
            return (
              <div key={cat.label} id={`section-${catSlug}`} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-3">{cat.label}</h3>
                  <p className="text-slate-700 mb-5">{niceCopy}</p>
                  <div className="flex flex-wrap gap-2">
                    {children.map((child) => (
                      <Link key={child.label} to={`/services/${catSlug}/${slugify(child.label)}`} className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-sm">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="relative h-40 md:h-48">
                  <div className={`absolute left-6 top-3 w-24 h-24 rounded-md bg-gradient-to-r ${palette.from} ${palette.to}`}></div>
                  <div className="absolute left-16 top-10 w-28 h-28 rounded-md bg-orange-100"></div>
                  <div className="absolute left-0 top-12 w-20 h-20 rounded-md bg-purple-100"></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
