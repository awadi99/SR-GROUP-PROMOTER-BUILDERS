import React, { useState, useCallback } from "react"; 
import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import ResidenceModal from "./ResidenceModal";

export default function HeroSection({ project, onBack }) {
    const [selectedUnit, setSelectedUnit] = useState(null);

    const handleCloseModal = useCallback(() => {
        setSelectedUnit(null);
    }, []);

    return (
        <div className="flex flex-col gap-6">
            {/* HERO GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr] gap-4">
                <div className="relative rounded-[24px] md:rounded-[36px] overflow-hidden border border-[#DED8CF] bg-white transform-gpu">
                    <div className="relative h-[400px] sm:h-[500px] lg:h-[700px]">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                        <button 
                            onClick={onBack} 
                            className="absolute top-4 left-4 z-20 bg-white/85 backdrop-blur-md border border-white/40 rounded-full px-5 py-2.5 flex items-center gap-2 text-xs hover:bg-white active:scale-95 transition-all duration-300"
                        >
                            <ArrowLeft size={14} /> Back
                        </button>

                        <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full">
                            <p className="uppercase tracking-[0.22em] text-[10px] text-white/80 mb-2 font-medium">Luxury Residences</p>
                            <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-medium mb-4 leading-[1.1] tracking-[-0.03em]">{project.title}</h1>
                            <p className="max-w-xl text-white/80 text-sm sm:text-base font-light mb-6 line-clamp-2">{project.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {[project.location, project.status, project.possession].map((tag, i) => (
                                    <span key={i} className="bg-white/85 backdrop-blur-md rounded-full px-4 py-2 text-[11px] font-medium text-[#1E1E1E] flex items-center gap-1.5">
                                        {i === 0 && <MapPin size={12} className="text-[#A68966]" />}
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SPECS BAR */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#DED8CF] border-t border-[#DED8CF]">
                        {[
                            { label: 'Towers', val: project.specs.towers },
                            { label: 'Floors', val: project.specs.floors },
                            { label: 'Architect', val: project.specs.architect },
                            { label: 'RERA', val: project.rera }
                        ].map((spec, i) => (
                            <div key={i} className="bg-[#F8F5F0] p-4 text-center">
                                <p className="text-[10px] uppercase tracking-[0.18em] text-[#7A746B] mb-1 font-medium">{spec.label}</p>
                                <p className="text-sm font-medium text-[#1E1E1E] truncate">{spec.val}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
                <div className="bg-[#F8F5F0] rounded-[24px] border border-[#DED8CF] p-6">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#7A746B] mb-6 font-medium">Available Residences</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {project.units.map((unit, i) => (
                            <div key={i} className="group bg-white rounded-2xl overflow-hidden border border-[#E7E1D8] transition-all">
                                <div className="h-[200px] overflow-hidden">
                                    <motion.img 
                                        src={unit.image} 
                                        alt={unit.type} 
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                </div>
                                <div className="p-5">
                                    <h4 className="text-[#1E1E1E] font-medium text-lg">{unit.type}</h4>
                                    <p className="text-[#7A746B] text-xs mb-4">{unit.area}</p>
                                    
                                    <button 
                                        onClick={() => setSelectedUnit(unit)} 
                                        className="w-full py-2.5 border border-[#DED8CF] text-[#1E1E1E] text-xs uppercase tracking-[0.18em] rounded-full hover:bg-[#F8F5F0] transition-all"
                                    >
                                        View Floor Plan
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#F8F5F0] rounded-[24px] border border-[#DED8CF] p-6">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#7A746B] mb-4 font-medium">Cinematic Tour</p>
                    <div className="relative rounded-[22px] overflow-hidden aspect-video">
                        <video src={project.video} className="w-full h-full object-cover" controls poster={project.image} />
                    </div>
                </div>
            </div>

            <ResidenceModal 
                isOpen={!!selectedUnit} 
                onClose={handleCloseModal} 
                unit={selectedUnit} 
            />
        </div>
    );
}