import React from 'react';
import { Building2, Edit3, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import {projects} from '../constants/ProjectData.js';


export default function ProjectListing({ projects = [] }) {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-7xl mx-auto p-6 md:p-10 animate-in fade-in duration-700 bg-[#0A0A0A]">
            {/* Header Section */}
            <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light text-white tracking-[0.05em] uppercase">
                    Project Inventory
                </h2>
                <div className="h-[2px] w-12 bg-[#B08B57] mt-4"></div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects && projects.length > 0 ? (
                    projects.map((project) => (
                        <div 
                            key={project.id} 
                            onClick={() => navigate(`/dashboard/edit-project/${project.id}`)}
                            className="group relative cursor-pointer border border-[#1a1a1a] bg-[#050505] hover:border-[#B08B57]/50 transition-all duration-500 overflow-hidden"
                        >
                            {/* Image Container */}
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <img 
                                    src={project.image || '/placeholder.jpg'} 
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="flex items-center gap-2 text-white bg-[#B08B57] px-4 py-2 text-[9px] uppercase tracking-widest font-bold">
                                        <Edit3 size={12} /> Edit Details
                                    </div>
                                </div>
                            </div>
                            
                            {/* Text Content */}
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-white text-sm tracking-[0.1em] uppercase font-medium">
                                        {project.title}
                                    </h3>
                                    <ArrowRight size={14} className="text-[#B08B57] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                                </div>
                                <p className="text-[#555] text-[9px] uppercase tracking-[0.2em] mt-2 font-bold">
                                    {project.location}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    /* Empty State */
                    <div className="col-span-full py-24 text-center border border-dashed border-[#1a1a1a] bg-[#050505]">
                        <Building2 className="mx-auto text-[#B08B57]/20 mb-6" size={48} />
                        <h3 className="text-white text-sm uppercase tracking-widest mb-2">No Projects Found</h3>
                        <p className="text-[#555] uppercase tracking-[0.2em] text-[9px]">
                            Begin your first development project
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}