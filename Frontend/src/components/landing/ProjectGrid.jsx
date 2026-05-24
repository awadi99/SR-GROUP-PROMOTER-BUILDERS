import React, { memo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import projects from "../../constants/ProjectData";

const ProjectCard = memo(({ project, onClick, index }) => (
  // 1. Remove 'initial' animation to prevent heavy paint on mount
  // 2. Use 'whileInView' only for smooth reveal
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.4, delay: index * 0.05 }} // Staggered delay for smooth feel
    onClick={onClick}
    className="group relative h-[400px] md:h-[600px] rounded-[32px] md:rounded-[48px] overflow-hidden cursor-pointer bg-[#e5e5e0]"
  >
    <div className="absolute inset-0">
      <div 
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${project.image})` }}
      />
    </div>

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
    
    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-10 pointer-events-none">
      <div className="flex justify-between items-end w-full">
        <div className="space-y-1">
          <span className="text-[#A68966] text-[10px] uppercase tracking-[0.3em] font-semibold">{project.category}</span>
          <h3 className="text-2xl md:text-3xl text-white font-medium">{project.title}</h3>
          <p className="text-sm font-light text-white/70">{project.location}</p>
        </div>
        
        <div className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20 bg-white/10 group-hover:bg-[#A68966] group-hover:border-[#A68966] transition-colors duration-300">
          <ArrowUpRight size={20} className="text-white" />
        </div>
      </div>
    </div>
  </motion.div>
));

export default function ProjectGrid() {
  const navigate = useNavigate();

  return (
    <section id="project" className="bg-[#FAF9F6] py-20 md:py-36 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] font-medium tracking-tight text-[#2D2D2D]">
            Selected <br /><span className="text-[#A68966]">Destination.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard 
              key={project.id} 
              index={i} // Pass index for stagger
              project={project} 
              onClick={() => navigate(`/luxury/project/${project.id}`)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}