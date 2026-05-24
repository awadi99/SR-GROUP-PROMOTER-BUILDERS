import React, { memo } from "react";
import { motion } from "framer-motion";
import { Coffee, ShieldCheck, Dumbbell, Wifi, ParkingCircle, Users } from "lucide-react";

const amenitiesData = [
    { icon: <ShieldCheck size={28} />, title: "24/7 Security", desc: "Advanced biometric access and 24/7 surveillance." },
    { icon: <Dumbbell size={28} />, title: "Fitness Center", desc: "Professional-grade equipment with scenic views." },
    { icon: <Coffee size={28} />, title: "Gourmet Cafe", desc: "Artisan coffee in a social, refined space." },
    { icon: <Wifi size={28} />, title: "Fiber Hub", desc: "Enterprise-grade connectivity for home office." },
    { icon: <ParkingCircle size={28} />, title: "Smart Parking", desc: "EV-ready, secure, and automated parking." },
    { icon: <Users size={28} />, title: "Meeting Lounges", desc: "Private suites for hosting and collaboration." },
];

// Card ko memoize kiya taaki re-render na ho
const AmenityCard = memo(({ item }) => (
    <motion.div 
        // Optimization: 'transform-gpu' add kiya
        className="relative group p-10 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 overflow-hidden transition-all duration-500 transform-gpu"
        whileHover={{ y: -5 }} // Thoda kam hover distance for smoother feel
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-[#A68966]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
            <div className="text-[#A68966] mb-8 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#A68966] group-hover:text-black transition-colors duration-300">
                {item.icon}
            </div>
            <h3 className="text-2xl font-medium mb-3">{item.title}</h3>
            <p className="text-white/50 leading-relaxed font-light">{item.desc}</p>
        </div>
    </motion.div>
));

AmenityCard.displayName = "AmenityCard";

export default function Amenities() {
    return (
        <section id="features" className="bg-[#030303] text-white py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-end mb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }}
                    >
                        <span className="text-[#A68966] uppercase tracking-[0.3em] text-xs font-semibold">Amenities</span>
                        <h2 className="text-6xl md:text-8xl font-medium mt-6 leading-none">Designed for <br/> <span className="text-white/30">Excellence.</span></h2>
                    </motion.div>
                    <p className="text-xl text-white/60 font-light border-l border-white/10 pl-8">
                        Every detail is curated to enhance lifestyle, blending seamless utility with sophisticated aesthetics.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {amenitiesData.map((item, index) => (
                        <AmenityCard key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}