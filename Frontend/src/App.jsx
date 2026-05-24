import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SmoothScroll from './components/scroll/SmoothScroll';
import { ToastContainer, Flip } from 'react-toastify';
import LoadingLogoHero from './layouts/LoadingLogoHero'; 
import LoadingSpinner from './components/loading/LoadingSpinner';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgetPassword';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Lazy loading components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LuxuryLayout = lazy(() => import('./layouts/LuxuryLayout'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));


class NetworkErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-[#030303] flex flex-col items-center justify-center text-center z-[9999]">
          <p className="text-[#B08B57] uppercase tracking-widest text-xs mb-4">Connection Stuttered</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 text-[10px] uppercase border border-[#B08B57]/30 text-white rounded">
            Retry Connection
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem("intro_viewed"));

  return (
    <div className="antialiased selection:bg-[#B08B57] selection:text-black">
      
      {/* 1. Loader Layer */}
      <LoadingLogoHero 
        isActive={showIntro} 
        onComplete={() => setShowIntro(false)} 
      />

      {/* 2. Global SmoothScroll - Wrapped here so all routes/Navbar can access it */}
      <SmoothScroll>
        <ToastContainer 
          position="top-center" 
          autoClose={2000} 
          theme="dark" 
          transition={Flip} 
        />

        <div className={`transition-opacity duration-1000 ${showIntro ? "opacity-0" : "opacity-100"}`}>
          <NetworkErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/luxury" element={<LuxuryLayout />}>
                  <Route path="project/:id" element={<ProjectDetail />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </NetworkErrorBoundary>
        </div>
      </SmoothScroll>
    </div>
  );
}