import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import passport from 'passport';
import rateLimit from 'express-rate-limit'; // 🆕 Recommended for production

import authRoutes from "./module/auth/auth.router.js";
import projectRoutes from './module/project/project.router.js';
import "./module/auth/google.strategy.js";

const app = express();

// 1. Trust Proxy
app.set("trust proxy", 1); 

// 2. Security & Rate Limiting
app.use(helmet({ crossOriginOpenerPolicy: false }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: "Too many requests from this IP, please try again later."
});
app.use("/api/", limiter); // Apply to all API routes

// 3. Performance
app.use(compression()); 

// 4. CORS
const allowedOrigins = ['https://www.srgroupandbuilders.com','https://srgroupandbuilders.com','https://sr-group-promoter-builders.vercel.app ','http://localhost:5173'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('CORS Policy Blocked'));
        }
    },
    credentials: true, 
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 5. Parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// 6. Auth
app.use(passport.initialize());

// 7. Routes
app.get("/", (req, res) => res.send("SRGroup API is live"));
app.get("/ping", (req, res) => res.status(200).send("pong"));

app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);

// 8. 🛡️ Centralized Error Handler (The Catch-All)
// Place this AFTER all your routes
app.use((err, req, res, next) => {
    console.error("❌ API Error:", err.stack);
    
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        // Only show stack trace in development
        stack: process.env.NODE_ENV === 'development' ? err.stack : {} 
    });
});

export default app;