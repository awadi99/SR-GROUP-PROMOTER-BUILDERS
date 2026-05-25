import React from 'react';
import MediaUploader from './MediaUploader';
import MediaCard from './MediaCard';

export default function ProjectGallery({ images = [], onAdd, onDelete }) {
    // Note: 'images' prop would come from your state/store/database
    
    return (
        <div className="space-y-10 animate-in fade-in duration-700 w-full max-w-5xl mx-auto p-6">
            {/* Header */}
            <div>
                <h2 className="text-xl md:text-2xl font-light text-white tracking-[0.05em] uppercase">Project Gallery</h2>
                <div className="h-[1px] w-12 bg-[#B08B57] mt-3"></div>
            </div>

            {/* Gallery Grid */}
            {/* Using grid-cols-2 for mobile, 3 for tablet, 4 for desktop for perfect responsiveness */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                
                {/* 1. Existing Media */}
                {images.map((url, index) => (
                    <MediaCard 
                        key={index} 
                        src={url} 
                        onDelete={() => onDelete(index)} 
                    />
                ))}

                {/* 2. Upload Slot - Keeps the grid balanced */}
                <div className="aspect-square">
                    <MediaUploader 
                        label="Add New Image" 
                        onUpload={onAdd} 
                    />
                </div>
            </div>
            
            {/* Empty State Message if no images */}
            {images.length === 0 && (
                <div className="text-center py-20 border border-dashed border-[#B08B57]/20">
                    <p className="text-[#B08B57]/50 uppercase tracking-[0.2em] text-[10px]">No media uploaded yet</p>
                </div>
            )}
        </div>
    );
}