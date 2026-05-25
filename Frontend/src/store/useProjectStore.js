import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialSections = {
    identity: { title: "", tagline: "", description: "" },
    specs: { towers: "", floors: "", architect: "", rera: "" },
    residences: [],
    vision: { vision: '', features: [], image: "" },
    location: { mapEmbed: "", landmarks: [] },
    contact: { email: "", phone: "", address: "", salesManagerName: "" }
};

export const useProjectStore = create(
    persist(
        (set) => ({
            sections: initialSections,

            updateSection: (sectionKey, data) =>
                set((state) => ({
                    sections: { ...state.sections, [sectionKey]: data }
                })),

            // Reset to initial state and clear persisted storage
            resetStore: () => set({ sections: initialSections }),
        }),
        {
            name: 'project-draft-storage',
        }
    )
);