import { registerUserService } from "../services/auth.services.js";
import { registerSchema } from "../validators/auth.validators.js";

export const registerController = async (req, res, next) => {

    const data = registerSchema.parse(req.body);

    const user = registerUserService(data);

    res.status(200).json({
        status: "SUCCESS",
        message: "User registered successfully",
        data: user,
    });
    
};