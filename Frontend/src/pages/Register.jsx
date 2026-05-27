import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth.js';
import { toast } from 'react-toastify';

// UI Components
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { AddLayout } from '../components/ui/AuthLayout.jsx';
import signupSchema from '../schema/auth.schema.js';

export default function Register() {
    const navigate = useNavigate();
    const { registerUser, verifyErp } = useAuth();
    const [isVerified, setIsVerified] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
        mode: "onChange",
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            adminCode: ""
        }
    });

    // Sirf adminCode watch kar rahe hain
    const watchedAdminCode = watch("adminCode");

    const handleVerify = () => {
        if (!watchedAdminCode || watchedAdminCode.length < 3) {
            toast.error("Please enter a valid Admin Code (min 3 characters)");
            return;
        }

        verifyErp.mutate({ adminCode: watchedAdminCode }, {
            onSuccess: () => {
                setIsVerified(true);
                toast.success("Identity Verified!");
            },
            onError: (err) => {
                toast.error(err.response?.data?.message || "Verification Failed");
            }
        });
    };

    const onSubmit = (data) => {
        if (!isVerified) {
            toast.error("Please verify your identity first!");
            return;
        }

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
        if (!isVerified) {
            toast.error("Verify your Admin Code first!");
            return;
        }
        const backendBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
        window.location.href = `${backendBase}/auth/google?adminCode=${watchedAdminCode}`;
    };

    return (
        <AddLayout title="Create Account" subtitle="SR GROUP PROMOTER & BUILDERS">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                {/* Admin Code Verification Section */}
                <div className="space-y-2">
                    <Input 
                        label="Admin Code" 
                        disabled={isVerified} 
                        {...register("adminCode")} 
                        error={errors.adminCode?.message} 
                    />
                    
                    {!isVerified ? (
                        <Button 
                            type="button" 
                            onClick={handleVerify} 
                            disabled={!watchedAdminCode || watchedAdminCode.length < 3 || verifyErp.isPending}
                            className="w-full"
                        >
                            {verifyErp.isPending ? <Loader2 className="animate-spin" /> : <ShieldCheck size={16} />}
                            Verify Identity
                        </Button>
                    ) : (
                        <div className="bg-green-600/20 text-green-400 p-3 rounded-lg flex items-center justify-between text-xs">
                            <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Verified Successfully</span>
                            <button type="button" onClick={() => setIsVerified(false)} className="underline">Edit</button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <Input label="Full Name" {...register("fullName")} error={errors.fullName?.message} />
                    <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
                    <Input label="Password" type="password" {...register("password")} error={errors.password?.message} />
                </div>

                <Button type="submit" disabled={!isVerified || registerUser.isPending} className="w-full">
                    {registerUser.isPending ? "Creating..." : "Create Account"}
                </Button>

                <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-[#222222]"></div>
                    <span className="mx-4 text-[9px] font-black uppercase tracking-[0.3em] text-[#B08B57]">Or</span>
                    <div className="flex-grow border-t border-[#222222]"></div>
                </div>

                <Button type="button" onClick={handleGoogleAuth} disabled={!isVerified} className="w-full bg-[#111111] border border-[#222222] hover:border-[#B08B57]">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </Button>

                

                <p className="text-center text-neutral-500 text-[10px] uppercase tracking-widest mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#B08B57] font-black hover:underline">Login</Link>
                </p>
            </form>
        </AddLayout>
    );
}