import React, { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLenis } from '../scroll/SmoothScroll';
import { useNavigate } from "react-router-dom";

const navItems = [
    { name: "Home", href: "#hero", subtitle: "Welcome Home" },
    { name: "Projects", href: "#project", subtitle: "Our Work" },
    { name: "Features", href: "#features", subtitle: "Luxury Amenities" },
    { name: "About", href: "#about", subtitle: "Our Philosophy" },
    { name: "Contact", href: "#contact", subtitle: "Reach Us" }
];

const NavLink = memo(({ item, scrolled, isOpen, onClick }) => (
    <a
        href={item.href}
        onClick={(e) => onClick(e, item.href)}
        className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-200 rounded-xl ${
            scrolled || isOpen
                ? "text-neutral-400 hover:text-[#B08B57] hover:bg-neutral-900/50"
                : "text-neutral-600 hover:text-[#B08B57] hover:bg-neutral-100"
        }`}
    >
        {item.name}
    </a>
));
NavLink.displayName = "NavLink";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const lenis = useLenis();
    const navigate = useNavigate();
    const isScrolling = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!isScrolling.current) {
                isScrolling.current = true;
                requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 40);
                    isScrolling.current = false;
                });
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        if (lenis) {
            isOpen ? lenis.stop() : lenis.start();
        }
    }, [isOpen, lenis]);

    const handleScrollTo = (e, href) => {
        e.preventDefault();
        setIsOpen(false);
        
        // Wait for exit animation
        setTimeout(() => {
            const target = document.querySelector(href);
            if (target && lenis) {
                lenis.scrollTo(target, {
                    offset: -100,
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        }, 300);
    };

    return (
        <header className="fixed top-4 md:top-8 left-0 w-full z-[1000] px-4 md:px-6 pointer-events-none transform-gpu">
            <div className={`max-w-5xl mx-auto pointer-events-auto flex items-center justify-between px-2 py-2 rounded-2xl border transition-all duration-300 ease-out ${
                scrolled || isOpen
                    ? "bg-[#030303]/95 backdrop-blur-2xl border-neutral-800/80 shadow-2xl"
                    : "bg-white/95 backdrop-blur-2xl border-neutral-200 shadow-sm"
            }`}>
                <div className="flex items-center gap-3 md:gap-4 pl-2 md:pl-4">
                    <div className={`h-10 w-10 border rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 hover:rotate-12 ${
                        scrolled || isOpen ? "bg-neutral-900 border-neutral-800" : "bg-neutral-50 border-neutral-200"
                    }`}>
                        <img src="/image/logoBG.png" className="rounded-xl h-10 w-10 object-cover" alt="Logo" />
                    </div>
                    <div className="flex flex-col justify-center leading-none">
                        <span className={`font-black tracking-tighter uppercase text-[19px] transition-colors duration-200 ${scrolled || isOpen ? "text-white" : "text-neutral-900"}`}>
                            SR GROUP<span className="text-[#B08B57]"> .</span>
                        </span>
                        <span className={`text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-200 mt-1 ${scrolled || isOpen ? "text-[#B08B57]/90" : "text-neutral-400"}`}>
                            Promoter & Builders
                        </span>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <NavLink key={item.name} item={item} scrolled={scrolled} isOpen={isOpen} onClick={handleScrollTo} />
                    ))}
                </nav>

                <div className="flex items-center gap-2 pr-1 md:pr-2">
                    <button onClick={() => navigate('/register')} className={`hidden sm:flex items-center gap-2 px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-sm transition-all active:scale-95 ${
                        scrolled || isOpen ? "bg-[#B08B57] text-[#030303] hover:bg-[#c99e64]" : "bg-[#030303] text-white hover:bg-neutral-900"
                    }`}>
                        Apply <ArrowUpRight size={14} />
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2.5 rounded-xl border shadow-sm transition-all active:scale-95 ${
                        scrolled || isOpen ? "text-neutral-200 bg-neutral-900 border-neutral-800" : "text-neutral-700 bg-neutral-50 border-neutral-200"
                    }`}>
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 h-screen w-screen bg-[#030303] z-[1002] md:hidden pointer-events-auto"
                    >
                        <div className="h-full flex flex-col px-5 pt-5 pb-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src="/image/logoBG.png" alt="Logo" className="w-11 h-11 rounded-xl object-cover" />
                                    <div>
                                        <h2 className="text-white font-black uppercase text-xl tracking-tight">SR GROUP</h2>
                                        <p className="text-[#B08B57] text-[9px] uppercase tracking-[0.25em] font-bold">Promoter & Builders</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-white active:scale-95 transition-transform">
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-2 flex-1 justify-center py-8">
                                {navItems.map((item, i) => (
                                    <motion.button
                                        key={item.name}
                                        onClick={(e) => handleScrollTo(e, item.href)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="py-5 border-b border-neutral-800 flex items-center justify-between group text-left"
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-[clamp(1.8rem,7vw,3rem)] font-black uppercase text-neutral-100 leading-none">{item.name}</span>
                                            <span className="text-[10px] tracking-[0.3em] text-[#B08B57] font-bold uppercase mt-1">{item.subtitle}</span>
                                        </div>
                                        <ArrowUpRight size={22} className="text-[#B08B57] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </motion.button>
                                ))}
                            </nav>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                                <button onClick={() => { setIsOpen(false); navigate("/register"); }} className="w-full bg-[#B08B57] text-[#030303] px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.18em] flex items-center justify-center gap-2">
                                    Apply Now <ArrowUpRight size={16} />
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}