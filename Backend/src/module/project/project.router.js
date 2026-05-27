// project.routes.js
import express from "express";
import { createProject,getMyProjectsController } from "./project.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import upload from "../../middlewares/multer.middleware.js"; 

const router = express.Router();

router.get(
    "/my-projects",
    protect,
    getMyProjectsController
 );

router.post(
    "/create", 
    protect, 
    upload.fields([
        { name: 'visionImages', maxCount: 10 },
        { name: 'unitImages', maxCount: 20 }
    ]), 
    createProject
);

export default router;