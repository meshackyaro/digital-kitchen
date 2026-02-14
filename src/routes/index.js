import { Router } from "express";
import userRouter from "./user.routes.js";
import authRouter from "./auth.routes.js";
import adminRouter from "./admin.routes.js";

const router =  Router();

router.use("/users",userRouter);
router.use("/auth", authRouter);
router.use("/admin", adminRouter);

export default router;