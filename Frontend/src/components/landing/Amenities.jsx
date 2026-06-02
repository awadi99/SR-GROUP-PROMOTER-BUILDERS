import React, { memo } from "react";
import { motion } from "framer-motion";
import { Coffee, ShieldCheck, Dumbbell, Wifi, ParkingCircle, Users } from "lucide-react";

const amenitiesData = [
    { icon: <ShieldCheck size={24} />, title: "24/7 Security", desc: "Advanced biometric access and constant surveillance for complete peace of mind." },
    { icon: <Dumbbell size={24} />, title: "Fitness Center", desc: "Professional-grade equipment designed to support your daily wellness routine." },
    { icon: <Coffee size={24} />, title: "Gourmet Cafe", desc: "A refined space for social connection and artisan coffee experiences." },
    { icon: <Wifi size={24} />, title: "Fiber Hub", desc: "High-speed connectivity built to support your work and entertainment needs." },
    { icon: <ParkingCircle size={24} />, title: "Smart Parking", desc: "Secure, automated, and EV-ready parking solutions for your convenience." },
    { icon: <Users size={24} />, title: "Meeting Lounges", desc: "Private, sophisticated suites designed for hosting and collaboration." },
];

const AmenityCard = memo(({ item }) => (
    <motion.div 
        className="relative group p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 overflow-hidden transition-all duration-300 transform-gpu will-change-transform"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
        {/* Subtle hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#A68966]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
            <div className="text-[#A68966] mb-6 w-14 h-14 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/5 group-hover:bg-[#A68966] group-hover:text-black transition-colors duration-300">
                {item.icon}
            </div>
            <h3 className="text-xl font-medium mb-3 text-white">{item.title}</h3>
            <p className="text-white/40 leading-relaxed font-light text-sm">{item.desc}</p>
        </div>
    </motion.div>
));

AmenityCard.displayName = "AmenityCard";

export default function Amenities() {
    return (
        <section id="features" className="bg-[#030303] text-white py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="grid md:grid-cols-2 gap-12 items-end mb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }}
                    >
                        <span className="text-[#A68966] uppercase tracking-[0.2em] text-[10px] font-bold">Lifestyle</span>
                        <h2 className="text-5xl md:text-7xl font-medium mt-4 leading-tight">
                            Designed for <br/> 
                            <span className="text-white/30">Excellence.</span>
                        </h2>
                    </motion.div>
                    <p className="text-lg text-white/50 font-light border-l border-white/10 pl-8 leading-relaxed">
                        Every detail is curated to enhance your daily life, blending seamless utility with sophisticated aesthetics.
                    </p>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {amenitiesData.map((item, index) => (
                        <AmenityCard key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}