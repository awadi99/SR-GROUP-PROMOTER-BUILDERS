import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// DO NOT statically import from '../../public/' - it breaks production builds.
// Instead, use a direct absolute string reference that references the post-build root.
const LOGO_ASSET_PATH = "/image/logoBG.png";

export default function LoadingLogoHero({ isActive, onComplete }) {
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        sessionStorage.setItem("intro_viewed", "true");
        if (onComplete) onComplete();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  const fadeDownVariants = {
    hidden: { opacity: 0, y: -16 },
    visible: (customDelay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: customDelay,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: 20,
            transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } 
          }}
          className="fixed inset-0 z-[99999] bg-black overflow-hidden flex items-center justify-center transform-gpu [contain:strict]"
        >
          {/* MAIN GOLD GLOW */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1.05 }}
            transition={{ 
              opacity: { duration: 1.2, ease: "linear" },
              scale: { duration: 4, ease: "easeOut" }
            }}
            className="absolute w-[300px] sm:w-[450px] md:w-[650px] h-[300px] sm:h-[450px] md:h-[650px] rounded-full bg-[#B08B57]/10 blur-[100px] sm:blur-[140px] pointer-events-none transform-gpu [will-change:transform,opacity]"
          />

          {/* GRID TEXTURE */}
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none data-layer" />

          {/* CONTENT CONTAINER */}
          <div className="relative z-10 flex flex-col items-center px-6 transform-gpu">
            <motion.p
              custom={0.1}
              initial="hidden"
              animate="visible"
              variants={fadeDownVariants}
              className="uppercase tracking-[0.4em] text-[9px] sm:text-[10px] text-white/40 mb-5 sm:mb-6 text-center font-medium transform-gpu [will-change:transform,opacity]"
            >
              Luxury Real Estate
            </motion.p>

            {/* LOGO VIEW wrapper */}
            <motion.div
              custom={0.22}
              initial="hidden"
              animate="visible"
              variants={fadeDownVariants}
              className="relative mb-5 sm:mb-6 transform-gpu [will-change:transform,opacity]"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 rounded-full border border-[#B08B57]/15 pointer-events-none transform-gpu [will-change:transform,opacity]"
              />
              
              <img
                src={LOGO_ASSET_PATH}
                alt="SR Group"
                loading="eager"
                decoding="async"
                className="relative z-10 w-[90px] sm:w-[115px] md:w-[140px] object-contain transform-gpu"
              />
            </motion.div>

            <motion.h1
              custom={0.34}
              initial="hidden"
              animate="visible"
              variants={fadeDownVariants}
              className="text-white font-semibold tracking-[0.2em] text-[clamp(1.75rem,7vw,4rem)] text-center leading-none uppercase transform-gpu [will-change:transform,opacity]"
            >
              SR GROUP
            </motion.h1>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "min(140px,35vw)", opacity: 0.6 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="h-[1px] bg-gradient-to-r from-transparent via-[#B08B57] to-transparent mt-5 sm:mt-6 transform-gpu [will-change:width,opacity]"
            />

            <motion.p
              custom={0.65}
              initial="hidden"
              animate="visible"
              variants={fadeDownVariants}
              className="mt-5 sm:mt-6 text-white/50 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-center transform-gpu [will-change:transform,opacity]"
            >
              Crafting Timeless Spaces
            </motion.p>
          </div>

          {/* BOTTOM TIMELINE TRACK */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden pointer-events-none">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }} 
              transition={{ duration: 3.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full bg-gradient-to-r from-transparent via-[#B08B57] to-transparent transform-gpu [will-change:transform]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}