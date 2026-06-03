import React from 'react';
import { Briefcase, Search, BarChart3 } from 'lucide-react';
import Card from '../components/dashboard/Cards/Card';
// import TestGraph from '../components/dashboard/Graph/TestGraph';
import { useProject } from '../hook/useProject.js';

export default function DashboardLayout() {
    const { stats, isStatsLoading } = useProject();
    return (
        <div className="min-h-screen w-full bg-[#050505] text-slate-300 transition-colors duration-300">
            {/* Header Section */}
            <header className="border-b border-[#1A1A1A] px-6 py-8 md:px-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-[#1A1A1A] flex items-center justify-center border border-[#333] text-[#B08B57]">
                            <Briefcase size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight uppercase">SR Group Promoter & Builders</h1>
                            <p className="text-[10px] font-bold text-[#B08B57]  uppercase tracking-[0.2em] mt-1">
                                Executive Operations 
                            </p>
                        </div>
                    </div>


                </div>
            </header>

            {/* Main Content Area */}
            <main className="p-6 md:p-10 space-y-10 max-w-[1600px] mx-auto">
                {/* Metrics/Stats Card Section */}
                <section className="w-full">
                    <Card 
                    stats={stats}
                    isLoading={isStatsLoading}
                    />
                </section>

                {/* Analytics Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-[#B08B57]">
                            <BarChart3 size={14} />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Project Performance</h2>
                        </div>
                        <div className="h-px flex-1 bg-[#1A1A1A]" />
                    </div>
                        
                    <div className="h-[400px] w-full rounded-2xl bg-[#0A0A0A] border border-[#1A1A1A]" >
                    {/* <TestGraph/> */}
                    </div>

                   
                </section>
            </main>
        </div>
    );
}