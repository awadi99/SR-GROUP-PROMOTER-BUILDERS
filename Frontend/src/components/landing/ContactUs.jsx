import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function ContactUs() {
  return (
    <section id="contact" className="relative min-h-screen bg-[#0A0A0A] text-white py-20 px-6 md:px-12 lg:px-20 flex items-center">
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#A68966]/10 blur-[120px] rounded-full -z-0 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* LEFT SIDE: Text & Details */}
        <div className="space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-[#A68966] font-bold tracking-[0.3em] uppercase text-[10px] py-2 px-5 border border-[#A68966]/30 rounded-full inline-block">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[100px] font-medium tracking-tighter leading-[0.9]">
              Contact <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A68966] to-[#D4AF37]">US.</span>
            </h1>
          </motion.div>
          
          <div className="grid gap-6">
            <ContactCard 
              icon={<MapPin size={22} />} 
              title="Studio Office" 
              detail="123 Architectural Way, Pune, 411001" 
            />
            <a href="mailto:hello@srstudio.com" className="block">
              <ContactCard icon={<Mail size={22} />} title="Email Us" detail="hello@srstudio.com" hover />
            </a>
            <a href="tel:+919876543210" className="block">
              <ContactCard icon={<Phone size={22} />} title="Call Us" detail="+91 98765 43210" hover />
            </a>
          </div>
        </div>

        {/* RIGHT SIDE: Map Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[450px] lg:h-[600px] w-full rounded-3xl border border-white/10 bg-[#111111] p-3 shadow-2xl group overflow-hidden"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d417.52525842519225!2d74.5809006599152!3d18.16733580070123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc3a1006dadde2f%3A0xbd0d0d753956eb53!2z4KSq4KSy4KSC4KSX4KWHIOCkleClieCksOCljeCkqOCksA!5e0!3m2!1sen!2sin!4v1779646211163!5m2!1sen!2sin"
            className="w-full h-full rounded-2xl contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
            title="Location"
            loading="lazy"
          />
          
          

        </motion.div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, detail, hover }) {
  return (
    <div className={`flex items-center gap-6 p-6 rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-300 ${hover ? "hover:border-[#A68966]/50 hover:bg-white/[0.05]" : ""}`}>
      <div className="p-4 bg-white/5 text-[#A68966] rounded-xl shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1">{title}</h4>
        <p className="text-lg md:text-xl font-light tracking-wide text-gray-100">{detail}</p>
      </div>
    </div>
  );
}