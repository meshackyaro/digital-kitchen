import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { AppError } from "../utils/appError.js";

export const registerUserService = async (data) => {

    const { identifier, password } = data;

    const { type, value} = identifier;

    console.log("Identifier received:", identifier);
    console.log("Password received:", password);


    const existingUser = await User.findOne({ [type]: value });

    if (existingUser) throw new AppError("User already exists", 400);

    if (!password) throw new AppError("Password is required", 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);
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

// export const registerUserService = async (data) => {

//     console.log("Service received data:", data);

//     if (!data) {
//         throw new Error("No data received in service");
//     }

//     const { identifier, password } = data;

//     console.log("Identifier in service:", identifier);
//     console.log("Password in service:", password);

//     if (!password) {
//         throw new Error("Password is required");
//     }

//     const { type, value } = identifier;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     return { success: true };
// };
