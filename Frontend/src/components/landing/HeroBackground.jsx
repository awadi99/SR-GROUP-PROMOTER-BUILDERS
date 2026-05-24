import React from 'react';

// Stripped of all Framer Motion scroll loops to ensure 0% CPU overhead while scrolling
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 transform-gpu">
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
      <img 
        src="/image/HeroBg.png" 
        className="w-full h-full object-cover opacity-40 scale-105"
        alt="Luxury architectural estate by SR Group"
        fetchPriority="high"
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/70 z-10 pointer-events-none" />
    </div>
  );
}