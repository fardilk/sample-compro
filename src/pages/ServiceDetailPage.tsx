import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header, Footer, FontAwesome } from '../components/global';
import { mainMenu } from '../utils/hoverMenu';
import Variant1 from '../components/services/variants/Variant1';
import Variant3 from '../components/services/variants/Variant3';
import Variant5 from '../components/services/variants/Variant5';
import Variant6 from '../components/services/variants/Variant6';
import Variant7 from '../components/services/variants/Variant7';
import Variant2 from '../components/services/variants/Variant2';
import Variant4 from '../components/services/variants/Variant4';
import Variant8 from '../components/services/variants/Variant8';
import Variant9 from '../components/services/variants/Variant9';
// Variant10 remains available if needed in future mappings
import type { VariantContent } from '../components/services/types';
// Training per-service content
import leadershipContent from '../components/services/variants/content/training/leadership';
import salesContent from '../components/services/variants/content/training/sales';
import motivationContent from '../components/services/variants/content/training/motivation';
import serviceExcellenceContent from '../components/services/variants/content/training/service-excellence';
import entrepreneurshipContent from '../components/services/variants/content/training/entrepreneurship';
import publicSpeakingContent from '../components/services/variants/content/training/public-speaking';
import tttContent from '../components/services/variants/content/training/train-the-trainer';
import butlerContent from '../components/services/variants/content/training/butler-training';

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
  // Choose a specific variant for each service/category using labels for robustness
  const getVariant = () => {
    const catLabel = (cat?.label || category).toLowerCase();
    const isLeaf = item && item !== cat;
    const leafLabel = isLeaf ? (item!.label.toLowerCase()) : undefined;

    // Category-level
    if (!isLeaf) {
      if (catLabel.includes('training')) return Variant1;
      if (catLabel.includes('consultancy')) return Variant3;
      if (catLabel.includes('coaching')) return Variant7;
      if (catLabel.includes('executive') && catLabel.includes('search')) return Variant8;
      if (catLabel.includes('employer of record')) return Variant2;
      return Variant1;
    }

    // Training leaves
    if (catLabel.includes('training')) {
      if (!leafLabel) return Variant1;
      if (leafLabel.includes('Build high performing teams with half the work.') || leafLabel.includes('sales') || leafLabel.includes('service excellence') || leafLabel.includes('butler')) return Variant1;
      if (leafLabel.includes('entrepreneurship') || leafLabel.includes('train the trainer')) return Variant3;
      if (leafLabel.includes('motivation') || leafLabel.includes('public speaking')) return Variant5;
      return Variant1;
    }

    // Consultancy leaves
    if (catLabel.includes('consultancy')) {
      if (!leafLabel) return Variant3;
      if (leafLabel.includes('hotel')) return Variant3;
      if (leafLabel.includes('hr system')) return Variant4;
      if (leafLabel.includes('restaurant') || leafLabel.includes('cafe')) return Variant5;
      if (leafLabel.includes('digital enablement')) return Variant6;
      if (leafLabel.includes('technology solutions')) return Variant9;
      return Variant3;
    }

    // Coaching leaves
    if (catLabel.includes('coaching')) {
      if (!leafLabel) return Variant7;
      if (leafLabel.includes('executive')) return Variant7;
      if (leafLabel.includes('team')) return Variant2;
      return Variant7;
    }

    // Executive Search & Recruitment leaves
    if (catLabel.includes('executive') && catLabel.includes('search')) {
      return Variant8;
    }

    // EOR leaves
    if (catLabel.includes('employer of record')) {
      if (!leafLabel) return Variant2;
      if (leafLabel.includes('global')) return Variant2;
      if (leafLabel.includes('entity')) return Variant4;
      return Variant2;
    }

    return Variant1;
  };
  const SelectedVariant = getVariant();

  // Provide override content for specific training pages
  let overrideContent: VariantContent | undefined;
  const catLabel = (cat?.label || category).toLowerCase();
  const leafLabel = item && item !== cat ? item!.label.toLowerCase() : undefined;
  if (catLabel.includes('training') && leafLabel) {
    if (leafLabel.includes('leadership')) overrideContent = leadershipContent;
    else if (leafLabel.includes('sales')) overrideContent = salesContent;
    else if (leafLabel.includes('motivation')) overrideContent = motivationContent;
    else if (leafLabel.includes('service excellence')) overrideContent = serviceExcellenceContent;
    else if (leafLabel.includes('entrepreneurship')) overrideContent = entrepreneurshipContent;
    else if (leafLabel.includes('public speaking')) overrideContent = publicSpeakingContent;
    else if (leafLabel.includes('train the trainer')) overrideContent = tttContent;
    else if (leafLabel.includes('butler')) overrideContent = butlerContent;
  }

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

      {/* Render the selected variant for this route */}
  <SelectedVariant title={title} subtitle={desc} overrideContent={overrideContent} />

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
