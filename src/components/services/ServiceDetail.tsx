import React from 'react';
import Variant1 from './variants/Variant1';
import Variant2 from './variants/Variant2';
import Variant3 from './variants/Variant3';
import Variant4 from './variants/Variant4';
import Variant5 from './variants/Variant5';
import Variant6 from './variants/Variant6';
import Variant7 from './variants/Variant7';
import Variant8 from './variants/Variant8';
import Variant9 from './variants/Variant9';

interface Props {
  categoryLabel: string;
  title: string;
  description: string;
}

/**
 * Layout picker for the non-training service categories. Lifted out of the old
 * ServiceDetailPage, which was never wired into the router and so shipped dead.
 */
const pickVariant = (categoryLabel: string, title: string) => {
  const cat = categoryLabel.toLowerCase();
  const leaf = title.toLowerCase();

  if (cat.includes('consultancy')) {
    if (leaf.includes('hotel')) return Variant3;
    if (leaf.includes('hr system')) return Variant4;
    if (leaf.includes('restaurant') || leaf.includes('caf')) return Variant5;
    if (leaf.includes('digital enablement')) return Variant6;
    if (leaf.includes('technology solutions')) return Variant9;
    return Variant3;
  }

  if (cat.includes('coaching')) {
    if (leaf.includes('team')) return Variant2;
    return Variant7;
  }

  if (cat.includes('executive') && cat.includes('search')) return Variant8;

  if (cat.includes('employer of record')) {
    if (leaf.includes('entity')) return Variant4;
    return Variant2;
  }

  return Variant1;
};

const ServiceDetail: React.FC<Props> = ({ categoryLabel, title, description }) => {
  const Selected = pickVariant(categoryLabel, title);
  return <Selected title={title} subtitle={description} />;
};

export default ServiceDetail;
