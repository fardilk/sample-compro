import React from 'react';
import { CTAButton } from '../ui/CTA';

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageSrc?: string;
  primaryTo?: string;
  primaryText?: string;
  secondaryTo?: string;
  secondaryText?: string;
}

const Hero: React.FC<HeroProps> = ({ eyebrow, title, subtitle, imageSrc, primaryTo = '/services', primaryText = 'Get Started', secondaryTo = '/home/contact', secondaryText = 'Talk to Us' }) => {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white pt-16 pb-14">
      <div className="mx-auto grid md:grid-cols-2 gap-8 items-center" style={{ width: '90%' }}>
        <div>
          {eyebrow && <p className="text-yellow-400 font-semibold tracking-wide mb-2">{eyebrow}</p>}
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl text-slate-200 max-w-3xl mb-6">{subtitle}</p>}
          <div className="flex gap-3">
            <CTAButton to={primaryTo}>{primaryText}</CTAButton>
            <CTAButton to={secondaryTo} styleType="secondary">{secondaryText}</CTAButton>
          </div>
        </div>
        {imageSrc && (
          <div className="flex justify-center md:justify-end">
            <img src={imageSrc} alt="Hero" className="w-full max-w-md rounded-xl shadow-xl object-cover" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
