import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiInstagram, FiYoutube } from "react-icons/fi";
import { Mail, MapPin, Phone, Send, Code2, Award } from "lucide-react";

const SOCIAL_LINKS = [
  { Icon: FiInstagram, href: "#" },
  { Icon: FiYoutube, href: "#" },
  { Icon: FiLinkedin, href: "#" },
  { Icon: FiGithub, href: "#" }
];

const EXPLORE_LINKS = [
  { name: 'Dashboard', path: '/login' },
  { name: 'Privacy Policy', path: '/privacy-policy' },
  { name: 'Terms & Conditions', path: '/terms' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 md:pt-20 pb-10 border-t border-amber-500/20 relative overflow-hidden contain-paint">
      {/* Background Accents: Subtle Gold Glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#B08B57]/30 via-transparent to-transparent" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 md:w-96 md:h-96 bg-[#B08B57]/5 blur-[80px] rounded-full pointer-events-none transform-gpu" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8 mb-16 transform-gpu">

          {/* 1. BRAND IDENTITY */}
          <div className="lg:col-span-4 space-y-8 text-left">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-md overflow-hidden">
                <img src="/image/logoBG.png" className="h-full w-full object-cover" alt="SR Group Logo" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                SR <span className="text-[#B08B57]">GROUP</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
              Defining skylines with sustainable elegance. Crafting environments that stand the test of time through precision and vision.
            </p>
            <div className="inline-flex items-center gap-3 py-3 px-5 rounded-2xl bg-white/5 border border-slate-800 group hover:border-[#B08B57]/30 transition-all transform-gpu">
              <Code2 size={18} className="text-[#B08B57]" />
              <div className="text-left">
                <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-black">Engineered By</p>
                <p className="text-sm font-bold text-slate-300 group-hover:text-[#B08B57] transition-colors">Aditya Waghmare</p>
              </div>
            </div>
          </div>

          {/* 2. NAVIGATION */}
          <div className="lg:col-span-2 text-left">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#B08B57] mb-8">Navigation</h3>
            <ul className="space-y-4 text-sm font-bold">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. HEADQUARTERS CONTACT */}
          <div className="lg:col-span-3 text-left">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#B08B57] mb-8">Headquarters</h3>
            <ul className="space-y-5 text-sm font-bold text-slate-400">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-[#B08B57] shrink-0" />
                <span className="leading-snug">Pune, Maharashtra,<br />India 411001</span>
              </li>
              <li>
                <a href="tel:+919673298788" className="flex items-center gap-4 hover:text-white transition-all group">
                  <Phone size={18} className="text-[#B08B57]" /> +91 96732 98788
                </a>
              </li>
              <li>
                <a href="mailto:hello@srgroup.com" className="flex items-center gap-4 hover:text-white transition-all group">
                  <Mail size={18} className="text-[#B08B57]" /> hello@srgroup.com
                </a>
              </li>
            </ul>
          </div>

          {/* 4. NEWSLETTER */}
          <div className="lg:col-span-3 space-y-8 text-left">
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#B08B57] mb-6">Stay Updated</h3>
              <div className="flex bg-white/5 rounded-2xl border border-slate-800 focus-within:border-[#B08B57]/50 transition-all p-1.5">
                <input type="email" placeholder="Your Email" className="bg-transparent px-4 py-2 text-sm outline-none w-full text-white placeholder:text-slate-600" />
                <button className="bg-[#B08B57] p-2.5 rounded-xl hover:bg-[#96764a] transition-all shrink-0">
                  <Send size={18} className="text-white" />
                </button>
              </div>
            </div>
            <div className="flex gap-6">
              {SOCIAL_LINKS.map(({ Icon, href }, i) => (
                <a key={i} href={href} className="text-slate-500 hover:text-[#B08B57] transition-all transform hover:-translate-y-2">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-slate-800/60 flex items-center gap-3">
          <Award size={16} className="text-slate-600" />
          <p className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">
            © {new Date().getFullYear()} SR GROUP PROMOTER AND BUILDERS • CRAFTED WITH PRECISION
          </p>
        </div>
      </div>
    </footer>
  );
}