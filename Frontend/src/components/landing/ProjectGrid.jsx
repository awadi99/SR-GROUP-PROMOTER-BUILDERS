import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import projects from "../../constants/ProjectData";

export default function ProjectGrid() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FAF9F6] py-20 md:py-36 px-4 md:px-6 overflow-hidden [contain-policy:contain-intrinsic-size]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] font-medium tracking-tight text-[#2D2D2D]">
            Selected <br />
            <span className="text-[#A68966]">Destination.</span>
          </h2>
        </div>

        {/* Project Presentation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              // Optimizing UX: Making the entire premium card clickable safely
              onClick={() => navigate(`/luxury/project/${project.id}`)}
              className="group relative h-[400px] md:h-[600px] rounded-[32px] md:rounded-[48px] overflow-hidden cursor-pointer bg-[#e5e5e0] transform-gpu [contain:layout_paint]"
            >
              
              {/* Optimized Image Component Wrapper Layer using GPU Acceleration */}
              <motion.div 
                className="absolute inset-0 bg-cover bg-center [will-change:transform]"
                style={{ backgroundImage: `url(${project.image})` }}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              />

              {/* Dynamic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              
              {/* Content Panel */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-10 pointer-events-none">
                <div className="flex justify-between items-end w-full">
                  
                  <div className="space-y-1 md:space-y-2 max-w-[75%]">
                    <span className="text-[#A68966] text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-semibold block">
                      {project.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl text-white font-medium tracking-wide">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm font-light text-white/70">
                      {project.location}
                    </p>
                  </div>
                  
                  {/* Visual Premium CTA Button Accent */}
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-500 ease-out group-hover:bg-[#A68966] group-hover:border-[#A68966] group-hover:scale-105 shrink-0 transform-gpu">
                    <ArrowUpRight size={20} className="text-white transition-transform duration-500 ease-out group-hover:rotate-45" />
                  </div>

                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}