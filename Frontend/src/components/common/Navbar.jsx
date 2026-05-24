import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLenis } from '../scroll/SmoothScroll';
import { useNavigate } from "react-router-dom";

const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const lenis = useLenis();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            lenis?.stop();
            document.body.style.overflow = "hidden";
        } else {
            lenis?.start();
            document.body.style.overflow = "auto";
        }
    }, [isOpen, lenis]);

    const handleScrollTo = (e, href) => {
        e.preventDefault();
        if (isOpen) setIsOpen(false);

        if (lenis) {
            setTimeout(() => {
                lenis.scrollTo(href, {
                    offset: -80,
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
            }, 50);
        } else {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-[1000] px-4 sm:px-6 pt-4 md:pt-6 pointer-events-none">
            {/* AMBIENT BACKGROUND GRADIENT */}
            <div className={`absolute inset-0 -z-10 transition-opacity duration-500 pointer-events-none ${scrolled ? "opacity-100 h-28 bg-gradient-to-b from-neutral-900/40 to-transparent backdrop-blur-[2px]" : "opacity-0"}`} />

            <motion.div
                layout="position"
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className={`max-w-5xl mx-auto pointer-events-auto flex flex-col overflow-hidden border transition-all duration-500 ${
                    scrolled || isOpen
                        ? "bg-neutral-950 border-neutral-800 shadow-[0_12px_50px_rgba(0,0,0,0.5)] rounded-[24px]"
                        : "bg-white/90 backdrop-blur-xl border-neutral-200 rounded-[20px]"
                }`}
            >
                {/* PRIMARY CONTAINER BLOCK */}
                <div className="flex items-center justify-between p-2 md:p-2.5">
                    
                    {/* BRAND LOGO */}
                    <div className="flex items-center gap-3 pl-2 sm:pl-3">
                        <div className={`h-9 w-9 border flex items-center justify-center rounded-xl shadow-sm transition-transform duration-300 hover:rotate-6 ${scrolled || isOpen ? "bg-neutral-900 border-neutral-800" : "bg-neutral-100 border-neutral-200"}`}>
                            <img src="/images/logo.png" className="rounded-lg h-7 w-7 object-cover animate-pulse" alt="SR Group Logo" />
                        </div>
                        <div className="flex flex-col">
                            <span className={`font-black tracking-tighter uppercase text-xl leading-none transition-colors duration-500 ${scrolled || isOpen ? "text-white" : "text-neutral-900"}`}>
                                SR GROUP<span className="text-amber-500">.</span>
                            </span>
                            <span className={`text-[8px] font-bold tracking-[0.25em] uppercase mt-1 transition-colors duration-500 ${scrolled || isOpen ? "text-neutral-500" : "text-neutral-400"}`}>
                                Builders
                            </span>
                        </div>
                    </div>

                    {/* DESKTOP LINKS */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleScrollTo(e, item.href)}
                                className={`relative px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest transition-colors rounded-lg group ${scrolled || isOpen ? "text-neutral-400 hover:text-amber-400" : "text-neutral-600 hover:text-amber-500"}`}
                            >
                                {item.name}
                                <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
                            </a>
                        ))}
                    </nav>

                    {/* ACTION HUB */}
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => navigate('/register')} 
                            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl shadow-sm transition-all active:scale-95 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                        >
                            Apply Now <ArrowUpRight size={13} strokeWidth={3} />
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`md:hidden w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-[4px] active:scale-95 transition-all border ${scrolled || isOpen ? "text-neutral-200 bg-neutral-900 border-neutral-800" : "text-neutral-700 bg-neutral-50 border-neutral-200"}`}
                            aria-label="Menu Toggle"
                        >
                            <span className={`w-4 h-[2px] bg-current rounded-full transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-[6px] text-amber-500" : ""}`} />
                            <span className={`w-4 h-[2px] bg-current rounded-full transition-opacity duration-200 ${isOpen ? "opacity-0" : ""}`} />
                            <span className={`w-4 h-[2px] bg-current rounded-full transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-[6px] text-amber-500" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* MOBILE DROP OVERLAY */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ height: { type: "spring", stiffness: 140, damping: 20 }, opacity: { duration: 0.2 } }}
                            className="md:hidden border-t border-neutral-900 bg-neutral-950"
                        >
                            <div className="p-4 sm:p-6 flex flex-col gap-5">
                                <nav className="flex flex-col gap-1">
                                    {navItems.map((item, i) => (
                                        <motion.a
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            key={item.name}
                                            href={item.href}
                                            onClick={(e) => handleScrollTo(e, item.href)}
                                            className="flex items-center justify-between p-3 rounded-xl text-sm font-bold text-neutral-400 hover:text-amber-400 hover:bg-neutral-900 border border-transparent transition-all group"
                                        >
                                            <span>{item.name}</span>
                                            <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-500" />
                                        </motion.a>
                                    ))}
                                </nav>

                                <div className="w-full h-[1px] bg-neutral-900 my-1" />

                                <div className="bg-neutral-900/50 border border-neutral-850 p-4 rounded-2xl shadow-inner">
                                    <div>
                                        <p className="text-[9px] uppercase tracking-widest font-black text-amber-500/80">Welcome to SR Group</p>
                                        <h4 className="text-sm font-extrabold text-white mt-0.5">Explore our systems & solutions</h4>
                                    </div>
                                    <button 
                                        onClick={() => navigate('/register')} 
                                        className="w-full mt-3 py-3.5 bg-amber-500 text-neutral-950 text-xs font-black uppercase tracking-widest rounded-xl text-center hover:bg-amber-600 transition-colors shadow-md"
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </header>
    );
}