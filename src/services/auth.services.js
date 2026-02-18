import { User } from "../models.js";
import bcrypt from "bcrypt";

export const registerUserService = async (identifier, password) => {

    const { type, value } = identifier;

    const existingUser = await User.findOne({ [type]: value });

    if (existingUser) throw new AppError("User already exists", 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        [type]: value,
        password: hashedPassword,
    }

    const newUser = await User.create(user);

    return {
        id: newUser._id,
        identifier: newUser[type],
    }
};