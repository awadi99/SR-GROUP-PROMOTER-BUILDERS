import React, { useEffect } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { Trash2, Plus } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import VideoPreview from './VideoPreview';
import ImageGallery from './ImageGallery';
import { useProjectStore } from '../../store/useProjectStore';

export default function EditResidencesSection({ onNext, onPrev }) {
    // 1. Access the store
    const { sections, updateSection } = useProjectStore();

    // 2. Initialize Form
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: { 
            commonVideoUrl: sections.residences?.commonVideoUrl || '', 
            units: (sections.residences?.units || []).map(unit => ({
                ...unit,
                imageUrls: unit.images || []
            }))
        }
    });

    const watchedVideoUrl = useWatch({ control, name: "commonVideoUrl" });
    const { fields, append, remove } = useFieldArray({ control, name: "units" });

    // 3. SYNC: Map Store Data -> Frontend State
    useEffect(() => {
        if (sections.residences) {
            reset({
                commonVideoUrl: sections.residences.commonVideoUrl || '',
                units: (sections.residences.units || []).map(unit => ({
                    ...unit,
                    imageUrls: unit.images || []
                }))
            });
        }
    }, [sections.residences, reset]);

    // 4. SUBMIT: Save to Store (No API call here)
    const onSubmit = (data) => {
        // Transform: Frontend 'imageUrls' -> Store 'images'
        const payloadUnits = data.units.map(unit => ({
            ...unit,
            images: unit.imageUrls || [] 
        }));

        // Save only this section to the Zustand store
        updateSection('residences', {
            commonVideoUrl: data.commonVideoUrl,
            units: payloadUnits
        });

        // Move to the next step
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="border-b border-[#1a1a1a] pb-6">
                <h2 className="text-xl sm:text-2xl text-white uppercase tracking-[0.2em]">Edit Residences</h2>
                <div className="h-[2px] w-12 bg-[#B08B57] mt-3"></div>
            </div>

            {/* Video Preview */}
            <div className="space-y-4">
                <Input 
                    label="Project Video Tour (Embed URL)" 
                    {...register("commonVideoUrl")} 
                    className="bg-[#050505]" 
                />
                <VideoPreview url={watchedVideoUrl || sections.residences?.commonVideoUrl} />
            </div>

            {/* Residential Units List */}
            <div className="space-y-6">
                <label className="text-[10px] uppercase text-[#555] tracking-widest block">Existing Residential Units</label>
                
                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 sm:p-6 border border-[#1a1a1a] bg-[#050505] space-y-6 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-start">
                            <h3 className="text-[10px] uppercase text-[#B08B57] tracking-widest font-bold">Unit {index + 1}</h3>
                            <button 
                                type="button" 
                                onClick={() => remove(index)} 
                                className="text-[#555] hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Input label="Unit Type" {...register(`units.${index}.type`)} className="bg-[#0a0a0a]" />
                            <Input label="Area (sq ft)" {...register(`units.${index}.area`)} className="bg-[#0a0a0a]" />
                            <Input label="Price" {...register(`units.${index}.price`)} className="bg-[#0a0a0a]" />
                        </div>

                        {/* Rendering: Using mapped imageUrls */}
                        {field.imageUrls && field.imageUrls.length > 0 && (
                            <div className="mt-4">
                                <label className="text-[9px] text-[#555] uppercase">Existing Photos</label>
                                <ImageGallery images={field.imageUrls} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Button
                type="button"
                onClick={() => append({ type: '', area: '', price: '', imageUrls: [] })}
                className="w-full sm:w-auto flex items-center justify-center bg-[#1a1a1a] hover:bg-[#252525] transition-all text-white uppercase text-[10px] tracking-widest py-3 px-6"
            >
                <Plus size={16} className="mr-2" />Add New Unit
            </Button>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-4 border-t border-[#1a1a1a] pt-8">
                <Button 
                    type="button" 
                    onClick={onPrev} 
                    className="w-full sm:w-auto border border-[#1a1a1a] bg-transparent hover:bg-[#1a1a1a] text-white px-8 py-3"
                >
                    Back
                </Button>
                <Button 
                    type="submit" 
                    className="w-full sm:flex-1 bg-[#B08B57] text-black font-bold uppercase text-[12px] px-8 py-3"
                >
                    Update & Continue
                </Button>
            </div>
        </form>
    );
}