import React, { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLenis } from '../scroll/SmoothScroll';
import { useNavigate } from "react-router-dom";

const navItems = [
    { name: "Home", href: "#hero" },     // Matches <section id="hero">
    { name: "About", href: "#about" },   // Matches <section id="about">
    { name: "Features", href: "#features" }, // Matches <section id="features">
    { name: "FAQ", href: "#faq" },       // Add <section id="faq"> to LandingPage
    { name: "Contact", href: "#contact" } // Matches <section id="contact">
];

const NavLink = memo(({ item, scrolled, isOpen, onClick }) => (
    <a
        href={item.href}
        onClick={(e) => onClick(e, item.href)}
        className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-200 rounded-xl ${scrolled || isOpen
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
                    const isPastThreshold = window.scrollY > 40;
                    setScrolled((prev) => (prev !== isPastThreshold ? isPastThreshold : prev));
                    isScrolling.current = false;
                });
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            lenis?.stop();
            document.body.style.overflow = "hidden";
        } else {
            lenis?.start();
            document.body.style.overflow = "";
        }
    }, [isOpen, lenis]);

    const handleScrollTo = (e, href) => {
        e.preventDefault();
        setIsOpen(false);

        // Lenis ke ready hone ka wait karo
        if (!lenis) return;

        const target = document.querySelector(href);
        if (target) {
            lenis.scrollTo(target, {
                offset: -100,
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    };
    return (
        <header className="fixed top-4 md:top-8 left-0 w-full z-[1000] px-4 md:px-6 pointer-events-none transform-gpu">
            <div
                className={`max-w-5xl mx-auto pointer-events-auto flex items-center justify-between px-2 py-2 rounded-2xl border transition-all duration-300 ease-out ${scrolled || isOpen
                        ? "bg-[#030303]/95 backdrop-blur-2xl border-neutral-800/80 shadow-2xl"
                        : "bg-white/95 backdrop-blur-2xl border-neutral-200 shadow-sm"
                    }`}
            >
                {/* BRAND LOGO */}
                <div className="flex items-center gap-3 md:gap-4 pl-2 md:pl-4">
                    <div className={`h-15 w-15 border rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 hover:rotate-12 ${scrolled || isOpen ? "bg-neutral-900 border-neutral-800" : "bg-neutral-50 border-neutral-200"
                        }`}>
                        {/* Image size increased to h-10 w-10 */}
                        <img src="/image/logoBG.png" className="rounded-xl h-10 w-10 object-cover" alt="Logo" />
                    </div>

                    <div className="flex flex-col justify-center leading-none">
                        <span className={`font-black tracking-tighter uppercase text-3xl transition-colors duration-200 ${scrolled || isOpen ? "text-white" : "text-neutral-900"
                            }`}>
                            SR GROUP<span className="text-[#B08B57]"> .</span>
                        </span>
                        <span className={`text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-200 mt-1 ${scrolled || isOpen ? "text-[#B08B57]/90" : "text-neutral-400"
                            }`}>
                            Promoter & Builders
                        </span>
                    </div>
                </div>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            item={item}
                            scrolled={scrolled}
                            isOpen={isOpen}
                            onClick={handleScrollTo}
                        />
                    ))}
                </nav>

                {/* ACTIONS HUB */}
                <div className="flex items-center gap-2 pr-1 md:pr-2">
                    <button
                        onClick={() => navigate('/register')}
                        className={`hidden sm:flex items-center gap-2 px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-sm transition-all active:scale-95 duration-200 ${scrolled || isOpen
                                ? "bg-[#b3823d] text-[#030303] hover:bg-[#e4a041]"
                                : "bg-[#030303] text-white hover:bg-neutral-900"
                            }`}
                    >
                        Apply <ArrowUpRight size={14} />
                    </button>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2.5 rounded-xl border shadow-sm transition-all active:scale-95 duration-200 ${scrolled || isOpen
                                ? "text-neutral-200 bg-neutral-900 border-neutral-800"
                                : "text-neutral-700 bg-neutral-50 border-neutral-200"
                            }`}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* FULL SCREEN LUXURY MOBILE OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 h-fit w-screen bg-[#030303] z-[1002] md:hidden pointer-events-auto flex flex-col justify-between p-6 transform-gpu"
                    >
                        {/* Top Bar Section */}
                        <div className="flex items-center justify-between pt-2 px-2">
                            <div className="flex flex-col leading-none">
                                <span className="text-white font-black tracking-tighter uppercase text-2xl">
                                    SR GROUP<span className="text-[#B08B57]"> .</span>
                                </span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Centered Large Menu Items Layout */}
                        <nav className="flex flex-col justify-center gap-8 my-auto pl-4 mt-4">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 25 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 15 }}
                                    transition={{ delay: i * 0.05, duration: 0.4, ease: [0.215, 0.610, 0.355, 1.000] }}
                                    className="group flex flex-col"
                                >
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleScrollTo(e, item.href)}
                                        className="text-4xl font-black uppercase tracking-tight text-neutral-200 active:text-[#B08B57] transition-colors flex items-center justify-between pr-4"
                                    >
                                        <span>{item.name}</span>
                                        <span className="text-xs text-[#B08B57] font-medium tracking-normal opacity-0 group-active:opacity-100 transition-opacity">
                                            // 0{i + 1}
                                        </span>
                                    </a>
                                    <span className="text-[10px] tracking-widest uppercase text-neutral-600 mt-1 pl-0.5">
                                        {item.subtitle}
                                    </span>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Bottom Actions Area */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.25, duration: 0.3 }}
                            className="w-full space-y-4 pb-4"
                        >
                            <div className="h-px w-full bg-neutral-900" />
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => navigate('/register')}
                                    className="w-full py-4 bg-[#B08B57] text-[#030303] font-black rounded-xl uppercase tracking-widest text-xs shadow-lg active:bg-[#967344] transition-colors"
                                >
                                    Explore Properties
                                </button>
                                <p className="text-center text-[9px] text-[#b47011] tracking-wider uppercase pt-2">
                                    © 2026 SR GROUP PROMOTER AND BUILDERS.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}