import React, { memo } from 'react';
import CardData from './CardData';

const DashboardCard = memo(({ card, value }) => {
    return (
        // SR Group Theme: Dark background with subtle gold/bronze border on hover
        <div className="relative p-6 rounded-2xl bg-[#0A0A0A] border border-[#1A1A1A] transition-all hover:border-[#B08B57]/30 hover:bg-[#0D0D0D] flex flex-col gap-5 overflow-hidden group">
            <div className="flex flex-col gap-5 relative z-10">
                {/* Unified Icon Style: Bronze Accent */}
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-[#141414] text-[#B08B57] border border-[#222]">
                    <card.Icon size={22} strokeWidth={1.5} />
                </div>
                
                <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555] group-hover:text-[#888]">
                        {card.title}
                    </p>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                        {value}
                    </h3>
                </div>
            </div>
            {/* Subtle bottom accent line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#B08B57] transition-all duration-500 group-hover:w-full" />
        </div>
    );
});

export default function Card({ stats }) {
    const data = stats || {};

    const getValue = (id) => {
        switch(id) {
            case 1: return data.totalProject ?? "0"; // 'totalStudents' ऐवजी 'totalProjects'
            case 2: return data.totalUser ?? "0"; // 'totalTests' ऐवजी 'activeEnquiries'
            // case 3: return data.galleryItems ?? "0";
            default: return "0";
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {CardData.map((card) => (
                <DashboardCard 
                    key={card.id} 
                    card={card} 
                    value={getValue(card.id)} 
                />
            ))}
        </div>
    );
}