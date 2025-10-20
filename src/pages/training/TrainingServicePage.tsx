import React from 'react';
import Variant1 from '../../components/services/variants/Variant1';
import Variant3 from '../../components/services/variants/Variant3';
import Variant5 from '../../components/services/variants/Variant5';
import type { VariantContent } from '../../components/services/types';
import CardGrid from '../../components/services/CardGrid';
import { mainMenu } from '../../utils/hoverMenu';
import { Header, Footer, FontAwesome } from '../../components/global';

const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

interface Props {
  title: string;
  subtitle?: string;
  overrideContent?: VariantContent;
}

const pickTrainingVariant = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes('entrepreneurship') || l.includes('train the trainer')) return Variant3;
  if (l.includes('motivation') || l.includes('public speaking')) return Variant5;
  return Variant1; // leadership, sales, service excellence, butler, default
};

const TrainingServicePage: React.FC<Props> = ({ title, subtitle, overrideContent }) => {
  // Render the selected variant with override content
  const Selected = pickTrainingVariant(title);

  // Build dynamic "More in Training" grid (exclude current service)
  const servicesRoot = mainMenu.find((m) => m.label === 'Our Services');
  const trainingCat = servicesRoot?.children?.find((c) => c.label.toLowerCase().includes('training'));
  const trainingCards = (trainingCat?.children ?? [])
    .filter((i) => i.label.toLowerCase() !== title.toLowerCase())
    .map((i) => ({
      title: i.label,
      text: i.description ?? '',
      icon: i.icon,
      to: `/services/${slugify(trainingCat!.label)}/${slugify(i.label)}`,
      linkText: 'View program'
    }));

  // Build dynamic "Explore other categories"
  const otherCats = (servicesRoot?.children ?? []).filter((c) => !c.label.toLowerCase().includes('training') && (
    c.label.toLowerCase().includes('consultancy') || c.label.toLowerCase().includes('coaching')
  ));
  const otherCatCards = otherCats.map((c) => ({
    title: c.label,
    text: c.description ?? 'Explore more services.',
    icon: c.icon,
    to: `/services`,
    linkText: 'Explore'
  }));

  return (
    <div>
      <FontAwesome />
      <Header />
      <Selected title={title} subtitle={subtitle} overrideContent={overrideContent} />

      {trainingCards.length > 0 && (
        <CardGrid
          title="More in Training"
          subtitle="Related programs you might find useful."
          columns={3}
          items={trainingCards}
        />
      )}

      {otherCatCards.length > 0 && (
        <CardGrid
          title="Explore Other Categories"
          subtitle="Broaden your capabilities with our other services."
          columns={2}
          items={otherCatCards}
        />
      )}
      <Footer />
    </div>
  );
};

export default TrainingServicePage;
