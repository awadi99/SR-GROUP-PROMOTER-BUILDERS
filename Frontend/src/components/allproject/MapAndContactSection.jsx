import React from "react";
import { ArrowUpRight, Phone, Mail } from "lucide-react";

export default function MapAndContactSection({ project }) {
    // console.log(project)
// console.log(project?.location?.mapEmbed)
console.log(project?.location?.mapEmbed)
    // Guard clause to prevent rendering if project data is missing
    if (!project) return null;

    return (
        <>
            {/* ================= MAP LAYOUT LAYER - DARK THEME ================= */}
            <div className="bg-[#0A0A0A] rounded-[24px] sm:rounded-[30px] md:rounded-[36px] border border-[#A68966]/20 p-5 sm:p-6 md:p-8 mb-4 md:mb-6 [contain:layout_style]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
                    <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.18em] text-[#666666] font-medium">
                        Site Location & Landmarks
                    </p>
                    <button className="flex items-center gap-2 text-[#A68966] text-sm font-medium hover:opacity-80 transition-opacity">
                        Explore Location
                        <ArrowUpRight size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    <div className="rounded-[24px] overflow-hidden bg-[#1A1A1A] h-[350px] sm:h-[450px] transform-gpu border border-[#A68966]/10">
                        <iframe
                            title="Project Location Mapping"
                            src={project.location?.mapEmbed}
                            className="w-full h-full border-0"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
     
                    </div>

                    <div className="space-y-4 sm:space-y-5">
                        {/* Correctly accessing landmarks array from your MongoDB structure */}
                        {project.location?.landmarks?.map((item, i) => (
                            <div key={item._id?.$oid || i} className="bg-[#121212] rounded-[22px] border border-[#A68966]/10 px-5 sm:px-6 py-5 flex justify-between items-center gap-4 transition-all duration-300 hover:border-[#A68966]/40">
                                <div>
                                    <h3 className="text-lg sm:text-xl font-medium text-white mb-1">{item.name || "N/A"}</h3>
                                    <p className="text-[#666666] text-sm font-light">Premium Connectivity</p>
                                </div>
                                <div className="bg-[#1A1A1A] rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-[#A68966] whitespace-nowrap border border-[#A68966]/20">
                                    {item.distance ? `${item.distance} km` : "N/A"}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ================= PREMIUM CONTACT INTERFACE - DARK THEME ================= */}
            <div className="bg-[#0A0A0A] rounded-[24px] sm:rounded-[30px] md:rounded-[36px] border border-[#A68966]/20 p-5 sm:p-8 md:p-12 [contain:layout_style]">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-10 lg:gap-16">

                    <div>
                        <p className="uppercase tracking-[0.18em] text-[10px] sm:text-[11px] text-[#666666] mb-5 sm:mb-6 font-medium">Contact Information</p>
                        <h2 className="text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] tracking-[-0.05em] font-medium text-white mb-6 sm:mb-8">
                            Schedule a <br /> private presentation.
                        </h2>
                        <p className="text-[#AAAAAA] leading-8 sm:leading-9 text-[14px] sm:text-[16px] max-w-xl font-light">
                            Connect with our sales consultants for brochures, pricing details, floor plans, and personalized project walkthroughs.
                        </p>
                    </div>

                    <div className="space-y-4 sm:space-y-5">
                        <div className="bg-[#121212] rounded-[22px] border border-[#A68966]/10 p-5 sm:p-6 flex items-center gap-4 sm:gap-5">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#A68966] shrink-0 border border-[#A68966]/20">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-[#666666] text-sm mb-1 font-light">Phone</p>
                                <h3 className="text-lg sm:text-2xl font-medium text-white break-all tracking-tight">{project.contact?.phone || "N/A"}</h3>
                            </div>
                        </div>

                        <div className="bg-[#121212] rounded-[22px] border border-[#A68966]/10 p-5 sm:p-6 flex items-center gap-4 sm:gap-5">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#A68966] shrink-0 border border-[#A68966]/20">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-[#666666] text-sm mb-1 font-light">Email</p>
                                <h3 className="text-base sm:text-xl font-medium text-white break-all tracking-tight">{project.contact?.email || "N/A"}</h3>
                            </div>
                        </div>

                        <div className="bg-[#121212] rounded-[22px] border border-[#A68966]/10 p-5 sm:p-6">
                            <p className="text-[#666666] text-sm mb-2 font-light">Sales Manager</p>
                            <h3 className="text-base sm:text-lg leading-7 sm:leading-8 font-medium text-white capitalize">
                                {project.contact?.salesManagerName || "N/A"}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}