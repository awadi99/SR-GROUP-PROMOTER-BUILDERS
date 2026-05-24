import React from 'react';
import { Link } from 'react-router-dom';
import { AddLayout } from '../components/ui/AuthLayout';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
    return (
        <AddLayout title="Terms & Conditions">
            <div className="relative border-l border-[#222222] pl-8 space-y-12">

                {/* Timestamp */}
                <div className="absolute -left-[3px] top-0 w-[5px] h-[5px] bg-[#B08B57] rounded-full" />
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#B08B57]/60 font-bold">
                    Last Updated: May 24, 2026
                </p>

                {/* Sections */}
                {[
                    { title: "Project Representations", body: "All architectural renderings, floor plans, and specifications are artistic impressions and are subject to change as per structural and regulatory requirements." },
                    { title: "Bookings & Payments", body: "A booking is only confirmed upon receipt of the initial token amount. Final pricing, including applicable GST and stamp duty, will be governed by the formal Sale Agreement." },
                    { title: "Limitation of Liability", body: "SR Group is not liable for errors in third-party information or service interruptions on this platform." }
                ].map((item, idx) => (
                    <div key={idx} className="group relative">
                        <h3 className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-3 group-hover:text-[#B08B57] transition-colors">
                            {idx + 1}. {item.title}
                        </h3>
                        <p className="text-[12px] text-neutral-400 font-light leading-relaxed max-w-sm border-b border-[#111111] pb-6">
                            {item.body}
                        </p>
                    </div>
                ))}

                {/* Navigation */}
                <Link to="/" className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#B08B57] hover:text-white transition-colors">
                    <ArrowLeft size={10} /> Back to Home
                </Link>
            </div>
        </AddLayout>
    );
}