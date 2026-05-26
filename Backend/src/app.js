import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import passport from 'passport';

import authRoutes from "./module/auth/auth.router.js";
// Commented out until you are ready to connect these
// import userRoutes from './module/user/user.router.js';
// import testRoutes from './module/test/test.router.js';
import "./module/auth/google.strategy.js";

const app = express();

// 1. 🎯 Render & Proxy Management (Must for HTTPS/Load Balancer)
app.set("trust proxy", 1); 

// 2. 🚀 Speed Optimization
app.use(compression()); 

// 3. 🛡️ Security Headers
app.use(helmet({
    crossOriginOpenerPolicy: false, // Google OAuth ke liye zaroori hai
}));

// 4. 🎯 CORS Configuration (Future-Proofed for Render/Vercel)
const allowedOrigins = [
    'http://localhost:5173' 
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('CORS Policy Blocked'));
        }
    },
    credentials: true, 
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin']
}));

// 5. Body Parsing (Standard)
app.use(express.json({ limit: '50kb' })); 
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// 6. Auth Middleware
app.use(cookieParser());
app.use(passport.initialize());

// 7. Routes
app.get("/", (req, res) => res.send("SRGroup API is live 🚀"));
app.get("/ping", (req, res) => res.status(200).send("pong"));

app.use("/api/auth", authRoutes);

export default app;