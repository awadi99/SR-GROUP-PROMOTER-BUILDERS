import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { visionSchema } from '../../schema/projectSchema.js';
import { useProjectStore } from '../../store/useProjectStore.js';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function VisionSection({ onNext, onPrev }) {
    const { sections, updateSection } = useProjectStore();

    const { 
        register, 
        control, 
        handleSubmit, 
        setValue, 
        trigger, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(visionSchema),
        defaultValues: {
            vision: sections.vision?.vision || '',
            features: sections.vision?.features?.length ? sections.vision.features : [{ feature: '' }],
            images: sections.vision?.images || []
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
                    className="w-full p-4 bg-[#0a0a0a] border border-[#B08B57]/20 focus:border-[#B08B57] outline-none text-white placeholder:text-gray-600 resize-none"
                    placeholder="Describe the architectural concept (min 50 chars)..."
                />
                {errors.vision && <p className="text-[#B08B57] text-[10px] uppercase">{errors.vision.message}</p>}
            </div>

            {/* Image Uploader for 3 Images */}
            <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#B08B57] font-bold">Upload 3 Vision Images (Required)</label>
                <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setValue(
                            "images",
                            [...files],
                            {
                                shouldValidate: true,
                                shouldDirty: true,
                                shouldTouch: true
                            }
                        );
                        trigger("images");
                    }}
                    className="w-full bg-[#1a1a1a] border border-[#B08B57]/20 p-2 text-white text-xs cursor-pointer" 
                />
                {errors.images && <p className="text-[10px] text-red-500 uppercase">{errors.images.message}</p>}
            </div>

            {/* Key Features List */}
            <div className="space-y-6">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#B08B57] font-bold">Key Highlights</label>
                {fields.map((field, index) => (
                    <div key={field.id} className="relative group">
                        <Input
                            {...register(`features.${index}.feature`)}
                            placeholder="e.g., Sustainable Design"
                            className={`${inputClasses} pr-20`}
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0a0a0a] border border-[#B08B57]/30 text-[9px] uppercase text-[#B08B57] px-3 py-1 hover:bg-[#B08B57] hover:text-black transition-all"
                        >
                            Delete
                        </button>
                    </div>
                ))}

                <Button
                    type="button"
                    onClick={() => append({ feature: '' })}
                    className="w-full py-4 border border-dashed border-[#B08B57]/30 text-[#B08B57]/70 hover:border-[#B08B57] uppercase tracking-[0.2em] text-[10px]"
                >
                    + Add Feature
                </Button>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button type="button" onClick={onPrev} className="w-full sm:w-auto px-10 py-3 border border-[#333] text-gray-400 uppercase tracking-[0.2em] text-[10px]">Back</Button>
                <Button type="submit" className="w-full sm:w-auto px-10 py-3 border border-[#B08B57] text-[#B08B57] uppercase tracking-[0.2em] text-[10px]">Save & Continue</Button>
            </div>
        </form>
    );
}