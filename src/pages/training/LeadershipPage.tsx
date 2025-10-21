import React from 'react';
import TrainingServicePage from './TrainingServicePage';
import leadership from '../../components/services/variants/content/training/leadership';

const LeadershipPage: React.FC = () => (
  <TrainingServicePage title="Leadership" subtitle="Build high performing teams with half the work." overrideContent={leadership} />
);

export default LeadershipPage;
