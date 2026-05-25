import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ResidenceModal({ isOpen, onClose, unit }) {
    // Keep track of which image is currently selected
    const [mainImage, setMainImage] = useState(unit?.images[0]);

    // Reset image when unit changes to prevent stale state
    useEffect(() => {
        if (unit) setMainImage(unit.images[0]);
    }, [unit]);

    if (!unit) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
                    {/* Backdrop - adjusted opacity for white theme */}
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-white/95 backdrop-blur-sm" 
                    />
                    
                    {/* Modal Card - WHITE/GOLDEN theme */}
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        exit={{ scale: 0.95, opacity: 0 }}
                        // Responsive container - adjusted colors for white theme
                        className="relative w-full max-w-4xl max-h-[95vh] flex flex-col bg-white border border-[#D4AF37]/30 rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl"
                    >
                        {/* Close Button - Golden theme */}
                        <button 
                            onClick={onClose} 
                            // Golden/White theme for the close button
                            className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 p-2 text-[#D4AF37] bg-white/20 rounded-full hover:bg-[#D4AF37]/10 transition-all"
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
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        src={mainImage} 
                                        // Golden border on main image
                                        className="w-full aspect-[4/3] sm:h-[350px] object-cover rounded-xl sm:rounded-2xl border-2 border-[#D4AF37]/20" 
                                    />
                                    <div className="grid grid-cols-4 gap-2">
                                        {unit.images.map((img, idx) => (
                                            <button 
                                                key={idx} 
                                                onClick={() => setMainImage(img)}
                                                className="aspect-square overflow-hidden rounded-lg sm:rounded-xl"
                                            >
                                                <img 
                                                    src={img} 
                                                    // Updated image rings for golden theme
                                                    className={`w-full h-full object-cover transition-all ${mainImage === img ? 'ring-2 ring-[#D4AF37]' : 'opacity-60 hover:opacity-100 hover:ring-1 hover:ring-[#D4AF37]/50'}`} 
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* DETAILS */}
                                <div className="flex flex-col justify-start lg:justify-center">
                                    {/* Text colors adjusted for white background */}
                                    <h3 className="text-xl sm:text-3xl font-medium text-[#1A1A1A] mb-4 sm:mb-6">{unit.type}</h3>
                                    <div className="space-y-3 sm:space-y-6">
                                        {/* Updated separator borders to Golden */}
                                        <div className="flex justify-between border-b border-[#D4AF37]/10 pb-3">
                                            {/* Text colors adjusted for white background */}
                                            <span className="text-[#666] text-xs sm:text-sm">Total Area</span>
                                            <span className="text-[#1A1A1A] font-medium text-sm sm:text-base">{unit.area}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-[#D4AF37]/10 pb-3">
                                            {/* Text colors adjusted for white background */}
                                            <span className="text-[#666] text-xs sm:text-sm">Price</span>
                                            {/* Updated price color to GOLDEN */}
                                            <span className="text-[#D4AF37] font-bold text-lg sm:text-xl">{unit.price}</span>
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