import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { usePublicProject } from "../hook/useProject"; // Ensure this matches your file path

// Isolated layout sub-components
import HeroSection from "../components/projectdetail/HeroSection";
import ArchitectureSection from "../components/projectdetail/ArchitectureSection";
import MapAndContactSection from "../components/projectdetail/MapAndContactSection";

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Use the corrected hook name
    const { data: project, isPending, isError, error } = usePublicProject(id);

    // Debugging: Monitor the state
    useEffect(() => {
        console.log("ProjectDetail State:", { id, project, isPending, isError, error });
    }, [id, project, isPending, isError, error]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [id]);

    // 1. Loading State
    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F1EA] px-4">
                <p className="text-[#1E1E1E] animate-pulse">Loading project details...</p>
            </div>
        );
    }

    // 2. Error / Not Found State
    if (isError || !project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F1EA] px-4">
                <h1 className="text-xl sm:text-2xl text-[#1E1E1E] font-medium text-center tracking-tight mb-4">
                    {error ? error.message : "Project Not Found"}
                </h1>
                <button 
                    onClick={() => navigate(-1)}
                    className="text-[#B08B57] underline hover:text-black transition-colors"
                >
                    Go Back
                </button>
            </div>
        );
    }

    // 3. Render Content (Only if project exists)
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-[#F5F1EA] min-h-screen text-[#1E1E1E] antialiased selection:bg-[#B08B57]/10"
        >
            <div className="w-full max-w-[1700px] mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
                
                <HeroSection 
                    project={project} 
                    onBack={() => navigate(-1)} 
                />

                <ArchitectureSection 
                    project={project} 
                />

                <MapAndContactSection 
                    project={project} 
                />

            </div>
        </motion.section>
    );
}