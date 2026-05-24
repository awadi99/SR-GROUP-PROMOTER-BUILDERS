import React, { forwardRef } from "react";

const Input = forwardRef(({
    label,
    type = "text",
    name,
    placeholder,
    error,
    disabled = false,
    className = "",
    ...props
}, ref) => {
    return (
        <div className="flex flex-col gap-2 w-full group">
            {label && (
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B08B57] ml-1">
                    {label}
                </label>
            )}

            <input
                ref={ref}
                type={type}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                className={`
                    w-full px-4 py-3 rounded-xl border font-sans text-sm outline-none 
                    transition-all duration-300 bg-[#111111] text-white
                    placeholder:text-neutral-600
                    ${error 
                        ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20" 
                        : "border-[#222222] focus:border-[#B08B57] focus:ring-1 focus:ring-[#B08B57]/50"
                    } 
                    ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-[#333333]"} 
                    ${className}
                `}
                {...props}
            />

            {error && (
                <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";

export default Input;