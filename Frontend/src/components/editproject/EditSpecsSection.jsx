import React from 'react';
import { useForm } from 'react-hook-form';
import { useProjectStore } from '../../store/useProjectStore';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function EditSpecsSection({ onNext, onPrev }) {
    const { sections, updateSection } = useProjectStore();
    const { specs } = sections;

    const { register, handleSubmit } = useForm({
        defaultValues: {
            towers: specs.towers || '',
            floors: specs.floors || '',
            architect: specs.architect || '',
            rera: specs.rera || ''
        }
    });

    const onSubmit = (data) => {
        updateSection('specs', data);
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            {/* Header */}
            <div>
                <h2 className="text-xl sm:text-2xl text-white uppercase tracking-[0.2em]">Project Specifications</h2>
                <div className="h-[2px] w-12 bg-[#B08B57] mt-3"></div>
                <p className="text-[#555] text-[11px] uppercase tracking-widest mt-2">Technical details & project credentials</p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#050505] p-6 border border-[#1a1a1a]">
                <Input label="Number of Towers" {...register("towers")} className="bg-[#0a0a0a]" />
                <Input label="Floors per Tower" {...register("floors")} className="bg-[#0a0a0a]" />
                <Input label="Architect Name" {...register("architect")} className="bg-[#0a0a0a]" />
                <Input label="RERA Registration Number" {...register("rera")} className="bg-[#0a0a0a]" />
            </div>

            {/* Responsive Navigation Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-4 border-t border-[#1a1a1a] pt-8">
                <Button 
                    type="button" 
                    onClick={onPrev} 
                    className="w-full sm:w-auto px-8 py-3 border border-[#1a1a1a] bg-transparent hover:bg-[#1a1a1a] transition-all duration-300"
                >
                    Back
                </Button>
                <Button 
                    type="submit" 
                    className="w-full sm:flex-1 px-8 py-3 bg-[#B08B57] text-black font-bold uppercase tracking-widest text-[12px]  transition-all duration-300"
                >
                    Update & Continue
                </Button>
            </div>
        </form>
    );
}