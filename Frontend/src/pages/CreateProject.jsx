import React, { useState } from 'react';
import IdentitySection from '../components/createproject/IdentitySection';
import SpecsSection from '../components/createproject/SpecsSection';
import ResidencesSection from '../components/createproject/ResidencesSection';
import VisionSection from '../components/createproject/VisionSection';
import LocationSection from '../components/createproject/LocationSection';
import ContactSection from '../components/createproject/ContactSection';

export default function CreateProject() {
    // Encapsulated steps to prevent scope/ReferenceErrors
    const STEPS = [
        { id: 1, component: IdentitySection },
        { id: 2, component: SpecsSection },
        { id: 3, component: ResidencesSection },
        { id: 4, component: VisionSection },
        { id: 5, component: LocationSection },
        { id: 6, component: ContactSection },
    ];

    const [currentStep, setCurrentStep] = useState(1);

    // Safety fallback to ensure the UI never crashes if currentStep is invalid
    const currentStepConfig = STEPS.find(s => s.id === currentStep) || STEPS[0];
    const ActiveComponent = currentStepConfig.component;

    const next = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    const prev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    return (
        <div className="max-w-3xl mx-auto py-20 px-6">
            {/* Header Section */}
            <div className="mb-16 text-center">
                <h1 className="text-3xl  tracking-[0.05em] text-white mb-2 uppercase font-medium">Project Formation</h1>
                <div className="w-16 h-[1px] bg-[#B08B57] mx-auto mb-6"></div>
                
                {/* Refined Progress Bar */}
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.3em] text-[#B08B57]/60 mb-2">
                    <span>Initiation</span>
                    <span>Completion</span>
                </div>
                <div className="h-[1px] bg-[#1a1a1a] w-full relative">
                    <div 
                        className="h-[1px] bg-[#B08B57] transition-all duration-1000 ease-in-out" 
                        style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Main Content Area: Animation Wrapper */}
            <div className="relative bg-[#030303] p-12 border border-[#B08B57]/20 shadow-[0_0_50px_-12px_rgba(176,139,87,0.15)]">
                {/* Key={currentStep} triggers a re-mount on step change, 
                   enabling the animate-in classes to run every time 
                */}
                <div key={currentStep} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="text-white">
                        <ActiveComponent onNext={next} onPrev={prev} />
                    </div>
                </div>
            </div>

            {/* Decorative Footer */}
            <div className="mt-12 text-center text-[#B08B57]/30 text-[10px] uppercase tracking-[0.2em]">
                Secure Architectural Portal
            </div>
        </div>
    );
}