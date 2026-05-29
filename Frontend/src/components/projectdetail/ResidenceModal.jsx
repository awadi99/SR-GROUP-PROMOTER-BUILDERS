import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ResidenceModal({ isOpen, onClose, unit }) {
    // If no unit is passed, do not render
    const [mainImage, setMainImage] = useState(unit?.images?.[0] || "/placeholder-unit.jpg");

    // Sync state when the specific unit object changes
    useEffect(() => {
        if (unit?.images?.length > 0) {
            setMainImage(unit.images[0]);
        }
    }, [unit]);

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!unit) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Floor plan for ${unit.type || "Residence"}`}
                >
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/95 backdrop-blur-sm" 
                    />
                    
                    {/* Modal Card */}
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="relative w-full max-w-4xl max-h-[95vh] flex flex-col bg-[#121212] border border-[#A68966]/30 rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={onClose} 
                            aria-label="Close modal"
                            className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 p-2 text-white bg-black/20 rounded-full hover:bg-[#A68966]/20 transition-all"
                        >
                            <X size={24} />
                        </button>

                        {/* Scrollable content area */}
                        <div className="overflow-y-auto p-4 sm:p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                                
                                {/* GALLERY */}
                                <div className="space-y-3">
                                    <motion.img 
                                        key={mainImage}
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }}
                                        src={mainImage} 
                                        alt={unit.type || "Unit view"}
                                        className="w-full aspect-[4/3] sm:h-[350px] object-cover rounded-xl sm:rounded-2xl" 
                                    />
                                    <div className="grid grid-cols-4 gap-2">
                                        {unit.images?.map((img, idx) => (
                                            <button 
                                                key={idx} 
                                                onClick={() => setMainImage(img)}
                                                className="aspect-square overflow-hidden rounded-lg sm:rounded-xl"
                                            >
                                                <img 
                                                    src={img} 
                                                    alt={`View ${idx + 1}`}
                                                    className={`w-full h-full object-cover transition-all ${mainImage === img ? 'ring-2 ring-[#A68966]' : 'opacity-60 hover:opacity-100'}`} 
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* DETAILS */}
                                <div className="flex flex-col justify-start lg:justify-center">
                                    <h3 className="text-xl sm:text-3xl font-medium text-white mb-4 sm:mb-6">
                                        {unit.type || "Unit Details"}
                                    </h3>
                                    <div className="space-y-3 sm:space-y-6">
                                        <div className="flex justify-between border-b border-[#A68966]/10 pb-3">
                                            <span className="text-gray-400 text-xs sm:text-sm">Total Area</span>
                                            <span className="text-white font-medium text-sm sm:text-base">{unit.area || "N/A"}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-[#A68966]/10 pb-3">
                                            <span className="text-gray-400 text-xs sm:text-sm">Price</span>
                                            <span className="text-[#A68966] font-bold text-lg sm:text-xl">{unit.price || "Contact for Price"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}