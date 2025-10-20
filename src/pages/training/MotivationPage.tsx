import React from 'react';
import TrainingServicePage from './TrainingServicePage';
import motivation from '../../components/services/variants/content/training/motivation';

const MotivationPage: React.FC = () => (
  <TrainingServicePage title="Motivation" subtitle="Techniques to boost personal and team motivation." overrideContent={motivation} />
);

export default MotivationPage;
