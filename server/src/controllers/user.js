import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

// 📍 Lấy thông tin người dùng hiện tại từ JWT token
export const getUserProfile = async (req, res) => {
    try {
        console.log(">>> Authorization header:", req.headers.authorization);
        // 🔐 Lấy token từ header
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Thiếu token xác thực" });
        }

        // 🧠 Giải mã token để lấy user id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // 🔍 Tìm user trong DB
        const user = await User.findById(userId).select("name picture");

        if (!user) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
};
