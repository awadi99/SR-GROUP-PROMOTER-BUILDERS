import React, { useState, useCallback } from "react";
import { Menu, X, LayoutDashboard } from "lucide-react";
import SidebarMenu from "../components/sidebar/SidebarMenu";

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const toggleSidebar = useCallback(() => setOpen(prev => !prev), []);

    return (
        <>
            {/* MOBILE TRIGGER */}
            {!open && (
                <button
                    onClick={toggleSidebar}
                    className="md:hidden fixed top-5 left-5 z-[60] p-2.5 rounded-lg bg-[#0A0A0A] border border-[#222] shadow-xl active:scale-95 transition-all"
                >
                    <Menu size={20} className="text-white" />
                </button>
            )}

            {/* OVERLAY */}
            <div 
                onClick={toggleSidebar}
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] md:hidden transition-opacity duration-300 ${
                    open ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            />

            {/* SIDEBAR */}
            <aside
                className={`
                    fixed top-0 left-0 h-screen w-64 z-[80]
                    flex flex-col border-r border-[#1a1a1a] bg-[#050505]
                    transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
                {/* BRANDING */}
                <div className="px-6 py-10">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-white/6 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            <img src="/image/logoBG.png" className="h-8 w-8 object-contain" alt="SR Group" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-white font-bold text-lg tracking-tight">SR GROUP</h1>
                            <div className="flex items-center gap-1.5">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <span className="text-[9px] font-bold text-[#666] uppercase tracking-[0.2em]">Live Systems</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* NAVIGATION */}
                <div className="flex-1 px-4 py-2">
                    <SidebarMenu expanded={true} />
                </div>

                {/* BOTTOM STATUS */}
                <div className="p-6 border-t border-[#1a1a1a]">
                    <div className="group flex items-center gap-3 p-3 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#333] transition-colors">
                        <div className="h-8 w-8 rounded-lg bg-[#111] flex items-center justify-center text-[#444] group-hover:text-white transition-colors">
                            <LayoutDashboard size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white text-[11px] font-bold">Admin Portal</span>
                            <span className="text-[#555] text-[9px] uppercase tracking-wider">SRG Global</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}