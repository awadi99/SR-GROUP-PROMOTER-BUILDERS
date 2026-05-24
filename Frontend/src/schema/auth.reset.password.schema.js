import { z } from "zod";

// Password: Min 8 chars, 1 upper, 1 lower, 1 number, 1 special
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Email: Standard RFC compliant format
const emailRegex = /^(?!.*\.\.)[A-Za-z0-9]+([._%+-]?[A-Za-z0-9]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

// Mobile: Validates 10-digit numbers (supports optional +91 prefix)
const mobileRegex = /^(\+91[\s-]?)?[6789]\d{9}$/;

const resetPasswordSchema = z.object({
    mobile: z
        .string()
        .regex(mobileRegex, "Invalid mobile number")
        .optional()
        .or(z.literal("")), // Allows empty if mobile isn't mandatory

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