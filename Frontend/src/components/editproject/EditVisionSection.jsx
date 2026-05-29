import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useProjectStore } from '../../store/useProjectStore';

export default function EditVisionSection({ onNext, onPrev }) {
    // 1. Access the store
    const { sections, updateSection } = useProjectStore();
    const vision = sections.vision || { vision: '', images: [] };

    // 2. Initialize form
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            vision: vision.vision || '',
        }
    });

    // 3. Sync form with store data
    useEffect(() => {
        reset({
            vision: vision.vision || '',
        });
    }, [vision.vision, reset]);

    // 4. Handle image removal locally in the store
    const handleRemoveImage = (indexToRemove) => {
        const updatedImages = vision.images.filter((_, idx) => idx !== indexToRemove);
        
        // Update store directly
        updateSection('vision', { 
            ...vision, 
            images: updatedImages 
        });
    };

    const onSubmit = (data) => {
        // Update the Zustand store locally (no API call yet)
        updateSection('vision', { 
            ...vision, 
            ...data 
        });
        
        // Move to the next step
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            {/* Header */}
            <div>
                <h2 className="text-xl sm:text-2xl text-white uppercase tracking-[0.2em]">Vision & Gallery</h2>
                <div className="h-[2px] w-12 bg-[#B08B57] mt-3"></div>
            </div>

            {/* Vision Text */}
            <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.2em] text-[#555] font-bold">Project Vision</label>
                <textarea 
                    {...register("vision")} 
                    className="w-full bg-[#050505] border border-[#1a1a1a] p-4 text-white focus:border-[#B08B57] outline-none transition-all resize-none" 
                    rows={5}
                    placeholder="Describe the project vision..."
                />
            </div>

            {/* Gallery Manager */}
            <div className="space-y-4">
                <label className="text-[9px] uppercase tracking-[0.2em] text-[#555] font-bold">Gallery Management</label>
                
                {/* Image Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {vision.images?.map((url, idx) => (
                        <div key={idx} className="relative aspect-square border border-[#1a1a1a] group overflow-hidden bg-[#050505]">
                            <img src={url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={`Vision-${idx}`} />
                            
                            {/* Delete Overlay */}
                            <button 
                                type="button"
                                onClick={() => handleRemoveImage(idx)}
                                className="absolute top-2 right-2 p-1 bg-black/70 hover:bg-red-600 transition-colors text-white"
                            >
                                <X size={14} />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 text-[8px] text-white uppercase text-center">Active</div>
                        </div>
                    ))}
                </div>

                {/* File Upload */}
                <div className="mt-6 border-2 border-dashed border-[#1a1a1a] p-8 text-center hover:border-[#B08B57] transition-colors cursor-pointer">
                    <input type="file" multiple className="hidden" id="galleryUpload" />
                    <label htmlFor="galleryUpload" className="text-[10px] uppercase text-[#B08B57] tracking-widest cursor-pointer">
                        Click to upload new gallery images
                    </label>
                </div>
            </div>

            {/* Navigation */}
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
                    className="w-full sm:flex-1 bg-[#B08B57] text-black font-bold uppercase tracking-widest text-[12px] transition-colors px-8 py-3"
                >
                    Update & Continue
                </Button>
            </div>
        </form>
    );
}