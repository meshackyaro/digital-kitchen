import { AppError } from "../utils/appError.js";
import { Food } from "../models/food.models.js";
import { Cart } from "../models/cart.models.js";

export const addToCartService = async (userId, foodId, quantity) => {
    const food = await Food.findById(foodId);

    if (!food) throw new AppError("Food not found", 404);

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        const newCart = await Cart.create({ 
            user: userId, 
            items: [{ food: foodId, quantity }] 
        });
        return await Cart.findById(newCart._id).populate("items.food");
    };

    const existingCartItem   = cart.items.findIndex(item => item.food.toString() === foodId);

    if (existingCartItem > -1) {
        cart.items[existingCartItem].quantity += quantity;
    } else {
        cart.items.push({ food: foodId, quantity });
    };

    await cart.save();
    return await Cart.findById(cart._id).populate("items.food");
};

export const getCartService = async (userId) => {
    const existingCart = await Cart.findOne({ user: userId }).populate("items.food");

    if (existingCart) return existingCart;

    const newCart = await Cart.create({ user: userId, items: [] });
    return newCart;
};

export const removeFromCartService = async (userId, foodId) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) throw new AppError("Cart not found", 404);

    const itemIndex = cart.items.findIndex(item => item.food.toString() === foodId);

    if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
    } else {
        throw new AppError("Item not found in cart", 404);
    };

    await cart.save();
    return await Cart.findById(cart._id).populate("items.food");
};

export const emptyCartService = async (userId) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) throw new AppError("Cart not found", 404);

    cart.items = [];
    await cart.save();
    return { message: "Cart emptied successfully" };
};