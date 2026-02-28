import z from "zod";

export const addToCartSchema = z
    .object({
        food: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid food ID"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
    });


export const removeFromCartSchema = z
    .object({
        params: z
            .object({
                food: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid food ID"),
            })
    });