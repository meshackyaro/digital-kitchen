import express from "express";
import routes from "./routes/index.js";
import { requestLogger } from "./middleware/logger.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

export const app = express();

app.use(express.json());

app.use(requestLogger);

app.use("/api", routes);

app.use(errorHandler);