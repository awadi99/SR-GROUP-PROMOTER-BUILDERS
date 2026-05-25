import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { mainSidebarItems } from "./navItems"; // Path check kara

const MenuItem = memo(({ item }) => {
    const Icon = item.icon;
    // Base classes for performance
    const activeClass = "bg-[#1A1A1A] border-[#D4AF37]/30 text-[#B08B57]";
    const inactiveClass = "text-[#666] hover:text-[#B08B57] hover:bg-[#0A0A0A]";

    return (
        <NavLink 
            to={item.path} 
            className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 border border-transparent ${isActive ? activeClass : inactiveClass}`
            }
        >
            <Icon size={18} strokeWidth={2} />
            <span className="text-[13px] font-semibold truncate">{item.name}</span>
        </NavLink>
    );
});

export default function SidebarMenu() {
    return (
        <nav className="flex flex-col gap-6 px-3 py-4 overflow-y-auto h-full">
            {mainSidebarItems.map((sec) => (
                <div key={sec.section} className="flex flex-col gap-1.5">
                    <h4 className="px-3.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#333]">
                        {sec.section}
                    </h4>
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