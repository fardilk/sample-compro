import React from 'react';
import TrainingServicePage from './TrainingServicePage';
import sales from '../../components/services/variants/content/training/sales';

const SalesPage: React.FC = () => (
  <TrainingServicePage title="Sales" subtitle="Master the art of selling and boost retention." overrideContent={sales} />
);

export default SalesPage;
