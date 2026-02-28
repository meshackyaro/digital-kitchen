import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            trype: String,
            required: true,
            enum: ["Starter", "Main Course", "Dessert", "Beverage", "Snack"],
            trim: true,
            default: "Main Course",
        },
        image: {
            type: String, // URL to image
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Food = mongoose.model("Food", foodSchema);
