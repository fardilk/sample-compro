import React from 'react';
import TrainingServicePage from './TrainingServicePage';
import publicSpeaking from '../../components/services/variants/content/training/public-speaking';

const PublicSpeakingPage: React.FC = () => (
  <TrainingServicePage title="Public Speaking" subtitle="Become a confident and impactful speaker." overrideContent={publicSpeaking} />
);

export default PublicSpeakingPage;
