import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiInstagram, FiYoutube } from "react-icons/fi";
import { Mail, MapPin, Phone, Send, Code2, Award, ArrowUpRight } from "lucide-react";

const SOCIAL_LINKS = [
  { Icon: FiInstagram, href: "#" },
  { Icon: FiYoutube, href: "#" },
  { Icon: FiLinkedin, href: "#" },
  { Icon: FiGithub, href: "#" }
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-24 pb-12 border-t border-[#A68966]/20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#A68966]/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* 1. BRAND IDENTITY */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center overflow-hidden border border-white/10">
                <img src="/images/logo.png" className="h-full w-full object-cover" alt="Logo" />
              </div>
              <h2 className="text-2xl font-medium tracking-tighter">
                SR <span className="text-[#A68966]">GROUP</span>
              </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Defining skylines with sustainable elegance. Crafting environments that stand the test of time through precision and vision.
            </p>
            <div className="inline-flex items-center gap-3 py-3 px-4 rounded-xl bg-white/5 border border-white/5">
              <Code2 size={16} className="text-[#A68966]" />
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Engineered By</p>
                <p className="text-xs font-medium text-gray-300">Aditya Waghmare</p>
              </div>
            </div>
          </div>

          {/* 2. NAVIGATION */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68966] mb-8">Navigation</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              {['Projects', 'Our Collective', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '')}`} className="hover:text-[#A68966] transition-colors flex items-center group">
                    {item} <ArrowUpRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CONTACT */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68966] mb-8">Headquarters</h3>
            <ul className="space-y-5 text-sm text-gray-400">
              <li className="flex gap-3"><MapPin size={18} className="text-[#A68966] shrink-0" /> Pune, Maharashtra, 411001</li>
              <li className="flex gap-3"><Phone size={18} className="text-[#A68966] shrink-0" /> +91 96732 98788</li>
              <li className="flex gap-3"><Mail size={18} className="text-[#A68966] shrink-0" /> hello@srgroup.com</li>
            </ul>
          </div>

          {/* 4. NEWSLETTER */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68966] mb-8">Stay Updated</h3>
            <div className="flex bg-white/5 rounded-xl border border-white/10 p-1 mb-8">
              <input type="email" placeholder="Enter your email" className="bg-transparent px-4 py-2 text-sm outline-none w-full text-white placeholder:text-gray-600" />
              <button className="bg-[#A68966] p-2 rounded-lg hover:bg-[#8e7456] transition-colors">
                <Send size={16} className="text-white" />
              </button>
            </div>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ Icon, href }, i) => (
                <a key={i} href={href} className="p-2 border border-white/10 rounded-full text-gray-400 hover:text-[#A68966] hover:border-[#A68966] transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-500 gap-4">
          <p>© 2026 SR GROUP. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-2">
            <Award size={14} /> Crafted with precision.
          </div>
        </div>
      </div>
    </footer>
  );
}


