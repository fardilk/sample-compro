import React from 'react';
import CTASection from '../ui/CTA';
import type { CTAContent } from './types';

const ContactCTA: React.FC<{ content?: CTAContent }> = ({ content }) => (
  <CTASection
    title={content?.title ?? 'Let’s move your business forward'}
    subtitle={content?.subtitle ?? 'Book a consultation or talk to our team today.'}
    primaryTo={content?.primaryTo ?? '/services'}
    primaryText={content?.primaryText ?? 'Get Started'}
    secondaryTo={content?.secondaryTo ?? '/home/contact'}
    secondaryText={content?.secondaryText ?? 'Talk to Us'}
  />
);

export default ContactCTA;
