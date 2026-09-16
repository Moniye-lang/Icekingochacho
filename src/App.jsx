import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useScrollReveal } from './hooks/useAnimations';
import { DataProvider } from './context/DataContext';
import Header from './components/Header';
import MobileTabBar from './components/MobileTabBar';
import Footer from './components/Footer';
import ArticleModal from './components/ArticleModal';
import IceDrop from './components/IceDrop';

import HomePage from './pages/HomePage';
import MusicPage from './pages/MusicPage';
import AboutPage from './pages/AboutPage';
import TourPage from './pages/TourPage';
import MerchPage from './pages/MerchPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showIceDrop, setShowIceDrop] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Activate scroll-reveal observer
  useScrollReveal([location.pathname, contentVisible]);

  const handleIceDone = useCallback(() => {
    setShowIceDrop(false);
    setContentVisible(true);
  }, []);

  return (
    <DataProvider>
      {/* Ice Drop intro — only shows once per visit */}
      {showIceDrop && <IceDrop onDone={handleIceDone} />}

      {/* Far-edge Frost Framing */}
      <div className="ice-screen-frame" aria-hidden="true">
        <div className="ice-border-top" />
        <div className="ice-border-bottom" />
        <div className="ice-border-left" />
        <div className="ice-border-right" />
      </div>

      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Main site content fades in after ice drop */}
      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        {/* Header */}
        <Header />

        {/* Main Content & Routes */}
        <main id="main-content" role="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/tour" element={<TourPage />} />
            <Route path="/merch" element={<MerchPage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* Fallback to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Site Footer */}
        <Footer />

        {/* Mobile Bottom Tab Bar */}
        <MobileTabBar />

        {/* Article Modal */}
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      </div>
    </DataProvider>
  );
}
