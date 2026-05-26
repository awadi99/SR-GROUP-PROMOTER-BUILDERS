import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialSections = {
    identity: { title: "", tagline: "", description: "" },
    specs: { towers: "", floors: "", architect: "", rera: "" },
    residences: { commonVideoUrl: "", units: [] },
    vision: { vision: '', features: [], images: [] }, // 'images' array added
    location: { mapEmbed: "", landmarks: [] },
    contact: { email: "", phone: "", address: "", salesManagerName: "" }
};

export const useProjectStore = create(
    persist(
        (set) => ({
            sections: initialSections,
            updateSection: (sectionKey, data) =>
                set((state) => ({
                    sections: { 
                        ...state.sections, 
                        [sectionKey]: { ...state.sections[sectionKey], ...data } 
                    }
                })),
            resetStore: () => set({ sections: initialSections }),
        }),
        {
            name: 'project-draft-storage',
            // IMPORTANT: 'partialize' prevents File objects from being stored in localStorage
            partialize: (state) => ({
                sections: {
                    identity: state.sections.identity,
                    specs: state.sections.specs,
                    residences: {
                        commonVideoUrl: state.sections.residences?.commonVideoUrl,
                        units: state.sections.residences?.units?.map(u => ({
                            type: u.type, 
                            area: u.area, 
                            price: u.price
                            // 'images' is excluded intentionally
                        })) || []
                    },
                    vision: { 
                        vision: state.sections.vision?.vision, 
                        features: state.sections.vision?.features 
                        // 'images' is excluded intentionally
                    },
                    location: state.sections.location,
                    contact: state.sections.contact,
                }
            }),
        }
    )
);