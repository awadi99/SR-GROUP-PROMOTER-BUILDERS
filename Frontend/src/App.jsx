import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SmoothScroll from './components/scroll/SmoothScroll';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy load components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LuxuryLayout = lazy(() => import('./layouts/LuxuryLayout'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const LoadingSpinner = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-[#030303]">
    <div className="w-8 h-8 border border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <div className="antialiased selection:bg-luxury-gold selection:text-black">
      <SmoothScroll>
        <ToastContainer 
          position="top-center" 
          autoClose={2000} 
          theme="dark" 
          transition={Flip} 
        />

        <div className="min-h-screen bg-[#030303] text-white">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Landing Page */}
              <Route path='/' element={<LandingPage />} />

              {/* Luxury Layout for sub-pages */}
              <Route path="/luxury" element={<LuxuryLayout />}>
                <Route path="project/:id" element={<ProjectDetail />} />
              </Route>

              {/* Single Catch-all for invalid URLs */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </SmoothScroll>
    </div>
  );
}