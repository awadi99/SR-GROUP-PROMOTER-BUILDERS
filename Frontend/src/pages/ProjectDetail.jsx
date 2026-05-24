import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
    ArrowLeft,
    ArrowUpRight,
    MapPin,
    Play,
    Phone,
    Mail,
    Download,
} from "lucide-react";

import projects from "../constants/ProjectData";

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const project = projects.find((p) => p.id === id);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F1EA] px-4">
                <h1 className="text-xl sm:text-2xl text-[#1E1E1E] font-medium text-center">
                    Project Not Found
                </h1>
            </div>
        );
    }

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#F5F1EA] min-h-screen text-[#1E1E1E]"
        >
            <div className="w-full max-w-[1700px] mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">

                {/* ================= HERO SECTION ================= */}

                <div className="grid grid-cols-1 xl:grid-cols-[1.7fr_0.8fr] gap-4 md:gap-6 mb-4 md:mb-6">

                    {/* HERO LEFT */}
                    <div className="relative rounded-[24px] sm:rounded-[28px] md:rounded-[36px] overflow-hidden border border-[#DED8CF] bg-white">

                        {/* IMAGE */}
                        <div className="relative h-[500px] sm:h-[650px] lg:h-[780px]">

                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />

                            {/* OVERLAY */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                            {/* BACK BUTTON */}
                            <button
                                onClick={() => navigate(-1)}
                                className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 bg-white/85 backdrop-blur-md border border-white/40 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2 text-xs sm:text-sm hover:bg-white transition-all"
                            >
                                <ArrowLeft size={16} />
                                Back
                            </button>

                            {/* CONTENT */}
                            <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 lg:left-10 right-4 z-20">

                                <p className="uppercase tracking-[0.22em] text-[10px] sm:text-[11px] text-white/80 mb-3 sm:mb-5">
                                    Luxury Residences
                                </p>

                                <h1 className="text-[clamp(2.2rem,7vw,6rem)] leading-[0.92] tracking-[-0.05em] text-white font-medium mb-4 sm:mb-6">
                                    {project.title}
                                </h1>

                                <p className="max-w-2xl text-white/80 leading-7 sm:leading-8 text-[13px] sm:text-[15px] mb-5 sm:mb-8">
                                    {project.description}
                                </p>

                                {/* TAGS */}
                                <div className="flex flex-wrap gap-2 sm:gap-3">

                                    <div className="bg-white/85 backdrop-blur-md rounded-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2 text-xs sm:text-sm">
                                        <MapPin size={14} />
                                        {project.location}
                                    </div>

                                    <div className="bg-white/85 backdrop-blur-md rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm">
                                        {project.status}
                                    </div>

                                    <div className="bg-white/85 backdrop-blur-md rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm">
                                        {project.possession}
                                    </div>
                                </div>
                            </div>

                            {/* FLOATING SPECS */}
                            <div className="hidden lg:block absolute bottom-0 right-0 p-6">
                                <div className="bg-white/90 backdrop-blur-xl rounded-[28px] border border-white/40 p-6 w-[360px]">

                                    <div className="grid grid-cols-2 gap-6">

                                        <div>
                                            <p className="text-[#7A746B] text-[10px] uppercase tracking-[0.18em] mb-2">
                                                Towers
                                            </p>

                                            <h3 className="text-2xl font-medium">
                                                {project.specs.towers}
                                            </h3>
                                        </div>

                                        <div>
                                            <p className="text-[#7A746B] text-[10px] uppercase tracking-[0.18em] mb-2">
                                                Floors
                                            </p>

                                            <h3 className="text-2xl font-medium">
                                                {project.specs.floors}
                                            </h3>
                                        </div>

                                        <div>
                                            <p className="text-[#7A746B] text-[10px] uppercase tracking-[0.18em] mb-2">
                                                Architect
                                            </p>

                                            <h3 className="text-base font-medium">
                                                {project.specs.architect}
                                            </h3>
                                        </div>

                                        <div>
                                            <p className="text-[#7A746B] text-[10px] uppercase tracking-[0.18em] mb-2">
                                                RERA
                                            </p>

                                            <h3 className="text-base font-medium">
                                                {project.rera}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <div className="space-y-4 md:space-y-6 xl:sticky xl:top-6 self-start">

                        {/* RESIDENCE */}
                        <div className="bg-[#F8F5F0] rounded-[24px] sm:rounded-[30px] border border-[#DED8CF] p-4 sm:p-5">

                            <div className="flex justify-between items-center mb-5">

                                <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.18em] text-[#7A746B]">
                                    Available Residences
                                </p>

                                <span className="text-[#B08B57] text-xs sm:text-sm">
                                    Premium Living
                                </span>
                            </div>

                            <div className="space-y-4 sm:space-y-5">

                                {project.units.map((unit, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-[22px] overflow-hidden border border-[#E7E1D8]"
                                    >

                                        <img
                                            src={unit.image}
                                            alt={unit.type}
                                            className="w-full h-[180px] sm:h-[220px] object-cover hover:scale-[1.015] transition duration-700"
                                        />

                                        <div className="p-4 sm:p-5">

                                            <div className="flex justify-between gap-4 mb-5">

                                                <div>
                                                    <h3 className="text-xl sm:text-2xl font-medium mb-1">
                                                        {unit.type}
                                                    </h3>

                                                    <p className="text-[#7A746B] text-sm">
                                                        {unit.area}
                                                    </p>
                                                </div>

                                                <div className="text-[#B08B57] text-sm whitespace-nowrap">
                                                    {unit.price}
                                                </div>
                                            </div>

                                            <button className="w-full border border-[#DED8CF] rounded-full py-3 text-sm hover:bg-[#F5F1EA] transition-all">
                                                View Floor Plan
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* VIDEO */}
                        <div className="bg-[#F8F5F0] rounded-[24px] sm:rounded-[30px] border border-[#DED8CF] p-4 sm:p-5">

                            <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.18em] text-[#7A746B] mb-5">
                                Cinematic Tour
                            </p>

                            <div className="relative rounded-[22px] overflow-hidden">

                                <video
                                    src={project.video}
                                    className="w-full h-[220px] sm:h-[280px] object-cover"
                                    controls
                                />

                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center">

                                        <Play
                                            size={22}
                                            className="text-[#1E1E1E] ml-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= ARCHITECTURE ================= */}

                <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-4 md:gap-6 mb-4 md:mb-6">

                    {/* LEFT */}
                    <div className="bg-[#F8F5F0] rounded-[24px] sm:rounded-[30px] md:rounded-[36px] border border-[#DED8CF] p-5 sm:p-6 md:p-8">

                        <div className="flex justify-between items-center mb-8 sm:mb-10">

                            <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.18em] text-[#7A746B]">
                                Architectural Vision
                            </p>

                            <span className="text-[#B08B57] text-xs sm:text-sm">
                                Curated Living
                            </span>
                        </div>

                        {/* GALLERY */}
                        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-4 mb-8 sm:mb-10">

                            <div className="rounded-[24px] overflow-hidden">
                                <img
                                    src={project.gallery[0]}
                                    alt=""
                                    className="w-full h-[300px] md:h-full object-cover hover:scale-[1.015] transition duration-700"
                                />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">

                                <div className="rounded-[24px] overflow-hidden h-[150px] sm:h-[200px]">
                                    <img
                                        src={project.gallery[1]}
                                        alt=""
                                        className="w-full h-full object-cover hover:scale-[1.015] transition duration-700"
                                    />
                                </div>

                                <div className="rounded-[24px] overflow-hidden h-[150px] sm:h-[200px]">
                                    <img
                                        src={project.gallery[2]}
                                        alt=""
                                        className="w-full h-full object-cover hover:scale-[1.015] transition duration-700"
                                    />
                                </div>
                            </div>
                        </div>

                        <p className="text-[#5E5A54] leading-8 sm:leading-9 text-[14px] sm:text-[16px]">
                            {project.longDescription}
                        </p>

                        {/* HIGHLIGHTS */}
                        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

                            {project.highlights.map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-[22px] border border-[#E7E1D8] p-5 sm:p-6"
                                >

                                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F5F1EA] flex items-center justify-center text-[#B08B57] mb-5">
                                        0{i + 1}
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-medium">
                                        {item}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-4 md:space-y-6">

                        {/* SPECS */}
                        <div className="bg-[#F8F5F0] rounded-[24px] sm:rounded-[30px] border border-[#DED8CF] p-5 sm:p-6 md:p-8">

                            <div className="flex justify-between items-center mb-8 sm:mb-10">

                                <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.18em] text-[#7A746B]">
                                    Project Specifications
                                </p>

                                <span className="text-[#B08B57] text-xs sm:text-sm">
                                    Overview
                                </span>
                            </div>

                            <div className="space-y-5 sm:space-y-6">

                                {Object.entries(project.specs).map(
                                    ([key, value], i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between gap-4 border-b border-[#E7E1D8] pb-4"
                                        >

                                            <span className="uppercase text-[10px] sm:text-[11px] tracking-[0.15em] text-[#7A746B]">
                                                {key}
                                            </span>

                                            <span className="font-medium text-right text-sm sm:text-base">
                                                {value}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* MINI GALLERY */}
                        <div className="bg-[#F8F5F0] rounded-[24px] sm:rounded-[30px] border border-[#DED8CF] p-4 sm:p-5">

                            <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.18em] text-[#7A746B] mb-5">
                                Selected Perspectives
                            </p>

                            <div className="grid grid-cols-2 gap-3">

                                {project.gallery.map((img, i) => (
                                    <div
                                        key={i}
                                        className={`overflow-hidden rounded-[18px] ${i === 0
                                                ? "col-span-2 h-[220px]"
                                                : "h-[130px] sm:h-[150px]"
                                            }`}
                                    >

                                        <img
                                            src={img}
                                            alt=""
                                            className="w-full h-full object-cover hover:scale-[1.015] transition duration-700"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= MAP SECTION ================= */}

                <div className="bg-[#F8F5F0] rounded-[24px] sm:rounded-[30px] md:rounded-[36px] border border-[#DED8CF] p-5 sm:p-6 md:p-8 mb-4 md:mb-6">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">

                        <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.18em] text-[#7A746B]">
                            Site Location & Landmarks
                        </p>

                        <button className="flex items-center gap-2 text-[#B08B57] text-sm">
                            Explore Location
                            <ArrowUpRight size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

                        {/* MAP */}
                        <div className="rounded-[24px] overflow-hidden bg-[#EAE4DA] h-[350px] sm:h-[450px]">

                            <iframe
                                title="map"
                                src={project.mapEmbed}
                                className="w-full h-full border-0"
                            />
                        </div>

                        {/* LANDMARKS */}
                        <div className="space-y-4 sm:space-y-5">

                            {project.landmarks.map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-[22px] border border-[#E7E1D8] px-5 sm:px-6 py-5 flex justify-between items-center gap-4"
                                >

                                    <div>
                                        <h3 className="text-lg sm:text-xl font-medium mb-1">
                                            {item.name}
                                        </h3>

                                        <p className="text-[#7A746B] text-sm">
                                            Premium Connectivity
                                        </p>
                                    </div>

                                    <div className="bg-[#F5F1EA] rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm text-[#B08B57] whitespace-nowrap">
                                        {item.distance}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ================= CONTACT ================= */}

                <div className="bg-[#F8F5F0] rounded-[24px] sm:rounded-[30px] md:rounded-[36px] border border-[#DED8CF] p-5 sm:p-8 md:p-12">

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-10 lg:gap-16">

                        {/* LEFT */}
                        <div>

                            <p className="uppercase tracking-[0.18em] text-[10px] sm:text-[11px] text-[#7A746B] mb-5 sm:mb-6">
                                Contact Information
                            </p>

                            <h2 className="text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] tracking-[-0.05em] font-medium mb-6 sm:mb-8">
                                Schedule a
                                <br />
                                private presentation.
                            </h2>

                            <p className="text-[#6B665E] leading-8 sm:leading-9 text-[14px] sm:text-[16px] max-w-xl">
                                Connect with our sales consultants for
                                brochures, pricing details, floor plans,
                                and personalized project walkthroughs.
                            </p>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-4 sm:space-y-5">

                            {/* PHONE */}
                            <div className="bg-white rounded-[22px] border border-[#E7E1D8] p-5 sm:p-6 flex items-center gap-4 sm:gap-5">

                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F5F1EA] flex items-center justify-center text-[#B08B57] shrink-0">
                                    <Phone size={20} />
                                </div>

                                <div>
                                    <p className="text-[#7A746B] text-sm mb-1">
                                        Phone
                                    </p>

                                    <h3 className="text-lg sm:text-2xl font-medium break-all">
                                        {project.contact.phone}
                                    </h3>
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="bg-white rounded-[22px] border border-[#E7E1D8] p-5 sm:p-6 flex items-center gap-4 sm:gap-5">

                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F5F1EA] flex items-center justify-center text-[#B08B57] shrink-0">
                                    <Mail size={20} />
                                </div>

                                <div>
                                    <p className="text-[#7A746B] text-sm mb-1">
                                        Email
                                    </p>

                                    <h3 className="text-base sm:text-xl font-medium break-all">
                                        {project.contact.email}
                                    </h3>
                                </div>
                            </div>

                            {/* ADDRESS */}
                            <div className="bg-white rounded-[22px] border border-[#E7E1D8] p-5 sm:p-6">

                                <p className="text-[#7A746B] text-sm mb-2">
                                    Address
                                </p>

                                <h3 className="text-base sm:text-lg leading-7 sm:leading-8 font-medium">
                                    {project.contact.address}
                                </h3>
                            </div>

                            {/* BUTTONS */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">

                                <button className="bg-[#B08B57] hover:bg-[#9E7844] transition-all text-white px-7 sm:px-8 py-4 rounded-full text-sm flex items-center justify-center gap-2">
                                    Schedule Visit
                                    <ArrowUpRight size={16} />
                                </button>

                                <button className="border border-[#DED8CF] hover:bg-white transition-all px-7 sm:px-8 py-4 rounded-full text-sm flex items-center justify-center gap-2">
                                    Download Brochure
                                    <Download size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}