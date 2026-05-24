import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";

export default function HeroSection({ project, onBack }) {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[1.7fr_0.8fr] gap-4 md:gap-6 mb-4 md:mb-6 [contain:layout_style]">

            {/* HERO LEFT */}
            <div className="relative rounded-[24px] sm:rounded-[28px] md:rounded-[36px] overflow-hidden border border-[#DED8CF] bg-white transform-gpu">
                <div className="relative h-[500px] sm:h-[650px] lg:h-[780px]">

                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                    {/* BACK BUTTON */}
                    <button
                        onClick={onBack}
                        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 bg-white/85 backdrop-blur-md border border-white/40 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2 text-xs sm:text-sm hover:bg-white active:scale-95 transition-all duration-300"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>

                    {/* CONTENT ACCENT */}
                    <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 lg:left-10 right-4 z-20">
                        <p className="uppercase tracking-[0.22em] text-[10px] sm:text-[11px] text-white/80 mb-3 sm:mb-5 font-medium">
                            Luxury Residences
                        </p>
                        <h1 className="text-[clamp(2.2rem,7vw,6rem)] leading-[0.92] tracking-[-0.05em] text-white font-medium mb-4 sm:mb-6">
                            {project.title}
                        </h1>
                        <p className="max-w-2xl text-white/80 leading-7 sm:leading-8 text-[13px] sm:text-[15px] mb-5 sm:mb-8 font-light">
                            {project.description}
                        </p>

                        {/* TAG MODULES */}
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            <div className="bg-white/85 backdrop-blur-md rounded-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2 text-xs sm:text-sm font-medium">
                                <MapPin size={14} className="text-[#A68966]" />
                                {project.location}
                            </div>
                            <div className="bg-white/85 backdrop-blur-md rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium">
                                {project.status}
                            </div>
                            <div className="bg-white/85 backdrop-blur-md rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium">
                                {project.possession}
                            </div>
                        </div>
                    </div>

                    {/* FLOATING SPECS BLOCK */}
                    <div className="hidden lg:block absolute bottom-0 right-0 p-6 z-20">
                        <div className="bg-white/90 backdrop-blur-xl rounded-[28px] border border-white/40 p-6 w-[360px] shadow-sm">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-[#7A746B] text-[10px] uppercase tracking-[0.18em] mb-2 font-medium">Towers</p>
                                    <h3 className="text-2xl font-medium text-[#1E1E1E]">{project.specs.towers}</h3>
                                </div>
                                <div>
                                    <p className="text-[#7A746B] text-[10px] uppercase tracking-[0.18em] mb-2 font-medium">Floors</p>
                                    <h3 className="text-2xl font-medium text-[#1E1E1E]">{project.specs.floors}</h3>
                                </div>
                                <div>
                                    <p className="text-[#7A746B] text-[10px] uppercase tracking-[0.18em] mb-2 font-medium">Architect</p>
                                    <h3 className="text-base font-medium text-[#1E1E1E] tracking-tight truncate">{project.specs.architect}</h3>
                                </div>
                                <div>
                                    <p className="text-[#7A746B] text-[10px] uppercase tracking-[0.18em] mb-2 font-medium">RERA</p>
                                    <h3 className="text-base font-medium text-[#1E1E1E] tracking-tight truncate">{project.rera}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* HERO RIGHT SIDEBAR */}
            <div className="space-y-4 md:space-y-6 xl:sticky xl:top-28 self-start">
                {/* RESIDENCE PACKS */}
                <div className="bg-[#F8F5F0] rounded-[24px] sm:rounded-[30px] border border-[#DED8CF] p-4 sm:p-5">
                    <div className="flex justify-between items-center mb-5">
                        <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.18em] text-[#7A746B] font-medium">Available Residences</p>
                        <span className="text-[#B08B57] text-xs sm:text-sm font-medium">Premium Living</span>
                    </div>

                    <div className="space-y-4 sm:space-y-5">
                        {project.units.map((unit, i) => (
                            <div key={i} className="bg-white rounded-[22px] overflow-hidden border border-[#E7E1D8] transform-gpu [contain:content]">
                                <div className="overflow-hidden h-[180px] sm:h-[220px]">
                                    <motion.img
                                        src={unit.image}
                                        alt={unit.type}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-4 sm:p-5">
                                    <div className="flex justify-between gap-4 mb-5">
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-medium text-[#1E1E1E] mb-1">{unit.type}</h3>
                                            <p className="text-[#7A746B] text-sm font-light">{unit.area}</p>
                                        </div>
                                        <div className="text-[#B08B57] text-sm font-medium whitespace-nowrap">{unit.price}</div>
                                    </div>
                                    <button className="w-full border border-[#DED8CF] bg-white rounded-full py-3 text-sm font-medium text-[#1E1E1E] hover:bg-[#FAF9F6] active:scale-[0.99] transition-all duration-300">
                                        View Floor Plan
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MEDIA PACK */}
                <div className="bg-[#F8F5F0] rounded-[24px] sm:rounded-[30px] border border-[#DED8CF] p-4 sm:p-5">
                    <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.18em] text-[#7A746B] mb-5 font-medium">Cinematic Tour</p>
                    <div className="relative rounded-[22px] overflow-hidden group transform-gpu">
                        <video
                            src={project.video}
                            className="w-full h-[220px] sm:h-[280px] object-cover"
                            controls
                            preload="none"
                            poster={project.image}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}