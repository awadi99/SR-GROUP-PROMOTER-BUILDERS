import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default React.memo(function ArchitectureSection({ project }) {
    if (!project) return null;

    const vision = project.vision || {};
    const images = vision.images || [];
    const features = vision.features || [];
    const specs = project.specs || {};

    // Memoize the specs conversion
    const specEntries = useMemo(() => Object.entries(specs), [specs]);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4 sm:gap-6 mt-5">
            {/* MAIN VISION BLOCK */}
            <div className="bg-white rounded-[24px] md:rounded-[36px] border border-neutral-200 p-5 sm:p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="flex justify-between items-center mb-8">
                    <p className="uppercase text-[10px] tracking-[0.25em] text-[#A68966] font-semibold">
                        Architectural Vision
                    </p>
                </div>

                {/* GALLERY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="rounded-3xl overflow-hidden h-[250px] sm:h-[420px] bg-neutral-100">
                        <motion.img
                            src={images[0] || "/placeholder.jpg"}
                            alt="Primary Project View"
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
                        {[images[1], images[2]].map((img, idx) => (
                            <div key={`img-${idx}`} className="rounded-3xl overflow-hidden h-[150px] sm:h-[202px] bg-neutral-100">
                                <motion.img
                                    src={img || "/placeholder.jpg"}
                                    alt={`Project detail ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-neutral-600 text-sm md:text-base font-light leading-relaxed mb-10 max-w-3xl">
                    {vision.vision || "No description provided."}
                </p>

                {/* FEATURES */}
                {features.length > 0 && (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {features.map((item, i) => (
                            <div
                                key={`feature-${i}`}
                                className="group bg-[#FAF9F6] rounded-2xl border border-neutral-100 p-5 hover:border-[#A68966]/30 hover:bg-white transition-all duration-300"
                            >
                                <h3 className="text-[#2D2D2D] text-sm font-medium tracking-wide">{item}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ENHANCED SPECIFICATIONS SIDEBAR */}
            <div className="bg-white rounded-[40px] border border-neutral-200 p-10 md:p-12 h-full shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="mb-12 border-l-2 border-[#A68966] pl-6">
                    <p className="uppercase text-[13px] tracking-[0.3em] text-[#A68966] font-bold">
                        Project Specifications
                    </p>
                </div>

                <div className="space-y-4">
                    {specEntries.length > 0 ? (
                        specEntries.map(([key, value]) => (
                            <div
                                key={key} // Used the actual key for better React tracking
                                className="group flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-6 p-6 rounded-2xl bg-[#FAF9F6] border border-transparent hover:border-[#A68966]/20 hover:bg-white transition-all duration-300"
                            >
                                <span className="uppercase text-[10px] tracking-[0.2em] text-neutral-400 font-bold group-hover:text-[#A68966] transition-colors">
                                    {key}
                                </span>
                                <span className="text-[#2D2D2D] text-[16px] md:text-[18px] font-medium leading-tight">
                                    {value || "N/A"}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-neutral-400 text-sm italic">No specifications listed.</p>
                    )}
                </div>
            </div>
        </div>
    );
});