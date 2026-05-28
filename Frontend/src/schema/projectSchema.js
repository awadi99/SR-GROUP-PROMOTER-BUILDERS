import { z } from 'zod';

// ======================================================
// FILE VALIDATION CONFIG
// ======================================================

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
];

const fileSchema = z.any()
    .refine((file) => file instanceof File, {
        message: "Please upload a valid image file"
    })
    .refine((file) => file?.size <= MAX_FILE_SIZE, {
        message: "Max image size is 5MB"
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
        message: "Only JPG, PNG & WEBP images are allowed"
    });

// ======================================================
// 1. IDENTITY SCHEMA
// ======================================================

export const identitySchema = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters").max(120, "Title too long"),
    tagline: z.string().trim().min(5, "Tagline must be at least 5 characters").max(200, "Tagline too long"),
    description: z.string().trim().min(20, "Description must be at least 20 characters").max(5000, "Description too long"),
});

// ======================================================
// 2. SPECIFICATIONS SCHEMA
// ======================================================

export const specsSchema = z.object({
    towers: z.string().trim().min(1, "Number of towers is required"),
    floors: z.string().trim().min(1, "Number of floors is required"),
    architect: z.string().trim().min(3, "Architect name is required"),
    rera: z.string().trim().min(5, "Valid RERA number required"),
});

// ======================================================
// 3. RESIDENCES SCHEMA
// ======================================================
export const residencesSchema = z.object({
    commonVideoUrl: z.string().url("Invalid video URL").optional().or(z.literal("")),
    units: z.array(z.object({
        type: z.string().trim().min(1, "Unit type required"),
        area: z.string().trim().min(1, "Area required"),
        price: z.string().trim().min(1, "Price required"),
        // Use z.any() to allow rehydration from localStorage
        images: z.array(z.any()).default([]) 
    })).min(1, "At least one unit required"),
});
// ======================================================
// 4. VISION SCHEMA
// ======================================================

export const visionSchema = z.object({
    vision: z.string().trim().min(50, "Vision statement must be at least 50 characters").max(5000, "Vision statement too long"),
    features: z.array(z.object({
        feature: z.string().trim().min(1, "Feature description required")
    })).min(1, "Add at least one feature"),
    // Change this to z.any() to allow rehydration from localStorage
    images: z.array(z.any()).default([])
});

// ======================================================
// 5. LOCATION SCHEMA
// ======================================================

export const locationSchema = z.object({
    mapEmbed: z.string().url("Valid Google Maps URL required"),
    landmarks: z.array(z.object({
        name: z.string().trim().min(1, "Landmark name required"),
        distance: z.string().trim().min(1, "Distance required"),
    })).min(1, "Add at least one landmark"),
});

// ======================================================
// 6. CONTACT SCHEMA
// ======================================================

export const contactSchema = z.object({
    phone: z.string().trim().min(10, "Valid phone number required"),
    email: z.string().trim().email("Invalid email format"),
    address: z.string().trim().min(10, "Full address required"),
    salesManagerName: z.string().trim().min(2, "Sales manager name required"),
});

// ======================================================
// 7. MASTER PROJECT SCHEMA
// ======================================================

export const masterProjectSchema = z.object({
    identity: identitySchema,
    specs: specsSchema,
    residences: residencesSchema,
    vision: visionSchema,
    location: locationSchema,
    contact: contactSchema,
});