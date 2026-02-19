import { login, registerUserService } from "../services/auth.services.js";

export const registerController = async (req, res, next) => {

    const user = await registerUserService(req.body);

    res.status(201).json({
        status: "SUCCESS",
        message: "User registered successfully",
        data: user,
    });
};

export const loginController = async (req, res, next) => {

    const user = await login(req.body);

    res.status(200).json({
        status: "SUCCESS",
        message: "User logged in successfully",
        data: user,
    });
}