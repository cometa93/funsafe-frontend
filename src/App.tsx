import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { DocsPage } from './pages/DocsPage';
import { NewsPage } from './pages/NewsPage';
import { InvestorsPage } from './pages/InvestorsPage';
import { PublicDemoPage } from './pages/PublicDemoPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard/*" element={<DashboardPage />} />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/investors" element={<InvestorsPage />} />
      <Route path="/demo" element={<PublicDemoPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
