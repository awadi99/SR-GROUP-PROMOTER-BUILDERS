import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { visionSchema } from '../../schema/projectSchema.js';
import { useProjectStore } from '../../store/useProjectStore.js';

import Button from '../ui/Button';
import Input from '../ui/Input';

export default function VisionSection({ onNext, onPrev }) {
    const { sections, updateSection } = useProjectStore();

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(visionSchema),
        defaultValues: {
            vision: sections.vision?.vision || '',
            features: sections.vision?.features?.length ? sections.vision.features : [{ feature: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "features" });

    const onSubmit = (data) => {
        updateSection('vision', data);
        onNext();
    };

    const inputClasses = "bg-[#0a0a0a] border-[#B08B57]/20 focus:border-[#B08B57] text-white placeholder:text-gray-600 rounded-none w-full";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 animate-in fade-in duration-700 w-full max-w-3xl">
            {/* Header */}
            <div>
                <h2 className="text-xl md:text-2xl font-light text-white tracking-[0.05em] uppercase">Architectural Vision</h2>
                <div className="h-[1px] w-12 bg-[#B08B57] mt-3"></div>
            </div>

            {/* Vision Statement */}
            <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#B08B57] font-bold">Vision Statement</label>
                <textarea
                    {...register("vision")}
                    rows={5}
                    className="w-full p-4 bg-[#0a0a0a] border border-[#B08B57]/20 focus:border-[#B08B57] outline-none transition-all text-white placeholder:text-gray-600 resize-none"
                    placeholder="Describe the architectural concept..."
                />
                {errors.vision && <p className="text-[#B08B57] text-[10px] uppercase">{errors.vision.message}</p>}
            </div>

            {/* Key Features List */}
            <div className="space-y-6">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#B08B57] font-bold">Key Highlights</label>
                {fields.map((field, index) => (
                    // Add relative to container so the absolute button stays aligned
                    <div key={field.id} className="relative group">
                        <Input
                            {...register(`features.${index}.feature`)}
                            placeholder="e.g., Infinity Swimming Pool"
                            className={`${inputClasses} pr-20`} // Add right padding to prevent text overlap
                        />

                        {/* Highly Visible Action Button */}
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0a0a0a] border border-[#B08B57]/30 text-[9px] uppercase tracking-[0.1em] text-[#B08B57] px-3 py-1 hover:bg-[#B08B57] hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100"
                        >
                            Delete
                        </button>
                    </div>
                ))}

                <Button
                    type="button"
                    onClick={() => append({ feature: '' })}
                    className="w-full py-4 border border-dashed border-[#B08B57]/30 text-[#B08B57]/70 hover:border-[#B08B57] hover:text-[#B08B57] transition-all duration-300 uppercase tracking-[0.2em] text-[10px]"
                >
                    + Add Feature
                </Button>
            </div>

            {/* Navigation Controls */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button type="button" onClick={onPrev} className="w-full sm:w-auto px-10 py-3 bg-transparent border border-[#333] text-gray-400 hover:text-white hover:border-gray-500 transition-all uppercase tracking-[0.2em] text-[10px]">
                    Back
                </Button>
                <Button type="submit" className="w-full sm:w-auto px-10 py-3 bg-transparent border border-[#B08B57] text-[#B08B57] hover:bg-[#B08B57] hover:text-black transition-all uppercase tracking-[0.2em] text-[10px]">
                    Save & Continue
                </Button>
            </div>
        </form>
    );
}