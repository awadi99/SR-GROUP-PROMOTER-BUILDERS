import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

import logoBG from '/image/logoBG.png';

export default function LuxuryLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-white font-poppins selection:bg-[#B08B57]/20 relative overflow-hidden">
      
      {/* Background Visual Identity Grid */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px] pointer-events-none" />
      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-[#B08B57]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* FIXED NAVIGATION BAR */}
      <nav className="fixed top-0 w-full z-50 px-4 sm:px-8 md:px-12 py-4 sm:py-5 flex justify-between items-center bg-[#030303]/85 backdrop-blur-lg border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img src={logoBG} alt="SR Group" className="w-10 h-10 sm:w-11 sm:h-11 object-contain" />
          <div className="flex flex-col">
            <span className="text-white font-semibold tracking-[0.2em] text-xs sm:text-sm uppercase leading-tight">SR GROUP</span>
            <span className="text-[#B08B57] text-[10px] sm:text-[11px] uppercase tracking-[0.35em] leading-tight">PROMOTER & BUILDERS</span>
          </div>
        </motion.div>
      </nav>

      {/* FIXED MAIN CONTAINER PIPELINE:
        Removed heavy horizontal/vertical paddings. `pt-20 sm:pt-24` ensures 
        content starts perfectly below the fixed glassmorphic navbar without extra bloat.
      */}
      <main className="flex-grow pt-20 sm:pt-24 w-full flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full flex-grow flex flex-col"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="py-10 px-4 sm:px-8 border-t border-white/5 text-center bg-[#030303] relative z-10">
        <div className="relative flex flex-col items-center">
          <div className="w-12 h-[1px] bg-[#B08B57]/15 mb-4" />
          <p className="text-[9px] sm:text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] leading-loose">
            © 2026 <span className="text-[#B08B57]/90">SR GROUP PROMOTER & BUILDERS.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}