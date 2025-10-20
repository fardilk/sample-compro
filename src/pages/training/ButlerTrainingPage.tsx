import React from 'react';
import TrainingServicePage from './TrainingServicePage';
import butler from '../../components/services/variants/content/training/butler-training';

const ButlerTrainingPage: React.FC = () => (
  <TrainingServicePage title="Butler Training" subtitle="Learn the art of butler service." overrideContent={butler} />
);

export default ButlerTrainingPage;
