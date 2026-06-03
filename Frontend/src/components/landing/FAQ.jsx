import React from 'react';
import { faqData } from '../../constants/FaqData.js';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
    return (
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-black">
            <div className="max-w-3xl mx-auto">
                {/* Title with Gold Accent */}
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-12 text-center tracking-tight">
                    Frequently Asked <span className="text-[#A68966]">Questions</span>
                </h2>
                
                <div className="space-y-6">
                    {faqData.map((item) => (
                        <details 
                            key={item.id} 
                            className="group grid grid-rows-[auto_0fr] transition-all duration-500 ease-in-out bg-[#0A0A0A] border border-[#222222] rounded-xl hover:border-[#D4AF37]/50 open:grid-rows-[auto_1fr]"
                        >
                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-lg font-semibold text-white transition-all duration-300 group-hover:text-[#A68966] group-open:text-[#D4AF37]">
                                {item.question}
                                {/* Golden Chevron */}
                                <ChevronDown className="w-6 h-6 transition-transform duration-500 group-open:rotate-180 text-[#A68966]" />
                            </summary>
                            
                            <div className="overflow-hidden">
                                <div className="px-6 pb-6 pt-0 opacity-0 transition-opacity duration-300 group-open:opacity-100">
                                    <div className="border-t border-[#D4AF37]/30 pt-4">
                                        <p className="text-neutral-300 text-base leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}