import jwt from 'jsonwebtoken';
import path from 'path';
import { findUserById } from '../module/auth/auth.repository.js';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.resolve(__dirname, "../../.env") });
} else {
    dotenv.config();
}

export const protect = async (req, res, next) => {
    let token = null;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    } else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized - No Token" });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: "Server Configuration Error" });
        }

        const decode = jwt.verify(token, secret);

        // SRgroup ke liye: ID ya adminCode verify karna
        const userId = decode.id || decode.userId;
        
        if (!userId) {
            return res.status(401).json({ message: "Invalid Token Payload" });
        }

        const user = await findUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // SRgroup: Request object mein user aur adminCode set karein
        req.user = user;
        req.adminCode = decode.adminCode; // Token se adminCode extract kar liya
        
        next();

    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid Token" });
    }
};

// adminOnly middleware aapke role: "admin" schema ke liye perfect hai
export const adminOnly = (req, res, next) => {
    // SRgroup schema mein role "admin" default hai, toh yeh check safe hai
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: "Access Denied: System Admins Only" });
    }
};