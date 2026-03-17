import {
    createOrderService,
    fetchOrderHistoryService,
    fetchOrderByIdService,
    cancelOrderService
} from "../services/order.services.js";

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

export const fetchOrderHistoryController = async (req, res) => {
    const userId = req.user._id;

    const orders = await fetchOrderHistoryService(userId);

    res.status(201).json({
        status: "SUCCESS",
        message: "Orders fetched successfully",
        data: orders,
    });
};

export const fetchOrderByIdController = async (req, res) => {
    const userId = req.user._id;
    const orderId = req.params.id;

    const order = await fetchOrderByIdService(userId, orderId);

    res.status(201).json({
        status: "SUCCESS",
        message: "Order fetched successfully",
        data: order,
    });
};

export const cancelOrderController = async (req, res) => {
    const userId = req.user._id;
    const orderId = req.params.id;

    const order = await cancelOrderService(userId, orderId);

    res.status(201).json({
        status: "SUCCESS",
        message: "Order cancelled successfully",
        data: order,
    });
};
