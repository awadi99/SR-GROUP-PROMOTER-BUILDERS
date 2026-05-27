import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { residencesSchema } from '../../schema/projectSchema.js';
import { useProjectStore } from '../../store/useProjectStore.js';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function ResidencesSection({ onNext, onPrev }) {
    const { sections, updateSection } = useProjectStore();

    const {
        register,
        control,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(residencesSchema),
        defaultValues: {
            commonVideoUrl: sections.residences?.commonVideoUrl || '',
            units: sections.residences?.units?.length 
                ? sections.residences.units 
                : [{ type: '', area: '', price: '', images: [] }]
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "units" });

    // FIXED: Removed async/await and setTimeout to prevent race conditions.
    // This now updates state and validates synchronously.
    const handleFileChange = (index, e) => {
        const files = Array.from(e.target.files || []);
        
        setValue(
            `units.${index}.images`,
            [...files],
            {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true
            }
        );

        // Trigger validation immediately after value is set
        trigger(`units.${index}.images`);
    };

    const onSubmit = (data) => {
        updateSection('residences', data);
        onNext();
    };

    // FIXED: Added onInvalid handler to help you debug why the button "blocks"
    const onInvalid = (errors) => {
        console.error("Form validation failed:", errors);
        alert("Please fix the errors in the form before continuing.");
    };

    const inputClasses = "bg-[#0a0a0a] border-[#B08B57]/20 focus:border-[#B08B57] text-white placeholder:text-gray-600 rounded-none w-full";

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-8 w-full">
            <h2 className="text-lg font-light text-white uppercase tracking-widest">Available Residences</h2>

            {/* Video Input */}
            <div className="p-4 border border-[#B08B57]/20 bg-[#0a0a0a]">
                <Input {...register("commonVideoUrl")} label="Project Video Tour Link (Common)" className={inputClasses} />
            </div>

            {/* Units List */}
            <div className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border border-[#B08B57]/20 bg-[#0a0a0a]/50 relative">
                        <button 
                            type="button" 
                            onClick={() => remove(index)} 
                            className="absolute top-2 right-2 text-[9px] text-[#B08B57] border border-[#B08B57] px-2 py-1 uppercase hover:bg-[#B08B57] hover:text-black transition-colors"
                        >
                            Remove
                        </button>

                        <div className="grid grid-cols-1 gap-4 mb-4">
                            <Input {...register(`units.${index}.type`)} label="Unit Type" className={inputClasses} />
                            <Input {...register(`units.${index}.area`)} label="Area (sq ft)" className={inputClasses} />
                            <Input {...register(`units.${index}.price`)} label="Price" className={inputClasses} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-[0.2em] text-[#B08B57] font-bold">
                                Upload 4 Images (Required)
                            </label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => handleFileChange(index, e)}
                                className="w-full bg-[#1a1a1a] border border-[#B08B57]/20 p-2 text-white text-[10px] cursor-pointer"
                            />
                            {errors.units?.[index]?.images && (
                                <p className="text-[9px] text-red-500 uppercase mt-1">
                                    {errors.units[index].images.message}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Button
                type="button"
                onClick={() => append({ type: '', area: '', price: '', images: [] })}
                className="w-full py-4 border border-dashed border-[#B08B57] text-[#B08B57] text-[10px] uppercase hover:bg-[#B08B57]/10"
            >
                + Add New Unit
            </Button>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
                <Button type="button" onClick={onPrev} className="flex-1 py-3 border border-[#333] text-gray-400">Back</Button>
                <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 py-3 border border-[#B08B57] text-[#B08B57] disabled:opacity-50"
                >
                    Save & Continue
                </Button>
            </div>
        </form>
    );
}