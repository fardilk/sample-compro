import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header, Footer, FontAwesome } from '../components/global';
import { mainMenu } from '../utils/hoverMenu';

const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const findService = (categorySlug: string, idSlug: string) => {
  const servicesRoot = mainMenu.find((m) => m.label === 'Our Services');
  const cat = servicesRoot?.children?.find((c) => slugify(c.label) === categorySlug);
  const item = cat?.children?.find((i) => slugify(i.label) === idSlug) || cat; // fallback to category
  return { cat, item };
};

const ServiceDetailPage: React.FC = () => {
  const { category = '', id = '' } = useParams();
  const { cat, item } = findService(category, id);

  const title = item?.label ?? 'Service';
  const desc = item?.description ?? 'This is a sample description for the selected service. Content will be expanded with real case studies, outcomes, and curriculum.';

  return (
    <div className="service-detail-page">
      <FontAwesome />
      <Header />

      <section className="bg-slate-900 text-white pt-16 pb-10">
        <div className="mx-auto" style={{ width: '90%' }}>
          <p className="text-yellow-400 font-semibold tracking-wide mb-2">Excellence Plus Indonesia</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">{title}</h1>
          <p className="text-slate-200 max-w-3xl">{desc}</p>
          <div className="mt-4 text-sm">
            <Link to="/services" className="underline">Back to Services</Link>
            {cat && <span className="mx-2">/</span>}
            {cat && <Link to={`/services/${slugify(cat.label)}/${slugify(title)}`} className="underline">{cat.label}</Link>}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="mx-auto" style={{ width: '90%' }}>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-3">Overview</h2>
              <p className="text-slate-700 mb-6">{desc}</p>

              <h3 className="text-lg font-semibold mb-2">What you'll get</h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-1">
                <li>Practical frameworks and tools you can apply immediately</li>
                <li>Guidance from experienced practitioners and coaches</li>
                <li>Measurable outcomes aligned with your objectives</li>
              </ul>
            </div>
            <aside className="bg-gray-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Quick Actions</h4>
              <div className="space-y-2">
                <Link to="/services" className="block bg-blue-600 text-white text-center px-4 py-2 rounded-md">Get Started</Link>
                <a href="#contact" className="block border border-blue-600 text-blue-600 text-center px-4 py-2 rounded-md">Talk to Us</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
