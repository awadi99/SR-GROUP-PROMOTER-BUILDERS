import React from 'react';
import { X } from 'lucide-react';

export default function ImageGallery({ images, onRemove }) {
    if (!images || images.length === 0) return null;

    return (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-4">
            {images.map((url, i) => (
                <div key={i} className="relative aspect-square overflow-hidden border border-[#1a1a1a] group">
                    <img 
                        src={url} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        alt={`Unit view ${i + 1}`} 
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-end p-1">
                        <button 
                            type="button" 
                            onClick={() => onRemove(i)}
                            className="bg-red-600/80 text-white p-1 rounded hover:bg-red-600 transition-colors"
                        >
                            <X size={12} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}