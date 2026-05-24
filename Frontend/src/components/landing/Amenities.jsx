import React from "react";
import { motion } from "framer-motion";
import { Coffee, ShieldCheck, Dumbbell, Wifi, ParkingCircle, Users, Sparkles } from "lucide-react";

const amenitiesData = [
    { icon: <ShieldCheck size={28} />, title: "24/7 Security", desc: "Advanced biometric access and 24/7 surveillance." },
    { icon: <Dumbbell size={28} />, title: "Fitness Center", desc: "Professional-grade equipment with scenic views." },
    { icon: <Coffee size={28} />, title: "Gourmet Cafe", desc: "Artisan coffee in a social, refined space." },
    { icon: <Wifi size={28} />, title: "Fiber Hub", desc: "Enterprise-grade connectivity for home office." },
    { icon: <ParkingCircle size={28} />, title: "Smart Parking", desc: "EV-ready, secure, and automated parking." },
    { icon: <Users size={28} />, title: "Meeting Lounges", desc: "Private suites for hosting and collaboration." },
];

export default function Amenities() {
    return (
        <div className="bg-[#030303] text-white min-h-screen py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="grid md:grid-cols-2 gap-12 items-end mb-24">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <span className="text-[#A68966] uppercase tracking-[0.3em] text-xs font-semibold">Amenities</span>
                        <h1 className="text-6xl md:text-8xl font-medium mt-6 leading-none">Designed for <br/> <span className="text-white/30">Excellence.</span></h1>
                    </motion.div>
                    <p className="text-xl text-white/60 font-light border-l border-white/10 pl-8">
                        Every detail is curated to enhance lifestyle, blending seamless utility with sophisticated aesthetics.
                    </p>
                </div>

                {/* Advanced Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {amenitiesData.map((item, index) => (
                        <motion.div 
                            key={index}
                            whileHover={{ y: -10 }}
                            className="relative group p-10 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 overflow-hidden transition-all duration-500"
                        >
                            {/* Decorative Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#A68966]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10">
                                <div className="text-[#A68966] mb-8 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#A68966] group-hover:text-black transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-medium mb-3">{item.title}</h3>
                                <p className="text-white/50 leading-relaxed font-light">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer CTA Section */}
                
            </div>
        </div>
    );
}