import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { specsSchema } from '../../schema/projectSchema.js'; 
import { useProjectStore } from '../../store/useProjectStore.js';

import Button from '../ui/Button';
import Input from '../ui/Input';

export default function SpecsSection({ onNext, onPrev }) {
    const { sections, updateSection } = useProjectStore();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(specsSchema),
        defaultValues: sections.specs
    });

    const onSubmit = (data) => {
        updateSection('specs', data);
        onNext();
    };

    // Refined luxury classes
    const inputClasses = "bg-[#0a0a0a] border-[#B08B57]/20 focus:border-[#B08B57] text-white placeholder:text-gray-600 rounded-none w-full";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in duration-700 w-full max-w-2xl">
            {/* Header */}
            <div>
                <h2 className="text-xl md:text-2xl font-light text-white tracking-[0.05em] uppercase">Project Specifications</h2>
                <div className="h-[1px] w-12 bg-[#B08B57] mt-3"></div>
            </div>

            {/* Responsive Grid: Stacks on mobile, 2 columns on tablet/desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                <Input
                    label="Towers"
                    {...register("towers")}
                    error={errors.towers?.message}
                    className={inputClasses}
                />
                <Input
                    label="Floors"
                    {...register("floors")}
                    error={errors.floors?.message}
                    className={inputClasses}
                />
                <Input
                    label="Architect"
                    {...register("architect")}
                    error={errors.architect?.message}
                    className={inputClasses}
                />
                <Input
                    label="RERA Registration"
                    {...register("rera")}
                    error={errors.rera?.message}
                    className={inputClasses}
                />
            </div>

            {/* Navigation: Responsive Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                    type="button" 
                    onClick={onPrev}
                    className="w-full sm:w-auto px-8 py-3 bg-transparent border border-[#333] text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-300 uppercase tracking-[0.2em] text-[10px]"
                >
                    Back
                </Button>
                <Button 
                    type="submit" 
                    className="w-full sm:w-auto px-8 py-3 bg-transparent border border-[#B08B57] text-[#B08B57] hover:bg-[#B08B57] hover:text-black transition-all duration-300 uppercase tracking-[0.2em] text-[10px]"
                >
                    Save & Continue
                </Button>
            </div>
        </form>
    );
}