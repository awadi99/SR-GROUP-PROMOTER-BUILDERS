import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import projects from "../constants/ProjectData";

// Isolated layout sub-components
import HeroSection from "../components/projectdetail/HeroSection";
import ArchitectureSection from "../components/projectdetail/ArchitectureSection";
import MapAndContactSection from "../components/projectdetail/MapAndContactSection";

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find((p) => p.id === id);

    // Performance win: Force scrolling to window top during mount transitions
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F1EA] px-4">
                <h1 className="text-xl sm:text-2xl text-[#1E1E1E] font-medium text-center tracking-tight">
                    Project Not Found
                </h1>
            </div>
        );
    }

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-[#F5F1EA] min-h-screen text-[#1E1E1E] antialiased selection:bg-[#B08B57]/10"
        >
            <div className="w-full max-w-[1700px] mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">

                {/* Render Layers safely using containment pipelines */}
                <HeroSection project={project} onBack={() => navigate(-1)} />

                <ArchitectureSection project={project} />

                <MapAndContactSection project={project} />

            </div>
        </motion.section>
    );
}