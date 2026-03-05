import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middleware/validate.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { createFoodSchema, updateFoodSchema } from "../validators/food.validators.js";
import { fetchFoodController, 
    fetchFoodByIdController, 
    createFoodController, 
    updateFoodController, 
    deleteFoodController } from "../controllers/food.controller.js";

const router = Router();

router.get("/", asyncHandler(fetchFoodController));
router.get("/:foodId", asyncHandler(fetchFoodByIdController));
router.post("/", authorize("admin"), validate(createFoodSchema), asyncHandler(createFoodController));
router.put("/:foodId", authorize("admin"), validate(updateFoodSchema), asyncHandler(updateFoodController));
router.delete("/:foodId", authorize("admin"), asyncHandler(deleteFoodController));

export default router;