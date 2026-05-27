import jwt from 'jsonwebtoken';
import path from 'path';
import { findUserById } from '../module/auth/auth.repository.js';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Setup __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables safely
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

        return res.status(401).json({ message: "Not authorized - No Token provided" });
    }

    try {
        const secret = process.env.JWT_SECRET;
        const decode = jwt.verify(token, secret);


        const userId = decode.id || decode.userId;

        // Fetch User
        const user = await findUserById(userId);

        if (!user) {

            return res.status(404).json({ message: "User not found" });
        }



        // Attach user to request
        req.user = user;
        req.adminCode = decode.adminCode;


        next();

    } catch (error) {

        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: "Access Denied: Admin privileges required" });
    }
};
