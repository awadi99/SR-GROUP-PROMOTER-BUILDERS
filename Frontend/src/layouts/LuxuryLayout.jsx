import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LuxuryLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-white">
      
      {/* Frosted Glass Navbar - Stays fixed & sophisticated */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-[#030303]/80 backdrop-blur-md border-b border-white/5">
        <div className="text-white font-serif tracking-[0.2em] text-lg hover:text-luxury-gold transition-colors duration-500 cursor-pointer">
          SR GROUP
        </div>
        <button 
          className="text-[9px] text-white/70 hover:text-luxury-gold uppercase tracking-[0.3em] transition-colors duration-500"
          aria-label="Open navigation menu"
        >
          Menu
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Footer - Minimalist & Elegant */}
      <footer className="py-12 border-t border-white/5 text-center bg-[#030303]">
        <p className="text-[9px] text-white/30 uppercase tracking-[0.4em]">
          © 2026 SR GROUP. PRECISION & LEGACY.
        </p>
      </footer>
    </div>
  );
}