import React from 'react';
import type { MediaContent } from './types';

const Media: React.FC<MediaContent> = ({ eyebrow, title, text, imageSrc, imageAlt = '', imageSide = 'right', stats, shapeBehind, imageClip = 'rounded' }) => {
  const imageFirst = imageSide === 'left';
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto grid md:grid-cols-2 gap-8 items-center" style={{ width: '90%' }}>
        {imageFirst && (
          <div className="relative flex justify-center md:justify-start">
            {shapeBehind && (
              <div className="absolute -z-10 w-64 h-64 md:w-80 md:h-80 bg-yellow-200/60 rounded-[32px] rotate-6 top-4 left-0" aria-hidden="true" />
            )}
            <img
              src={imageSrc}
              alt={imageAlt}
              className={`w-full max-w-lg shadow object-cover ${imageClip === 'angled' ? '' : 'rounded-xl'}`}
              style={imageClip === 'angled' ? { clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0 100%)', borderRadius: 12 } : undefined}
            />
          </div>
        )}
        <div>
          {eyebrow && <p className="text-yellow-600 font-semibold tracking-wide mb-2">{eyebrow}</p>}
          {title && <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>}
          {text && <div className="prose prose-slate max-w-none">{text}</div>}
          {stats && stats.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-6 max-w-md">
              {stats.map((s, idx) => (
                <div key={idx} className="border-l pl-4">
                  <div className="text-3xl font-extrabold text-slate-900">{s.value}</div>
                  <div className="text-slate-600 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {!imageFirst && (
          <div className="relative flex justify-center md:justify-end">
            {shapeBehind && (
              <div className="absolute -z-10 w-64 h-64 md:w-80 md:h-80 bg-yellow-200/60 rounded-[32px] -rotate-6 top-4 right-0" aria-hidden="true" />
            )}
            <img
              src={imageSrc}
              alt={imageAlt}
              className={`w-full max-w-lg shadow object-cover ${imageClip === 'angled' ? '' : 'rounded-xl'}`}
              style={imageClip === 'angled' ? { clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0 100%)', borderRadius: 12 } : undefined}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Media;
