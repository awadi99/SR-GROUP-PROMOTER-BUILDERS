import React from 'react';

export default function LoadingSpinner() {
  return (
    // 1. Changed 'h-screen' to 'h-dvh' (Dynamic Viewport Height) 
    // This fixes the issue where mobile browser toolbars cut off your content.
    <div className="fixed inset-0 w-full h-dvh flex flex-col items-center justify-center bg-[#020205] z-[9999] p-4">
      
      {/* 2. Slightly adjusted sizes for better visibility on small screens */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-amber-500/20 border-t-amber-400/70 rounded-full animate-spin"></div>

      {/* 3. Responsive text size (xs on mobile, sm on larger screens) */}
      <div className='mt-6 text-xs sm:text-sm text-amber-400/70 uppercase animate-pulse font-medium tracking-[0.3em]'>
        Loading...
      </div>
      
    </div>
  );
}