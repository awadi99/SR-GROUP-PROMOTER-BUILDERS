import React, { lazy, Suspense, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts & Components
import LoadingLogoHero from './layouts/LoadingLogoHero';
import LoadingSpinner from './components/loading/LoadingSpinner';
import SmoothScroll from './components/scroll/SmoothScroll';
import NetworkErrorBoundary from './error/NetworkErrorBoundary';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';


// Lazy loading pages (Production-grade code splitting)
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LuxuryLayout = lazy(() => import('./layouts/LuxuryLayout'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminProjectDetail = lazy(() => import('./pages/AdminProjectDetail'));
const AdminProjectGrid = lazy(() => import('./components/allproject/AdminProjectGrid'));
const CreateProject = lazy(() => import('./pages/CreateProject'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgetPassword'));
const ProjectMediaLayout = lazy(() => import('./components/media/ProjectMediaLayout'));
const ProjectGallery = lazy(()=>import('./components/media/ProjectGallery'));
const ProjectVideos=lazy(()=>import('./components/media/ProjectVideos'));
const LocationMaps =lazy(()=>import('./components/media/LocationMaps'));


export default function App() {
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem("intro_viewed"));

  return (
    <div className="antialiased selection:bg-[#B08B57] selection:text-black">
      {/* 1. Brand Loading Sequence */}
      <LoadingLogoHero
        isActive={showIntro}
        onComplete={() => setShowIntro(false)}
      />

      <SmoothScroll>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          theme="dark"
          transition={Flip}
        />

        {/* 2. Main Application Layer */}
        <div className={`transition-opacity duration-1000 ${showIntro ? "opacity-0" : "opacity-100"}`}>
          <NetworkErrorBoundary>
            {/* Suspense uses your custom LoadingSpinner during lazy route transitions */}
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

                <Route path="/dashboard" element={<MainLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="all-projects" element={<AdminProjectGrid />} />
                  <Route path="project/:id" element={<AdminProjectDetail />} />
                  <Route path="project/:id/media" element={<ProjectMediaLayout />} />
                  <Route path="project/gallery" element={<ProjectGallery />} />
                  <Route path="project/videos" element={<ProjectVideos />} />
                  <Route path="project/location" element={<LocationMaps />} />
                  <Route path="create-project" element={<CreateProject />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
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