import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import AboutPage from './AboutPage';
import TermsPage from './TermsPage';
import PrivacyPage from './PrivacyPage';
import WaitlistPage from './WaitlistPage';
import WaitlistSuccessPage from './WaitlistSuccessPage';

function App() {
  return (
    <Router>
      <div className="bg-[#121212] min-h-screen">
        <main id="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/waitlist" element={<WaitlistPage />} />
            <Route path="/waitlist-success" element={<WaitlistSuccessPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
