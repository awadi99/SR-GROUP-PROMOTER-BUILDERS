import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useDeleteProject } from '../../hook/useProject.js';
import DeleteConfirmation from './DeleteConfirmation';

export default function DeleteProjectPage({ projects = [] }) {
    const { deleteProject, isDeleting } = useDeleteProject(); 
    const [selectedProject, setSelectedProject] = useState(null);

    const handleDelete = (id) => {
        // We use $oid if it's a raw MongoDB object, otherwise just the id
        const projectId = id.$oid || id; 
        deleteProject(projectId, {
            onSuccess: () => {
                setSelectedProject(null); 
            }
        });
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6 md:p-10 animate-in fade-in duration-700 bg-[#0A0A0A]">
            <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light text-white tracking-[0.05em] uppercase">
                    Delete Projects
                </h2>
                <div className="h-[2px] w-12 bg-red-600 mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    // Use project._id.$oid for the key to ensure uniqueness
                    <div key={project._id.$oid || project._id} className="group relative border border-[#1a1a1a] bg-[#050505] hover:border-red-900/50 transition-all duration-500 overflow-hidden">
                        <div className="aspect-[4/3] overflow-hidden relative">
                            {/* Correct path: project.vision.images[0] */}
                            <img 
                                src={project.vision?.images?.[0] || '/placeholder.jpg'} 
                                alt={project.identity?.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <button 
                                    onClick={() => setSelectedProject(project)}
                                    className="flex items-center gap-2 text-white bg-red-600 px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-red-700 transition-colors"
                                >
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            {/* Correct path: project.identity.title */}
                            <h3 className="text-white text-sm tracking-[0.1em] uppercase font-medium">
                                {project.identity?.title}
                            </h3>
                            <p className="text-[#555] text-[9px] uppercase tracking-[0.2em] mt-2 font-bold">
                                {project.location?.landmarks?.[0]?.name ? `Near ${project.location.landmarks[0].name}` : "No Location Set"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <DeleteConfirmation 
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                onConfirm={() => handleDelete(selectedProject._id)} 
                projectName={selectedProject?.identity?.title} // Correct path for title
                isDeleting={isDeleting}
            />
        </div>
    );
}