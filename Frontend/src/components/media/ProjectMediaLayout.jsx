import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


import ProjectGallery from './ProjectGallery';
import ProjectVideos from './ProjectVideos';
import LocationMaps from './LocationMaps';

export default function ProjectMediaLayout() {
    const [activeTab, setActiveTab] = useState('gallery');

    const tabs = [
        { id: 'gallery', label: 'Gallery' },
        { id: 'videos', label: 'Videos' },
        { id: 'location', label: 'Location' }
    ];

    return (
        <div className="w-full bg-[#050505] min-h-[500px]">
            {/* Tab Navigation Header */}
            <div className="flex items-center gap-8 border-b border-[#B08B57]/20 mb-10 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative py-4 text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${activeTab === tab.id ? 'text-[#B08B57]' : 'text-gray-600 hover:text-white'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="media-tab-indicator"
                                className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#B08B57]"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area - Framer Motion for lag-free transitions */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'gallery' && <ProjectGallery />}
                        {activeTab === 'videos' && <ProjectVideos />}
                        {activeTab === 'location' && <LocationMaps />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}