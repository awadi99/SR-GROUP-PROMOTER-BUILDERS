import React, { lazy, Suspense } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useProjectById } from "../hook/useProject.js";

const HeroSection = lazy(() => import('../components/allproject/HeroSection'));
const ArchitectureSection = lazy(() => import('../components/allproject/ArchitectureSection'));
const MapAndContactSection = lazy(() => import('../components/allproject/MapAndContactSection'));

export default function AdminProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch dynamic data from your API using the hook
    const { data: project, isLoading, error } = useProjectById(id);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-[#A68966]">
                Loading...
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-2xl font-medium mb-4 text-[#A68966]">Project Not Found</h2>
                <button 
                    onClick={() => navigate('/dashboard/all-projects')}
                    className="text-sm text-gray-400 hover:text-[#A68966] underline transition-colors"
                >
                    Return to All Projects
                </button>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="min-h-screen bg-[#0A0A0A] w-full"
        >
            <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-4 md:py-6">
                <Suspense fallback={
                    <div className="text-[#A68966] text-center p-10">Loading sections...</div>
                }>
                    <div className="space-y-4 md:space-y-6">
                        <HeroSection 
                            project={project} 
                            onBack={() => navigate(-1)} 
                        />
                        <ArchitectureSection project={project} />
                        <MapAndContactSection project={project} />
                    </div>
                </Suspense>
            </div>
        </motion.div>
    );
}