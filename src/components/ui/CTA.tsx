import React from 'react';
import { Link } from 'react-router-dom';

type CTAStyle = 'primary' | 'secondary' | 'ghost';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string; // optional route if rendered as Link
  styleType?: CTAStyle;
}

const baseClasses = 'inline-flex items-center justify-center px-5 py-2.5 rounded-md font-semibold transition-colors duration-150';
const styleMap: Record<CTAStyle, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-50',
  ghost: 'text-blue-700 hover:bg-blue-50',
};

export const CTAButton: React.FC<CTAButtonProps> = ({ to, styleType = 'primary', className = '', children, ...rest }) => {
  const cls = `${baseClasses} ${styleMap[styleType]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
};

interface CTASectionProps {
  title: string;
  subtitle?: string;
  primaryTo?: string;
  primaryText?: string;
  secondaryTo?: string;
  secondaryText?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({ title, subtitle, primaryTo = '/services', primaryText = 'Get Started', secondaryTo = '/home/contact', secondaryText = 'Talk to Us' }) => {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="mx-auto text-center" style={{ width: '90%' }}>
        <h3 className="text-2xl md:text-3xl font-bold mb-2">{title}</h3>
        {subtitle && <p className="text-slate-700 mb-6">{subtitle}</p>}
        <div className="flex justify-center gap-3">
          <CTAButton to={primaryTo} styleType="primary">{primaryText}</CTAButton>
          <CTAButton to={secondaryTo} styleType="secondary">{secondaryText}</CTAButton>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
