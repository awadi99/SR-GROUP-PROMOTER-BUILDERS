import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/apiClient.js";

const GoogleAuthSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        const token = searchParams.get("token");
        const redirectPath = searchParams.get("redirect") || "/dashboard";

        if (!token) {
            navigate("/login?error=auth_failed", { replace: true });
            return;
        }

        // Token ko store karein
        localStorage.setItem("jwt", token);

        // Fetch User profile to ensure session is valid
        apiClient.get("/auth/me")
            .then(({ data }) => {
                queryClient.setQueryData(["authUser"], data);
                // SRGroup branding ke liye thoda smooth transition
                setTimeout(() => navigate(redirectPath, { replace: true }), 1200);
            })
            .catch(() => {
                localStorage.removeItem("jwt");
                navigate("/login?error=auth_failed", { replace: true });
            });
    }, []);

    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#0a0a0a] p-6 text-center">
            {/* SRGroup Logo Container */}
            <div className="w-28 h-28 mb-8 bg-[#111111] rounded-[2rem] border border-[#222222] flex items-center justify-center transform transition-all duration-700 hover:scale-105">
                <span className="text-[#B08B57] font-bold text-3xl tracking-tighter">SRG</span>
            </div>
            
            {/* Status Text */}
            <div className="space-y-2">
                <h2 className="text-white font-medium text-xl tracking-wide">Authenticating</h2>
                <p className="text-neutral-500 text-sm">Initializing secure session for SRGroup...</p>
            </div>

            {/* Custom Loading Bar - Gold/Bronze accent */}
            <div className="w-48 sm:w-64 h-[2px] mt-10 bg-[#111111] rounded-full overflow-hidden">
                <div className="h-full bg-[#B08B57] animate-[loading_1.5s_ease-in-out_infinite]"></div>
            </div>

            <style jsx>{`
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(0); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default GoogleAuthSuccess;