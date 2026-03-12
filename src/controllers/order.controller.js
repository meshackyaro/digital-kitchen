import { createOrderService } from "../services/order.services.js";

export const createOrderController = async (req, res) => {
    const userId = req.user._id;
    const { deliveryAddress } = req.body;

    const order = await createOrderService(userId, deliveryAddress);

    res.status(201).json({
        status: "SUCCESS",
        message: "Order placed successfully",
        data: order,
    });
};
