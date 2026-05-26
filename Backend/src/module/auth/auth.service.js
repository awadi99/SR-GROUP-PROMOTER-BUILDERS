import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser, findUserByEmailForLogin } from './auth.repository.js';
import redisClient from '../../config/redis.js'; 

export const signupService = async ({ adminCode, fullName, email, password }) => {
    // 1. Check Redis: Kya adminCode authorize hai?
    const role = await redisClient.get(`auth:${adminCode}`);
    if (!role) {
        throw new Error("This Admin Code is invalid or already used.");
    }

    // 2. Email uniqueness check
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error("User already exists with this email.");
    }

    // 3. Password Hashing (Using 12 rounds for better security)
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create User
    const user = await createUser({
        adminCode,
        fullName,
        email,
        password: hashedPassword,
        role: "admin" // Hardcoded 'admin' because SRGroup is Admin-only
    });

    // 5. Atomic Delete: Ek baar use hua toh code remove karein
    await redisClient.del(`auth:${adminCode}`);
    
    return user;
};

export const loginService = async ({ email, password }) => {
    // 1. Fetch user with password (using repo lean)
    const user = await findUserByEmailForLogin(email);
    
    // 2. Security: Verify credentials
    // Note: If user doesn't exist, bcrypt.compare will fail if we don't check 'user' first
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    return user;
};