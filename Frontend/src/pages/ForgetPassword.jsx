import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, ArrowLeft, CheckCircle2, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hook/useAuth.js';

// UI Components
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { AddLayout } from '../components/ui/AuthLayout.jsx';
import resetPasswordSchema from '../schema/auth.reset.password.schema.js';

export default function ForgotPassword() {
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const { resetPassword } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onTouched",
    });

    const onSubmit = (data) => {
        resetPassword.mutate(data, {
            onSuccess: (response) => {
                toast.success("Password updated successfully!");
                setIsSuccess(true);
            },
            onError: (err) => {
                toast.error(err.response?.data?.message || "Reset failed");
            }
        });
    };

    const inputStyle = "bg-[#111111] border-[#222222] text-white focus:border-[#B08B57] focus:ring-1 focus:ring-[#B08B57]";

    return (
        <AddLayout title={isSuccess ? "Success" : "Reset Access"} subtitle={isSuccess ? "Password updated" : "Enter details to recover account"}>
            {!isSuccess ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Mobile Number Field */}
                    <Input
                        label="Admin Code"
                        placeholder="SRXXXX"
                        error={errors.adminCode?.message}
                        {...register("adminCode")}
                        className={inputStyle}
                    />

                    {/* Email Field */}
                    <Input
                        label="Academy Email"
                        type="email"
                        placeholder="name@srgroup.com"
                        error={errors.email?.message}
                        {...register("email")}
                        className={inputStyle}
                    />

                    {/* New Password Field */}
                    <Input
                        label="New Password"
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register("password")}
                        className={inputStyle}
                    />

                    <Button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#B08B57] hover:bg-[#9a784d] text-white">
                        {isSubmitting ? "Processing..." : "Update Password"} <KeyRound size={14} className="ml-2" />
                    </Button>

                    <div className="text-center">
                        <Link to="/login" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 hover:text-[#B08B57] transition-colors">
                            <ArrowLeft size={10} /> Back to Login
                        </Link>
                    </div>
                </form>
            ) : (
                <div className="text-center py-6 space-y-6">
                    <div className="flex justify-center">
                        <CheckCircle2 size={48} className="text-[#B08B57]" />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400">Security credentials updated.</p>
                    <Button onClick={() => navigate('/login')} className="w-full bg-[#B08B57] text-white">
                        Go to Login
                    </Button>
                </div>
            )}
        </AddLayout>
    );
}