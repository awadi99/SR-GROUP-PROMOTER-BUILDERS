import React from "react";
import { motion } from "framer-motion";
import { stats } from '../../constants/statsData.js';

export default function PremiumLegacyStats() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-20 md:py-36 text-white font-poppins">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Gold Glows */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#B8860B]/10 blur-[100px]" />
        {/* Dark Grid */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px] md:bg-[size:120px_120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start lg:items-end mb-20 md:mb-28">
          <motion.div className="flex-1">
            <p className="uppercase tracking-[0.3em] text-[#B8860B] text-[10px] font-bold mb-6 border-l border-[#B8860B] pl-4">
              SR Group Legacy
            </p>
            <h2 className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tighter font-bold text-white">
              Crafted for <br />
              <span className="italic font-light text-[#B8860B]">timeless living.</span>
            </h2>
          </motion.div>

          <div className="max-w-md lg:ml-auto border-l border-[#B8860B]/30 pl-6">
            <p className="text-white/50 leading-[1.8] text-[14px] md:text-[15px] font-light">
              Every development by SR Group reflects a commitment to architectural sophistication and engineering precision.
            </p>
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative bg-[#0F0F0F] p-8 md:p-10 border border-white/5 hover:border-[#B8860B]/50 transition-all duration-500"
              >
                <div className="mb-12 flex justify-between items-center">
                  <div className="p-3 border border-white/5 group-hover:border-[#B8860B]/50 transition-colors">
                    <Icon size={20} className="text-[#B8860B]" />
                  </div>
                  <span className="text-[9px] text-white/20 font-bold tracking-[0.2em]">0{index + 1}</span>
                </div>

                <h3 className="text-[2.5rem] md:text-[3.5rem] font-bold text-white mb-2 tracking-tighter">
                  {stat.value}
                </h3>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-semibold group-hover:text-white transition-colors">
                  {stat.label}
                </p>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#B8860B] group-hover:w-full transition-all duration-700" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}