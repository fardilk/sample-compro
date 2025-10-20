import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  title?: string;
  subtitle?: string;
  containerClassName?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, className = '', containerClassName = '', children, ...rest }) => {
  return (
    <section id={id} className={`py-12 ${className}`} {...rest}>
      <div className={`mx-auto`} style={{ width: '90%' }}>
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>}
            {subtitle && <p className="text-slate-600 mt-2">{subtitle}</p>}
          </div>
        )}
        <div className={containerClassName}>{children}</div>
      </div>
    </section>
  );
};

export default Section;
