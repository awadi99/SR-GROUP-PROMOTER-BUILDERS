import asyncHandler from "express-async-handler";
import { createProjectService, getMyProjectsService } from "./project.service.js";
import { uploadBuffer } from "../../lib/uploadToCloudinary.js";

// =========================================
// HELPERS
// =========================================

const uploadImages = async (files = []) => {
    if (!Array.isArray(files) || files.length === 0) {
        return [];
    }

    const uploadResults = await Promise.allSettled(
        files.map(async (file) => {
            if (!file?.buffer) {
                throw new Error("Invalid file buffer");
            }

            const uploaded = await uploadBuffer(file.buffer);
            return uploaded.secure_url;
        })
    );

    return uploadResults
        .filter(result => result.status === "fulfilled")
        .map(result => result.value);
};

const safeParseArray = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string") {
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }
    return [];
};

// =========================================
// CREATE PROJECT
// =========================================

export const createProject = asyncHandler(async (req, res) => {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
        res.status(401);
        throw new Error("Unauthorized access. User session invalid.");
    }

    // ---- Parse root payload ----
    let projectData = {};

    try {
        projectData = JSON.parse(req.body.data || "{}");
    } catch (error) {
        res.status(400);
        throw new Error("Invalid request payload. Expected valid JSON.");
    }

    // ---- Defensively parse ALL nested arrays immediately after JSON.parse ----
    // Must happen before image upload so units is a real array when we spread into it
    if (projectData?.residences) {
        projectData.residences = {
            ...projectData.residences,
            units: safeParseArray(
                projectData.residences.units
            ).map(unit =>
                typeof unit === "string"
                    ? safeParseArray(unit)[0] ?? {}
                    : unit
            )
        };
    }

    if (projectData?.vision) {
        projectData.vision = {
            ...projectData.vision,
            features: safeParseArray(
                projectData.vision.features
            )
        };
    }

    if (projectData?.location) {
        projectData.location = {
            ...projectData.location,
            landmarks: safeParseArray(
                projectData.location.landmarks
            )
        };
    }

    // ---- Upload images in parallel ----
    const [visionUrls = [], unitUrls = []] = await Promise.all([
        req.files?.visionImages
            ? uploadImages(req.files.visionImages)
            : Promise.resolve([]),

        req.files?.unitImages
            ? uploadImages(req.files.unitImages)
            : Promise.resolve([])
    ]);

    // ---- Attach vision image URLs ----
    if (visionUrls.length > 0) {
        projectData.vision = {
            ...(projectData.vision || {}),
            images: visionUrls
        };
    }

    // ---- Attach unit image URLs to each unit by index ----
    if (
        unitUrls.length > 0 &&
        Array.isArray(projectData?.residences?.units) &&
        projectData.residences.units.length > 0
    ) {
        projectData.residences.units = projectData.residences.units.map(
            (unit, index) => {
                if (index === 0) {
                    return {
                        ...unit,
                        images: unitUrls
                    };
                }
                return unit;
            }
        );
    }

    // ---- Persist ----
    const createdProject = await createProjectService(projectData, userId);

    return res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: createdProject
    });
});

// =========================================
// GET MY PROJECTS
// =========================================

export const getMyProjectsController = asyncHandler(async (req, res) => {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
        res.status(401);
        throw new Error("Unauthorized access. User session invalid.");
    }

    const projects = await getMyProjectsService(userId);

    return res.status(200).json({
        success: true,
        count: projects.length,
        data: projects
    });
});