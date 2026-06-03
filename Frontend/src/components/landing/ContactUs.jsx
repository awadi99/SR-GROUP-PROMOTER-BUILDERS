import React, { memo } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

// Memoized Card Component for performance
const ContactCard = memo(({ icon, title, detail, href, hover }) => {
  const content = (
    <div
      className={`flex items-center gap-6 p-6 rounded-xl border border-white/10 bg-[#111111] transition-all duration-300 
      ${hover ? "hover:border-[#A68966]/50 hover:bg-[#161616]" : ""}`}
    >
      <div className="p-4 bg-white/5 text-[#A68966] rounded-lg shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">{title}</h4>
        <p className="text-lg font-light text-white">{detail}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block transition-transform duration-300 active:scale-[0.98]">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
});

export default function ContactUs() {
  return (
    <section id="contact" className="min-h-screen bg-[#0A0A0A] text-white py-24 px-6 md:px-12 lg:px-20 flex items-center overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Content */}
        <div className="space-y-12">
          <div className="space-y-6">
            <span className="text-[#A68966] font-semibold tracking-[0.3em] uppercase text-[10px] py-2 px-5 border border-[#A68966]/30 rounded-full inline-block">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[0.9]">
              Contact <br /> 
              <span className="text-[#A68966]">US.</span>
            </h1>
          </div>
          
          <div className="grid gap-6">
            <ContactCard 
              icon={<MapPin size={22} />} 
              title="SR Office " 
              detail="पलंगे कॉर्नर 01, Tandulwadi katphal rd, Surynagari, Baramati, Maharashtra 413102" 
            />
            <ContactCard 
              icon={<Mail size={22} />} 
              title="Email Us" 
              detail="srgroup2023@gmail.com" 
              href="mailto:srgroup2023@gmail.com" 
              hover 
            />
            <ContactCard 
              icon={<Phone size={22} />} 
              title="Call Us" 
              detail="+91 9856412222" 
              href="tel:+91 9856412222" 
              hover 
            />
          </div>
        </div>

        {/* Right Side: Map Container */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative h-[450px] lg:h-[600px] w-full rounded-2xl border border-white/10 bg-[#111111] p-2 shadow-2xl overflow-hidden will-change-transform"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d417.52525842519225!2d74.5809006599152!3d18.16733580070123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc3a1006dadde2f%3A0xbd0d0d753956eb53!2z4KSq4KSy4KSC4KSX4KWHIOCkleClieCksOCljeCkqOCksA!5e0!3m2!1sen!2sin!4v1779646211163!5m2!1sen!2sin"
            className="w-full h-full rounded-xl transition-all duration-700"
            title="Location"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}