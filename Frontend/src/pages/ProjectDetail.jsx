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

    // Force instant scroll to top on layout mount/ID change to avoid viewport jumping
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F1EA] px-4">
                <h1 className="text-lg sm:text-2xl text-[#1E1E1E] font-medium text-center tracking-tight antialiased">
                    Project Not Found
                </h1>
            </div>
        );
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }} // Snappier cubic-bezier for premium feel
            className="bg-[#F5F1EA] min-h-screen text-[#1E1E1E] antialiased selection:bg-[#B08B57]/10 overflow-x-hidden"
        >
            {/* Optimized Fluid Container:
              - Drastically reduced mobile padding (px-2 py-2) to maximize screen real estate.
              - Tightened vertical layout gaps (space-y-4 shifting to space-y-8+ on desktop).
            */}
            <div className="w-full max-w-[1700px] mx-auto px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-3 sm:py-4 md:py-6 flex flex-col space-y-4 sm:space-y-6 md:space-y-10">

                {/* Layer 1: Hero view (Pass down compact parameters if managed by parent) */}
                <HeroSection project={project} onBack={() => navigate(-1)} />

                {/* Layer 2: Architecture & Blueprints */}
                <ArchitectureSection project={project} />

                {/* Layer 3: Location & Interactivity */}
                <MapAndContactSection project={project} />

            </div>
        </motion.section>
    );
}