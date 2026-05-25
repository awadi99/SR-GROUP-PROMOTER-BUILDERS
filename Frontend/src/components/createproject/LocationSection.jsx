import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { locationSchema } from '../../schema/projectSchema.js';
import { useProjectStore } from '../../store/useProjectStore.js';

import Button from '../ui/Button';
import Input from '../ui/Input';

export default function LocationSection({ onNext, onPrev }) {
    const { sections, updateSection } = useProjectStore();

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(locationSchema),
        defaultValues: {
            mapEmbed: sections.location?.mapEmbed || '',
            landmarks: sections.location?.landmarks?.length ? sections.location.landmarks : [{ name: '', distance: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "landmarks" });

    const onSubmit = (data) => {
        updateSection('location', data);
        onNext();
    };

    const inputClasses = "bg-[#0a0a0a] border-[#B08B57]/20 focus:border-[#B08B57] text-white placeholder:text-gray-600 rounded-none w-full";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 animate-in fade-in duration-700 w-full max-w-3xl">
            {/* Header */}
            <div>
                <h2 className="text-xl md:text-2xl font-light text-white tracking-[0.05em] uppercase">Site Location</h2>
                <div className="h-[1px] w-12 bg-[#B08B57] mt-3"></div>
            </div>

            {/* Map Embed Input */}
            <Input
                label="Google Maps Embed URL"
                {...register("mapEmbed")}
                error={errors.mapEmbed?.message}
                placeholder="https://maps.google.com/..."
                className={inputClasses}
            />

            {/* Landmarks List */}
            <div className="space-y-6">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#B08B57] font-bold">Nearest Landmarks</label>
                {fields.map((field, index) => (
                    <div key={field.id} className="relative group flex items-end gap-4">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input 
                                {...register(`landmarks.${index}.name`)} 
                                placeholder="Landmark Name" 
                                className={inputClasses}
                            />
                            <Input 
                                {...register(`landmarks.${index}.distance`)} 
                                placeholder="Distance (e.g., 2 km)" 
                                className={inputClasses}
                            />
                        </div>
                        <button 
                            type="button" 
                            onClick={() => remove(index)}
                            className="bg-[#0a0a0a] border border-[#B08B57]/30 text-[9px] uppercase tracking-[0.1em] text-[#B08B57] px-4 py-3 hover:bg-[#B08B57] hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100"
                        >
                            Delete
                        </button>
                    </div>
                ))}
                
                <Button 
                    type="button" 
                    onClick={() => append({ name: '', distance: '' })}
                    className="w-full py-4 border border-dashed border-[#B08B57]/30 text-[#B08B57]/70 hover:border-[#B08B57] hover:text-[#B08B57] transition-all duration-300 uppercase tracking-[0.2em] text-[10px]"
                >
                    + Add Landmark
                </Button>
            </div>

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