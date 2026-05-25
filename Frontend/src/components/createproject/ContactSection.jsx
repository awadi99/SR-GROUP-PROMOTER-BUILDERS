import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../../schema/projectSchema.js';
import { useProjectStore } from '../../store/useProjectStore.js';

import Button from '../ui/Button';
import Input from '../ui/Input';

export default function ContactSection({ onNext, onPrev }) {
    const { sections, updateSection } = useProjectStore();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: sections.contact || { name: '', email: '', phone: '', website: '' }
    });

    const onSubmit = (data) => {
        updateSection('contact', data);
        onNext();
    };

    const inputClasses = "bg-[#0a0a0a] border-[#B08B57]/20 focus:border-[#B08B57] text-white placeholder:text-gray-600 rounded-none w-full";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 animate-in fade-in duration-700 w-full max-w-3xl">
            {/* Header */}
            <div>
                <h2 className="text-xl md:text-2xl font-light text-white tracking-[0.05em] uppercase">Project Contact Details</h2>
                <div className="h-[1px] w-12 bg-[#B08B57] mt-3"></div>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Input
                    label="Contact Person"
                    {...register("name")}
                    error={errors.name?.message}
                    className={inputClasses}
                />
                <Input
                    label="Email Address"
                    {...register("email")}
                    error={errors.email?.message}
                    className={inputClasses}
                />
                <Input
                    label="Phone Number"
                    {...register("phone")}
                    error={errors.phone?.message}
                    className={inputClasses}
                />
                <Input
                    label="Website URL"
                    {...register("website")}
                    error={errors.website?.message}
                    className={inputClasses}
                />
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                    type="button" 
                    onClick={onPrev} 
                    className="w-full sm:w-auto px-10 py-3 bg-transparent border border-[#333] text-gray-400 hover:text-white hover:border-gray-500 transition-all uppercase tracking-[0.2em] text-[10px]"
                >
                    Back
                </Button>
                <Button 
                    type="submit" 
                    className="w-full sm:w-auto px-10 py-3 bg-transparent border border-[#B08B57] text-[#B08B57] hover:bg-[#B08B57] hover:text-black transition-all uppercase tracking-[0.2em] text-[10px]"
                >
                    Finalize Project
                </Button>
            </div>
        </form>
    );
}