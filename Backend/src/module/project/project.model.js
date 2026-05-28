import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    identity: {
        // Changed to unique: true for database-level protection
        title: { type: String, required: true, trim: true, index: true, unique: true },
        tagline: { type: String, trim: true },
        description: { type: String, required: true, trim: true }
    },

    specs: {
        towers: { type: Number, default: 0 },
        floors: { type: Number, default: 0 },
        architect: { type: String, trim: true },
        rera: { type: String, trim: true }
    },

    residences: {
        commonVideoUrl: { type: String, trim: true },
        units: [{
            type: { type: String, required: true, trim: true },
            area: { type: String, required: true, trim: true },
            price: { type: String, required: true, trim: true },
            images: { type: [String], default: [] }
        }]
    },

    vision: {
        vision: { type: String, trim: true },
        images: { type: [String], default: [] },
        // Simplified features to a simple string array for performance
        features: { type: [String], default: [] }
    },

    location: {
        mapEmbed: { type: String, trim: true },
        landmarks: [{ 
            name: { type: String, trim: true }, 
            distance: { type: String, trim: true } 
        }]
    },

    contact: {
        email: { type: String, lowercase: true, trim: true },
        phone: { type: String, trim: true },
        address: { type: String, trim: true },
        salesManagerName: { type: String, trim: true }
    },

    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        index: true 
    }
}, { 
    timestamps: true, 
    minimize: true 
});

// Compound Indexing for deep search: 
// This index helps when searching by title OR within the identity fields
projectSchema.index({ "identity.title": "text", "identity.description": "text" });

const Project = mongoose.model("Project", projectSchema);

export default Project;