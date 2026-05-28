import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { residencesSchema } from '../../schema/projectSchema.js';
import { useProjectStore } from '../../store/useProjectStore.js';
import { compressImage } from '../../utils/imageUtils.js';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function ResidencesSection({ onNext, onPrev, filesRef }) {
    const { sections, updateSection } = useProjectStore();
    const [isCompressing, setIsCompressing] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting }
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

    useEffect(() => {
        if (sections.residences) {
            reset({
                commonVideoUrl: sections.residences.commonVideoUrl || '',
                units: sections.residences.units?.length > 0
                    ? sections.residences.units
                    : [{ type: '', area: '', price: '', images: [] }]
            });
        }
    }, [sections.residences, reset]);

    const handleFileChange = async (index, e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setIsCompressing(true);
        try {
            const compressedFiles = await Promise.all(
                files.map((file) => compressImage(file))
            );
            
            // Save files directly to the parent's Ref
            // This bypasses the form state and Zustand, preventing serialization errors
            filesRef.current.unitImages[index] = compressedFiles;
        } catch (error) {
            console.error("Error processing images:", error);
        } finally {
            setIsCompressing(false);
        }
    };

    const onSubmit = (data) => {
        // Validation: Check that we have files in our Ref for every unit
        const hasInvalidImages = data.units.some((_, index) => 
            !filesRef.current.unitImages[index] || filesRef.current.unitImages[index].length !== 4
        );
        
        if (hasInvalidImages) {
            alert("Each unit must have exactly 4 images uploaded.");
            return;
        }

        // Save only text/metadata to Zustand
        updateSection('residences', {
            commonVideoUrl: data.commonVideoUrl,
            units: data.units.map(unit => ({
                type: unit.type,
                area: unit.area,
                price: unit.price
            }))
        });
        
        onNext();
    };

    const inputClasses = "bg-[#0a0a0a] border-[#B08B57]/20 focus:border-[#B08B57] text-white placeholder:text-gray-600 rounded-none w-full";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
            <h2 className="text-lg font-light text-white uppercase tracking-widest">Available Residences</h2>

            <div className="p-4 border border-[#B08B57]/20 bg-[#0a0a0a]">
                <Input {...register("commonVideoUrl")} label="Project Video Tour Link (Common)" className={inputClasses} />
            </div>

            <div className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border border-[#B08B57]/20 bg-[#0a0a0a]/50 relative">
                        <button 
                            type="button" 
                            onClick={() => {
                                remove(index);
                                delete filesRef.current.unitImages[index]; // Clean up ref
                            }} 
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
                                {isCompressing ? "Compressing Images..." : "Upload 4 Images (Required)"}
                            </label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                disabled={isCompressing}
                                onChange={(e) => handleFileChange(index, e)}
                                className="w-full bg-[#1a1a1a] border border-[#B08B57]/20 p-2 text-white text-[10px] cursor-pointer disabled:opacity-50"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <Button
                type="button"
                onClick={() => append({ type: '', area: '', price: '', images: [] })}
                disabled={isCompressing}
                className="w-full py-4 border border-dashed border-[#B08B57] text-[#B08B57] text-[10px] uppercase hover:bg-[#B08B57]/10 disabled:opacity-50"
            >
                + Add New Unit
            </Button>

            <div className="flex gap-4 pt-4">
                <Button type="button" onClick={onPrev} className="flex-1 py-3 border border-[#333] text-gray-400">Back</Button>
                <Button 
                    type="submit" 
                    disabled={isSubmitting || isCompressing}
                    className="flex-1 py-3 border border-[#B08B57] text-[#B08B57] disabled:opacity-50"
                >
                    {isCompressing ? "Compressing..." : "Save & Continue"}
                </Button>
            </div>
        </form>
    );
}