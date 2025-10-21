import React from 'react';
import TrainingServicePage from './TrainingServicePage';
import entrepreneurship from '../../components/services/variants/content/training/entrepreneurship';

const EntrepreneurshipPage: React.FC = () => (
  <TrainingServicePage title="Entrepreneurship" subtitle="Kickstart your entrepreneurial journey." overrideContent={entrepreneurship} />
);

export default EntrepreneurshipPage;
