import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjectStore } from '../../store/useProjectStore';

// Sections
import EditIdentitySection from './EditIdentitySection';
import EditSpecsSection from './EditSpecsSection';
import EditResidencesSection from './EditResidencesSection';
import EditVisionSection from './EditVisionSection';
import EditLocationSection from './EditLocationSection';
import EditContactSection from './EditContactSection';

export default function EditProjectPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    
    // Store se projects fetch karein with default [] to avoid crashes
    const { projects = [], setCurrentProject } = useProjectStore();

    useEffect(() => {
        // Safe check: data loaded hone ka wait karein
        if (projects && projects.length > 0) {
            const project = projects.find((p) => String(p.id) === String(id));
            
            if (project) {
                setCurrentProject(project);
            } else {
                // Agar ID invalid hai
                navigate('/dashboard');
            }
        }
    }, [id, projects, setCurrentProject, navigate]);

    const steps = [
        { id: 1, label: 'Identity' }, 
        { id: 2, label: 'Specs' },
        { id: 3, label: 'Residences' }, 
        { id: 4, label: 'Vision' },
        { id: 5, label: 'Location' }, 
        { id: 6, label: 'Contact' },
    ];

    const renderStep = () => {
        switch(step) {
            case 1: return <EditIdentitySection onNext={() => setStep(2)} />;
            case 2: return <EditSpecsSection onNext={() => setStep(3)} onPrev={() => setStep(1)} />;
            case 3: return <EditResidencesSection onNext={() => setStep(4)} onPrev={() => setStep(2)} />;
            case 4: return <EditVisionSection onNext={() => setStep(5)} onPrev={() => setStep(3)} />;
            case 5: return <EditLocationSection onNext={() => setStep(6)} onPrev={() => setStep(4)} />;
            case 6: return <EditContactSection onPrev={() => setStep(5)} />;
            default: return <EditIdentitySection onNext={() => setStep(2)} />;
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#0A0A0A] py-10 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-[10px] uppercase tracking-[0.3em] text-[#B08B57] font-bold">Editing Project</h1>
                    <p className="text-white text-2xl font-light mt-2">{steps[step - 1].label}</p>
                </div>

                <div className="bg-[#050505] border border-[#1a1a1a] p-6 sm:p-10 transition-all duration-500">
                    {/* Progress Bar */}
                    <div className="mb-10">
                        <div className="flex justify-between text-[9px] uppercase tracking-[0.2em] text-[#555] mb-3">
                            <span>Step {step} of 6</span>
                            <span>{Math.round((step / 6) * 100)}%</span>
                        </div>
                        <div className="w-full h-[2px] bg-[#1a1a1a]">
                            <div 
                                className="h-[2px] bg-[#B08B57] transition-all duration-700 ease-out"
                                style={{ width: `${(step / 6) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="min-h-[400px] animate-in fade-in zoom-in-95 duration-500">
                        {renderStep()}
                    </div>
                </div>
            </div>
        </div>
    );
}