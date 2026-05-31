import { z } from "zod";

// Password: Min 8 chars, 1 upper, 1 lower, 1 number, 1 special
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Email: Standard RFC compliant format
const emailRegex = /^(?!.*\.\.)[A-Za-z0-9]+([._%+-]?[A-Za-z0-9]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

// Mobile: Validates 10-digit numbers (supports optional +91 prefix)


const resetPasswordSchema = z.object({
    adminCode: z
    .string()
    .min(3, "adminCode must be at least 3 characters")
    .max(30, "adminCode is too long")
    .trim(),

    email: z
        .string()
        .regex(emailRegex, "Invalid email format")
        .toLowerCase()
        .trim(),

    password: z
        .string()
        .regex(passwordRegex, "Password must include uppercase, lowercase, number, and special character")
});

export default resetPasswordSchema;