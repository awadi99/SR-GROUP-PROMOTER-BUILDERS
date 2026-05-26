import express from "express";
import passport from "passport";
import rateLimit from 'express-rate-limit';
import {
    register,
    login,
    logout,
    googleCallback,
    verifyadminCode,
    resetPasswordDirect
} from "./auth.controller.js";
import { signupSchema, loginSchema } from "../../validations/auth.vaildator.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// 1. Basic Auth Routes
router.post("/register", validate(signupSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/reset-password", resetPasswordDirect);
router.post("/logout", logout);

// 2. Admin Code Verification (Rate-limited to prevent brute-force)
const verifyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10, 
    message: "Too many attempts, please try again later.",
    standardHeaders: true, // Render ke piche proxy headers ko track karne ke liye
    legacyHeaders: false
});
router.post("/verify-admin-code", verifyLimiter, verifyadminCode);

// 3. Current User Route
router.get("/me", protect, (req, res) => {
    res.json(req.user);
});

// 4. Google Auth Initiation
router.get("/google", (req, res, next) => {
    const { adminCode } = req.query;

    const passportOptions = {
        scope: ["profile", "email"],
        prompt: 'select_account'
    };

    if (adminCode) {
        passportOptions.state = JSON.stringify({ adminCode });
    }

    passport.authenticate("google", passportOptions)(req, res, next);
});

// 5. Google OAuth Callback (Render-optimized)
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        // CLIENT_URL environment variable Render mein set karna na bhulein (e.g., https://your-site.vercel.app)
        failureRedirect: `${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=auth_failed`
    }),
    googleCallback
);

export default router;