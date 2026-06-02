import React, { memo, useCallback, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePublicProjects } from "../../hook/useProject";

const getId = (id) => (id && typeof id === "object" && id.$oid ? id.$oid : id);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const ProjectCard = memo(({ project, onNavigate }) => {
  const title = project?.identity?.title || "Untitled Project";
  const category = project?.identity?.tagline || "Luxury Residence";
  const image = project?.vision?.images?.[0] || "";
  const location = project?.location?.landmarks?.[0]?.name || "Location Unavailable";
  const projectId = getId(project._id);

  const handleClick = useCallback(() => {
    onNavigate(projectId);
  }, [onNavigate, projectId]);

  return (
    <motion.div
      layout
      variants={cardVariants}
      onClick={handleClick}
      className="group relative w-full aspect-[4/5] overflow-hidden rounded-[24px] cursor-pointer bg-neutral-200 shadow-sm will-change-transform"
      role="listitem"
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-full object-cover transform-gpu transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <span className="block text-[#C7A87D] text-[10px] font-semibold uppercase tracking-[0.25em] mb-2">
              {category}
            </span>
            <h3 className="text-xl md:text-2xl font-medium text-white tracking-tight line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-white/70 mt-2 truncate">{location}</p>
          </div>
          <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover:bg-[#A68966] group-hover:border-[#A68966] group-hover:rotate-45">
            <ArrowUpRight size={20} className="text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default function ProjectGrid() {
  const navigate = useNavigate();
  const { data: publicProjects = [], isPending, isError } = usePublicProjects();

  const [visibleCount, setVisibleCount] = useState(12);
  const PROJECTS_PER_PAGE = 12;

  const handleNavigate = useCallback((id) => {
    navigate(`/luxury/project/${id}`);
  }, [navigate]);

  const displayedProjects = useMemo(() => {
    return publicProjects.slice(0, visibleCount);
  }, [publicProjects, visibleCount]);

  const hasMore = publicProjects.length > visibleCount;

  if (isError) {
    return (
      <section className="py-32 text-center text-neutral-400" aria-live="polite">
        <p>Unable to load projects at the moment.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-[#A68966] underline hover:text-[#8c7457] transition-colors"
        >
          Retry Connection
        </button>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF9F6] py-20 md:py-32 px-4 sm:px-6" id="project">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 md:mb-20">
          <span className="text-[#A68966] uppercase tracking-[0.35em] text-[10px] font-semibold">
            Signature Collection
          </span>
          <h2 className="mt-4 text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9] tracking-tight font-medium text-[#2D2D2D]">
            Selected <br />
            <span className="text-[#A68966]">Destinations.</span>
          </h2>
        </div>

        {isPending ? (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-pulse" 
            aria-busy="true" 
            aria-label="Loading projects"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-[24px] bg-neutral-200" />
            ))}
          </div>
        ) : publicProjects.length === 0 ? (
          <div className="py-20 text-center text-neutral-500 italic">
            <p>No projects currently available.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            role="list"
          >
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project) => (
                <ProjectCard
                  key={getId(project._id)}
                  project={project}
                  onNavigate={handleNavigate}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {hasMore && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + PROJECTS_PER_PAGE)}
              aria-label="Load more projects"
              className="px-8 py-3 bg-[#2D2D2D] text-white rounded-full hover:bg-[#A68966] transition-all duration-300 transform active:scale-95"
            >
              View More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}