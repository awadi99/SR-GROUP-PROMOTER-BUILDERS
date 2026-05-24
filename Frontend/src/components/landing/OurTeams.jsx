import React from "react";
import { motion } from "framer-motion";
import { team } from "../../constants/teamData.js";

export default function OurTeams() {
    return (
        <div className="min-h-screen bg-[#FDFDFC] text-[#1A1A1A] py-32 px-6 md:px-20 overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="mb-24">
                    <span className="text-[#A68966] font-semibold tracking-[0.3em] uppercase text-[10px] border border-[#A68966]/20 py-2 px-6 rounded-full inline-block mb-8">
                        The Collective
                    </span>
                    <h1 className="text-7xl md:text-[100px] font-medium tracking-tighter leading-[0.9]">
                        Meet the <br /> <span className="text-[#A68966] italic">visionaries.</span>
                    </h1>
                </div>

                {/* Team Grid - 3x3 Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="group relative h-[500px] rounded-[2rem] overflow-hidden bg-[#F5F5F5] p-8 flex flex-col justify-end transition-all duration-300 will-change-transform"
                        >
                            {/* Image Background */}
                            <img 
                                src={member.image} 
                                alt={member.name}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 -z-10"
                            />
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500 -z-10" />

                            {/* Content Block */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm will-change-transform transition-all duration-500 group-hover:translate-y-0">
                                <h3 className="text-2xl font-medium tracking-tight mb-1">{member.name}</h3>
                                <p className="text-[#A68966] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
                                    {member.role}
                                </p>
                                
                                {/* Bio: Revealed only on Hover */}
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
                                    <div className="overflow-hidden">
                                        <p className="text-[#666666] text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {member.bio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}