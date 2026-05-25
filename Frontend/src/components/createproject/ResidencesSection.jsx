import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { residencesSchema } from '../../schema/projectSchema.js';
import { useProjectStore } from '../../store/useProjectStore.js';

import Button from '../ui/Button';
import Input from '../ui/Input';

export default function ResidencesSection({ onNext, onPrev }) {
    const { sections, updateSection } = useProjectStore();

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(residencesSchema),
        defaultValues: { units: sections.residences?.length ? sections.residences : [{ type: '', area: '', price: '' }] }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "units" });

    const onSubmit = (data) => {
        updateSection('residences', data.units);
        onNext();
    };

    const inputClasses = "bg-[#0a0a0a] border-[#B08B57]/20 focus:border-[#B08B57] text-white placeholder:text-gray-600 rounded-none w-full";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 animate-in fade-in duration-700 w-full max-w-3xl">
            {/* Header */}
            <div>
                <h2 className="text-xl md:text-2xl font-light text-white tracking-[0.05em] uppercase">Available Residences</h2>
                <div className="h-[1px] w-12 bg-[#B08B57] mt-3"></div>
            </div>

            {/* Units Container */}
            <div className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="relative p-6 border border-[#B08B57]/20 bg-[#0a0a0a]/80 group transition-all hover:border-[#B08B57]/50">
                        {/* Highly Visible Delete Button */}
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute -top-3 -right-3 bg-[#1a1a1a] border border-[#B08B57] text-[#B08B57] text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em] shadow-lg hover:bg-[#B08B57] hover:text-black transition-all duration-300 z-10"
                            title="Delete this unit"
                        >
                            ✕ Delete
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <Input {...register(`units.${index}.type`)} label="Unit Type" placeholder="2 BHK" className={inputClasses} />
                            <Input {...register(`units.${index}.area`)} label="Area (sq ft)" placeholder="1200" className={inputClasses} />
                            <Input {...register(`units.${index}.price`)} label="Price" placeholder="₹ Cr" className={inputClasses} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Visually Weighted Add Button */}
            <Button
                type="button"
                onClick={() => append({ type: '', area: '', price: '' })}
                className="w-full py-5 border border-[#B08B57] bg-[#B08B57]/5 text-[#B08B57] hover:bg-[#B08B57] hover:text-black transition-all duration-300 uppercase tracking-[0.2em] text-[11px] font-bold shadow-md"
            >
                + Add New Residence Type
            </Button>

            {/* Navigation */}
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