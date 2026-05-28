import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { identitySchema } from '../../schema/projectSchema.js'; 
import { useProjectStore } from '../../store/useProjectStore.js';

import Button from '../ui/Button'; 
import Input from '../ui/Input';

export default function IdentitySection({ onNext }) {
    const { sections, updateSection } = useProjectStore();

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(identitySchema),
        defaultValues: {
            title: sections.identity?.title || '',
            tagline: sections.identity?.tagline || '',
            description: sections.identity?.description || ''
        }
    });

    // Sync form with Zustand data on load or rehydration
    useEffect(() => {
        if (sections.identity) {
            reset({
                title: sections.identity.title || '',
                tagline: sections.identity.tagline || '',
                description: sections.identity.description || ''
            });
        }
    }, [sections.identity, reset]);

    const onSubmit = (data) => {
        updateSection('identity', data); 
        onNext(); 
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-light text-white tracking-[0.05em] uppercase">Project Identity</h2>
                <div className="h-[1px] w-12 bg-[#B08B57] mt-3"></div>
            </div>

            {/* Inputs - Styled for Luxury */}
            <div className="space-y-6">
                <Input
                    label="Project Title"
                    {...register("title")}
                    error={errors.title?.message}
                    placeholder="e.g., SR White Phase 13"
                    className="bg-[#0a0a0a] border-[#B08B57]/20 focus:border-[#B08B57] text-white placeholder:text-gray-600"
                />

                <Input
                    label="Tagline"
                    {...register("tagline")}
                    error={errors.tagline?.message}
                    placeholder="Crafted for elevated modern living."
                    className="bg-[#0a0a0a] border-[#B08B57]/20 focus:border-[#B08B57] text-white placeholder:text-gray-600"
                />

                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#B08B57] font-bold">Short Description</label>
                    <textarea
                        {...register("description")}
                        rows={4}
                        className="w-full p-4 bg-[#0a0a0a] border border-[#B08B57]/20 rounded-none focus:ring-1 focus:ring-[#B08B57] outline-none transition-all text-white placeholder:text-gray-600"
                        placeholder="A masterclass in modern luxury..."
                    />
                    {errors.description && (
                        <p className="text-[#B08B57] text-[10px] uppercase tracking-widest">{errors.description.message}</p>
                    )}
                </div>
            </div>

            {/* Luxury CTA Button */}
            <Button 
                type="submit" 
                className="w-full lg:w-auto px-10 py-3 bg-transparent border border-[#B08B57] text-[#B08B57] hover:bg-[#B08B57] hover:text-black transition-all duration-300 uppercase tracking-[0.2em] text-xs"
            >
                Save & Continue
            </Button>
        </form>
    );
}