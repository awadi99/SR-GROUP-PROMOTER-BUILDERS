// src/pages/Profile.jsx

import React from 'react';
import {
    Mail,
    Shield,
    User,
    Loader2,
    BadgeCheck,
    Sparkles
} from 'lucide-react';

import ProfileDetail from '../components/profile/ProfileDetail';
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user, isLoading, isError } = useAuth();
    const navigate = useNavigate();

    // Loading State
    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-[#050505]">
                <Loader2
                    className="animate-spin text-[#B08B57]"
                    size={52}
                />
            </div>
        );
    }

    // Unauthorized State
    if (isError || !user) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center bg-[#050505] text-white">
                <p className="mb-4 text-lg">You are not logged in.</p>

                <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-3 border border-[#B08B57] text-[#B08B57] hover:bg-[#B08B57] hover:text-black transition-all duration-300"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white px-6 md:px-14 py-16">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="mb-20">
                    <p className="text-[#B08B57] text-[10px] uppercase tracking-[0.45em] mb-5">
                        User Settings
                    </p>

                    <h1 className="text-5xl md:text-7xl font-extralight tracking-tight uppercase leading-none">
                        Profile{" "}
                        <span className="text-[#7D7373]">
                            Management
                        </span>
                    </h1>
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT CARD */}
                    <div className="lg:col-span-4">
                        <div className="relative overflow-hidden rounded-[32px] border border-[#B08B57]/20 bg-[#0B0B0B]">

                            {/* GOLD GLOW */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#B08B57]/5 via-transparent to-transparent pointer-events-none"></div>

                            <div className="relative p-10 flex flex-col items-center">

                                {/* PROFILE IMAGE */}
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-full bg-[#B08B57]/20 blur-2xl"></div>

                                    <img
                                        src={user?.profilePic || "/default-avatar.png"}
                                        alt={user?.fullName}
                                        onError={(e) => {
                                            e.currentTarget.src = "/default-avatar.png";
                                        }}
                                        referrerPolicy="no-referrer"
                                        className="relative w-32 h-32 rounded-full object-cover border-2 border-[#B08B57]/40 shadow-2xl"
                                    />

                                    <div className="absolute bottom-1 right-1 bg-[#050505] border border-[#B08B57]/40 rounded-full p-1.5">
                                        <BadgeCheck
                                            size={16}
                                            className="text-[#B08B57]"
                                        />
                                    </div>
                                </div>

                                {/* USER NAME */}
                                <h2 className="mt-8 text-2xl uppercase tracking-[0.2em] text-center font-light">
                                    {user?.fullName}
                                </h2>

                                {/* ROLE */}
                                <div className="mt-6 flex items-center gap-2 bg-[#B08B57]/10 border border-[#B08B57]/20 px-4 py-2 rounded-full">
                                    <Sparkles
                                        size={14}
                                        className="text-[#B08B57]"
                                    />

                                    <span className="text-[#B08B57] text-[11px] uppercase tracking-[0.25em]">
                                        {user?.role}
                                    </span>
                                </div>

                                {/* JOIN DATE */}
                                <div className="mt-10 w-full border-t border-[#1A1A1A] pt-6 text-center">
                                    <p className="text-[#666] text-[10px] uppercase tracking-[0.3em] mb-2">
                                        Member Since
                                    </p>

                                    <p className="text-sm text-white">
                                        {new Date(user?.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="lg:col-span-8">

                        {/* SECTION TITLE */}
                        <div className="mb-10">
                            <p className="text-[#666] uppercase tracking-[0.3em] text-[11px] mb-4">
                                Personal Information
                            </p>

                            <div className="h-[1px] w-full bg-gradient-to-r from-[#B08B57]/20 to-transparent"></div>
                        </div>

                        {/* DETAILS */}
                        <div className="grid gap-6">

                            <ProfileDetail
                                icon={<Mail size={20} />}
                                label="Email Address"
                                value={user?.email}
                            />

                            <ProfileDetail
                                icon={<Shield size={20} />}
                                label="Admin Code"
                                value={user?.adminCode || "Not Assigned"}
                            />

                            <ProfileDetail
                                icon={<User size={20} />}
                                label="Google Authentication"
                                value={user?.isGoogleUser ? "Enabled" : "Disabled"}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}