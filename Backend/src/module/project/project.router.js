import express from "express";
import rateLimit from "express-rate-limit";
import { createProject, getMyProjectsController,getProjectByIdController } from "./project.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import upload from "../../middlewares/multer.middleware.js"; 

const router = express.Router();


const createProjectLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: {
        success: false,
        message: "Too many project creation requests, please try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
});


router.get(
    "/my-projects",
    protect,
    getMyProjectsController
);

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

export default router;