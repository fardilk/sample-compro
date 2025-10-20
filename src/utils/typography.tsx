import React from 'react';

// Utility to merge class names
const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

type PolyProps = {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
} & Record<string, unknown>;

function createText(defaultTag: React.ElementType, defaultClass: string) {
  const Comp: React.FC<PolyProps> = ({ as, className, children, ...rest }) => {
    const Tag = (as || defaultTag) as React.ElementType;
    return (
      <Tag className={cx(defaultClass, className)} {...(rest as object)}>
        {children}
      </Tag>
    );
  };
  return Comp;
}

// Headings
export const H1 = createText('h1', 'text-4xl md:text-5xl font-extrabold text-gray-900');
export const H2 = createText('h2', 'text-3xl md:text-4xl font-bold text-gray-900');
export const H3 = createText('h3', 'text-2xl md:text-3xl font-bold text-gray-900');
export const H4 = createText('h4', 'text-xl md:text-2xl font-semibold text-gray-900');
export const H5 = createText('h5', 'text-lg md:text-xl font-semibold text-gray-900');
export const H6 = createText('h6', 'text-base md:text-lg font-semibold text-gray-900');

// Paragraphs and small text
export const P = createText('p', 'text-base leading-relaxed text-slate-700');
export const Lead = createText('p', 'text-lg md:text-xl text-slate-700');
export const Small = createText('small', 'text-sm text-slate-600');

// Blockquote
export const Blockquote: React.FC<PolyProps> = ({ as, className, children, ...rest }) => {
  const Tag = (as || 'blockquote') as React.ElementType;
  return (
    <Tag className={cx('border-l-4 border-slate-300 pl-4 italic text-slate-700', className)} {...(rest as object)}>
      {children}
    </Tag>
  );
};

// Unordered and ordered lists
export const Ul: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({ className, children, ...rest }) => (
  <ul className={cx('list-disc pl-6 space-y-1 text-slate-700', className)} {...rest}>
    {children}
  </ul>
);

export const Ol: React.FC<React.HTMLAttributes<HTMLOListElement>> = ({ className, children, ...rest }) => (
  <ol className={cx('list-decimal pl-6 space-y-1 text-slate-700', className)} {...rest}>
    {children}
  </ol>
);

// Label
export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, children, ...rest }) => (
  <label className={cx('block text-sm font-medium text-gray-700', className)} {...rest}>
    {children}
  </label>
);

// Muted helper text
export const Muted = createText('p', 'text-sm text-slate-500');

// Code and pre
export const Code: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, children, ...rest }) => (
  <code className={cx('px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 text-sm', className)} {...rest}>
    {children}
  </code>
);

export const Pre: React.FC<React.HTMLAttributes<HTMLPreElement>> = ({ className, children, ...rest }) => (
  <pre className={cx('p-3 rounded bg-slate-900 text-slate-100 text-sm overflow-auto', className)} {...rest}>
    {children}
  </pre>
);

// Export as grouped object (optional convenience)
const Typography = { H1, H2, H3, H4, H5, H6, P, Lead, Small, Blockquote, Ul, Ol, Label, Muted, Code, Pre };
export default Typography;
