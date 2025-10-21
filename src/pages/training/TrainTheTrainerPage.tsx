import React from 'react';
import TrainingServicePage from './TrainingServicePage';
import ttt from '../../components/services/variants/content/training/train-the-trainer';

const TrainTheTrainerPage: React.FC = () => (
  <TrainingServicePage title="Train The Trainer" subtitle="Equip yourself with training skills." overrideContent={ttt} />
);

export default TrainTheTrainerPage;
