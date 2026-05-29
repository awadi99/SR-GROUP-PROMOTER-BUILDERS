import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useProjectStore } from '../../store/useProjectStore';

export default function EditContactSection({ onPrev }) {
    // 1. Access the store and the final persistence method
    const { sections, updateSection, persistProject, isSaving } = useProjectStore();

    const { register, handleSubmit, reset } = useForm({
        defaultValues: sections.contact || {}
    });

    // 2. Sync form with store data
    useEffect(() => {
        if (sections.contact) {
            reset(sections.contact);
        }
    }, [sections.contact, reset]);

    // 3. Submit: Finalizes store update and pushes to Database
    const onSubmit = async (data) => {
        // Update the local store one last time
        updateSection('contact', data);
        
        // Trigger the final API call to save the entire project
        await persistProject();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <h2 className="text-xl sm:text-2xl text-white uppercase tracking-[0.2em]">Contact Configuration</h2>
                <div className="h-[2px] w-12 bg-[#B08B57] mt-3"></div>
                <p className="text-[#555] text-[11px] uppercase tracking-widest mt-2">Update office & sales management details</p>
            </div>
            
            {/* Proper Layout: Grouped Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#080808] p-6 border border-[#1a1a1a]">
                <Input label="Sales Manager Name" {...register("salesManagerName")} className="bg-[#050505]" />
                <Input label="Email Address" {...register("email")} className="bg-[#050505]" />
                <Input label="Contact Number" {...register("phone")} className="bg-[#050505]" />
                <div className="md:col-span-2">
                    <Input label="Office Address" {...register("address")} className="bg-[#050505]" />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 border-t border-[#1a1a1a] pt-8">
                <Button 
                    type="button" 
                    onClick={onPrev} 
                    disabled={isSaving}
                    className="w-full sm:w-auto px-8 py-3 border border-[#1a1a1a] bg-transparent hover:bg-[#1a1a1a] transition-all duration-300"
                >
                    Back
                </Button>
                <Button 
                    type="submit" 
                    disabled={isSaving}
                    className={`w-full sm:w-auto px-8 py-3 bg-[#B08B57] text-black font-bold uppercase tracking-widest text-[12px] transition-all duration-300 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isSaving ? 'Syncing...' : 'Save All Changes'}
                </Button>
            </div>
        </form>
    );
}