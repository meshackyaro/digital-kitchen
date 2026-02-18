import { Router } from "express";
import { registerSchema } from "../validators/auth.validators.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { registerController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/",
    validate(registerSchema),
    asyncHandler(registerController)
);

console.log("Auth router loaded");

export default router;