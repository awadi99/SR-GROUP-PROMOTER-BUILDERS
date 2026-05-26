import { z } from 'zod';

// Yeh schema Edit mode ke liye hai (Support: Existing URL or New File)
const editFileSchema = z.union([
    z.instanceof(File), // Nayi file upload
    z.string().url(),   // Database se aayi hui purani URL
]);

// 1. Identity Schema (Same as original)
export const identitySchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    tagline: z.string().min(5, "Tagline must be at least 5 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
});

// 2. Specifications Schema (Same as original)
export const specsSchema = z.object({
    towers: z.string().min(1, "Number of towers is required"),
    floors: z.string().min(1, "Number of floors is required"),
    architect: z.string().min(3, "Architect name is required"),
    rera: z.string().min(5, "Valid RERA registration number required"),
});

// 3. Residences Schema (Updated for Edit)
export const residencesEditSchema = z.object({
    commonVideoUrl: z.string().url().optional().or(z.literal("")),
    units: z.array(z.object({
        type: z.string().min(1, "Required"),
        area: z.string().min(1, "Required"),
        price: z.string().min(1, "Required"),
        // Original logic: images must exist
        images: z.array(editFileSchema)
            .min(4, "Must upload exactly 4 images")
            .max(4, "Only 4 images allowed"),
    })).min(1, "At least one unit required"),
});

// 4. Vision Schema (Updated for Edit)
export const visionEditSchema = z.object({
    vision: z.string().min(50, "Vision statement must be at least 50 characters"),
    features: z.array(z.object({
        feature: z.string().min(1, "Feature description is required")
    })).min(1, "Add at least one feature"),
    // Original logic: 3 images mandatory
    images: z.array(editFileSchema)
        .min(3, "Please upload exactly 3 images")
        .max(3, "Only 3 images allowed"),
});

// 5. Location Schema (Same as original)
export const locationSchema = z.object({
    mapEmbed: z.string().url("Valid Google Maps URL is required"),
    landmarks: z.array(z.object({
        name: z.string().min(1, "Landmark name required"),
        distance: z.string().min(1, "Distance required")
    })).min(1, "Add at least one landmark"),
});

// 6. Contact Schema (Same as original)
export const contactSchema = z.object({
    phone: z.string().min(10, "Valid phone number is required"),
    email: z.string().email("Invalid email format"),
    address: z.string().min(10, "Full address is required"),
    salesManagerName: z.string().min(2, "Sales manager name is required"),
});

// 7. MASTER EDIT SCHEMA
export const masterProjectEditSchema = z.object({
    identity: identitySchema,
    specs: specsSchema,
    residences: residencesEditSchema,
    vision: visionEditSchema,
    location: locationSchema,
    contact: contactSchema,
});