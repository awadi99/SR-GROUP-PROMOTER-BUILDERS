import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { mainSidebarItems } from "./navItems";
import { useAuth } from "../../hook/useAuth"; // Update this path to your hook location

const MenuItem = memo(({ item, onLogout, isPending }) => {
    const Icon = item.icon;

    // Styling configuration
    const baseClass = "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 border border-transparent";
    const activeClass = "bg-[#1A1A1A] border-[#D4AF37]/30 text-[#B08B57]";
    const inactiveClass = "text-[#666] hover:text-[#B08B57] hover:bg-[#0A0A0A]";
    const dangerClass = "text-red-500 hover:bg-red-950/20 hover:text-red-400";

    // 1. Logic for Logout (Button)
    if (item.name === "Logout") {
        return (
            <button
                onClick={onLogout}
                disabled={isPending}
                className={`${baseClass} ${dangerClass} w-full text-left ${isPending ? 'opacity-50 cursor-wait' : ''}`}
            >
                <Icon size={18} strokeWidth={2} />
                <span className="text-[13px] font-semibold truncate">
                    {isPending ? "Logging out..." : item.name}
                </span>
            </button>
        );
    }

    // 2. Logic for Standard Navigation (NavLink)
    return (
        <NavLink
            to={item.path}
            className={({ isActive }) =>
                `${baseClass} ${item.danger ? dangerClass : (isActive ? activeClass : inactiveClass)}`
            }
        >
            <Icon size={18} strokeWidth={2} />
            <span className="text-[13px] font-semibold truncate">{item.name}</span>
        </NavLink>
    );
});

MenuItem.displayName = "MenuItem";

export default function SidebarMenu() {
    const { logout } = useAuth();

    const handleLogout = () => {
        // Trigger the mutation defined in your hook
        logout.mutate();
    };

    return (
        <nav className="flex flex-col gap-6 px-3 py-4 overflow-y-auto h-full">
            {mainSidebarItems.map((sec) => (
                <div key={sec.section} className="flex flex-col gap-1.5">
                    {/* Section Header */}
                    <h4 className="px-3.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#333]">
                        {sec.section}
                    </h4>
                    
                    {/* Menu Items */}
                    <div className="flex flex-col gap-0.5">
                        {sec.items.map((item) => (
                            <MenuItem 
                                key={item.name} 
                                item={item} 
                                onLogout={handleLogout}
                                // Pass the pending state to the button
                                isPending={item.name === "Logout" && logout.isPending} 
                            />
                        ))}
                    </div>
                </div>
            ))}
        </nav>
    );
}