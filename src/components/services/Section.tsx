import React from 'react';

/**
 * The band every service section sits in.
 *
 * All seven sections used to repeat the same wrapper and each owned its own
 * padding and background, which is how the pages ended up with six white bands
 * in a row and headings floating 96px above their own content: a heading lived
 * in one `pt-12` band and its cards in the next `py-12` one. The title belongs
 * to the band that holds the content, and the background is decided from the
 * outside so a page can alternate instead of every section claiming white.
 */

export type Tone = 'white' | 'muted' | 'dark';

const TONES: Record<Tone, string> = {
  white: 'bg-white',
  muted: 'bg-slate-50',
  dark: 'bg-slate-900 text-white',
};

export type SectionProps = {
  /** Heading for the band. A band without one reads as unlabelled filler. */
  title?: string;
  subtitle?: string;
  tone?: Tone;
  /** Anchor target, so the page can be linked to section by section. */
  id?: string;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, subtitle, tone = 'white', id, children }) => (
  <section id={id} className={`${TONES[tone]} py-12 md:py-14`}>
    <div className="mx-auto" style={{ width: '90%' }}>
      {(title || subtitle) && (
        <div className="mb-6 max-w-3xl">
          {title && <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>}
          {subtitle && (
            <p className={`mt-2 ${tone === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  </section>
);

export default Section;
