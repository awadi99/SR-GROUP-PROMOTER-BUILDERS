import React from "react";
import { motion } from "framer-motion";

export default function ArchitectureSection({ project }) {
    return (
        <div className="p-5 grid grid-cols-1 xl:grid-cols-[1fr_minmax(350px,400px)] gap-6 lg:gap-8">
            {/* MAIN VISION BLOCK */}
            <div className="bg-[#F8F5F0] rounded-[24px] md:rounded-[36px] border border-[#DED8CF] p-5 sm:p-8 lg:p-10">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <p className="uppercase text-[10px] tracking-[0.25em] text-[#7A746B] font-semibold">
                        Architectural Vision
                    </p>
                    <span className="text-[#B08B57] text-xs sm:text-sm font-medium">Curated Living</span>
                </div>

                {/* GALLERY - Optimized for mobile/tablet/desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="rounded-[24px] overflow-hidden h-[300px] sm:h-[420px] w-full">
                        <motion.img 
                            src={project.gallery[0]} 
                            className="w-full h-full object-cover" 
                            whileHover={{ scale: 1.03 }} 
                            transition={{ duration: 0.6 }} 
                        />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                        <div className="rounded-[24px] overflow-hidden h-[150px] sm:h-[202px] w-full">
                            <motion.img 
                                src={project.gallery[1]} 
                                className="w-full h-full object-cover" 
                                whileHover={{ scale: 1.03 }} 
                                transition={{ duration: 0.6 }} 
                            />
                        </div>
                        <div className="rounded-[24px] overflow-hidden h-[150px] sm:h-[202px] w-full">
                            <motion.img 
                                src={project.gallery[2]} 
                                className="w-full h-full object-cover" 
                                whileHover={{ scale: 1.03 }} 
                                transition={{ duration: 0.6 }} 
                            />
                        </div>
                    </div>
                </div>

                <p className="text-[#5E5A54] text-sm md:text-base font-light leading-relaxed mb-10 max-w-3xl">
                    {project.longDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.highlights.map((item, i) => (
                        <div key={i} className="group bg-white rounded-2xl border border-[#E7E1D8] p-5 hover:border-[#B08B57]/30 transition-colors">
                            <h3 className="text-[#1E1E1E] text-sm font-medium tracking-wide">{item}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* SPECIFICATIONS SIDEBAR */}
            <div className="bg-[#F8F5F0] rounded-[30px] md:rounded-[40px] border border-[#DED8CF] p-6 sm:p-8 lg:p-10 h-fit xl:sticky xl:top-6">
                <div className="mb-8 border-l-2 border-[#B08B57] pl-6">
                    <p className="uppercase text-[11px] lg:text-[13px] tracking-[0.2em] lg:tracking-[0.3em] text-[#B08B57] font-bold">
                        Specifications
                    </p>
                </div>

                <div className="space-y-3">
                    {Object.entries(project.specs).map(([key, value], i) => (
                        <div
                            key={i}
                            className="group flex flex-row justify-between items-center gap-4 p-4 lg:p-6 rounded-2xl bg-white border border-[#E7E1D8] hover:border-[#B08B57]/20 transition-all duration-300"
                        >
                            <span className="uppercase text-[9px] lg:text-[10px] tracking-[0.15em] text-[#7A746B] font-bold truncate max-w-[40%]">
                                {key}
                            </span>
                            <span className="text-[#1E1E1E] text-sm lg:text-[18px] font-medium text-right break-words max-w-[60%]">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}