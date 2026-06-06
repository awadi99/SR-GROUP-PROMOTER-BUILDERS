import React from "react";
import { motion } from "framer-motion";

export default function AboutUS() {
  return (
    <section id="about" className="relative w-full h-auto md:h-[800px] overflow-hidden bg-[#f8f9fa]">
      
      <div className="w-full h-full grid md:grid-cols-2">
        
        {/* LEFT SIDE: Image filling the entire space */}
        <div className="relative w-full h-[400px] md:h-full bg-[#ffb042] p-5">
          <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/image/HeroBg.png" 
            alt="Luxury real estate interior"
            className="w-full h-full object-cover" // object-cover image ko stretch karke pura fill karta hai
            loading="lazy"
          />
        </div>

        {/* RIGHT SIDE: Text Content */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-20 bg-[#f8f9fa]">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-[#8b6b3e] uppercase tracking-[0.3em] text-xs font-bold mb-4">
              About SR Group
            </h2>
            <h3 className="text-4xl md:text-6xl font-medium mt-4 leading-tight text-neutral-900">
              We Build Your <span className="text-[#8b6b3e]">Dream Spaces.</span>
            </h3>
            
            <p className="text-lg text-neutral-600 leading-relaxed font-light mt-8">
              At SR Group, we build modern homes and commercial spaces in Baramati. 
              We focus on quality construction, smart designs, and making sure our customers get the best lifestyle experience. 
              Our goal is to create buildings that stand the test of time.
            </p>

            <div className="flex gap-10 pt-10 border-t border-[#8b6b3e]/20 mt-10">
              <div>
                <span className="block text-4xl font-bold text-neutral-900">10+</span>
                <span className="text-xs uppercase tracking-wider text-neutral-500">Projects Completed</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-neutral-900">2015</span>
                <span className="text-xs uppercase tracking-wider text-neutral-500">Year Established</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}