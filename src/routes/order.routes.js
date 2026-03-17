import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middleware/validate.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { createOrderSchema } from "../validators/order.validators.js";
import { createOrderController, 
    fetchOrderHistoryController, 
    fetchOrderByIdController, 
    cancelOrderController } from "../controllers/order.controller.js";

const router = Router();

// Only authenticated users/admins can place orders
router.post("/", 
    authorize("admin", "user"), 
    validate(createOrderSchema), 
    asyncHandler(createOrderController)
);

// Only authenticated users/admins can fetch their orders
router.get("/",
    authorize("admin", "user"),
    asyncHandler(fetchOrderHistoryController)
);

// Only authenticated users/admins can fetch a specific order
router.get("/:id",
    authorize("admin", "user"),
    asyncHandler(fetchOrderByIdController)
);

// Only authenticated users/admins can cancel an order
router.delete("/:id",
    authorize("admin", "user"),
    asyncHandler(cancelOrderController)
);

export default router;