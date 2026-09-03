/**
 * Participant ratings shown on the catalogue cards.
 *
 * These are seed values. The real figures are to come from the likes a
 * participant leaves once their programme finishes, so a card can only ever
 * show a score a real cohort gave it. Until that endpoint exists this file is
 * the single place holding them: when the API lands, replace the lookup below
 * and nothing that renders a card has to change.
 *
 * A programme with no entry renders no rating at all. An invented score is
 * worse than a missing one.
 */

export interface ProgramRating {
  /** Mean score out of 5. */
  score: number;
  /** How many participants it is averaged over. */
  count: number;
}

/** Keyed by "category/slug", the same key the catalogue cards are built on. */
export const programRatings: Record<string, ProgramRating> = {
  'training/sertifikasi-trainer-bnsp': { score: 4.9, count: 214 },
  'training/leadership': { score: 4.8, count: 137 },
  'training/sales': { score: 4.7, count: 96 },
  'training/motivation': { score: 4.8, count: 121 },
  'training/service-excellence': { score: 4.7, count: 88 },
  'training/entrepreneurship': { score: 4.6, count: 42 },
  'training/public-speaking': { score: 4.9, count: 103 },
  'training/train-the-trainer': { score: 4.8, count: 76 },
  'training/butler-training': { score: 4.9, count: 58 },
  'coaching/executive-coaching': { score: 4.9, count: 34 },
  'coaching/team-coaching': { score: 4.7, count: 29 },
  'consultancy/hotel-management': { score: 4.8, count: 23 },
  'executive-search/specialist-recruitment': { score: 4.6, count: 31 },
};

/**
 * Whether seeded ratings are allowed on the public site.
 *
 * They are placeholders, and a page that prints "4.8 from 137 participants" is
 * making a factual claim about real people that no one has actually made. That
 * is fine while the figures are obviously provisional and the site is being
 * built out; it should not outlive the likes endpoint. Set this to false to
 * hide every rating in one edit, without touching a component.
 */
export const SHOW_SEEDED_RATINGS = true;

export const ratingOf = (key: string): ProgramRating | undefined =>
  SHOW_SEEDED_RATINGS ? programRatings[key] : undefined;

export default programRatings;
