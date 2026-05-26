import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useProjectStore } from '../../store/useProjectStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { X, Trash2, Plus } from 'lucide-react';

export default function EditResidencesSection({ onNext, onPrev }) {
    const { sections, updateSection } = useProjectStore();
    const { residences } = sections;

    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            commonVideoUrl: residences.commonVideoUrl || '',
            units: residences.units || []
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "units" });

    const onSubmit = (data) => {
        updateSection('residences', data);
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="border-b border-[#1a1a1a] pb-6">
                <h2 className="text-xl sm:text-2xl text-white uppercase tracking-[0.2em]">Edit Residences</h2>
                <div className="h-[2px] w-12 bg-[#B08B57] mt-3"></div>
            </div>

            <Input label="Project Video Tour (Embed URL)" {...register("commonVideoUrl")} className="bg-[#050505]" />

            {/* Units List */}
            <div className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 sm:p-6 border border-[#1a1a1a] bg-[#050505] space-y-6 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-start">
                            <h3 className="text-[10px] uppercase text-[#B08B57] tracking-widest font-bold">Unit {index + 1}</h3>
                            <button type="button" onClick={() => remove(index)} className="text-[#555] hover:text-red-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Input label="Unit Type" {...register(`units.${index}.type`)} className="bg-[#0a0a0a]" />
                            <Input label="Area (sq ft)" {...register(`units.${index}.area`)} className="bg-[#0a0a0a]" />
                            <Input label="Price" {...register(`units.${index}.price`)} className="bg-[#0a0a0a]" />
                        </div>

                        {field.imageUrls?.length > 0 && (
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                {field.imageUrls.map((url, i) => (
                                    <div key={i} className="relative aspect-square overflow-hidden border border-[#1a1a1a]">
                                        <img src={url} className="w-full h-full object-cover" alt="Unit" />
                                        <button type="button" className="absolute top-0 right-0 bg-black/70 text-white p-0.5 hover:bg-red-600">
                                            <X size={10} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div>
                            <label className="block text-[9px] uppercase text-[#555] mb-2">Upload Images</label>
                            <input type="file" multiple className="text-[10px] text-[#555] w-full p-2 border border-[#1a1a1a] bg-[#0a0a0a]" />
                        </div>
                    </div>
                ))}
            </div>

            <Button
                type="button"
                onClick={() => append({ type: '', area: '', price: '', imageUrls: [] })}
                className="w-full sm:w-auto flex items-center justify-center bg-[#1a1a1a] hover:bg-[#252525] transition-all"
            >
                <Plus size={16} className="mr-2" />Add New Unit
            </Button>

            {/* Responsive Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-4 border-t border-[#1a1a1a] pt-8">
                <Button type="button" onClick={onPrev} className="w-full sm:w-auto border border-[#1a1a1a] bg-transparent hover:bg-[#1a1a1a]">Back</Button>
                <Button type="submit" className="w-full sm:flex-1 bg-[#B08B57] text-black font-bold uppercase tracking-widest text-[12px]  transition-colors">Update & Continue</Button>
            </div>
        </form>
    );
}