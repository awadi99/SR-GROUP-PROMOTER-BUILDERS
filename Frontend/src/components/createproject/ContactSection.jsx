import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { contactSchema } from '../../schema/projectSchema.js';
import { useProjectStore } from '../../store/useProjectStore.js';

import Button from '../ui/Button';
import Input from '../ui/Input';

export default function ContactSection({
    onPrev,
    onFinalSubmit,
    isCreating
}) {

    const {
        sections,
        updateSection
    } = useProjectStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            salesManagerName: '',
            email: '',
            phone: '',
            address: ''
        }
    });

    // Refill form after Zustand rehydrates
    useEffect(() => {
        if (sections?.contact) {
            reset({
                salesManagerName: sections.contact.salesManagerName || '',
                email: sections.contact.email || '',
                phone: sections.contact.phone || '',
                address: sections.contact.address || ''
            });
        }
    }, [sections.contact, reset]);

    const onSubmit = (data) => {
        // 1. Save contact to Zustand
        updateSection('contact', data);

        // 2. Trigger the final submission (The parent should handle the loading state)
        onFinalSubmit(data);
    };

    const inputClasses =
        "bg-[#0a0a0a] border-[#B08B57]/20 focus:border-[#B08B57] text-white placeholder:text-gray-600 rounded-none w-full";

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-10 animate-in fade-in duration-700 w-full max-w-3xl"
        >
            <div>
                <h2 className="text-xl md:text-2xl font-light text-white tracking-[0.05em] uppercase">
                    Project Contact Details
                </h2>
                <div className="h-[1px] w-12 bg-[#B08B57] mt-3"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Input
                    label="Contact Person"
                    {...register("salesManagerName")}
                    error={errors.salesManagerName?.message}
                    className={inputClasses}
                />
                <Input
                    label="Email Address"
                    {...register("email")}
                    error={errors.email?.message}
                    className={inputClasses}
                />
                <Input
                    label="Phone Number"
                    {...register("phone")}
                    error={errors.phone?.message}
                    className={inputClasses}
                />
                <Input
                    label="Project Address"
                    {...register("address")}
                    error={errors.address?.message}
                    className={inputClasses}
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                    type="button"
                    onClick={onPrev}
                    disabled={isCreating} // Disable back button too while submitting
                    className="w-full sm:w-auto px-10 py-3 bg-transparent border border-[#333] text-gray-400 hover:text-white hover:border-gray-500 transition-all uppercase tracking-[0.2em] text-[10px] disabled:opacity-50"
                >
                    Back
                </Button>

                <Button
                    type="submit"
                    disabled={isCreating} // This locks the button
                    className="w-full sm:w-auto px-10 py-3 bg-transparent border border-[#B08B57] text-[#B08B57] hover:bg-[#B08B57] hover:text-black transition-all uppercase tracking-[0.2em] text-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isCreating ? 'Finalizing...' : 'Finalize Project'}
                </Button>
            </div>
        </form>
    );
}