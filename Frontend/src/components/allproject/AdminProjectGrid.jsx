// src/components/allproject/AdminProjectGrid.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import projects from '../../constants/ProjectData';

export default function AdminProjectGrid() {
    const navigate = useNavigate();

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
                    {projects.map((project) => (
                        <div 
                            key={project.id} 
                            className="group relative"
                        >
                            <ProjectCard 
                                project={project} 
                                onClick={() => navigate(`/dashboard/project/${project.id}`)} 
                            />
                            {/* Subtle Gold Hover Glow effect */}
                            <div className="absolute inset-0 rounded-[30px] border border-[#A68966]/0 group-hover:border-[#A68966]/30 transition-all duration-500 pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}