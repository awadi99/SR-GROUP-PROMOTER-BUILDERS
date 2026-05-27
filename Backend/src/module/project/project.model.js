import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    // Identity & Metadata
    identity: {
        title: { type: String, required: true, index: true },
        tagline: { type: String },
        description: { type: String, required: true }
    },
    
    // Specifications
    specs: {
        towers: Number,
        floors: Number,
        architect: String,
        rera: String
    },

    // Residences (Stored as an array of sub-documents for query efficiency)
    residences: {
        commonVideoUrl: String,
        units: [{
            type: String,
            area: String,
            price: String,
            images: [String] // Store Cloudinary URLs, NOT binary data
        }]
    },

    // Architectural Vision
    vision: {
        vision: String,
        images: [String],
        features: [{ feature: String }]
    },

    // Location
    location: {
        mapEmbed: String,
        landmarks: [{ name: String, distance: String }]
    },

    // Contact
    contact: {
        name: String,
        email: { type: String, lowercase: true },
        phone: String,
        website: String
    },

    // Tracking & Relations
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        index: true // Crucial for "My Projects" speed
    }
}, { 
    timestamps: true, 
    minimize: true // Removes empty objects to save space
});

// Compound index for search optimization
projectSchema.index({ "identity.title": "text" });

export default mongoose.model("Project", projectSchema);