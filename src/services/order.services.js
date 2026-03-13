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

    // const unavailableItems = cart.items.filter((item) => !item.food.isAvailable);
    // if (unavailableItems.length > 0) {
    //     throw new AppError("Some items in your cart are no longer available", 400);
    // }

    // 3. Prepare order items and calculate total (all in Kobo)
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

    // 4. Create the Order
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

    // 5. Clear the cart (don't delete it, just empty it)
    cart.items = [];
    await cart.save();

    return order;
};



export const createOrderFromCart = async (userId, deliveryAddress) => {
    const cart = await Cart.findOne({ user: userId }).populate("items.food");
    if (!cart || cart.items.length === 0) {
        throw new AppError("Cart is empty", 400);
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of cart.items) {
        const food = await Food.findById(item.food._id);
        
        if (!food || !food.isAvailable) {
            throw new AppError(`Food item "${item.food.name}" is no longer available`, 400);
        }

        const itemPrice = food.price;
        const itemQuantity = item.quantity;
        const subtotal = itemPrice * itemQuantity;

        orderItems.push({
            food: food._id,
            name: food.name,
            price: itemPrice,
            quantity: itemQuantity
        });

        totalAmount += subtotal;
    }

    const order = await Order.create({
        user: userId,
        items: orderItems,
        totalAmount,
        deliveryAddress,
        status: "Pending"
    });

    // Clear cart after placing order
    cart.items = [];
    await cart.save();

    return order;
};