import { z } from 'zod';

// 1. Identity Schema
export const identitySchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    tagline: z.string().min(5, "Tagline must be at least 5 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
});

// 2. Specifications Schema
export const specsSchema = z.object({
    towers: z.string().min(1, "Number of towers is required"),
    floors: z.string().min(1, "Number of floors is required"),
    architect: z.string().min(3, "Architect name is required"),
    rera: z.string().min(5, "Valid RERA registration number required"),
});

// 3. Residences Schema (Dynamic Array)
export const residencesSchema = z.object({
    units: z.array(z.object({
        type: z.string().min(1, "Unit type is required"),
        area: z.string().min(1, "Area is required"),
        price: z.string().min(1, "Price is required"),
    })).min(1, "At least one unit is required"),
});

// 4. Vision Schema (Dynamic Features)
export const visionSchema = z.object({
    vision: z.string().min(50, "Vision statement must be at least 50 characters"),
    features: z.array(z.object({
        feature: z.string().min(1, "Feature description is required")
    })).min(1, "Add at least one feature"),
});

// 5. Location Schema (Dynamic Landmarks)
export const locationSchema = z.object({
    mapEmbed: z.string().url("Valid Google Maps URL is required"),
    landmarks: z.array(z.object({
        name: z.string().min(1, "Landmark name required"),
        distance: z.string().min(1, "Distance required")
    })).min(1, "Add at least one landmark"),
});

// 6. Contact Schema
export const contactSchema = z.object({
    phone: z.string().min(10, "Valid phone number is required"),
    email: z.string().email("Invalid email format"),
    address: z.string().min(10, "Full address is required"),
    salesManagerName: z.string().min(2, "Sales manager name is required"),
});

// 7. MASTER SCHEMA (For Final Submission Validation)
export const masterProjectSchema = z.object({
    identity: identitySchema,
    specs: specsSchema,
    residences: residencesSchema,
    vision: visionSchema,
    location: locationSchema,
    contact: contactSchema,
});