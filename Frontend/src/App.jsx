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
import { useProject } from './hook/useProject';



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
const EditProjectPage = lazy(() => import('./components/editproject/EditProjectPage'));
const ProjectListing =lazy(()=> import('./pages/ProjectListing'));
const DeleteProjectPage = lazy(()=>import('./components/deleteproject/DeleteProjectPage'));
const Profile = lazy(()=> import('./pages/Profile'));
const GoogleAuthSuccess = lazy(() => import('./pages/GoogleAuthSuccess'));



export default function App() {
  const { myProjects} = useProject();
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem("intro_viewed"));

  return (
    <div className="antialiased selection:bg-[#B08B57] selection:text-black">
      {/* 1. Brand Loading Sequence */}
      <LoadingLogoHero
        isActive={showIntro}
        onComplete={() => setShowIntro(false)}
      />

      <SmoothScroll>

        {/* 2. Main Application Layer */}
        <div className={`transition-opacity duration-1000 ${showIntro ? "opacity-0" : "opacity-100"}`}>
          <NetworkErrorBoundary>
            {/* Suspense uses your custom LoadingSpinner during lazy route transitions */}
            <Suspense fallback={<LoadingSpinner />}>
            <ToastContainer position="top-center" autoClose={2000} theme="dark" transition={Flip} />
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
                <Route path='/auth/google/success' element={<GoogleAuthSuccess />} />

                <Route path="/dashboard" element={<MainLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="all-projects" element={<AdminProjectGrid />} />
                  <Route path="project/:id" element={<AdminProjectDetail />} />
                 

                  <Route path="create-project" element={<CreateProject />} />
                  <Route path='projects' element={<ProjectListing projects={myProjects} />} />
                  <Route path="edit-project/:id" element={<EditProjectPage />} />
                  <Route path="delete-projects" element={<DeleteProjectPage projects ={myProjects} />} />
                  <Route path="profile" element={<Profile/>}/>
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