import asyncHandler from "express-async-handler";
import { 
    createProjectService, 
    updateProjectService, 
    deleteProjectService 
} from "./project.service.js";
import { uploadBuffer } from "../../lib/uploadToCloudinary.js";
import Project from "./project.model.js";
import mongoose from "mongoose";
import User from "../auth/auth.model.js";

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
    const projects = await Project.find({}).lean(); 
    res.status(200).json({ success: true, data: projects });
});

export const getProjectByIdController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // 1. Robust Input Validation: Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid Project ID format.");
    }

    // 2. High Performance: .lean() skips hydration to Mongoose documents
    const project = await Project.findById(id).lean();

    if (!project) {
        res.status(404);
        throw new Error("Project not found.");
    }

    // 3. Reliable Caching
    res.set('Cache-Control', 'public, max-age=3600');

    return res.status(200).json({
        success: true,
        data: project
    });
});

export const updateProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?._id || req.user?.id;

    // 1. Authorization: Fetch current project to ensure ownership
    const existingProject = await Project.findOne({ _id: id, createdBy: userId });
    if (!existingProject) {
        res.status(404);
        throw new Error("Project not found or unauthorized access.");
    }

    // 2. Parse Data
    let projectData;
    try {
        projectData = JSON.parse(req.body.data || "{}");
    } catch (error) {
        res.status(400);
        throw new Error("Invalid request payload.");
    }

    // 3. Normalize Features
    if (projectData.vision?.features) {
        let featuresArr = typeof projectData.vision.features === 'string' 
            ? JSON.parse(projectData.vision.features) 
            : projectData.vision.features;
        projectData.vision.features = Array.isArray(featuresArr) 
            ? featuresArr.map(f => (typeof f === 'object' && f !== null ? f.feature : f))
            : [];
    }

    // 4. Handle Images (Keepers + New Uploads)
    const [visionUrls, unitUrls] = await Promise.all([
        req.files?.visionImages ? uploadImages(req.files.visionImages) : [],
        req.files?.unitImages ? uploadImages(req.files.unitImages) : []
    ]);

    const sanitizedData = {
        ...projectData,
        vision: {
            ...projectData.vision,
            images: [...(projectData.vision?.existingImages || []), ...visionUrls]
        },
        residences: {
            ...projectData.residences,
            units: Array.isArray(projectData.residences?.units) 
                ? projectData.residences.units.map(unit => ({ 
                    ...unit, 
                    images: unit.images || [] 
                })) 
                : []
        }
    };

    // 5. Handle Unit Image Injection
    if (unitUrls.length > 0 && req.files?.unitImages) {
        req.files.unitImages.forEach((file, index) => {
            const uploadedUrl = unitUrls[index];
            const unitIndex = parseInt(file.originalname.split('_')[0], 10);
            if (uploadedUrl && !isNaN(unitIndex) && sanitizedData.residences.units[unitIndex]) {
                sanitizedData.residences.units[unitIndex].images.push(uploadedUrl);
            }
        });
    }

    // 6. Update in Service
    const updatedProject = await updateProjectService(id, userId, sanitizedData);

    res.status(200).json({ success: true, data: updatedProject });
});

// =========================================
// DELETE PROJECT
// =========================================
export const deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
        res.status(401);
        throw new Error("Unauthorized access.");
    }

    // Validate MongoDB ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid Project ID format.");
    }

    // Perform cleanup and deletion
    await deleteProjectService(id, userId);

    res.status(200).json({ 
        success: true, 
        message: "Project and associated cloud assets deleted successfully." 
    });
});


export const getPublicProjectController = asyncHandler(async (req, res) => {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid Project ID format.");
    }

  
    const project = await Project.findById(id)
        .lean()
        .select('-createdBy -__v'); 

    if (!project) {
        res.status(404);
        throw new Error("Project not found.");
    }


    res.set('Cache-Control', 'public, max-age=3600');
    // Return the full project object
    return res.status(200).json({
        success: true,
        data: project
    });
});


export const getAllPublicProjectsController = asyncHandler(async (req, res) => {
    const projects = await Project.find({}).lean(); 
    res.status(200).json({ success: true, data: projects });
});




export const getDashboardStats = asyncHandler(async (req, res) => {

    const stats = await getAdminStats()

    return res.status(200).json({
        success: true,
        data: stats
    });
});