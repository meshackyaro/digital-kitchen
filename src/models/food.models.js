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
        priceInKobo: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            required: true,
            enum: ["Starter", "Main Course", "Dessert", "Beverage", "Snack"],
            trim: true,
            default: "Main Course",
        },
        image: {
            type: String, // URL to image
            required: true,
            trim: true,
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
