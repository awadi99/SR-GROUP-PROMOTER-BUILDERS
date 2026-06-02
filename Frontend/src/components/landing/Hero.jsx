import React from 'react';
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';
import { HeroSEO } from './HeroSchema';
import { Link } from 'react-router-dom';



export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen w-full bg-[#030303] overflow-hidden flex items-center justify-center"
      aria-label="Welcome to SR Group"
    >
      <HeroSEO />

      {/* Background is now fully static and completely decoupled from scroll loops */}
      <HeroBackground />

      {/* Brand Identity Layer */}
      <div className="relative z-10 text-center w-full px-6 pointer-events-none">
        {/* Removed style={{ y: y2 }} scroll tracking dependencies completely */}
        <div className="transform-gpu">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,7vw,6rem)]  text-white font-medium leading-[1.1] tracking-tight "
          >
            SR GROUP <br />
            <span className="text-[clamp(1.5rem,4vw,3.5rem)] font-medium tracking-[0.2em] block mt-4  ">
              PROMOTER AND BUILDER
            </span>
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "12rem" }}
            transition={{ delay: 1, duration: 1.5 }}
            className="h-px bg-white/40 mx-auto mt-12"
          />
        </div>
      </div>

      {/* Footer Details */}
      <footer className="absolute bottom-20 w-full px-12 flex justify-between items-end z-20">
        <p className="text-[9px] text-white/60 uppercase tracking-[0.3em] hidden md:block">
          Baramati — Est. 2026
        </p>

        <div className="flex items-center gap-8">
          {/* Register Button (Secondary/Ghost) */}
          <Link
            to="/register"
            className="text-white/60 uppercase tracking-[0.2em] text-[9px] py-4 border-b border-transparent hover:text-[#B08B57] hover:border-[#B08B57] transition-all duration-500 pointer-events-auto"
          >
            Register
          </Link>

          {/* Explore Projects Button (Primary) */}
          <button
            onClick={()=>window.location.href='/#project'}
            className="group relative text-white uppercase tracking-[0.2em] text-[9px] py-4 border-b border-white/30 hover:border-[#B08B57] transition-all duration-500 pointer-events-auto scroll-smooth"
            aria-label="Click to view our luxury real estate projects"
          >
            Explore Projects
            <div className="absolute top-0 right-0 w-1 h-1 bg-[#B08B57] rounded-full group-hover:scale-150 transition-transform duration-500" />
          </button>
        </div>
      </footer>
    </section>
  );
}