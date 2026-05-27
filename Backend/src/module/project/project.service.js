import Project from "./project.model.js";

/*
|--------------------------------------------------------------------------
| CREATE PROJECT SERVICE
|--------------------------------------------------------------------------
*/
export const createProjectService = async (projectData, userId) => {
    const { identity, specs, vision, location, contact } = projectData;

    // 1. Validate mandatory fields
    const titleClean = identity?.title?.trim();
    const descClean = identity?.description?.trim();

    if (!titleClean || !descClean) {
        throw new Error("Project title and description are required.");
    }

    // 2. Handle Residences (Crucial: Force Parse if it's a string)
    let unitsData = projectData.residences?.units || [];

    // If the frontend sent a stringified array (very common with FormData), parse it
    if (typeof unitsData === 'string') {
        try {
            unitsData = JSON.parse(unitsData);
        } catch (e) {
            console.error("Failed to parse units string:", e);
            unitsData = [];
        }
    }

    // Ensure it is strictly an array for Mongoose
    const finalUnits = Array.isArray(unitsData) 
        ? unitsData.map(unit => ({
            type: unit?.type?.trim() || undefined,
            area: unit?.area?.trim() || undefined,
            price: unit?.price?.trim() || undefined,
            images: Array.isArray(unit?.images) ? unit.images.filter(Boolean) : []
        })) 
        : [];

    // 3. Build Final Payload
    const projectPayload = {
        identity: { 
            title: titleClean, 
            tagline: identity?.tagline?.trim() || undefined, 
            description: descClean 
        },
        specs: specs ? { 
            towers: Number(specs.towers) || undefined, 
            floors: Number(specs.floors) || undefined, 
            architect: specs.architect?.trim() || undefined, 
            rera: specs.rera?.trim() || undefined 
        } : undefined,
        residences: projectData.residences ? { 
            commonVideoUrl: projectData.residences.commonVideoUrl?.trim() || undefined, 
            units: finalUnits // Explicitly set to the array
        } : undefined,
        vision: vision ? { 
            vision: vision.vision?.trim() || undefined, 
            images: Array.isArray(vision.images) ? vision.images.filter(Boolean) : [], 
            features: Array.isArray(vision.features) ? vision.features : [] 
        } : undefined,
        location: location ? { 
            mapEmbed: location.mapEmbed?.trim() || undefined, 
            landmarks: Array.isArray(location.landmarks) ? location.landmarks : [] 
        } : undefined,
        contact: contact ? { 
            name: contact.name?.trim() || undefined, 
            email: contact.email?.trim()?.toLowerCase() || undefined, 
            phone: contact.phone?.trim() || undefined, 
            website: contact.website?.trim() || undefined 
        } : undefined,
        createdBy: userId
    };

    // 4. Write to Database
    try {
        const createdProject = await Project.create(projectPayload);
        return { projectId: createdProject._id, title: createdProject.identity.title };
    } catch (error) {
        if (error.code === 11000) throw new Error("A project with this title already exists.");
        if (error.name === "ValidationError") {
             const msg = Object.values(error.errors).map(e => e.message).join(", ");
             throw new Error(msg);
        }
        throw error;
    }
};

/*
|--------------------------------------------------------------------------
| GET MY PROJECTS SERVICE
|--------------------------------------------------------------------------
*/
export const getMyProjectsService = async (userId) => {
    return await Project.find({ createdBy: userId })
        .select({ "identity.title": 1, "identity.tagline": 1, createdAt: 1 })
        .sort({ createdAt: -1 })
        .lean();
};