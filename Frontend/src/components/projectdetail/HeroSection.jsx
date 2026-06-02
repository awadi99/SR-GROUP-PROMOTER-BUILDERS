import React, { useState, useCallback, useMemo } from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import ResidenceModal from "./ResidenceModal";

export default React.memo(function HeroSection({ project, onBack }) {
    const [selectedUnit, setSelectedUnit] = useState(null);

    const handleCloseModal = useCallback(() => {
        setSelectedUnit(null);
    }, []);

    // Memoize URL parsing to save performance
    const embedUrl = useMemo(() => {
        const url = project?.residences?.commonVideoUrl;
        if (!url) return null;
        return url.split("/shorts/")[1]?.split("?")[0] || url.split("v=")[1]?.split("&")[0];
    }, [project?.residences?.commonVideoUrl]);

    // Safety guard: if project is missing, return null or a loader
    if (!project) return null;

    return (
        <div className="flex flex-col gap-6 text-[#2D2D2D]">
            {/* HERO GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr] gap-4">
                <div className="relative rounded-[24px] md:rounded-[36px] overflow-hidden border border-neutral-200 bg-white shadow-sm">
                    <div className="relative h-[400px] sm:h-[500px] lg:h-[700px]">
                        <img
                            src={project.vision?.images?.[0] || '/placeholder-hero.jpg'}
                            alt={project.identity?.title || "Project Hero"}
                            className="w-full h-full object-cover"
                        />
                        {/* Soft overlay to ensure white text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        <button
                            onClick={onBack}
                            className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-5 py-2.5 flex items-center gap-2 text-xs hover:bg-[#A68966] hover:border-[#A68966] transition-all"
                        >
                            <ArrowLeft size={14} /> Back
                        </button>

                        <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full">
                            <p className="uppercase tracking-[0.2em] text-[10px] text-[#C7A87D] mb-2 font-semibold">
                                {project.identity?.tagline || "Luxury Residence"}
                            </p>
                            <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-medium mb-4 leading-[1.1]">
                                {project.identity?.title || "Untitled Project"}
                            </h1>
                            <p className="max-w-xl text-white/80 text-sm sm:text-base font-light mb-6 line-clamp-2">
                                {project.identity?.description || ""}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                <span className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 text-[11px] text-white flex items-center gap-1.5">
                                    <MapPin size={12} className="text-[#A68966]" />
                                    {project.location?.city || "Baramati, Maharashtra"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200 border-t border-neutral-200">
                        {[
                            { label: 'Towers', val: project.specs?.towers },
                            { label: 'Floors', val: project.specs?.floors },
                            { label: 'Architect', val: project.specs?.architect },
                            { label: 'RERA', val: project.specs?.rera }
                        ].map((spec, i) => (
                            <div key={i} className="bg-white p-4 text-center">
                                <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-1">{spec.label}</p>
                                <p className="text-sm font-medium text-[#2D2D2D] truncate">{spec.val || 'N/A'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
                <div className="bg-white rounded-[24px] border border-neutral-200 p-6 shadow-sm">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-6">Available Residences</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {project.residences?.units?.map((unit, i) => (
                            <div key={i} className="group bg-[#FAF9F6] rounded-2xl overflow-hidden border border-neutral-100 hover:border-[#A68966]/30 transition-all">
                                <div className="h-[200px] overflow-hidden">
                                    <img src={unit.images?.[0] || "/placeholder.jpg"} alt={unit.type} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="p-5">
                                    <h4 className="text-[#2D2D2D] font-medium text-lg">{unit.type}</h4>
                                    <p className="text-neutral-500 text-xs mb-4">Area: {unit.area} sq.ft</p>
                                    <button
                                        onClick={() => setSelectedUnit(unit)}
                                        className="w-full py-2.5 border border-[#A68966]/30 text-[#A68966] text-xs uppercase tracking-widest rounded-xl hover:bg-[#A68966] hover:text-white transition-colors"
                                    >
                                        View Floor Plan
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[24px] border border-neutral-200 p-6 shadow-sm">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-4">
                        Cinematic Tour
                    </p>

                    <div className="relative rounded-xl overflow-hidden bg-neutral-100 h-[500px] w-full">
                        {embedUrl ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${embedUrl}`}
                                title="Project Video"
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-neutral-400 text-xs uppercase">
                                No Video Available
                            </div>
                        )}
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
});