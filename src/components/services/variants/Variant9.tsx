import React from 'react';
import VariantRenderer from '../VariantRenderer';
import content from './content/variant9';

const Variant9: React.FC<{ title: string; subtitle?: string; }> = ({ title, subtitle }) => (
  <VariantRenderer content={content} title={title} subtitle={subtitle} />
);

export default Variant9;
