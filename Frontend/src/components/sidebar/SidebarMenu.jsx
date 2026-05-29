import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { mainSidebarItems } from "./navItems";
import { useAuth } from '../../hook/useAuth.js';

const MenuItem = memo(({ item, onLogout, isPending }) => {
    const Icon = item.icon;

    // Styling configuration shared by both links and buttons
    const baseClass = "flex items-center gap-3 px-3.5 py-2 rounded-lg transition-all duration-300 border border-transparent";
    const activeClass = "bg-[#1A1A1A] border-[#D4AF37]/30 text-[#B08B57] shadow-[0_0_15px_rgba(212,175,55,0.1)]";
    const inactiveClass = "text-[#666] hover:text-[#B08B57] hover:bg-[#0D0D0D]";
    const dangerClass = "text-red-500 hover:text-red-400 hover:bg-red-950/20";

    // 1. Logic for Logout (Action Button)
    if (item.name === "Logout") {
        return (
            <button
                onClick={onLogout}
                disabled={isPending}
                className={`${baseClass} ${dangerClass} w-full text-left ${isPending ? 'opacity-50 cursor-wait' : ''}`}
            >
                <Icon size={18} />
                <span className="text-[13px] font-semibold tracking-wide">
                    {isPending ? "Logging out..." : item.name}
                </span>
            </button>
        );
    }

    // 2. Logic for Standard Navigation (NavLink)
    return (
        <NavLink 
            to={item.path} 
            className={({ isActive }) => `
                ${baseClass} 
                ${item.danger ? dangerClass : (isActive ? activeClass : inactiveClass)}
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

MenuItem.displayName = "MenuItem";

export default function SidebarMenu() {
    const { logout } = useAuth();

    const handleLogout = () => {
        // Trigger the TanStack Query mutation
        logout.mutate();
    };

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
                            <MenuItem 
                                key={item.name} 
                                item={item} 
                                onLogout={handleLogout}
                                // Pass loading state to trigger visual feedback
                                isPending={item.name === "Logout" && logout.isPending}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </nav>
    );
}