import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middleware/validate";
import { addToCartSchema } from "../validations/cart.validation.js";
import { addToCartController, getCartController, emptyCartController, removeFromCartController } from "../controllers/cart.controller.js";

const router = Router();

router.post("/add",
    validate(addToCartSchema),
    asyncHandler(addToCartController)
);

router.get("/",
    asyncHandler(getCartController)
);

router.delete("/:foodId",
    asyncHandler(removeFromCartController)
);

router.delete("/empty",
    asyncHandler(emptyCartController)
);

export default router;