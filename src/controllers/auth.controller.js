import { registerUserService } from "../services/auth.services.js";

export const registerController = async (req, res, next) => {
    console.log("req.body in controller:", req.body);

    const user = await registerUserService(req.body);

    res.status(200).json({
        status: "SUCCESS",
        message: "User registered successfully",
        data: user,
    });
};