import React from "react";
import { motion } from "framer-motion";

export default function ArchitectureSection({ project }) {
    if (!project) return null;

    // Mapping vision data from your MongoDB structure
    const vision = project.vision || {};
    const images = vision.images || [];
    const features = vision.features || [];

    return (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4 sm:gap-6">

            {/* MAIN VISION BLOCK */}
            <div className="bg-[#121212] rounded-[24px] md:rounded-[36px] border border-[#A68966]/20 p-5 sm:p-8 md:p-10">
                <div className="flex justify-between items-center mb-8">
                    <p className="uppercase text-[10px] tracking-[0.25em] text-[#A68966] font-semibold">Architectural Vision</p>
                </div>

                {/* GALLERY - Using vision.images array */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="rounded-3xl overflow-hidden h-[250px] sm:h-[420px]">
                        <motion.img 
                            src={images[0] || '/placeholder.jpg'} 
                            className="w-full h-full object-cover" 
                            whileHover={{ scale: 1.03 }} 
                            transition={{ duration: 0.6 }} 
                        />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
                        <div className="rounded-3xl overflow-hidden h-[150px] sm:h-[202px]">
                            <motion.img 
                                src={images[1] || '/placeholder.jpg'} 
                                className="w-full h-full object-cover" 
                                whileHover={{ scale: 1.03 }} 
                                transition={{ duration: 0.6 }} 
                            />
                        </div>
                        <div className="rounded-3xl overflow-hidden h-[150px] sm:h-[202px]">
                            <motion.img 
                                src={images[2] || '/placeholder.jpg'} 
                                className="w-full h-full object-cover" 
                                whileHover={{ scale: 1.03 }} 
                                transition={{ duration: 0.6 }} 
                            />
                        </div>
                    </div>
                </div>

                <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-10 max-w-3xl">
                    {vision.vision || "No description provided."}
                </p>

                {/* FEATURES - Using vision.features array */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((item, i) => (
                        <div key={i} className="group bg-[#0A0A0A] rounded-2xl border border-[#A68966]/10 p-5 hover:border-[#A68966]/40 transition-colors">
                            <h3 className="text-white text-sm font-medium tracking-wide">{item}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* ENHANCED SPECIFICATIONS SIDEBAR */}
            <div className="bg-[#121212] rounded-[40px] border border-[#A68966]/20 p-10 md:p-12 h-full">
                <div className="mb-12 border-l-2 border-[#A68966] pl-6">
                    <p className="uppercase text-[13px] tracking-[0.3em] text-[#A68966] font-bold">
                        Project Specifications
                    </p>
                </div>

                <div className="space-y-4">
                    {project.specs && Object.entries(project.specs).map(([key, value], i) => (
                        <div
                            key={i}
                            className="group flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-6 p-6 rounded-2xl bg-[#0F0F0F] border border-transparent hover:border-[#A68966]/20 hover:bg-[#1A1A1A] transition-all duration-300"
                        >
                            <span className="uppercase text-[10px] tracking-[0.2em] text-gray-500 font-bold group-hover:text-[#A68966]/80 transition-colors">
                                {key}
                            </span>
                            <span className="text-white text-[16px] md:text-[18px] font-medium leading-tight">
                                {value || "N/A"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}