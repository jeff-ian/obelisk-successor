import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import AboutPage from './AboutPage';
import TermsPage from './TermsPage';
import PrivacyPage from './PrivacyPage';
import WaitlistPage from './WaitlistPage';
import WaitlistSuccessPage from './WaitlistSuccessPage';
import SignOutButton from './components/SignOutButton';

function App() {
  console.log('🔧 App rendering - development mode:', import.meta.env.DEV);
  
  return (
    <Router>
      <div className="bg-[#121212] min-h-screen">
        {/* Skip to main content for screen readers */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        {/* Development testing button - only show in development */}
        {import.meta.env.DEV && (
          <>
            <SignOutButton />
            <div className="fixed bottom-4 left-4 bg-blue-600 text-white text-xs py-1 px-2 rounded z-50">
              DEV MODE
            </div>
          </>
        )}
        
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
