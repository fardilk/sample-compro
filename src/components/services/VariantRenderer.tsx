import React from 'react';
import Hero from './Hero';
import Metrics from './Metrics';
import Features from './Features';
import Process from './Process';
import CaseStudies from './CaseStudies';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Pricing from './Pricing';
import Clients from './Clients';
import ContactCTA from './ContactCTA';
import Media from './Media';
import CardGrid from './CardGrid';
import IconList from './IconList';
import Timeline from './Timeline';
import Tabs from './Tabs';
import Accordion from './Accordion';
import StatsGrid from './StatsGrid';
import Gallery from './Gallery';
import TestimonialsCarousel from './TestimonialsCarousel';
import type { VariantContent } from './types';

interface Props {
  content: VariantContent;
  title: string;
  subtitle?: string;
}

// Renders all known sections if present, in a consistent order.
const VariantRenderer: React.FC<Props> = ({ content, title, subtitle }) => {
  return (
    <>
      {/* Hero overrides eyebrow/image/buttons, but keeps route-driven title/subtitle */}
      <Hero
        eyebrow={content.hero?.eyebrow}
        imageSrc={content.hero?.imageSrc}
        primaryTo={content.hero?.primaryTo}
        primaryText={content.hero?.primaryText}
        secondaryTo={content.hero?.secondaryTo}
        secondaryText={content.hero?.secondaryText}
        title={title}
        subtitle={subtitle}
      />

      {content.metrics && <Metrics items={content.metrics.items} />}
      {content.features && <Features items={content.features.items} columns={content.features.columns} />}
      {content.process && <Process steps={content.process.steps} />}
      {content.caseStudies && <CaseStudies items={content.caseStudies.items} />}
      {content.testimonials && <Testimonials items={content.testimonials.items} />}
      {content.faq && <FAQ items={content.faq.items} />}
      {content.pricing && <Pricing plans={content.pricing.plans} />}
      {content.clients && <Clients items={content.clients.items} />}

      {content.medias?.map((m, i) => <Media key={`media-${i}`} {...m} />)}
      {content.cardGrids?.map((cg, i) => <CardGrid key={`cardgrid-${i}`} {...cg} />)}
      {content.iconLists?.map((il, i) => <IconList key={`iconlist-${i}`} {...il} />)}
      {content.timeline && <Timeline {...content.timeline} />}

  {content.tabs && <Tabs {...content.tabs} />}
  {content.accordion && <Accordion {...content.accordion} />}
  {content.statsGrid && <StatsGrid {...content.statsGrid} />}
  {content.gallery && <Gallery {...content.gallery} />}
  {content.testimonialsCarousel && <TestimonialsCarousel items={content.testimonialsCarousel.items} />}

      <ContactCTA content={content.contactCta} />
    </>
  );
};

export default VariantRenderer;
