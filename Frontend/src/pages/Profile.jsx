import React from 'react';
import { Mail, Shield, User, ChevronRight } from 'lucide-react';
import ProfileDetail from '../components/profile/ProfileDetail';

export default function Profile() {
    return (
        <div className="w-full max-w-5xl mx-auto p-8 md:p-20 bg-[#0A0A0A] text-white">
            {/* Header Section */}
            <div className="mb-20">
                <p className="text-[#B08B57] text-[10px] uppercase tracking-[0.4em] mb-4">User Settings</p>
                <h2 className="text-4xl md:text-6xl font-extralight tracking-tight uppercase">
                    Profile <span className="text-[#8f8484]">Management</span>
                </h2>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
                
                {/* Left Column: Identity */}
                <div className="md:col-span-4">
                    <div className="relative group p-[1px] bg-gradient-to-b from-[#B08B57] to-[#1a1a1a]">
                        <div className="bg-[#050505] p-12 flex flex-col items-center justify-center">
                            <User size={80} className="text-[#333] mb-8" strokeWidth={0.5} />
                            <h3 className="text-xl uppercase tracking-widest font-light">Administrator</h3>
                            <div className="w-8 h-[1px] bg-[#B08B57] my-6"></div>
                            <p className="text-[#555] text-[10px] uppercase tracking-[0.2em]">System Root Access</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Information */}
                <div className="md:col-span-8 space-y-12">
                    <div className="space-y-2">
                        <h4 className="text-[11px] uppercase tracking-[0.3em] text-[#555]">Personal Information</h4>
                        <div className="h-[1px] w-full bg-[#1a1a1a]"></div>
                    </div>

                    <div className="grid gap-8">
                        <ProfileDetail icon={<Mail size={20}/>} label="Email Address" value="admin@luxury.com" />
                        <ProfileDetail icon={<Shield size={20}/>} label="Account Clearance" value="Level 5: Super Admin" />
                    </div>

                    {/* Action Footer */}

                </div>
            </div>
        </div>
    );
}