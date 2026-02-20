import mongoose from "mongoose";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\+?\d{10,15}$/;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            match: [emailRegex, "Invalid email address"],
            sparse: true
        },

        phone: {
            type: String,
            unique: true,
            match: [phoneRegex, "Invalid phone number"],
            sparse: true
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