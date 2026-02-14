import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT || 8000,
    MONGODB_URI: process.env.MONGODB_URI,
};