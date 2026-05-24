import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth.js';
import { toast } from 'react-toastify';

// UI Components
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { AddLayout } from '../components/ui/AuthLayout.jsx';

// Schema
import signupSchema from '../schema/auth.schema.js';

export default function Register() {
    const navigate = useNavigate();
    const { registerUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
        mode: "onChange"
        // Role logic removed
    });

    const onSubmit = (data) => {
        registerUser.mutate(data, {
            onSuccess: () => {
                toast.success("Account created successfully!");
                navigate('/login');
            },
            onError: (err) => {
                toast.error(err.response?.data?.message || "Registration Failed");
            }
        });
    };

    const handleGoogleAuth = () => {
        const backendBase = import.meta.env.VITE_API_BASE_URL;
        window.location.href = `${backendBase}/auth/google`;
    };

    // Styling constants for consistency
    const inputStyle = "bg-[#111111] border-[#222222] text-white focus:border-[#B08B57] focus:ring-1 focus:ring-[#B08B57]";

    return (
        <AddLayout title="Create Account" subtitle="Join SR Group Promoter & Builders">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                <Input
                    label="Full Name"
                    placeholder="John Doe"
                    error={errors.fullName?.message}
                    {...register("fullName")}
                    className={inputStyle}
                />

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="name@srgroup.com"
                    error={errors.email?.message}
                    {...register("email")}
                    className={inputStyle}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register("password")}
                    className={inputStyle}
                />

                <Button
                    type="submit"
                    disabled={registerUser.isPending}
                    className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] bg-[#B08B57] text-white hover:bg-[#9a784d] transition-all duration-300"
                >
                    {registerUser.isPending ? "Processing..." : "Create Account"} <ArrowRight size={14} className="ml-2" />
                </Button>

                <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-[#222222]"></div>
                    <span className="flex-shrink mx-4 text-[9px] font-black uppercase tracking-[0.3em] text-[#B08B57]">Or</span>
                    <div className="flex-grow border-t border-[#222222]"></div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleAuth}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-[#222222] rounded-xl bg-[#111111] text-white hover:border-[#B08B57] transition-all duration-300"
                >
                     <svg className="w-5 h-5" viewBox="0 0 24 24">
                           <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                           <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                           <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                           <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                       </svg>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Continue with Google</span>
                </button>

                <p className="text-center text-neutral-500 text-[12px] mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#B08B57] font-black uppercase tracking-widest text-[10px] hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </AddLayout>
    );
}