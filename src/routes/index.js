import { Router } from "express";
import authRouter from "./auth.routes.js";

const router = Router();

router.use("/auth", authRouter);
console.log("Index router loaded");

export default router;