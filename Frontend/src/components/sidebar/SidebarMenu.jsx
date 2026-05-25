import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { mainSidebarItems } from "../../components/sidebar/navItems";

const MenuItem = memo(({ item }) => {
    const Icon = item.icon;

    return (
        <NavLink 
            to={item.path} 
            className={({ isActive }) => `
                flex items-center gap-3 px-3.5 py-2 rounded-lg transition-all duration-300 border border-transparent
                ${isActive 
                    ? "bg-[#1A1A1A] border-[#D4AF37]/30 text-[#B08B57] shadow-[0_0_15px_rgba(212,175,55,0.1)]" 
                    : "text-[#666] hover:text-[#B08B57] hover:bg-[#0D0D0D]"}
            `}
        >
            {({ isActive }) => (
                <>
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-[13px] font-semibold tracking-wide">
                        {item.name}
                    </span>
                </>
            )}
        </NavLink>
    );
});

export default function SidebarMenu() {
    return (
        <nav className="flex flex-col gap-6 px-3 py-4">
            {mainSidebarItems.map((sec) => (
                <div key={sec.section} className="flex flex-col gap-1.5">
                    {/* Section Header */}
                    <h4 className="px-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#333]">
                        {sec.section}
                    </h4>
                    {/* Menu Items */}
                    <div className="flex flex-col gap-0.5">
                        {sec.items.map((item) => (
                            <MenuItem key={item.name} item={item} />
                        ))}
                    </div>
                </div>
            ))}
        </nav>
    );
}