import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useProjectStore } from '../store/useProjectStore';
import { toast } from 'react-toastify';

import IdentitySection from '../components/createproject/IdentitySection';
import SpecsSection from '../components/createproject/SpecsSection';
import ResidencesSection from '../components/createproject/ResidencesSection';
import VisionSection from '../components/createproject/VisionSection';
import LocationSection from '../components/createproject/LocationSection';
import ContactSection from '../components/createproject/ContactSection';

export default function CreateProject() {
    const { sections } = useProjectStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const filesRef = useRef({
        visionImages: [],
        unitImages: {} 
    });

    const STEPS = [
        { id: 1, component: IdentitySection },
        { id: 2, component: SpecsSection },
        { id: 3, component: ResidencesSection },
        { id: 4, component: VisionSection },
        { id: 5, component: LocationSection },
        { id: 6, component: ContactSection },
    ];

    const [currentStep, setCurrentStep] = useState(1);
    const currentStepConfig = STEPS.find(s => s.id === currentStep) || STEPS[0];
    const ActiveComponent = currentStepConfig.component;
    
    const next = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    const prev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleFinalSubmit = async (contactData) => {
        setIsSubmitting(true); // Disable button immediately
        
        try {
            const formData = new FormData();

            const payload = {
                identity: sections.identity || {},
                specs: sections.specs || {},
                residences: {
                    commonVideoUrl: sections.residences?.commonVideoUrl || "",
                    units: sections.residences?.units || []
                },
                vision: { vision: sections.vision?.vision || "", features: sections.vision?.features || [] },
                location: { mapEmbed: sections.location?.mapEmbed || "", landmarks: sections.location?.landmarks || [] },
                contact: contactData
            };

            // Append files from Ref
            filesRef.current.visionImages.forEach(file => formData.append("visionImages", file));
            
            Object.entries(filesRef.current.unitImages).forEach(([unitIndex, files]) => {
                files.forEach(file => {
                    const renamedFile = new File([file], `${unitIndex}_${file.name}`, { type: file.type });
                    formData.append("unitImages", renamedFile);
                });
            });

            formData.append("data", JSON.stringify(payload));

            const token = localStorage.getItem("jwt");
            await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'}/project/create`, formData, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            
            toast.success("Project created successfully!");
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Failed to create project. Please try again.");
        } finally {
            setIsSubmitting(false); // Re-enable button
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto py-8 sm:py-20 px-4 sm:px-6">
             <div className="mb-8 sm:mb-16 text-center">
                <h1 className="text-2xl sm:text-3xl tracking-[0.05em] text-white mb-2 uppercase font-medium">Project Formation</h1>
                <div className="w-12 sm:w-16 h-[1px] bg-[#B08B57] mx-auto mb-6"></div>
                <div className="flex justify-between text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#B08B57]/60 mb-2 px-1">
                    <span>Initiation</span><span>Completion</span>
                </div>
                <div className="h-[1px] bg-[#1a1a1a] w-full relative">
                    <div className="h-[1px] bg-[#B08B57] transition-all duration-1000 ease-in-out" style={{ width: `${(currentStep / STEPS.length) * 100}%` }} />
                </div>
            </div>

            <div className="relative bg-[#030303] p-6 sm:p-12 border border-[#B08B57]/20 shadow-[0_0_30px_-12px_rgba(176,139,87,0.1)]">
                <div key={currentStep} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="text-white">
                        <ActiveComponent
                            onNext={next}
                            onPrev={prev}
                            onFinalSubmit={handleFinalSubmit}
                            isCreating={isSubmitting} // Pass local loading state
                            filesRef={filesRef} 
                        />
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center text-[#B08B57]/30 text-[9px] uppercase tracking-[0.2em]">Secure Architectural Portal</div>
        </div>
    );
}