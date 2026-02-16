import { z } from "zod";

const phoneRegex = /^[0-9]{10,15}$/;
const lowerCaseRegex = /[a-z]/;
const upperCaseRegex = /[A-Z]/;
const numberRegex = /[0-9]/;
const specialCharRegex = /[^a-zA-Z0-9]/;

export const registerSchema = z
    .object({
        identifier:
            z.string({required_error: "email or phone number is required"})
            .trim()
            .toLowerCase()
            .transform((data) => {
                const emailCheck = z.string().email().safeParse(data);

                if (emailCheck.success) return { type: "email", value: data}
                if (phoneRegex.test(data)) return { type: "phone", value: data}

                throw new Error("Invalid email or phone number");
            }),

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
 



