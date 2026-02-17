import { Router } from "express";
import { registerUserService } from "../services/auth.services";
import { registerSchema } from "../validators/auth.validators";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.post("/register",
    validate(registerSchema),
    asyncHandler(registerUserService)
);

export default router;