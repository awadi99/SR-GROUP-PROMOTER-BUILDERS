import express from "express";
import rateLimit from "express-rate-limit";
import { 
    createProject, 
    getMyProjectsController, 
    getProjectByIdController, 
    updateProject, 
    deleteProject ,
    getPublicProjectController,
    getAllPublicProjectsController,
    getDashboardStats,
    getProjectStats
} from "./project.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import upload from "../../middlewares/multer.middleware.js"; 

const router = express.Router();

// =========================================
// RATE LIMITERS
// =========================================
const createProjectLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: { success: false, message: "Too many project creation requests, please try again after 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});

const editProjectLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10, // Increased slightly for updates
    message: { success: false, message: "Too many update requests, please try again after 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});

const deleteProjectLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, // Strict limit for deletions
    message: { success: false, message: "Too many deletion requests, please try again after 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});


const publicLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 100, 
    message: { success: false, message: "Too many requests, please slow down." },
    standardHeaders: true,
    legacyHeaders: false,
});
router.get("/public/:id", publicLimiter,getPublicProjectController);

router.get("/all-public", publicLimiter, getAllPublicProjectsController);

router.get("/my-projects", protect, getMyProjectsController);

router.get("/get-project/:id", protect, getProjectByIdController);

router.post(
    "/create", 
    protect, 
    createProjectLimiter, 
    upload.fields([
        { name: "visionImages", maxCount: 10 },
        { name: "unitImages", maxCount: 50 }
    ]), 
    createProject
);

router.put(
    "/update/:id", 
    protect, 
    editProjectLimiter,
    upload.fields([
        { name: "visionImages", maxCount: 10 },
        { name: "unitImages", maxCount: 50 }
    ]), 
    updateProject
);

// Delete Route
router.delete(
    "/delete/:id", 
    protect, 
    deleteProjectLimiter, 
    deleteProject
);


router.get('/stats',protect,getDashboardStats);

router.get('/graph',protect,getProjectStats);


export default router;