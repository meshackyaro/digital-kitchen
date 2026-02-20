import { z } from "zod";

const phoneRegex = /^\+?\d{10,15}$/;

export const registerSchema = z
    .object({
        identifier:
            z.string({required_error: "email or phone number is required"})
            .trim()
            .toLowerCase()
            .transform((data) => {
                const emailCheck = z.email().safeParse(data);

                if (emailCheck.success) return { type: "email", value: data}
                if (phoneRegex.test(data)) return { type: "phone", value: data}

                throw new Error("Invalid email or phone number");
            }),

        password:
            z.string({required_error: "Password is required"})
            .trim()
            .min(8, {message: "Password must be at least 8 characters long"})
            .max(32, {message: "Password must be at most 32 characters long"})
            .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
            .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter"})
            .regex(/[0-9]/, {message: "Password must contain at least one number"})
            .regex(/[^a-zA-Z0-9]/, {message: "Password must contain at least one special character"})
});

export const loginSchema = z
    .object({
        identifier:
            z.string({required_error: "email or phone number is required"})
            .trim()
            .lowercase()
            .transform((data) => {
                const emailCheck = z.email().safeParse(data);
                const phoneCheck = phoneRegex.test(data);

                if (emailCheck.success) return { type: "email", value: data}
                if (phoneCheck.success) return { type: "phone", value: data}

                throw new Error("Invalid email or phone number");
            }),
            
        password:
            z.string({required_error: "Password is required"})
            .trim()
            .min(8, {message: "Password must be at least 8 characters long"})
            .max(32, {message: "Password must be at most 32 characters long"})
            .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
            .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter"})
            .regex(/[0-9]/, {message: "Password must contain at least one number"})
            .regex(/[^a-zA-Z0-9]/, {message: "Password must contain at least one special character"})
});