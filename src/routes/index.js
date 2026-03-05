import { Router } from "express";
import authRouter from "./auth.routes.js";
import cartRouter from "./cart.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/cart", cartRouter);
router.use("/food", foodRouter);

export default router;