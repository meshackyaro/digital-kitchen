import { Router } from "express";
import authRouter from "./auth.routes.js";
import cartRouter from "./cart.routes.js";
import foodRouter from "./food.routes.js";
import orderRouter from "./order.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/cart", cartRouter);
router.use("/food", foodRouter);
router.use("/orders", orderRouter);

export default router;