import { Food } from "../models/food.models.js";
import { AppError } from "../utils/appError.js";

export const fetchFoodService = async () => {
    const food = await Food.find();
    return food;
};

export const fetchFoodByIdService = async (id) => {
    const food = await Food.findById(id);

    if (!food) throw new AppError("Food not found", 404);
    return food;
};

export const createFoodService = async (foodData) => {
    const { name, description, price, category, image, isAvailable } = foodData;
    const newFood = await Food.create({
        name,
        description,
        price,
        category,
        image,
        isAvailable
    });
    return newFood;
};

export const updateFoodService = async (id, foodData) => {
    const { name, description, price, category, image, isAvailable } = foodData;
    const updatedFood = await Food.findByIdAndUpdate(
        id, 
        { name, description, price, category, image, isAvailable }, 
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
