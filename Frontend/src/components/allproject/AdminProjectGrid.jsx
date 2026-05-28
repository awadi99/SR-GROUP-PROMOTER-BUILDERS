import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { useProject } from '../../hook/useProject'; 

export default function AdminProjectGrid() {
    const navigate = useNavigate();
    
    // Leveraging your hook to handle data fetching, caching, and state
    const { myProjects, isFetchingProjects, isProjectsError } = useProject();

    // 1. Loading State
    if (isFetchingProjects) {
        return (
            <section className="bg-[#0A0A0A] min-h-screen py-20 px-6 text-white flex items-center justify-center">
                <p className="tracking-[0.2em] uppercase text-sm text-[#A68966]">Loading Projects...</p>
            </section>
        );
    }

    // 2. Error State
    if (isProjectsError) {
        return (
            <section className="bg-[#0A0A0A] min-h-screen py-20 px-6 text-white flex items-center justify-center">
                <p className="tracking-[0.2em] uppercase text-sm text-red-500">Failed to load projects.</p>
            </section>
        );
    }

    // 3. Render Component
    return (
        <section className="bg-[#0A0A0A] min-h-screen py-20 px-6 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-16">
                    <div className="w-1.5 h-12 bg-[#A68966]"></div>
                    <h2 className="text-5xl md:text-7xl font-medium text-white tracking-tight">
                        All Projects
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Safe mapping: ensures myProjects is an array before attempting to map */}
                    {Array.isArray(myProjects) && myProjects.map((project) => (
                        <div 
                            key={project._id} 
                            className="group relative"
                        >
                            <ProjectCard 
                                project={project} 
                                onClick={() => navigate(`/dashboard/project/${project._id}`)} 
                            />
                            {/* Subtle Gold Hover Glow effect */}
                            <div className="absolute inset-0 rounded-[30px] border border-[#A68966]/0 group-hover:border-[#A68966]/30 transition-all duration-500 pointer-events-none"></div>
                        </div>
                    ))}
                    
                    {/* Empty State: Optional feedback if the array is empty */}
                    {Array.isArray(myProjects) && myProjects.length === 0 && (
                        <p className="col-span-full text-center text-gray-500">No projects found. Create your first one!</p>
                    )}
                </div>
            </div>
        </section>
    );
}