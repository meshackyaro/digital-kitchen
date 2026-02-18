import mongoose from "mongoose";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[0-9]{10}$/;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            match: [emailRegex, "Invalid email address"],
            sparce: true
        },

        phone: {
            type: String,
            unique: true,
            match: [phoneRegex, "Invalid phone number"],
            sparce: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
    },
    {
        timestamps: true
    }
);

userSchema.pre("validate", function () {
  if (!this.email && !this.phone) {
    throw new Error("Either email or phone is required");
  }
});


export const User = mongoose.model("User", userSchema);