import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    imagePath: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNum: {
        type: String,
        required: true,
        unique: true, 
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, { timestamps: true, versionKey: false });

export default mongoose.model("User", userSchema);

