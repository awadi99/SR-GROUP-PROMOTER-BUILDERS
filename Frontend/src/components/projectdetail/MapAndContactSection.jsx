import React from "react";
import { ArrowUpRight, Phone, Mail, Download } from "lucide-react";

export default function MapAndContactSection({ project }) {
    return (
        <>
            {/* ================= MAP LAYOUT LAYER ================= */}
            <div className="bg-[#F8F5F0] rounded-[24px] sm:rounded-[30px] md:rounded-[36px] border border-[#DED8CF] p-5 sm:p-6 md:p-8 mb-4 md:mb-6 [contain:layout_style]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
                    <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.18em] text-[#7A746B] font-medium">
                        Site Location & Landmarks
                    </p>
                    <button className="flex items-center gap-2 text-[#B08B57] text-sm font-medium hover:opacity-80 transition-opacity">
                        Explore Location
                        <ArrowUpRight size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    <div className="rounded-[24px] overflow-hidden bg-[#EAE4DA] h-[350px] sm:h-[450px] transform-gpu">
                        <iframe
                            title="Project Location Mapping"
                            src={project.mapEmbed}
                            className="w-full h-full border-0"
                            loading="lazy"
                            allowFullScreen
                        />
                    </div>

                    <div className="space-y-4 sm:space-y-5">
                        {project.landmarks.map((item, i) => (
                            <div key={i} className="bg-white rounded-[22px] border border-[#E7E1D8] px-5 sm:px-6 py-5 flex justify-between items-center gap-4 transition-all duration-300 hover:border-[#B08B57]/30">
                                <div>
                                    <h3 className="text-lg sm:text-xl font-medium text-[#1E1E1E] mb-1">{item.name}</h3>
                                    <p className="text-[#7A746B] text-sm font-light">Premium Connectivity</p>
                                </div>
                                <div className="bg-[#F5F1EA] rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-[#B08B57] whitespace-nowrap">
                                    {item.distance}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ================= PREMIUM CONTACT INTERFACE ================= */}
            <div className="bg-[#F8F5F0] rounded-[24px] sm:rounded-[30px] md:rounded-[36px] border border-[#DED8CF] p-5 sm:p-8 md:p-12 [contain:layout_style]">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-10 lg:gap-16">

                    <div>
                        <p className="uppercase tracking-[0.18em] text-[10px] sm:text-[11px] text-[#7A746B] mb-5 sm:mb-6 font-medium">Contact Information</p>
                        <h2 className="text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] tracking-[-0.05em] font-medium text-[#1E1E1E] mb-6 sm:mb-8">
                            Schedule a <br /> private presentation.
                        </h2>
                        <p className="text-[#6B665E] leading-8 sm:leading-9 text-[14px] sm:text-[16px] max-w-xl font-light">
                            Connect with our sales consultants for brochures, pricing details, floor plans, and personalized project walkthroughs.
                        </p>
                    </div>

                    <div className="space-y-4 sm:space-y-5">
                        <div className="bg-white rounded-[22px] border border-[#E7E1D8] p-5 sm:p-6 flex items-center gap-4 sm:gap-5">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F5F1EA] flex items-center justify-center text-[#B08B57] shrink-0">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-[#7A746B] text-sm mb-1 font-light">Phone</p>
                                <h3 className="text-lg sm:text-2xl font-medium text-[#1E1E1E] break-all tracking-tight">{project.contact.phone}</h3>
                            </div>
                        </div>

                        <div className="bg-white rounded-[22px] border border-[#E7E1D8] p-5 sm:p-6 flex items-center gap-4 sm:gap-5">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F5F1EA] flex items-center justify-center text-[#B08B57] shrink-0">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-[#7A746B] text-sm mb-1 font-light">Email</p>
                                <h3 className="text-base sm:text-xl font-medium text-[#1E1E1E] break-all tracking-tight">{project.contact.email}</h3>
                            </div>
                        </div>

                        <div className="bg-white rounded-[22px] border border-[#E7E1D8] p-5 sm:p-6">
                            <p className="text-[#7A746B] text-sm mb-2 font-light">Address</p>
                            <h3 className="text-base sm:text-lg leading-7 sm:leading-8 font-medium text-[#1E1E1E]">{project.contact.address}</h3>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                            <button className="bg-[#B08B57] hover:bg-[#9E7844] active:scale-[0.98] text-white font-medium px-7 sm:px-8 py-4 rounded-full text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-sm w-full sm:w-auto">
                                Schedule Visit
                                <ArrowUpRight size={16} />
                            </button>
                            <button className="border border-[#DED8CF] bg-white text-[#1E1E1E] font-medium hover:bg-[#FAF9F6] active:scale-[0.98] px-7 sm:px-8 py-4 rounded-full text-sm flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto">
                                Download Brochure
                                <Download size={16} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}