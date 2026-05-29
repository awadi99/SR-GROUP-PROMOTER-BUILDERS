import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useProjectById, useUpdateProject } from '../../hook/useProject';
import { useProjectStore } from '../../store/useProjectStore.js';

// Sections
import EditIdentitySection from './EditIdentitySection';
import EditSpecsSection from './EditSpecsSection';
import EditResidencesSection from './EditResidencesSection';
import EditVisionSection from './EditVisionSection';
import EditLocationSection from './EditLocationSection';
import EditContactSection from './EditContactSection';

export default function EditProjectPage() {
    const { id } = useParams();
    const [step, setStep] = useState(1);
    
    // Store access
    const { sections, updateSection, resetStore } = useProjectStore();
    
    // File ref for batching images (if you are handling files in edit)
    const filesRef = useRef({ visionImages: [], unitImages: {} });

    // 1. Fetch existing data
    const { data: project, isLoading, isError } = useProjectById(id);
    // 2. Prepare update mutation
    const { updateProject, isUpdating } = useUpdateProject(id);

    // 3. Hydrate Store when project data loads
    useEffect(() => {
        if (project) {
            resetStore(); // Clear previous drafts
            // Loop through sections and update store individually
            Object.keys(project).forEach((key) => {
                // Only update sections defined in our store schema
                if (['identity', 'specs', 'residences', 'vision', 'location', 'contact'].includes(key)) {
                    updateSection(key, project[key]);
                }
            });
        }
    }, [project, updateSection, resetStore]);

    // 4. Batch Save Logic
    const handleSaveAll = () => {
        const formData = new FormData();
        
        // Prepare the payload from Zustand state
        const payload = {
            identity: sections.identity,
            specs: sections.specs,
            residences: sections.residences,
            vision: sections.vision,
            location: sections.location,
            contact: sections.contact
        };

        // Append Files (if your Edit flow handles file uploads)
        filesRef.current.visionImages.forEach(file => formData.append("visionImages", file));
        Object.entries(filesRef.current.unitImages).forEach(([unitIndex, files]) => {
            files.forEach(file => {
                const renamedFile = new File([file], `${unitIndex}_${file.name}`, { type: file.type });
                formData.append("unitImages", renamedFile);
            });
        });

        formData.append("data", JSON.stringify(payload));
        
        // Trigger single request
        updateProject(formData);
    };

    // Memoize props
    const commonProps = useMemo(() => ({ 
        project, 
        onSave: handleSaveAll, 
        isUpdating,
        filesRef // Pass this if sections need to store files
    }), [project, handleSaveAll, isUpdating]);

    if (isLoading) return <div className="text-white p-10 text-center">Loading project...</div>;
    if (isError || !project) return <div className="text-white p-10 text-center">Error loading project.</div>;

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
            case 1: return <EditIdentitySection {...commonProps} onNext={() => setStep(2)} />;
            case 2: return <EditSpecsSection {...commonProps} onNext={() => setStep(3)} onPrev={() => setStep(1)} />;
            case 3: return <EditResidencesSection {...commonProps} onNext={() => setStep(4)} onPrev={() => setStep(2)} />;
            case 4: return <EditVisionSection {...commonProps} onNext={() => setStep(5)} onPrev={() => setStep(3)} />;
            case 5: return <EditLocationSection {...commonProps} onNext={() => setStep(6)} onPrev={() => setStep(4)} />;
            case 6: return <EditContactSection {...commonProps} onPrev={() => setStep(5)} />;
            default: return <EditIdentitySection {...commonProps} onNext={() => setStep(2)} />;
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#0A0A0A] py-10 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-10 text-center">
                    <h1 className="text-[10px] uppercase tracking-[0.3em] text-[#B08B57] font-bold">Editing: {project?.identity?.title || 'Project'}</h1>
                    <p className="text-white text-2xl font-light mt-2">{steps[step - 1].label}</p>
                </div>
                
                <div className="bg-[#050505] border border-[#1a1a1a] p-6 sm:p-10 shadow-xl">
                    {/* Progress Bar */}
                    <div className="w-full h-[2px] bg-[#1a1a1a] mb-10">
                        <div className="h-[2px] bg-[#B08B57] transition-all duration-700" style={{ width: `${(step / 6) * 100}%` }} />
                    </div>
                    
                    {renderStep()}
                </div>
            </div>
        </div>
    );
}