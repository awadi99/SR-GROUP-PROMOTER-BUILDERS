import React from "react";

const Button = ({
    children,
    type = "button",
    onClick,
    loading = false,
    disabled = false,
    className = "",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px]
                transition-all duration-300 transform-gpu active:scale-[0.98]
                bg-[#030303] text-white hover:bg-[#B08B57] 
                disabled:opacity-50 disabled:cursor-not-allowed
                border border-transparent hover:border-[#B08B57]
                ${className}
            `}
        >
            {loading ? (
                <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                </div>
            ) : (
                <div className="flex items-center justify-center gap-2">
                    {children}
                </div>
            )}
        </button>
    );
};

export default Button;