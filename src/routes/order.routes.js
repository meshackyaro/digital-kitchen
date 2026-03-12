import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middleware/validate.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { createOrderSchema } from "../validators/order.validators.js";
import { createOrderController } from "../controllers/order.controller.js";

const router = Router();

// Only authenticated users/admins can place orders
router.post("/", 
    authorize("admin", "user"), 
    validate(createOrderSchema), 
    asyncHandler(createOrderController)
);

export default router;
