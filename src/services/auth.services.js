import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { AppError } from "../utils/appError.js";
import { generateToken } from "../utils/jwt.js";

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

export const login = async (data) => {
  
    const { identifier, password } = data;

    const { type, value } = identifier;

    const user = await User.findOne({ [type]: value});

    if (!user) throw new AppError("Invalid username or password", 401);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new AppError("Invalid email or phone number");

    const token = generateToken(user.id);

    return {
        id: user._id,
        token, 
    };
};