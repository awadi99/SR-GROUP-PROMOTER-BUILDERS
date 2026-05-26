import React from 'react';

export default function ProfileDetail({ icon, label, value }) {
    return (
        <div className="flex items-start gap-4">
            <div className="text-[#B08B57] mt-1">{icon}</div>
            <div>
                <p className="text-[#555] text-[9px] uppercase tracking-widest">{label}</p>
                <p className="text-white text-sm font-medium">{value}</p>
            </div>
        </div>
    );
}