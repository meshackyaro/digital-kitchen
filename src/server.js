import express from "express";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

export const startServer = async () => {
    const app = express();
    await connectDB();
    app.listen(env.PORT, () => {
        console.log(`           Server is running on port ${env.PORT}`);
    });
};

startServer();