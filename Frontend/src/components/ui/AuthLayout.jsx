import React from 'react';

export const AddLayout = ({ children, title, subtitle }) => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-[#030303] text-white px-4">
            {/* Elegant container with refined gold border */}
            <div className="w-full max-w-[450px] p-10 bg-[#151414] border border-[#1A1A1A] rounded-3xl shadow-2xl">
                
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-black tracking-tighter uppercase">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-[#B08B57] text-[9px] font-black uppercase tracking-[0.3em] mt-2">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="w-full">
                    {children}
                </div>
            </div>
        </section>
    );
};