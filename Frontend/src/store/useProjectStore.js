import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Define initial state for a clean reset
const initialSections = {
    identity: { title: "", tagline: "", description: "" },
    specs: { towers: "", floors: "", architect: "", rera: "" },
    residences: { commonVideoUrl: "", units: [] },
    vision: { vision: '', features: [], images: [] },
    location: { mapEmbed: "", landmarks: [] },
    contact: { email: "", phone: "", address: "", salesManagerName: "" }
};

// 2. Create the Store with Persistence
export const useProjectStore = create(
    persist(
        (set) => ({
            sections: initialSections,

            // Generic section updater: Updates specific keys without overwriting the whole state
            updateSection: (sectionKey, data) =>
                set((state) => ({
                    sections: {
                        ...state.sections,
                        [sectionKey]: {
                            ...state.sections[sectionKey],
                            ...data
                        }
                    }
                })),

            // Reset the store to initial state
            resetStore: () =>
                set({ sections: initialSections }),
        }),
        {
            name: 'project-draft-storage',
            
            // 3. Partialize ensures only serializable data is saved to localStorage
            partialize: (state) => ({
                sections: {
                    identity: { ...state.sections.identity },
                    specs: { ...state.sections.specs },
                    residences: {
                        commonVideoUrl: state.sections.residences?.commonVideoUrl || "",
                        units: state.sections.residences?.units?.map((unit) => ({
                            type: unit?.type || "",
                            area: unit?.area || "",
                            price: unit?.price || "",
                            images: [] // Strip File objects before saving to storage
                        })) || []
                    },
                    vision: {
                        vision: state.sections.vision?.vision || "",
                        features: state.sections.vision?.features || [],
                        images: [] // Strip File objects before saving to storage
                    },
                    location: {
                        mapEmbed: state.sections.location?.mapEmbed || "",
                        landmarks: state.sections.location?.landmarks || []
                    },
                    contact: {
                        email: state.sections.contact?.email || "",
                        phone: state.sections.contact?.phone || "",
                        address: state.sections.contact?.address || "",
                        salesManagerName: state.sections.contact?.salesManagerName || ""
                    }
                }
            })
        }
    )
);