import React from 'react';
import VariantRenderer from '../VariantRenderer';
import content from './content/variant10';
import type { VariantContent } from '../types';

const Variant10: React.FC<{ title: string; subtitle?: string; overrideContent?: VariantContent; }> = ({ title, subtitle, overrideContent }) => (
  <VariantRenderer content={overrideContent ?? content} title={title} subtitle={subtitle} />
);

export default Variant10;
