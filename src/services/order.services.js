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

    // 3. Availability Guard: Stop immediately if any item is out of stock (Optimized)
    const unavailableItem = cart.items.find((item) => !item.food.isAvailable);
    if (unavailableItem) {
        throw new AppError(
            `Sorry, the ${unavailableItem.food.name} is no longer available. Please remove it from your cart to continue.`, 
            400
        );
    };

    // 4. Prepare order items and calculate total (all in Kobo)
    const orderItems = cart.items.map((item) => ({
        food: item.food._id,
        name: item.food.name,
        priceInKobo: item.food.priceInKobo,
        quantity: item.quantity
    }));

    const totalAmountInKobo = orderItems.reduce(
        (total, item) => total + item.priceInKobo * item.quantity, 
        0
    );

    // 5. Create the Order
    const order = await Order.create({
        user: userId,
        items: orderItems,
        totalAmountInKobo,
        address: deliveryAddress,
        phone: user.phone || "Not Provided", // Use user's registered phone
        email: user.email || "Not Provided", // Use user's registered email
        paymentMethod: "cash",
        paymentStatus: "unpaid",
    });

    // 6. Clear the cart (don't delete it, just empty it)
    cart.items = [];
    await cart.save();

    return order;
};


export const fetchOrderHistoryService = async (userId) => {
    const orders = await Order.find({ user: userId }).populate("items.food");
    return orders;
};

export const fetchOrderByIdService = async (userId, orderId) => {
    const order = await Order.findOne({ user: userId, _id: orderId }).populate("items.food");

    if (!order) throw new AppError("Order not found", 404);

    return order;
};


export const cancelOrderService = async (userId, orderId) => {
    const order = await Order.findOne({ user: userId, _id: orderId });

    if (!order) throw new AppError("Order not found", 404);

    if (order.status === "cancelled") throw new AppError("Order is already cancelled", 400);

    if (order.status === "completed") throw new AppError("Order is already completed, cannot cancel", 400);

    order.status = "cancelled";
    await order.save();

    return order;
};