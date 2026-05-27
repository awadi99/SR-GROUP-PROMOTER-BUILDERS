import React, { useState } from 'react';
import { useProject } from '../hook/useProject.js';
import { useProjectStore } from '../store/useProjectStore';

import IdentitySection from '../components/createproject/IdentitySection';
import SpecsSection from '../components/createproject/SpecsSection';
import ResidencesSection from '../components/createproject/ResidencesSection';
import VisionSection from '../components/createproject/VisionSection';
import LocationSection from '../components/createproject/LocationSection';
import ContactSection from '../components/createproject/ContactSection';

export default function CreateProject() {

    const { createProject, isCreating } = useProject();

    const { sections } = useProjectStore();

    const STEPS = [
        { id: 1, component: IdentitySection },
        { id: 2, component: SpecsSection },
        { id: 3, component: ResidencesSection },
        { id: 4, component: VisionSection },
        { id: 5, component: LocationSection },
        { id: 6, component: ContactSection },
    ];

    const [currentStep, setCurrentStep] = useState(1);

    const currentStepConfig =
        STEPS.find(s => s.id === currentStep) || STEPS[0];

    const ActiveComponent =
        currentStepConfig.component;

    const next = () =>
        setCurrentStep(prev =>
            Math.min(prev + 1, STEPS.length)
        );

    const prev = () =>
        setCurrentStep(prev =>
            Math.max(prev - 1, 1)
        );

    // =========================================
    // FINAL SUBMIT
    // =========================================

    const handleFinalSubmit = (contactData) => {

        const formData = new FormData();

        // =====================================
        // CLEAN PAYLOAD
        // =====================================

        const payload = {

            identity: {
                title:
                    sections.identity?.title || "",

                tagline:
                    sections.identity?.tagline || "",

                description:
                    sections.identity?.description || ""
            },

            specs: {
                towers:
                    sections.specs?.towers || "",

                floors:
                    sections.specs?.floors || "",

                architect:
                    sections.specs?.architect || "",

                rera:
                    sections.specs?.rera || ""
            },

            residences: {

                commonVideoUrl:
                    sections.residences?.commonVideoUrl || "",

                units:
                    Array.isArray(
                        sections.residences?.units
                    )
                        ? sections.residences.units.map(unit => ({

                            type:
                                unit?.type || "",

                            area:
                                unit?.area || "",

                            price:
                                unit?.price || "",

                            images: []

                        }))
                        : []
            },

            vision: {

                vision:
                    sections.vision?.vision || "",

                features:
                    Array.isArray(
                        sections.vision?.features
                    )
                        ? sections.vision.features
                        : [],

                images: []
            },

            location: {

                mapEmbed:
                    sections.location?.mapEmbed || "",

                landmarks:
                    Array.isArray(
                        sections.location?.landmarks
                    )
                        ? sections.location.landmarks
                        : []
            },

            contact: {

                salesManagerName:
                    contactData?.salesManagerName || "",

                email:
                    contactData?.email || "",

                phone:
                    contactData?.phone || "",

                address:
                    contactData?.address || ""
            }
        };

        // =====================================
        // APPEND VISION IMAGES
        // =====================================

        if (
            Array.isArray(
                sections.vision?.images
            )
        ) {

            sections.vision.images.forEach(file => {

                if (file instanceof File) {

                    formData.append(
                        "visionImages",
                        file
                    );
                }
            });
        }

        // =====================================
        // APPEND UNIT IMAGES
        // =====================================

        if (
            Array.isArray(
                sections.residences?.units
            )
        ) {

            sections.residences.units.forEach(unit => {

                if (
                    Array.isArray(unit?.images)
                ) {

                    unit.images.forEach(file => {

                        if (file instanceof File) {

                            formData.append(
                                "unitImages",
                                file
                            );
                        }
                    });
                }
            });
        }

        // =====================================
        // DEBUG
        // =====================================

        console.log(
            "FINAL PAYLOAD:",
            payload
        );

        // =====================================
        // APPEND JSON
        // =====================================

        formData.append(
            "data",
            JSON.stringify(payload)
        );

        // =====================================
        // API CALL
        // =====================================

        createProject(formData);
    };

    return (
        <div className="w-full max-w-3xl mx-auto py-8 sm:py-20 px-4 sm:px-6">

            {/* Header Section - Mobile Optimized */}
            <div className="mb-8 sm:mb-16 text-center">

                <h1 className="text-2xl sm:text-3xl tracking-[0.05em] text-white mb-2 uppercase font-medium">
                    Project Formation
                </h1>

                <div className="w-12 sm:w-16 h-[1px] bg-[#B08B57] mx-auto mb-6"></div>

                <div className="flex justify-between text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#B08B57]/60 mb-2 px-1">

                    <span>
                        Initiation
                    </span>

                    <span>
                        Completion
                    </span>

                </div>

                <div className="h-[1px] bg-[#1a1a1a] w-full relative">

                    <div
                        className="h-[1px] bg-[#B08B57] transition-all duration-1000 ease-in-out"
                        style={{
                            width:
                                `${(currentStep / STEPS.length) * 100}%`
                        }}
                    />

                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative bg-[#030303] p-6 sm:p-12 border border-[#B08B57]/20 shadow-[0_0_30px_-12px_rgba(176,139,87,0.1)]">

                <div
                    key={currentStep}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                >

                    <div className="text-white">

                        <ActiveComponent
                            onNext={next}
                            onPrev={prev}
                            onFinalSubmit={handleFinalSubmit}
                            isCreating={isCreating}
                        />

                    </div>
                </div>
            </div>

            {/* Decorative Footer */}
            <div className="mt-8 text-center text-[#B08B57]/30 text-[9px] uppercase tracking-[0.2em]">

                Secure Architectural Portal

            </div>
        </div>
    );
}