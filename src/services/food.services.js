import { Food } from "../models/food.models.js";
import { AppError } from "../utils/appError.js";

export const fetchFoodService = async () => {
    const food = await Food.find({isAvailable: true});
    return food;
};

export const fetchFoodByIdService = async (id) => {
    const food = await Food.findById(id);

    if (!food) throw new AppError("Food not found", 404);
    if (!food.isAvailable) throw new AppError("Food is not available", 400);
    return food;
};

export const createFoodService = async (foodData) => {
    const { name, description, price, category, image, isAvailable } = foodData;
    
    // Convert Naira (decimal) to Kobo (integer)
    const priceInKobo = Math.round(Number(price) * 100);

    const newFood = await Food.create({
        name,
        description,
        priceInKobo,
        category,
        image,
        isAvailable
    });
    return newFood;
};

export const updateFoodService = async (id, foodData) => {
    const { name, description, price, category, image, isAvailable } = foodData;
    
    // Create update object and conditionally add priceInKobo if price exists
    const updateData = { name, description, category, image, isAvailable };
    if (price !== undefined) {
        updateData.priceInKobo = Math.round(Number(price) * 100);
    }

    const updatedFood = await Food.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true, runValidators: true }
    );

    if (!updatedFood) throw new AppError("Food not found", 404);
    return updatedFood;
};

export const deleteFoodService = async (id) => {
    const deletedFood = await Food.findByIdAndDelete(id);

    if (!deletedFood) throw new AppError("Food not found", 404);
    return deletedFood;
};
