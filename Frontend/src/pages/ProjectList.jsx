import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import projects from "../constants/ProjectData"; // Aapka data source

export default function ProjectList() {
    const navigate = useNavigate();

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="min-h-screen bg-[#0A0A0A] p-6 md:p-10"
        >
            <div className="max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-2xl font-medium text-[#A68966] uppercase tracking-widest">Projects</h2>
                        <p className="text-[#555] text-sm mt-1">Manage and edit your luxury developments</p>
                    </div>
                    <button 
                        onClick={() => navigate('/dashboard/create-project')}
                        className="flex items-center gap-2 bg-[#A68966] text-black px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#8e7456] transition-colors"
                    >
                        <Plus size={16} /> New Project
                    </button>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {projects.map((project) => (
                        <motion.div 
                            key={project.id}
                            whileHover={{ y: -5 }}
                            className="bg-[#0F0F0F] border border-[#1A1A1A] p-6 group hover:border-[#A68966] transition-all"
                        >
                            <h3 className="text-white font-medium mb-1 truncate">{project.title}</h3>
                            <p className="text-[#555] text-xs mb-6 uppercase tracking-wider">{project.tagline}</p>
                            
                            <div className="flex items-center gap-4 pt-4 border-t border-[#1A1A1A]">
                                <button 
                                    onClick={() => navigate(`/dashboard/project/${project.id}`)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <Eye size={16} />
                                </button>
                                <button 
                                    onClick={() => navigate(`/dashboard/edit-project/${project.id}`)}
                                    className="text-gray-400 hover:text-[#A68966] transition-colors"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button className="text-gray-400 hover:text-red-500 transition-colors ml-auto">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}