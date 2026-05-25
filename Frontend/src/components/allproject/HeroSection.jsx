import React, { useState, useCallback } from "react"; 
import { ArrowLeft, MapPin } from "lucide-react";
import ResidenceModal from "./ResidenceModal";

export default function HeroSection({ project, onBack }) {
    const [selectedUnit, setSelectedUnit] = useState(null);

    // Optimized: Wrapped in useCallback to maintain reference stability
    const handleCloseModal = useCallback(() => {
        setSelectedUnit(null);
    }, []);

    return (
        <div className="flex flex-col gap-6">
            {/* HERO GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr] gap-4">
                <div className="relative rounded-[24px] md:rounded-[36px] overflow-hidden border border-[#A68966]/20 bg-[#0A0A0A]">
                    <div className="relative h-[400px] sm:h-[500px] lg:h-[700px]">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

                        <button onClick={onBack} className="absolute top-4 left-4 z-20 bg-[#0A0A0A]/60 backdrop-blur-md border border-[#A68966]/30 text-white rounded-full px-5 py-2.5 flex items-center gap-2 text-xs hover:bg-[#A68966] hover:text-black transition-all">
                            <ArrowLeft size={14} /> Back
                        </button>

                        <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full">
                            <p className="uppercase tracking-[0.2em] text-[10px] text-[#A68966] mb-2 font-medium">Luxury Residences</p>
                            <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-medium mb-4 leading-[1.1]">{project.title}</h1>
                            <p className="max-w-xl text-gray-300 text-sm sm:text-base font-light mb-6 line-clamp-2">{project.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {[project.location, project.status, project.possession].map((tag, i) => (
                                    <span key={i} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-[11px] text-white flex items-center gap-1.5">
                                        {i === 0 && <MapPin size={12} className="text-[#A68966]" />}
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#A68966]/20 border-t border-[#A68966]/20">
                        {[
                            { label: 'Towers', val: project.specs.towers },
                            { label: 'Floors', val: project.specs.floors },
                            { label: 'Architect', val: project.specs.architect },
                            { label: 'RERA', val: project.rera }
                        ].map((spec, i) => (
                            <div key={i} className="bg-[#0A0A0A] p-4 text-center">
                                <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">{spec.label}</p>
                                <p className="text-sm font-medium text-white truncate">{spec.val}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
                <div className="bg-[#121212] rounded-[24px] border border-[#A68966]/20 p-6">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-6">Available Residences</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {project.units.map((unit, i) => (
                            <div key={i} className="group bg-[#0A0A0A] rounded-2xl overflow-hidden border border-[#A68966]/10 hover:border-[#A68966]/40 transition-all">
                                <div className="h-[200px] overflow-hidden">
                                    <img src={unit.image} alt={unit.type} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="p-5">
                                    <h4 className="text-white font-medium text-lg">{unit.type}</h4>
                                    <p className="text-gray-500 text-xs mb-4">{unit.area}</p>
                                    
                                    <button 
                                        onClick={() => setSelectedUnit(unit)} 
                                        className="w-full py-2.5 border border-[#A68966]/20 text-[#A68966] text-xs uppercase tracking-widest rounded-xl hover:bg-[#A68966] hover:text-black transition-colors"
                                    >
                                        View Floor Plan
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#121212] rounded-[24px] border border-[#A68966]/20 p-6">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">Cinematic Tour</p>
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-black">
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