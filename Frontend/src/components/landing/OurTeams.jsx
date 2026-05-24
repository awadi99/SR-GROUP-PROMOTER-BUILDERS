import React from "react";
import { motion } from "framer-motion";

const team = [
    { name: "Vikram Mehta", role: "Principal Architect", bio: "Defining skylines with sustainable elegance for over two decades." },
    { name: "Ananya Rao", role: "Lead Designer", bio: "Mastering the balance between traditional motifs and modern minimalism." },
    { name: "Sameer Khan", role: "Structural Engineer", bio: "Architecting complex geometries with absolute structural integrity." },
    { name: "Priya Sharma", role: "Interior Lead", bio: "Crafting atmospheric spaces through light, texture, and materiality." },
];

export default function OurTeams() {
    return (
        <div className="min-h-screen bg-[#FDFDFC] text-[#1A1A1A] py-32 px-6 md:px-20 overflow-hidden">

            {/* Subtle Gold Accent Glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#A68966]/5 blur-[150px] rounded-full -z-10" />

            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#A68966] font-semibold tracking-[0.3em] uppercase text-[10px] border border-[#A68966]/20 py-2 px-6 rounded-full inline-block mb-8"
                    >
                        The Collective
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-7xl md:text-[100px] font-medium tracking-tighter leading-[0.9]"
                    >
                        Meet the <br /> <span className="text-[#A68966] italic">visionaries.</span>
                    </motion.h1>
                </div>

                {/* Team Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.8 }}
                            className="group relative h-[500px] rounded-[2rem] overflow-hidden border border-[#A68966]/10 bg-white p-8 flex flex-col justify-end hover:border-[#A68966]/50 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                        >
                            {/* Image Placeholder */}
                            <div className="absolute inset-0 bg-[#F5F5F5] group-hover:scale-105 transition-transform duration-700 -z-10" />

                            <div className="space-y-3 bg-white/90 backdrop-blur-md p-6 -m-2 rounded-2xl">
                                <h3 className="text-2xl font-medium tracking-tight">{member.name}</h3>
                                <p className="text-[#A68966] text-[10px] uppercase tracking-[0.2em] font-bold">{member.role}</p>
                                <p className="text-[#666666] text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {member.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}