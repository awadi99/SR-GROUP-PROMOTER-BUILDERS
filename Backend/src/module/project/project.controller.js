import asyncHandler from "express-async-handler";
import { createProjectService, getMyProjectsService } from "./project.service.js";
import { uploadBuffer } from "../../lib/uploadToCloudinary.js";
import Project from "./project.model.js";
import mongoose from "mongoose"; // <--- Add this missing import
// =========================================
// HELPERS
// =========================================

const uploadImages = async (files = []) => {
    if (!Array.isArray(files) || files.length === 0) return [];
    
    const uploadPromises = files.map(async (file) => {
        try {
            if (!file?.buffer) throw new Error("Invalid buffer");
            const uploaded = await uploadBuffer(file.buffer);
            return uploaded.secure_url;
        } catch (err) {
            console.error("Cloudinary upload failed:", err);
            return null;
        }
    });
    
    const results = await Promise.all(uploadPromises);
    return results.filter((url) => url !== null);
};

// =========================================
// CREATE PROJECT
// =========================================

export const createProject = asyncHandler(async (req, res) => {
    console.log("DEBUG - Files detected:", req.files);
    console.log("DEBUG - Data detected:", req.body.data);
    const userId = req.user?._id || req.user?.id;
    if (!userId) {
        res.status(401);
        throw new Error("Unauthorized access.");
    }

    let projectData;
    try {
        projectData = JSON.parse(req.body.data || "{}");
    } catch (error) {
        res.status(400);
        throw new Error("Invalid request payload.");
    }

    // FIX: Parse and Normalize features to [String] as per Mongoose schema
    if (projectData.vision?.features) {
        let featuresArr = typeof projectData.vision.features === 'string' 
            ? JSON.parse(projectData.vision.features) 
            : projectData.vision.features;

        // Map objects { feature: "..." } to pure strings "..."
        projectData.vision.features = Array.isArray(featuresArr) 
            ? featuresArr.map(f => (typeof f === 'object' && f !== null ? f.feature : f))
            : [];
    }

    const [visionUrls, unitUrls] = await Promise.all([
        req.files?.visionImages ? uploadImages(req.files.visionImages) : [],
        req.files?.unitImages ? uploadImages(req.files.unitImages) : []
    ]);

    const sanitizedData = {
        ...projectData,
        vision: {
            ...projectData.vision,
            images: visionUrls
        },
        residences: {
            ...projectData.residences,
            units: Array.isArray(projectData.residences?.units) 
                ? projectData.residences.units.map(unit => ({ ...unit, images: [] })) 
                : []
        }
    };

    if (unitUrls.length > 0 && req.files?.unitImages) {
        req.files.unitImages.forEach((file, index) => {
            const uploadedUrl = unitUrls[index];
            const unitIndex = parseInt(file.originalname.split('_')[0], 10);
            if (uploadedUrl && !isNaN(unitIndex) && sanitizedData.residences.units[unitIndex]) {
                sanitizedData.residences.units[unitIndex].images.push(uploadedUrl);
            }
        });
    }

    const createdProject = await createProjectService(sanitizedData, userId);

    return res.status(201).json({ success: true, data: createdProject });
});

// =========================================
// GET MY PROJECTS
// =========================================

export const getMyProjectsController = asyncHandler(async (req, res) => {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
        res.status(401);
        throw new Error("Unauthorized access.");
    }

    const projects = await getMyProjectsService(userId);

    return res.status(200).json({
        success: true,
        count: projects.length,
        data: projects
    });
});

export const getProjectByIdController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // 1. Robust Input Validation: Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid Project ID format.");
    }

    // 2. High Performance: .lean() skips hydration to Mongoose documents
    // This reduces memory usage and improves response time
    const project = await Project.findById(id).lean();

    if (!project) {
        res.status(404);
        throw new Error("Project not found.");
    }

    // 3. Reliable Caching: Add Cache-Control headers
    // Tells browsers/CDNs to cache this data for 1 hour
    res.set('Cache-Control', 'public, max-age=3600');

    return res.status(200).json({
        success: true,
        data: project
    });
});