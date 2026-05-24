import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function ContactUs() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-[#0A0A0A] text-white py-16 md:py-32 px-6 md:px-20 flex items-center overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-[#A68966]/10 blur-[100px] md:blur-[150px] rounded-full -z-10" />

      <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
        
        {/* Left Side */}
        <div className="space-y-10 md:space-y-16">
          <div className="space-y-6">
            <span className="text-[#A68966] font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] py-2 px-5 border border-[#A68966]/30 rounded-full inline-block">
              Global Headquarters
            </span>
            <h1 className="text-5xl md:text-[120px] font-light tracking-tighter leading-[0.9]">
              Contact <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A68966] to-[#D4AF37]">Us.</span>
            </h1>
          </div>
          
          <div className="grid gap-4 md:gap-8">
            <ContactCard 
              icon={<MapPin size={24} />} 
              title="Studio Office" 
              detail="123 Architectural Way, Pune, 411001" 
            />
            <a href="mailto:hello@srstudio.com" className="block group">
              <ContactCard icon={<Mail size={24} />} title="Email us" detail="hello@srstudio.com" link />
            </a>
            <a href="tel:+919876543210" className="block group">
              <ContactCard icon={<Phone size={24} />} title="Call us" detail="+91 98765 43210" link />
            </a>
          </div>
        </div>

        {/* Right Side: Responsive Map */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative h-[400px] md:h-[700px] w-full rounded-[2rem] md:rounded-[3rem] border border-white/5 bg-[#111111] p-2 md:p-3 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A]/50 z-10 rounded-[1.8rem] md:rounded-[2.5rem]" />
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.196307335606!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06950000001%3A0x821a446d32804928!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1612345678901!5m2!1sen!2sin" 
            className="w-full h-full rounded-[1.8rem] md:rounded-[2.5rem] grayscale-[0.8] brightness-[0.8] contrast-[1.2] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
            title="Location"
          />
          
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20">
            <button className="bg-white text-black px-6 py-4 md:px-10 md:py-6 rounded-full text-sm md:text-lg font-medium flex items-center gap-2 md:gap-3 hover:bg-[#A68966] hover:text-white transition-all shadow-2xl">
              Directions <ArrowUpRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ContactCard({ icon, title, detail, link }) {
  return (
    <div className={`flex items-center gap-4 md:gap-8 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-300 ${link ? "hover:border-[#A68966]/50" : ""}`}>
      <div className="p-3 md:p-5 bg-white/5 text-[#A68966] rounded-xl md:rounded-2xl shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-[9px] md:text-xs text-gray-500 uppercase tracking-[0.2em] mb-1">{title}</h4>
        <p className="text-sm md:text-2xl font-light tracking-wide text-gray-100">{detail}</p>
      </div>
    </div>
  );
}