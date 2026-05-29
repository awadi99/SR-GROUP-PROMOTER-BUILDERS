import React from 'react';

export default function VideoPreview({ url }) {
    if (!url) return null;

    // Helper to convert standard URL to embed URL
    const getEmbedUrl = (url) => {
        if (url.includes('youtube.com/watch?v=')) {
            return url.replace('watch?v=', 'embed/');
        }
        return url;
    };

    return (
        <div className="w-full aspect-video bg-[#0a0a0a] border border-[#1a1a1a] overflow-hidden mt-2">
            <iframe
                className="w-full h-full"
                src={getEmbedUrl(url)}
                title="Project Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}