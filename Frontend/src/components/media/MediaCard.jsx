import React from 'react';
import { Trash2, Eye } from 'lucide-react';

export default function MediaCard({ src, onDelete, onPreview }) {
    return (
        <div className="relative aspect-square w-full bg-[#0a0a0a] border border-[#B08B57]/20 overflow-hidden group">
            {/* Image Content */}
            <img 
                src={src} 
                alt="Project Media" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay Overlay Effect (Black & Gold Theme) */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                {/* Delete Action */}
                <button 
                    onClick={onDelete}
                    className="p-2 bg-black border border-[#B08B57] text-[#B08B57] hover:bg-[#B08B57] hover:text-black transition-all"
                    title="Delete Media"
                >
                    <Trash2 size={16} />
                </button>
            </div>
            
            {/* Subtle corner indicator */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#B08B57]/50" />
        </div>
    );
}