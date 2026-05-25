import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function LocationMaps({ embedUrl, onUpdate }) {
    const [url, setUrl] = useState(embedUrl || '');

    return (
        <div className="space-y-10 animate-in fade-in duration-700 w-full max-w-6xl mx-auto p-6">
            {/* Header */}
            <div>
                <h2 className="text-xl md:text-2xl font-light text-white tracking-[0.05em] uppercase">Location & Maps</h2>
                <div className="h-[1px] w-12 bg-[#B08B57] mt-3"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* 1. Control Panel */}
                <div className="space-y-8">
                    <Input 
                        label="Google Maps Embed URL"
                        placeholder="https://www.google.com/maps/embed?..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="bg-[#0a0a0a] border-[#B08B57]/20 focus:border-[#B08B57] text-white"
                    />
                    
                    <Button 
                        onClick={() => onUpdate(url)}
                        className="w-full bg-transparent border border-[#B08B57] text-[#B08B57] hover:bg-[#B08B57] hover:text-black transition-all py-3 uppercase tracking-[0.2em] text-[10px]"
                    >
                        Save Map Configuration
                    </Button>

                    <div className="p-4 border border-[#B08B57]/10 bg-[#0a0a0a]/50">
                        <p className="text-[#B08B57]/60 text-[10px] uppercase tracking-[0.1em] font-bold mb-2">Instructions</p>
                        <ul className="text-gray-400 text-[11px] space-y-2 list-disc pl-4">
                            <li>Go to Google Maps and find your project location.</li>
                            <li>Click "Share" and select "Embed a map".</li>
                            <li>Copy the <strong>src</strong> URL from the generated HTML code.</li>
                        </ul>
                    </div>
                </div>

                {/* 2. Live Preview Panel */}
                <div className="aspect-video w-full border border-[#B08B57]/20 bg-[#0a0a0a] overflow-hidden relative group">
                    {url ? (
                        <iframe 
                            src={url} 
                            className="w-full h-full grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                            allowFullScreen
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-[#B08B57]/30 uppercase tracking-[0.2em] text-[10px]">No Map Preview Available</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}