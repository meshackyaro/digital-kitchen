import { addToCartService, getCartService, emptyCartService } from "../services/cart.services.js";

export const addToCartController = async (req, res) => {
    const { foodId, quantity } = req.body;
    const userId = req.user._id;

    const cart = await addToCartService(userId, foodId, quantity);

    res.status(200).json({
        status: "SUCCESS",
        message: "Item added to cart successfully",
        data: cart,
    });
};


export const getCartController = async (req, res) => {
    const userId = req.user._id;

    const cart = await getCartService(userId);

    res.status(200).json({
        status: "SUCCESS",
        message: "Cart fetched successfully",
        data: cart,
    });
};

export const removeFromCartController = async (req, res) => {
    const { foodId } = req.body;
    const userId = req.user._id;

    const cart = await removeFromCartService(userId, foodId);

    res.status(200).json({
        status: "SUCCESS",
        message: "Item removed from cart successfully",
        data: cart,
    });
};

export const emptyCartController = async (req, res) => {
    const userId = req.user._id;

    const cart = await emptyCartService(userId);

    res.status(200).json({
        status: "SUCCESS",
        message: "Cart emptied successfully",
        data: cart,
    });
};
