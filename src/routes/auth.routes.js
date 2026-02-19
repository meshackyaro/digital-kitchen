import { Router } from "express";
import { registerSchema, loginSchema } from "../validators/auth.validators.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { registerController, loginController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/",
    validate(registerSchema),
    asyncHandler(registerController)
);

router.post("/login",
    validate(loginSchema),
    asyncHandler(loginController)
);

export default router;