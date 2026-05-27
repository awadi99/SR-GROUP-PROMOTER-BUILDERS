import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^(?!.*\.\.)[A-Za-z0-9]+([._%+-]?[A-Za-z0-9]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

const signupSchema = z.object({
    adminCode: z
        .string()
        .min(3, "adminCode must be at least 3 characters")
        .max(30, "adminCode is too long")
        .trim(),
  
        fullName: z
        .string()
        .min(4, "Full name must be at least 4 characters")
        .max(50, "Full name is too long")
        .trim(),

    email: z
        .string()
        .regex(emailRegex, "Invalid email format")
        .toLowerCase()
        .trim(),

    password: z
        .string()
        .regex(passwordRegex, "Password must include uppercase, lowercase, number, and special character"),
        
});

export default signupSchema;