import React from 'react';
import Icon from '../global/Icon';

/**
 * The cover art for a programme that has no photograph.
 *
 * Drawn rather than sourced: nothing here is licensed from anyone, it costs no
 * request, and it cannot become a broken image. The colour scheme cycles by
 * position so two cards in a row can never come out identical - hashing the
 * key alone did exactly that, and a repeated pair reads as a bug. The sweep
 * and the arcs still come from the key, so the cycle does not look like one.
 *
 * A real photograph always wins — set hero_image in the CMS and the card uses
 * that instead. This is what a programme wears until someone shoots one.
 */

/** Brand palette from index.css, paired so text and glyphs stay legible on top. */
const SCHEMES: Array<[string, string]> = [
  ['#f87538', '#fbab74'],
  ['#1e293b', '#4b5563'],
  ['#d45c1c', '#f87538'],
  ['#334155', '#e2621f'],
  ['#e2621f', '#ffe0cd'],
];

/** Small, stable string hash. Only has to spread keys across five schemes. */
const hash = (value: string): number => {
  let h = 7;
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0;
  return h;
};

type Props = {
  /** "category/slug" — decides the sweep and the arcs, stable across builds. */
  seed: string;
  /** Position in its group, which is what keeps neighbours from matching. */
  index: number;
  /** Topic glyph, e.g. "fa-chart-line". */
  icon?: string;
};

const ProgramCover: React.FC<Props> = ({ seed, index, icon }) => {
  const key = hash(seed);
  const [from, to] = SCHEMES[index % SCHEMES.length];
  // Two of the four corners, so the sweep is not identical on every card.
  const angle = [135, 160, 200, 315][(key >> 3) % 4];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: '16 / 13', background: `linear-gradient(${angle}deg, ${from}, ${to})` }}
    >
      <svg
        viewBox="0 0 160 130"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <g fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1.5">
          <circle cx={key % 40} cy={116} r="34" />
          <circle cx={key % 40} cy={116} r="52" />
          <circle cx={142} cy={(key >> 5) % 30} r="26" />
        </g>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <Icon name={icon ?? 'fa-chalkboard-teacher'} size={52} color="#ffffff" />
      </div>
    </div>
  );
};

export default ProgramCover;
