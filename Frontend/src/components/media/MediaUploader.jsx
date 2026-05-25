import React, { useState, useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';

export default function MediaUploader({ onUpload, label = "Upload Media" }) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFile = (file) => {
        if (!file) return;
        // In a real scenario, handle file compression or preview generation here
        onUpload(file);
    };

    return (
        <div className="w-full h-full aspect-square relative group">
            <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                onChange={(e) => handleFile(e.target.files[0])}
                accept="image/*"
            />
            
            <div 
                className={`w-full h-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                    isDragging 
                        ? 'border-[#B08B57] bg-[#B08B57]/10' 
                        : 'border-[#B08B57]/20 bg-[#0a0a0a] hover:border-[#B08B57]/50'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
                onClick={() => fileInputRef.current?.click()}
            >
                <UploadCloud 
                    className={`w-8 h-8 mb-3 transition-colors duration-300 ${isDragging ? 'text-[#B08B57]' : 'text-[#B08B57]/30'}`} 
                />
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#B08B57]/50 font-bold group-hover:text-[#B08B57] transition-colors">
                    {label}
                </span>
            </div>
        </div>
    );
}