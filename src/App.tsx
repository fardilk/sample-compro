import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ServicesPage from './pages/ServicesPage';
import AboutUsPage from './pages/AboutUsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
// Training routes
import LeadershipPage from './pages/training/LeadershipPage';
import SalesPage from './pages/training/SalesPage';
import MotivationPage from './pages/training/MotivationPage';
import ServiceExcellencePage from './pages/training/ServiceExcellencePage';
import EntrepreneurshipPage from './pages/training/EntrepreneurshipPage';
import PublicSpeakingPage from './pages/training/PublicSpeakingPage';
import TrainTheTrainerPage from './pages/training/TrainTheTrainerPage';
import ButlerTrainingPage from './pages/training/ButlerTrainingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        {/* Training detail routes */}
        <Route path="/services/training/leadership" element={<LeadershipPage />} />
        <Route path="/services/training/sales" element={<SalesPage />} />
        <Route path="/services/training/motivation" element={<MotivationPage />} />
        <Route path="/services/training/service-excellence" element={<ServiceExcellencePage />} />
        <Route path="/services/training/entrepreneurship" element={<EntrepreneurshipPage />} />
        <Route path="/services/training/public-speaking" element={<PublicSpeakingPage />} />
        <Route path="/services/training/train-the-trainer" element={<TrainTheTrainerPage />} />
        <Route path="/services/training/butler-training" element={<ButlerTrainingPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/home/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
