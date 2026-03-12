import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middleware/validate.js";
import { addToCartSchema } from "../validations/cart.validation.js";
import { addToCartController, getCartController, emptyCartController, removeFromCartController } from "../controllers/cart.controller.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = Router();

router.use(authorize("user"));

router.post("/",
    validate(addToCartSchema),
    asyncHandler(addToCartController)
);

router.get("/",
    asyncHandler(getCartController)
);

router.delete("/:foodId",
    asyncHandler(removeFromCartController)
);

router.delete("/",
    asyncHandler(emptyCartController)
);

export default router;