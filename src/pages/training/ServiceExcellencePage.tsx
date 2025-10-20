import React from 'react';
import TrainingServicePage from './TrainingServicePage';
import serviceExcellence from '../../components/services/variants/content/training/service-excellence';

const ServiceExcellencePage: React.FC = () => (
  <TrainingServicePage title="Service Excellence" subtitle="Deliver outstanding service experiences." overrideContent={serviceExcellence} />
);

export default ServiceExcellencePage;
