// // import mongoose from "mongoose";

// // const userSchema = new mongoose.Schema(
// //     {
// //         googleId: {
// //             type: String,
// //             required: true,
// //             unique: true,
// //         },
// //         email: {
// //             type: String,
// //             required: true,
// //             unique: true,
// //         },
// //         name: {
// //             type: String,
// //             required: true,
// //         },
// //         picture: {
// //             type: String,
// //         },
// //         spins: {
// //             type: Number,
// //             default: 0, // Mặc định khi đăng ký chưa có lượt quay
// //         },
// //         points: {
// //             type: Number,
// //             default: 0, // Mặc định điểm là 0
// //         },
// //         // Sau này có thể thêm lịch sử quay
// //         history: [
// //             {
// //                 result: String, // ví dụ: "Jackpot", "10 points"
// //                 date: { type: Date, default: Date.now },
// //             },
// //         ],
// //     },
// //     { timestamps: true, versionKey: false }
// // );

// // export default mongoose.model("User", userSchema);
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//     {
//         provider: {
//             type: String, // "google" hoặc "facebook"
//             required: true,
//             enum: ["google", "facebook"],
//         },
//         providerId: {
//             type: String, // ID do Google/Facebook cung cấp
//             required: true,
//             unique: true,
//         },
//         email: {
//             type: String,
//             unique: true, // nhưng không required
//             sparse: true, // tránh lỗi unique khi null
//         },
//         name: {
//             type: String,
//             required: true,
//         },
//         picture: {
//             type: String,
//         },
//         spins: {
//             type: Number,
//             default: 0,
//         },
//         points: {
//             type: Number,
//             default: 0,
//         },
//         history: [
//             {
//                 result: String,
//                 date: { type: Date, default: Date.now },
//             },
//         ],
//     },
//     { timestamps: true, versionKey: false }
// );

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        provider: {
            type: String,
            enum: ["google", "facebook"],
            required: true,
        },
        providerId: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            sparse: true,
        },
        name: {
            type: String,
            required: true,
        },
        picture: String,
        spins: { type: Number, default: 0 },
        points: { type: Number, default: 0 },
        history: [
            {
                giftId: { type: mongoose.Schema.Types.ObjectId, ref: "Gift" },
                giftName: String,
                type: String, // "point" hoặc "physical"
                value: Number, // điểm hoặc giá trị quà
                date: { type: Date, default: Date.now },
                isClaimed: { type: Boolean, default: false }, // nếu là quà vật lý
            },
        ],

    },
    { timestamps: true, versionKey: false }
);

// 🔹 Tạo compound index: provider + providerId là duy nhất
userSchema.index({ provider: 1, providerId: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
