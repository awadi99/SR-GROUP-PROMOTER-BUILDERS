import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useProjectStore } from '../../store/useProjectStore';

export default function EditLocationSection({ onNext, onPrev }) {
    // 1. Access the store
    const { sections, updateSection } = useProjectStore();

    // 2. Initialize form with store data
    const { register, control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            mapEmbed: sections.location?.mapEmbed || '',
            landmarks: sections.location?.landmarks || []
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "landmarks" });
    const mapUrl = watch("mapEmbed"); // Live preview

    // 3. Sync form if store data changes
    useEffect(() => {
        reset({
            mapEmbed: sections.location?.mapEmbed || '',
            landmarks: sections.location?.landmarks || []
        });
    }, [sections.location, reset]);

    const onSubmit = (data) => {
        // Update the Zustand store locally (no API call here)
        updateSection('location', data);
        
        // Move to the next step
        onNext();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full"
        >
            {/* Header */}
            <div>
                <h2 className="text-xl sm:text-2xl text-white uppercase tracking-[0.2em]">Location Settings</h2>
                <div className="h-[2px] w-12 bg-[#B08B57] mt-3"></div>
            </div>

            {/* Map Preview Container */}
            <div className="space-y-4">
                <Input
                    label="Google Map Embed URL"
                    {...register("mapEmbed")}
                    className="bg-[#050505] border-[#1a1a1a]"
                />

                {mapUrl && (
                    <div className="aspect-video w-full border border-[#1a1a1a] bg-[#080808] overflow-hidden">
                        <iframe
                            src={mapUrl}
                            className="w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                            title="Map Preview"
                        />
                    </div>
                )}
            </div>

            {/* Landmarks List */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-[#555] font-bold">Key Landmarks</label>
                    <Button
                        type="button"
                        onClick={() => append("")}
                        className="text-[10px] py-1 px-3 bg-[#1a1a1a] hover:bg-[#252525]"
                    >
                        + Add Landmark
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-3 animate-in zoom-in-95 duration-300 bg-[#050505] p-2 border border-[#1a1a1a]">
                            <Input
                                {...register(`landmarks.${index}`)}
                                className="bg-transparent border-none focus:ring-0 text-sm"
                                placeholder={`Landmark ${index + 1}`}
                            />
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-[10px] text-[#555] hover:text-red-500 uppercase tracking-widest px-4"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col-reverse sm:flex-row gap-4 border-t border-[#1a1a1a] pt-8 mt-auto">
                <Button
                    type="button"
                    onClick={onPrev}
                    className="w-full sm:w-auto px-8 py-3 border border-[#1a1a1a] bg-transparent hover:bg-[#1a1a1a] transition-all duration-300 text-center"
                >
                    Back
                </Button>

                <Button
                    type="submit"
                    className="w-full sm:flex-1 px-8 py-3 bg-[#B08B57] text-black font-bold uppercase tracking-widest text-[12px] transition-all duration-300 text-center"
                >
                    Update & Continue
                </Button>
            </div>
        </form>
    );
}