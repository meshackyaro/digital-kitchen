import { AppError } from "../utils/AppError.js";
import { Food } from "../models/food.model.js";
import { Cart } from "../models/cart.model.js";

export const addToCartService = async (userId, foodId, quantity) => {
    const food = await Food.findById(foodId);

    if (!food) throw new AppError("Food not found", 404);

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.food.toString() === foodId);
    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ food: foodId, quantity });
    }

    await cart.save();
    return await Cart.findById(cart._id).populate("items.food");
};