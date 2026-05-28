// src/components/profile/ProfileDetail.jsx

import React from 'react';

export default function ProfileDetail({ icon, label, value }) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-[#1A1A1A] bg-[#0B0B0B] hover:border-[#B08B57]/30 transition-all duration-500">

            {/* GOLD HOVER EFFECT */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#B08B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative flex items-center gap-5 p-6">

                {/* ICON */}
                <div className="w-12 h-12 rounded-2xl bg-[#B08B57]/10 border border-[#B08B57]/20 flex items-center justify-center text-[#B08B57]">
                    {icon}
                </div>

                {/* CONTENT */}
                <div>
                    <p className="text-[#666] text-[10px] uppercase tracking-[0.3em] mb-1">
                        {label}
                    </p>

                    <p className="text-white text-base font-medium break-all">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}