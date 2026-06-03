import React, { memo } from "react";
import { motion } from "framer-motion";
import { Building2, Award, Landmark } from "lucide-react";
import journeyData from "../../constants/OurJourneyData.js";

// Animation Variants (Kept outside for performance)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } }
};

const slideRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } }
};

const OurJourney = memo(() => {
    return (
        <section className="relative bg-[#050505] py-28 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B08B57]/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#B08B57]/5 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Header */}
                    <motion.div variants={fadeUp} className="text-center mb-20">
                        <p className="text-[#B08B57] uppercase tracking-[0.4em] text-xs font-bold mb-4">
                            Our Legacy
                        </p>
                        <h2 className="text-5xl md:text-7xl font-bold text-white">
                            {journeyData.title}
                        </h2>
                        <div className="w-24 h-[2px] bg-[#B08B57] mx-auto mt-8"></div>
                    </motion.div>

                    {/* Main Content */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Image */}
                        <motion.div 
                            variants={slideLeft} 
                            style={{ willChange: "transform" }}
                            className="relative"
                        >
                            <div className="overflow-hidden rounded-[30px] border border-[#B08B57]/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                                <img
                                    src={journeyData.image}
                                    alt="SR Group"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-[650px] object-cover transition duration-1000 hover:scale-105"
                                />
                            </div>
                            <div className="absolute bottom-8 left-8 backdrop-blur-xl bg-black/50 border border-[#B08B57]/20 rounded-2xl px-6 py-5">
                                <p className="text-[#B08B57] text-xs uppercase tracking-[0.3em]">Since</p>
                                <h3 className="text-white text-3xl font-bold">2012</h3>
                            </div>
                        </motion.div>

                        {/* Right Content */}
                        <motion.div variants={slideRight} style={{ willChange: "transform" }}>
                            <p className="text-[#B08B57] uppercase tracking-[0.35em] text-xs mb-6">
                                Building Excellence
                            </p>
                            <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
                                Creating Landmarks <span className="text-[#B08B57]"> That Inspire</span>
                            </h3>
                            <div className="w-16 h-[2px] bg-[#B08B57] mb-8"></div>
                            
                            {/* Correctly Rendered Description */}
                            <p className="text-neutral-400 leading-9 text-lg">
                                {journeyData.descriptionPart1}
                                <br /><br />
                                Under the leadership of{' '}
                                <span className="text-[#B08B57] font-semibold">{journeyData.leaders[0]}</span>
                                {' and '}
                                <span className="text-[#B08B57] font-semibold">{journeyData.leaders[1]}</span>
                                {', '}{journeyData.descriptionPart2}
                            </p>
                            
                            {/* Feature Cards */}
                            <div className="grid sm:grid-cols-3 gap-5 mt-12">
                                <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-5 text-center">
                                    <Building2 className="mx-auto text-[#B08B57]" size={28} />
                                    <h4 className="text-white font-semibold mt-3">Premium Projects</h4>
                                </div>
                                <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-5 text-center">
                                    <Award className="mx-auto text-[#B08B57]" size={28} />
                                    <h4 className="text-white font-semibold mt-3">Trusted Quality</h4>
                                </div>
                                <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-5 text-center">
                                    <Landmark className="mx-auto text-[#B08B57]" size={28} />
                                    <h4 className="text-white font-semibold mt-3">Modern Design</h4>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

export default OurJourney;