import { Cart } from "../models/cart.models.js";
import { Order } from "../models/order.models.js";
import { User } from "../models/user.models.js";
import { emptyCartService } from "./cart.services.js";
import { AppError } from "../utils/appError.js";


export const getCheckoutSummaryService = async (userId, promoCode = null) => {
    
    const cart = await Cart.findOne({ user: userId }).populate("items.food");

    if (!cart || cart.items.length === 0) throw new AppError("Cart is empty", 400);

    const unavailableItem = cart.items.find((item) => !item.food.isAvailable);

    if (unavailableItem) throw new AppError(`Sorry ${unavailableItem.food.name} is not available`, 400);

    const subTotalInKobo = cart.items.reduce(
        (total, item) => total + (item.food.priceInKobo * item.quantity), 
        0
    );

    let deliveryFeeInKobo = 50000;

    let discountInKobo = 0;

    if (promoCode) {
        const discount = await validatePromoCodeService(promoCode);
        discountInKobo = Math.round((subTotalInKobo * discount.percentage / 100));
    };

    const totalAmountInKobo = (subTotalInKobo + deliveryFeeInKobo) - discountInKobo;

    return {
        items: cart.items,
        subTotalInKobo,
        deliveryFeeInKobo,
        discountInKobo,
        totalAmountInKobo,
        currency: "NGN"
    };   


};

export const createOrderService = async (userId, deliveryAddress, promoCode = null) => {
    // 1. Get User details for the order (required by model)
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    // 2. Get checkout summary
    const checkout = await getCheckoutSummaryService(userId, promoCode);
    const { subTotalInKobo, deliveryFeeInKobo, discountInKobo, totalAmountInKobo } = checkout;

    // 3. Prepare order items and calculate total (all in Kobo)
    const orderItems = checkout.items.map((item) => ({
        food: item.food._id,
        name: item.food.name,
        priceInKobo: item.food.priceInKobo,
        quantity: item.quantity
    }));

    // 4. Create the Order
    const order = await Order.create({
        user: userId,
        items: orderItems,
        totalAmountInKobo: checkout.totalAmountInKobo,
        deliveryAddress: deliveryAddress,
        phone: user.phone || "Not Provided", // Use user's registered phone
        email: user.email || "Not Provided", // Use user's registered email
        paymentMethod: "cash",
        paymentStatus: "unpaid",
        // Store order details
        details: {
            subTotalInKobo,
            deliveryFeeInKobo,
            discountInKobo,
            totalAmountInKobo,
            currency: "NGN"
        }
    });

    // 5. Clear the cart (don't delete it, just empty it)
    await emptyCartService(userId);

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





// export const validatePromoCodeService = async (promoCode) => {
//     const promo = await PromoCode.findOne({ code: promoCode });
//     if (!promo) throw new AppError("Invalid promo code", 404);
//     if (promo.isUsed) throw new AppError("Promo code already used", 400);
//     if (promo.expiresAt < new Date()) throw new AppError("Promo code expired", 400);
//     return promo;
// };
