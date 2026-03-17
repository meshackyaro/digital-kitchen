import z from "zod";

const foodCategoryEnum = z.enum(["Starter", "Main Course", "Dessert", "Beverage", "Snack"]);

export const createFoodSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        description: z.string().min(1, "Description is required"),
        price: z.union([z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a number"), z.number()]).min(1, "Price is required"),
        category: foodCategoryEnum,
        image: z.string().min(1, "Image is required"),
        isAvailable: z.boolean().default(true),
    })
    .strict();

export const updateFoodSchema = z
    .object({
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        price: z.union([z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a number"), z.number()]).optional(),
        category: foodCategoryEnum.optional(),
        image: z.string().min(1).optional(),
        isAvailable: z.boolean().default(true).optional(),
    })
    .strict();
