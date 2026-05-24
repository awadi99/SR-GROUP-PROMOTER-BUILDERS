import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 h-screen w-screen flex flex-col items-center justify-center bg-[#030303] z-[99999] select-none pointer-events-auto">
      {/* Subtle Luxury Ambient Core Glow */}
      <div className="absolute w-[200px] h-[200px] bg-[#B08B57]/5 blur-[60px] rounded-full animate-pulse transform-gpu" />
      
      <div className="relative flex flex-col items-center z-10">
        {/* Sleek Dual-Ring Pulsating Spinner */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
          {/* Outer Fine Track Accent */}
          <div className="absolute inset-0 rounded-full border border-[#B08B57]/10 scale-110" />
          
          {/* Active Animated Spinner Element - Verified Drive Rate */}
          <div 
            className="absolute inset-0 rounded-full border border-t-[#B08B57] border-r-transparent border-b-transparent border-l-transparent animate-spin transform-gpu" 
            style={{ animationDuration: '1s' }}
          />
        </div>

        {/* Tiny Status Text Tracker */}
        <span 
          className="mt-4 text-[9px] tracking-[0.4em] uppercase text-[#B08B57]/40 font-semibold animate-pulse"
          style={{ animationDuration: '1.8s' }}
        >
          Loading
        </span>
      </div>
    </div>
  );
}