import React, { useState, Suspense, lazy } from 'react';

// Lazy loaded sections
const IdentitySection = lazy(() => import('./sections/IdentitySection'));
const SpecsSection = lazy(() => import('./sections/SpecsSection'));
// ... add others

export default function ProjectCreator() {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { label: 'Identity', id: 'identity' },
        { label: 'Specs', id: 'specs' },
        // ...
    ];

    // Memoize the active component lookup
    const CurrentComponent = steps[currentStep].component;

    return (
        <div className="min-h-screen bg-[#030303] text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">

                {/* Sidebar - Fixed/Sticky on Desktop */}
                <aside className="space-y-2">
                    <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#B08B57] mb-8 font-bold px-4">
                        Project Workflow
                    </h2>
                    {steps.map((step, i) => (
                        <button
                            key={step.id}
                            onClick={() => setCurrentStep(i)}
                            className={`w-full text-left px-6 py-4 transition-all duration-300 border-l ${currentStep === i
                                    ? 'border-[#B08B57] bg-[#B08B57]/10 text-white'
                                    : 'border-[#1a1a1a] text-gray-500 hover:border-[#B08B57]/30 hover:text-gray-300'
                                }`}
                        >
                            <span className={`text-[10px] block mb-1 ${currentStep === i ? 'text-[#B08B57]' : ''}`}>
                                0{i + 1}
                            </span>
                            <span className="text-sm font-light tracking-wide">{step.label}</span>
                        </button>
                    ))}
                </aside>

                {/* Main Content Area */}
                <main className="border border-[#1a1a1a] bg-[#050505] p-8 md:p-12 shadow-2xl">
                    <Suspense fallback={
                        <div className="h-[400px] flex items-center justify-center">
                            <div className="w-8 h-8 border-t border-[#B08B57] animate-spin"></div>
                        </div>
                    }>
                        <div key={currentStep} className="animate-in fade-in duration-500">
                            <CurrentComponent onNext={() => setCurrentStep(s => Math.min(s + 1, steps.length - 1))} />
                        </div>
                    </Suspense>
                </main>
            </div>
        </div>
    );
}