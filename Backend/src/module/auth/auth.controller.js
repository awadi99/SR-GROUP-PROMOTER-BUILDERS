import { loginService, signupService } from "./auth.service.js";
import { generateToken } from "../../lib/utils.js";
import redisClient from "../../config/redis.js";
import bcrypt from "bcryptjs";
import User from "./auth.model.js";
import { getAdminStats } from "../project/project.service.js";

// Helper for standardized responses
const sendResponse = (res, statusCode, data) => res.status(statusCode).json(data);

export const register = async (req, res) => {
    try {
        const user = await signupService(req.body);
        generateToken({ id: user._id, adminCode: user.adminCode }, res);

        sendResponse(res, 201, {
            _id: user._id,
            adminCode: user.adminCode,
            fullName: user.fullName,
            email: user.email
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const user = await loginService(req.body);
        generateToken({ id: user._id, adminCode: user.adminCode }, res);

        sendResponse(res, 200, {
            _id: user._id,
            adminCode: user.adminCode,
            fullName: user.fullName,
            email: user.email,
        });
    } catch (error) {
        // Log locally, send generic message to avoid user enumeration
        sendResponse(res, 401, { message: "Invalid credentials." });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0)
        });
        return sendResponse(res, 200, { message: "Logged out successfully" });
    } catch (error) {
        return sendResponse(res, 500, { message: "Internal server error" });
    }
};

export const resetPasswordDirect = async (req, res) => {
    try {
        const { email, adminCode, password } = req.body; // Changed newPassword to password
        
        // Defensive check: prevent hashing undefined
        if (!password) {
            return sendResponse(res, 400, { message: "Password is required." });
        }
        
        const user = await User.findOne({ email: email.toLowerCase(), adminCode }).select("+password");
        if (!user) return sendResponse(res, 404, { message: "Account not found." });

        user.password = await bcrypt.hash(password, 12); 
        await user.save();

        sendResponse(res, 200, { success: true, message: "Password updated." });
    } catch (error) {
        // Log the actual error to your server console so you can see it
        console.error("Reset Password Error:", error);
        sendResponse(res, 500, { message: "Internal server error." });
    }
};


export const googleCallback = async (req, res) => {
    try {
        
        if (!req.user) throw new Error("No user found");

        const token = generateToken({
            id: req.user._id,
            role: req.user.role,
            adminCode: req.user.adminCode
        }, res);

        const frontendUrl = process.env.CLIENT_URL || "http://localhost:5173";
        let targetPath = "/dashboard";

        res.redirect(`${frontendUrl}/auth/google/success?token=${token}&redirect=${targetPath}`);

    } catch (error) {
        console.error("Google Callback Error:", error);
        res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=auth_failed`);
    }
}

export const verifyadminCode = async (req, res) => {
    try {
        const { adminCode } = req.body;
        // High-speed verification via Redis
        const isValid = await redisClient.exists(`auth:${adminCode}`);
        if (!isValid) return sendResponse(res, 404, { message: "Invalid Admin Code." });

        sendResponse(res, 200, { success: true });
    } catch (error) {
        sendResponse(res, 500, { message: "Verification service temporarily unavailable." });
    }
};



export const getDashboardStats = asyncHandler(async (req, res) => {

    const stats = await getAdminStats()

    return res.status(200).json({
        success: true,
        data: stats
    });
});