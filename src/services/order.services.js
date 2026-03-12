import { Cart } from "../models/cart.models.js";
import { Order } from "../models/order.models.js";
import { User } from "../models/user.models.js";
import { AppError } from "../utils/appError.js";

export const createOrderService = async (userId, deliveryAddress) => {
    // 1. Get User details for the order (required by model)
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    // 2. Get Cart and ensure it's not empty
    const cart = await Cart.findOne({ user: userId }).populate("items.food");
    if (!cart || cart.items.length === 0) throw new AppError("Cart is empty", 404);

    // 3. Prepare order items and calculate total
    const orderItems = cart.items.map((item) => ({
        food: item.food._id,
        name: item.food.name,
        price: Number(item.food.price), // Convert string to number for math
        quantity: item.quantity
    }));

    const totalAmount = orderItems.reduce(
        (total, item) => total + item.price * item.quantity, 
        0
    );

    // 4. Create the Order
    const order = await Order.create({
        user: userId,
        items: orderItems,
        totalAmount,
        address: deliveryAddress,
        phone: user.phone || "Not Provided", // Use user's registered phone
        email: user.email || "Not Provided", // Use user's registered email
        paymentMethod: "cash",
        paymentStatus: "unpaid",
    });

    // 5. Clear the cart (don't delete it, just empty it)
    cart.items = [];
    await cart.save();

    return order;
};