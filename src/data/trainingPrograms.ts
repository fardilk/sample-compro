import type { VariantContent } from '../components/services/types';

import leadership from '../components/services/variants/content/training/leadership';
import sales from '../components/services/variants/content/training/sales';
import motivation from '../components/services/variants/content/training/motivation';
import serviceExcellence from '../components/services/variants/content/training/service-excellence';
import entrepreneurship from '../components/services/variants/content/training/entrepreneurship';
import publicSpeaking from '../components/services/variants/content/training/public-speaking';
import trainTheTrainer from '../components/services/variants/content/training/train-the-trainer';
import butler from '../components/services/variants/content/training/butler-training';

export interface TrainingProgram {
  slug: string;
  title: string;
  subtitle: string;
  content: VariantContent;
}

/** One entry per /services/training/* route, replacing the eight React pages. */
export const trainingPrograms: TrainingProgram[] = [
  { slug: 'leadership', title: 'Leadership', subtitle: 'Build high performing teams with half the work.', content: leadership },
  { slug: 'sales', title: 'Sales', subtitle: 'Win more deals with a repeatable, human sales process.', content: sales },
  { slug: 'motivation', title: 'Motivation', subtitle: 'Reignite drive and ownership across your teams.', content: motivation },
  { slug: 'service-excellence', title: 'Service Excellence', subtitle: 'Turn everyday service into a competitive advantage.', content: serviceExcellence },
  { slug: 'entrepreneurship', title: 'Entrepreneurship', subtitle: 'Build, validate, and grow ventures with discipline.', content: entrepreneurship },
  { slug: 'public-speaking', title: 'Public Speaking', subtitle: 'Speak with clarity, structure, and presence.', content: publicSpeaking },
  { slug: 'train-the-trainer', title: 'Train The Trainer', subtitle: 'Grow internal trainers who can carry the standard.', content: trainTheTrainer },
  { slug: 'butler-training', title: 'Butler Training', subtitle: 'Luxury service rituals, details, and cultural nuance.', content: butler },
];

export default trainingPrograms;
