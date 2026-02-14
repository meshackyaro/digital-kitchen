 import { verifyToken } from "../utils/jwt.js";

export const protect = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) 
        res.status(401).json({message: "Unauthorized"});

    const token = authHeader.split(" ")[1];

    try {

        const decoded = verifyToken;
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({
            status: "ERROR",
            message: "Token Invalid or Expired"
        });        
    }
};
