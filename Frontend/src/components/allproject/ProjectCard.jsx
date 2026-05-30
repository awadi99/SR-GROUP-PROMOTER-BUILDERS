

import React from 'react';
import { Eye } from 'lucide-react';

export default function ProjectCard({ project, onClick }) {

    return (
        <div
            onClick={onClick}
            className="cursor-pointer bg-white p-4 rounded-[24px] border border-[#E7E1D8] shadow-sm hover:shadow-lg transition-all group"
        >
            <div className="overflow-hidden rounded-[16px] h-64 mb-4 relative">
                <img
                    src={project.vision?.images?.[0] || '/placeholder-hero.jpg'} 
                    alt={project?.identity?.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="text-white" />
                </div>
            </div>

            <div className="px-2">
                <p className="text-[#A68966] text-[10px] uppercase tracking-[0.2em] font-bold">
                    {project?.identity?.tagline}
                </p>

                <h3 className="text-xl font-medium text-[#2D2D2D] mt-1">
                    {project?.identity?.title}
                </h3>

                <p className="text-[#7A746B] text-sm mt-1">
                    {project?.specs?.architect}
                </p>
            </div>
        </div>
    );
}