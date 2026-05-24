import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  // SEO: Structured Data for Google Business/Real Estate
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "SR GROUP",
    "description": "Premium Promoter and Builder based in Baramati.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Baramati",
      "addressCountry": "IN"
    }
  };

  return (
    <section 
      className="relative h-screen w-full bg-[#030303] overflow-hidden flex items-center justify-center"
      aria-label="Welcome to SR Group"
    >
      {/* Injecting SEO Schema directly into the component */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      
      {/* Kinetic Background - Opacity increased to 50% for richer imagery */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30" /> {/* Slightly lighter overlay */}
        <img 
          src="/images/HeroBg.jpeg" 
          className="w-full h-full object-cover opacity-85 scale-105" // Opacity bumped to 50%
          alt="Luxury architectural estate by SR Group"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/70" />
      </motion.div>

      {/* Brand Identity Layer */}
      <div className="relative z-10 text-center w-full px-6">
        <motion.div style={{ y: y2 }}>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,7vw,6rem)] font-serif text-white font-medium leading-[1.1] tracking-tight uppercase"
          >
            SR GROUP <br/>
            <span className="text-luxury-gold text-[clamp(1.5rem,4vw,3.5rem)] font-light tracking-[0.2em] block mt-4">
              PROMOTER AND BUILDER
            </span>
          </motion.h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "12rem" }}
            transition={{ delay: 1, duration: 1.5 }}
            className="h-[1px] bg-white/40 mx-auto mt-12" // Divider opacity bumped
          />
        </motion.div>
      </div>

      {/* Footer Details */}
      <footer className="absolute bottom-20 w-full px-12 flex justify-between items-end">
        <p className="text-[9px] text-white/60 uppercase tracking-[0.3em] hidden md:block">
          Baramati — Est. 2026
        </p>
        
        <button 
          className="group relative text-white uppercase tracking-[0.2em] text-[9px] py-4 border-b border-white/30 hover:border-luxury-gold transition-all duration-500"
          aria-label="Click to view our luxury real estate projects"
        >
          Explore Projects
          <div className="absolute top-0 right-0 w-1 h-1 bg-luxury-gold rounded-full group-hover:scale-150 transition-transform duration-500" />
        </button>
      </footer>
    </section>
  );
}