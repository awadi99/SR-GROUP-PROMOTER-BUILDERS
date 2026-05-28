import Project from "./project.model.js";

export const createProjectService = async (projectData, userId) => {
    const { identity, specs, vision, location, contact } = projectData;

    const sanitize = (val) => (val && typeof val === 'string' ? val.trim() : undefined);

    // FIX: Map features to a simple array of strings [String]
    const normalizedFeatures = Array.isArray(vision?.features) 
        ? vision.features.map(item => {
            // If item is an object like { feature: "..." }, extract the string
            if (item && typeof item === 'object' && 'feature' in item) {
                return String(item.feature || "").trim();
            }
            // If it's already a string, just trim it
            return String(item || "").trim();
        }).filter(f => f.length > 0) // Remove empty strings
        : [];

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
            features: normalizedFeatures // Now a clean array of strings: ["Pool", "Garden"]
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

export const getMyProjectsService = async (userId) => {
    return await Project.find({ createdBy: userId })
    .select("identity.title identity.tagline identity.description vision.images specs.architect createdAt")
        .sort({ createdAt: -1 })
        .lean(); 
};