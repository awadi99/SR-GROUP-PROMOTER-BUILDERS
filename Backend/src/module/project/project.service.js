import Project from "./project.model.js";
import { v2 as cloudinary } from 'cloudinary';

// =========================================
// HELPER FUNCTIONS
// =========================================
const sanitize = (val) => (val && typeof val === 'string' ? val.trim() : undefined);

const normalizeFeatures = (features) => {
    return Array.isArray(features) 
        ? features.map(item => {
            if (item && typeof item === 'object' && 'feature' in item) {
                return String(item.feature || "").trim();
            }
            return String(item || "").trim();
        }).filter(f => f.length > 0) 
        : [];
};

// FIXED: Now extracts the full path and removes version/extension
const getPublicIdFromUrl = (url) => {
    if (!url || typeof url !== 'string') return null;
    try {
        // 1. Split by '/upload/' to isolate the path
        const parts = url.split('/upload/');
        if (parts.length < 2) return null;
        
        let path = parts[1];
        
        // 2. Remove versioning (e.g., 'v12345678/') if present
        if (path.startsWith('v')) {
            path = path.substring(path.indexOf('/') + 1);
        }
        
        // 3. Remove file extension
        return path.substring(0, path.lastIndexOf('.'));
    } catch (e) {
        console.error("Error parsing Cloudinary URL:", e);
        return null;
    }
};

// =========================================
// CREATE PROJECT SERVICE
// =========================================
export const createProjectService = async (projectData, userId) => {
    const { identity, specs, vision, location, contact } = projectData;

    const normalizedFeatures = normalizeFeatures(vision?.features);

    const finalUnits = Array.isArray(projectData.residences?.units) 
        ? projectData.residences.units.map(unit => ({
            type: sanitize(unit?.type),
            area: sanitize(unit?.area),
            price: sanitize(unit?.price),
            images: Array.isArray(unit?.images) ? unit.images.filter(Boolean) : []
        })) 
        : [];

    const projectPayload = {
        createdBy: userId,
        identity: { 
            title: identity.title.trim(), 
            tagline: sanitize(identity.tagline), 
            description: identity.description.trim() 
        },
        specs: specs ? { 
            towers: parseInt(specs.towers, 10) || undefined, 
            floors: parseInt(specs.floors, 10) || undefined, 
            architect: sanitize(specs.architect), 
            rera: sanitize(specs.rera) 
        } : undefined,
        residences: projectData.residences ? { 
            commonVideoUrl: sanitize(projectData.residences.commonVideoUrl), 
            units: finalUnits
        } : undefined,
        vision: vision ? { 
            vision: sanitize(vision.vision), 
            images: Array.isArray(vision.images) ? vision.images.filter(Boolean) : [], 
            features: normalizedFeatures 
        } : undefined,
        location: location ? { 
            mapEmbed: sanitize(location.mapEmbed), 
            landmarks: Array.isArray(location.landmarks) ? location.landmarks : [] 
        } : undefined,
        contact: contact ? { 
            salesManagerName: sanitize(contact.salesManagerName), 
            email: contact.email?.trim().toLowerCase() || undefined, 
            phone: sanitize(contact.phone), 
            website: sanitize(contact.website) 
        } : undefined
    };

    try {
        const createdProject = await Project.create(projectPayload);
        return { projectId: createdProject._id, title: createdProject.identity.title };
    } catch (error) {
        if (error.code === 11000) throw new Error("A project with this title already exists.");
        if (error.name === "ValidationError") {
             const details = Object.values(error.errors).map(e => `${e.path}: ${e.message}`).join(", ");
             throw new Error("Validation Error: " + details);
        }
        throw error;
    }
};

// =========================================
// GET MY PROJECTS SERVICE
// =========================================
export const getMyProjectsService = async (userId) => {
    return await Project.find({ createdBy: userId })
        .sort({ createdAt: -1 })
        .lean(); 
};

// =========================================
// UPDATE PROJECT SERVICE (ATOMIC)
// =========================================
export const updateProjectService = async (id, userId, updateData) => {
    const normalizedFeatures = normalizeFeatures(updateData.vision?.features);

    try {
        const updatedProject = await Project.findOneAndUpdate(
            { _id: id, createdBy: userId },
            {
                $set: {
                    'identity.title': updateData.identity?.title,
                    'identity.tagline': updateData.identity?.tagline,
                    'identity.description': updateData.identity?.description,
                    
                    'specs.towers': updateData.specs?.towers,
                    'specs.floors': updateData.specs?.floors,
                    'specs.architect': updateData.specs?.architect,
                    'specs.rera': updateData.specs?.rera,

                    'residences.commonVideoUrl': updateData.residences?.commonVideoUrl,
                    'residences.units': updateData.residences?.units,

                    'vision.vision': updateData.vision?.vision,
                    'vision.images': updateData.vision?.images,
                    'vision.features': normalizedFeatures,

                    'location.mapEmbed': updateData.location?.mapEmbed,
                    'location.landmarks': updateData.location?.landmarks,

                    'contact.salesManagerName': updateData.contact?.salesManagerName,
                    'contact.email': updateData.contact?.email,
                    'contact.phone': updateData.contact?.phone,
                    'contact.website': updateData.contact?.website
                }
            },
            { returnDocument: 'after', runValidators: true }
        );

        if (!updatedProject) throw new Error("Project not found or unauthorized.");

        return { projectId: updatedProject._id, title: updatedProject.identity.title };
    } catch (error) {
        if (error.code === 11000) throw new Error("A project with this title already exists.");
        if (error.name === "ValidationError") {
            const details = Object.values(error.errors).map(e => `${e.path}: ${e.message}`).join(", ");
            throw new Error("Validation Error: " + details);
        }
        throw error;
    }
};

// =========================================
// DELETE PROJECT SERVICE (CLEANUP)
// =========================================
export const deleteProjectService = async (id, userId) => {
    // 1. Fetch project to ensure ownership and get image URLs
    const project = await Project.findOne({ _id: id, createdBy: userId });
    if (!project) throw new Error("Project not found or unauthorized.");

    // 2. Identify all images from vision and all units
    const allImageUrls = [
        ...(project.vision?.images || []),
        ...((project.residences?.units || []).flatMap(u => u.images || []))
    ];

    // 3. Delete from Cloudinary (Batch operation for performance)
    if (allImageUrls.length > 0) {
        const deletePromises = allImageUrls.map(url => {
            const publicId = getPublicIdFromUrl(url);
            if (publicId) {
                return cloudinary.uploader.destroy(publicId).catch(err => {
                    console.error(`Failed to delete asset ${publicId}:`, err);
                    return null; // Don't block DB deletion if one image fails
                });
            }
            return Promise.resolve();
        });
        
        await Promise.all(deletePromises);
    }

    // 4. Delete the document
    await Project.deleteOne({ _id: id });
    return { success: true };
};