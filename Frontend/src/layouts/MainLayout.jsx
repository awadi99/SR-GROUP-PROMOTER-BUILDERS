import { Outlet } from "react-router-dom";
import Sidebar from "../pages/SideBarPage";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen bg-[#050505] overflow-x-hidden selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
            {/* SIDEBAR - Left as is */}
            <Sidebar />

            {/* CONTENT AREA */}
            <div className="flex-1 flex flex-col min-w-0 md:ml-64 transition-all duration-300 ease-in-out">
                
                {/* HEADER - Kept as is */}
                <header className="fixed top-0 z-40 w-full h-14 px-6 flex items-center justify-between bg-transparent backdrop-blur-xl backdrop-saturate-150 will-change-transform">
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200/20 dark:via-white/[0.05] to-transparent" />
                </header>

                {/* MAIN CONTENT - Removed max-w-7xl and adjusted padding for compactness */}
                <main className="relative flex-1 p-3 md:p-6 w-full mt-14">
                    {/* Gold Background Glow */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#D4AF37]/[0.03] blur-[150px] rounded-full transform-gpu" />
                    </div>

                    {/* Removed max-w-7xl and mx-auto */}
                    <div className="relative z-10 w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}