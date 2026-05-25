// src/pages/admin/AdminProjectDetail.jsx
import React, { lazy, Suspense } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import projects from "../constants/ProjectData";

const HeroSection = lazy(() => import('../components/allproject/HeroSection'));
const ArchitectureSection = lazy(() => import('../components/allproject/ArchitectureSection'));
const MapAndContactSection = lazy(() => import('../components/allproject/MapAndContactSection'));

export default function AdminProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const project = projects.find((p) => p.id === id);

    if (!project) {
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
            {/* Added container to keep content focused but not overly wide on huge screens */}
            <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-4 md:py-6">
                <Suspense fallback={
                    <div className="flex items-center justify-center h-[50vh] text-[#A68966]">
                        <span className="animate-pulse font-medium tracking-widest uppercase text-xs">Loading...</span>
                    </div>
                }>
                    {/* Compacted the spacing between sections */}
                    <div className="space-y-4 md:space-y-6">
                        <HeroSection 
                            project={project} 
                            onBack={() => navigate('/dashboard/all-projects')} 
                        />
                        <ArchitectureSection project={project} />
                        <MapAndContactSection project={project} />
                    </div>
                </Suspense>
            </div>
        </motion.div>
    );
}