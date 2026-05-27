import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialSections = {

    identity: {
        title: "",
        tagline: "",
        description: ""
    },

    specs: {
        towers: "",
        floors: "",
        architect: "",
        rera: ""
    },

    residences: {
        commonVideoUrl: "",
        units: []
    },

    vision: {
        vision: '',
        features: [],
        images: []
    },

    location: {
        mapEmbed: "",
        landmarks: []
    },

    contact: {
        email: "",
        phone: "",
        address: "",
        salesManagerName: ""
    }
};

export const useProjectStore = create(

    persist(

        (set) => ({

            sections: initialSections,

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

            resetStore: () =>
                set({
                    sections: initialSections
                }),

        }),

        {
            name: 'project-draft-storage',

            // Prevent File objects from saving in localStorage
            partialize: (state) => ({

                sections: {

                    // Identity
                    identity: {
                        ...state.sections.identity
                    },

                    // Specs
                    specs: {
                        ...state.sections.specs
                    },

                    // Residences
                    residences: {

                        commonVideoUrl:
                            state.sections.residences?.commonVideoUrl || "",

                        units:

                            state.sections.residences?.units?.map((unit) => ({

                                type:
                                    unit?.type || "",

                                area:
                                    unit?.area || "",

                                price:
                                    unit?.price || "",

                                // IMPORTANT
                                // Never save image File objects
                                images: []

                            })) || []
                    },

                    // Vision
                    vision: {

                        vision:
                            state.sections.vision?.vision || "",

                        features:
                            state.sections.vision?.features || [],

                        // IMPORTANT
                        // Never persist images
                        images: []
                    },

                    // Location
                    location: {

                        mapEmbed:
                            state.sections.location?.mapEmbed || "",

                        landmarks:
                            state.sections.location?.landmarks || []
                    },

                    // Contact
                    contact: {

                        email:
                            state.sections.contact?.email || "",

                        phone:
                            state.sections.contact?.phone || "",

                        address:
                            state.sections.contact?.address || "",

                        salesManagerName:
                            state.sections.contact?.salesManagerName || ""
                    }
                }
            })
        }
    )
);