import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import projects from "../../constants/ProjectData";

export default function ProjectGrid() {
  const navigate = useNavigate(); // 2. Initialize the hook

  return (
    <section className="bg-[#FAF9F6] py-20 md:py-36 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16 md:mb-24">
          <h2 className="text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] font-medium tracking-tight text-[#2D2D2D]">
            Selected <br />
            <span className="text-[#A68966]">Destination.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative h-[400px] md:h-[600px] rounded-[32px] md:rounded-[48px] overflow-hidden cursor-pointer"
            >
              {/* Image Layer */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-in-out group-hover:scale-105"
                style={{ backgroundImage: `url(${project.image})` }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 p-6 md:p-10 z-10">
                <div className="flex justify-between items-end">
                  <div className="space-y-1 md:space-y-2">
                    <span className="text-[#A68966] text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-semibold drop-shadow-md">
                      {project.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl text-white font-medium drop-shadow-lg">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm font-light text-white/80 drop-shadow-md">
                      {project.location}
                    </p>
                  </div>
                  
                  {/* 3. Added the onClick navigation handler */}
                  <div 
                    onClick={() => navigate(`/luxury/project/${project.id}`)}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-[#A68966] hover:border-[#A68966] cursor-pointer"
                  >
                    <ArrowUpRight size={20} className="text-white" />
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