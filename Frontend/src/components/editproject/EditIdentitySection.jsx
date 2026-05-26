import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useProjectStore } from '../../store/useProjectStore';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function EditIdentitySection({ onNext }) {
    const { sections, updateSection } = useProjectStore();
    const { identity } = sections;

    const { register, handleSubmit, reset } = useForm({
        defaultValues: identity
    });

    useEffect(() => {
        reset(identity);
    }, [identity, reset]);

    const onSubmit = (data) => {
        updateSection('identity', data);
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            {/* Header - Aligned for mobile */}
            <div className="flex flex-col items-start border-b border-[#1a1a1a] pb-6">
                <h2 className="text-xl sm:text-2xl text-white uppercase tracking-[0.2em]">Edit Identity</h2>
                <div className="h-[2px] w-12 bg-[#B08B57] mt-3"></div>
            </div>

            {/* Image Preview - Responsive sizing */}
            {identity.imageUrl && (
                <div className="group relative w-full sm:w-32 h-48 sm:h-32 overflow-hidden border border-[#1a1a1a]">
                    <img 
                        src={identity.imageUrl} 
                        alt="Current" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] text-white uppercase tracking-widest font-bold">Current</span>
                    </div>
                </div>
            )}

            {/* Responsive Input Grid */}
            <div className="grid grid-cols-1 gap-6">
                <Input 
                    label="Project Title" 
                    {...register("title")} 
                    className="bg-[#0a0a0a] w-full" 
                />
                <Input 
                    label="Tagline" 
                    {...register("tagline")} 
                    className="bg-[#0a0a0a] w-full" 
                />
                <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-[#555]">Description</label>
                    <textarea 
                        {...register("description")} 
                        rows={5} 
                        className="w-full bg-[#0a0a0a] border border-[#1a1a1a] p-4 text-white focus:ring-1 focus:ring-[#B08B57] outline-none transition-all resize-y"
                        placeholder="Detailed project description..."
                    />
                </div>
            </div>

            {/* Responsive Action Button */}
            <div className="pt-4">
                <Button 
                    type="submit" 
                    className="w-full sm:w-fit px-8 py-3 bg-[#B08B57] text-black font-bold uppercase tracking-widest text-[12px]  transition-colors"
                >
                    Update & Continue
                </Button>
            </div>
        </form>
    );
}