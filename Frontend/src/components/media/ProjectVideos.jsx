import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ProjectVideos({ videos = [], onAdd, onDelete }) {
    const [videoUrl, setVideoUrl] = useState('');

    const handleAdd = () => {
        if (!videoUrl) return;
        onAdd(videoUrl);
        setVideoUrl('');
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700 w-full max-w-5xl mx-auto p-6">
            {/* Header */}
            <div>
                <h2 className="text-xl md:text-2xl font-light text-white tracking-[0.05em] uppercase">Project Videos</h2>
                <div className="h-[1px] w-12 bg-[#B08B57] mt-3"></div>
            </div>

            {/* Video Input Area */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Input 
                    placeholder="Paste YouTube or Vimeo URL..." 
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="bg-[#0a0a0a] border-[#B08B57]/20 focus:border-[#B08B57] text-white flex-1"
                />
                <Button 
                    onClick={handleAdd} 
                    className="bg-transparent border border-[#B08B57] text-[#B08B57] hover:bg-[#B08B57] hover:text-black transition-all px-8 py-3 uppercase tracking-[0.2em] text-[10px]"
                >
                    + Add Video
                </Button>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((url, index) => (
                    <div key={index} className="relative group aspect-video bg-black border border-[#B08B57]/20 overflow-hidden">
                        {/* Embed Preview */}
                        <iframe 
                            src={url.replace("watch?v=", "embed/")} 
                            className="w-full h-full"
                            allowFullScreen
                        />
                        
                        {/* Hover Delete Action */}
                        <button 
                            onClick={() => onDelete(index)}
                            className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-[#B08B57] px-3 py-1 text-[10px] uppercase tracking-[0.1em] opacity-0 group-hover:opacity-100 transition-all hover:bg-[#B08B57] hover:text-black"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {videos.length === 0 && (
                <div className="text-center py-20 border border-dashed border-[#B08B57]/20">
                    <p className="text-[#B08B57]/50 uppercase tracking-[0.2em] text-[10px]">No videos added to this project</p>
                </div>
            )}
        </div>
    );
}