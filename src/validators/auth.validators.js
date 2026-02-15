import { z } from "zod";

const phoneRegex = /^[0-9]{10}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const lowerCaseRegex = /[a-z]/;
const upperCaseRegex = /[A-Z]/;
const numberRegex = /[0-9]/;
const specialCharRegex = /[^a-zA-Z0-9]/;

export const registerSchema = z
    .object({
        email:
            z.string()
            .email({message: "Invalid email address"})
            .regex(emailRegex, {message: "Invalid email address"})
            .trim()
            .optional(),

        phone:
            z.string()
            .regex(phoneRegex, {message: "Invalid phone number"})
            .trim()
            .optional(),

        password:
            z.string()
            .min(8, {message: "Password must be at least 8 characters long"})
            .max(32, {message: "Password must be at most 32 characters long"})
            .regex(lowerCaseRegex, {message: "Password must contain at least one lowercase letter"})
            .regex(upperCaseRegex, {message: "Password must contain at least one uppercase letter"})
            .regex(numberRegex, {message: "Password must contain at least one number"})
            .regex(specialCharRegex, {message: "Password must contain at least one special character"})
            .trim()
    })
    .refine((data) => data.email || data.phone, {
        message: "Email or phone is required",
        path: ["email", "phone"]
    });