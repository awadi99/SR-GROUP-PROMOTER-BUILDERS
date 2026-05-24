import React from "react";
import { motion } from "framer-motion";

export default function ArchitectureSection({ project }) {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-4 md:gap-6 mb-4 md:mb-6 [contain:layout_style]">

            {/* VISION GALLERY BLOCK */}
            <div className="bg-[#F8F5F0] rounded-[24px] sm:rounded-[30px] md:rounded-[36px] border border-[#DED8CF] p-5 sm:p-6 md:p-8">
                <div className="flex justify-between items-center mb-8 sm:mb-10">
                    <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.18em] text-[#7A746B] font-medium">Architectural Vision</p>
                    <span className="text-[#B08B57] text-xs sm:text-sm font-medium">Curated Living</span>
                </div>

                {/* GALLERIES WITH ACCELERATED SCALE */}
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-4 mb-8 sm:mb-10">
                    <div className="rounded-[24px] overflow-hidden h-[300px] md:h-auto transform-gpu">
                        <motion.img
                            src={project.gallery[0]}
                            alt="Perspective Main"
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.015 }}
                            transition={{ duration: 0.6 }}
                            loading="lazy"
                        />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                        <div className="rounded-[24px] overflow-hidden h-[150px] sm:h-[200px] transform-gpu">
                            <motion.img
                                src={project.gallery[1]}
                                alt="Detail Cut One"
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.015 }}
                                transition={{ duration: 0.6 }}
                                loading="lazy"
                            />
                        </div>
                        <div className="rounded-[24px] overflow-hidden h-[150px] sm:h-[200px] transform-gpu">
                            <motion.img
                                src={project.gallery[2]}
                                alt="Detail Cut Two"
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.015 }}
                                transition={{ duration: 0.6 }}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>

                <p className="text-[#5E5A54] leading-8 sm:leading-9 text-[14px] sm:text-[16px] font-light">
                    {project.longDescription}
                </p>

                {/* AMENITIES / HIGHLIGHTS */}
                <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {project.highlights.map((item, i) => (
                        <div key={i} className="bg-white rounded-[22px] border border-[#E7E1D8] p-5 sm:p-6 transform-gpu">
                            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F5F1EA] flex items-center justify-center text-[#B08B57] mb-5 font-mono text-sm">
                                0{i + 1}
                            </div>
                            <h3 className="text-lg sm:text-xl font-medium text-[#1E1E1E] tracking-tight">{item}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* SPECIFICATIONS SHEET RIGHT SIDEBAR */}
            <div className="space-y-4 md:space-y-6">
                <div className="bg-[#F8F5F0] rounded-[24px] sm:rounded-[30px] border border-[#DED8CF] p-5 sm:p-6 md:p-8">
                    <div className="flex justify-between items-center mb-8 sm:mb-10">
                        <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.18em] text-[#7A746B] font-medium">Project Specifications</p>
                        <span className="text-[#B08B57] text-xs sm:text-sm font-medium">Overview</span>
                    </div>

                    <div className="space-y-5 sm:space-y-6">
                        {Object.entries(project.specs).map(([key, value], i) => (
                            <div key={i} className="flex justify-between gap-4 border-b border-[#E7E1D8] pb-4">
                                <span className="uppercase text-[10px] sm:text-[11px] tracking-[0.15em] text-[#7A746B] font-medium">{key}</span>
                                <span className="font-medium text-right text-sm sm:text-base text-[#1E1E1E]">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SIDEBAR MINI SYNOPSIS GALLERY */}
                <div className="bg-[#F8F5F0] rounded-[24px] sm:rounded-[30px] border border-[#DED8CF] p-4 sm:p-5">
                    <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.18em] text-[#7A746B] mb-5 font-medium">Selected Perspectives</p>
                    <div className="grid grid-cols-2 gap-3">
                        {project.gallery.map((img, i) => (
                            <div
                                key={i}
                                className={`overflow-hidden rounded-[18px] transform-gpu ${i === 0 ? "col-span-2 h-[220px]" : "h-[130px] sm:h-[150px]"
                                    }`}
                            >
                                <motion.img
                                    src={img}
                                    alt=""
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.015 }}
                                    transition={{ duration: 0.6 }}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}