import React from 'react';
import { Plus, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProjectListing({ projects = [] }) {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-7xl mx-auto p-6 md:p-10 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-2xl md:text-3xl font-light text-white tracking-[0.05em] uppercase">Project Inventory</h2>
                    <div className="h-[1px] w-20 bg-[#B08B57] mt-4"></div>
                </div>
                <button 
                    onClick={() => navigate('/dashboard/create')}
                    className="flex items-center gap-2 bg-[#B08B57] text-black px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#a07d4d] transition-all"
                >
                    <Plus size={14} /> New Project
                </button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <div 
                            key={project.id} 
                            onClick={() => navigate(`/dashboard/edit/${project.id}`)}
                            className="group cursor-pointer border border-[#B08B57]/10 bg-[#0a0a0a] hover:border-[#B08B57]/50 transition-all duration-500"
                        >
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <img 
                                    src={project.heroImage || '/placeholder.jpg'} 
                                    alt={project.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-white text-sm tracking-[0.1em] uppercase font-medium">{project.name}</h3>
                                <p className="text-[#B08B57]/60 text-[9px] uppercase tracking-[0.2em] mt-2">{project.location}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center border border-dashed border-[#B08B57]/20">
                        <Building2 className="mx-auto text-[#B08B57]/30 mb-4" size={32} />
                        <p className="text-[#B08B57]/50 uppercase tracking-[0.2em] text-[10px]">No projects found. Start by creating your first listing.</p>
                    </div>
                )}
            </div>
        </div>
    );
}