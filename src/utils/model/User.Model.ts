import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // prevent duplicate usernames
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "teacher", "student"], // restrict values
        default: "student", // default role
        required: true
    }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
