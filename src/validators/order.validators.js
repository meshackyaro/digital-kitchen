import z from "zod";

export const createOrderSchema = z.object({
    deliveryAddress: z.string().min(5, "Delivery address must be at least 5 characters long"),
}).strict();
