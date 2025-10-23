// // import { OAuth2Client } from "google-auth-library";
// // import User from "../model/user.js";

// // const client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

// // /**
// //  * Step 1: Generate Google Auth URL
// //  */
// // export const getGoogleAuthURL = async (req, res) => {
// //     try {
// //         const redirectURL = "http://localhost:3000/auth/google/callback";

// //         const authorizeUrl = client.generateAuthUrl({
// //             access_type: "offline",
// //             prompt: "consent",
// //             scope: [
// //                 "openid",
// //                 "profile",
// //                 "email"
// //             ],
// //             redirect_uri: redirectURL,
// //         });

// //         res.json({ url: authorizeUrl });
// //     } catch (err) {
// //         console.error("Error generating Google Auth URL", err);
// //         res.status(500).json({ error: "Internal server error" });
// //     }
// // };

// // /**
// //  * Step 2: Handle Google OAuth callback
// //  */
// // export const googleCallback = async (req, res) => {
// //     try {
// //         const code = req.query.code;
// //         const redirectURL = "http://localhost:3000/auth/google/callback";

// //         const { tokens } = await client.getToken({
// //             code,
// //             redirect_uri: redirectURL,
// //         });

// //         client.setCredentials(tokens);

// //         // Lấy thông tin user từ Google
// //         const response = await fetch(
// //             `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
// //         );
// //         const profile = await response.json();

// //         console.log("Google Profile:", profile);

// //         // Tìm user trong DB hoặc tạo mới
// //         let user = await User.findOne({ googleId: profile.sub });
// //         if (!user) {
// //             user = await User.create({
// //                 googleId: profile.sub,
// //                 name: profile.name,
// //                 email: profile.email,
// //                 picture: profile.picture,
// //             });
// //         }

// //         // 👉 Ở đây bạn có thể generate JWT để trả về client nếu cần
// //         // const token = generateToken(user);

// //         res.redirect("http://localhost:5173/"); // redirect về client sau khi login
// //     } catch (err) {
// //         console.error("Error in Google OAuth callback", err);
// //         res.status(500).json({ error: "Authentication failed" });
// //     }
// // };

// import jwt from "jsonwebtoken";
// import User from "../models/user.js";
// import client from "../config/googleClient.js";

// export const getGoogleAuthURL = (req, res) => {
//   const authorizeUrl = client.generateAuthUrl({
//     access_type: "offline",
//     scope: ["openid", "profile", "email"],
//   });
//   res.redirect(authorizeUrl);
// };

// export const googleCallback = async (req, res) => {
//   try {
//     const code = req.query.code;

//     const { tokens } = await client.getToken(code);
//     client.setCredentials(tokens);

//     const ticket = await client.verifyIdToken({
//       idToken: tokens.id_token,
//       audience: process.env.CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     const { sub: providerId, email, name, picture } = payload;

//     let user = await User.findOne({ provider: "google", providerId });
//     if (!user) {
//       user = await User.create({
//         provider: "google",
//         providerId,
//         email,
//         name,
//         picture,
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     //   res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
//     // } catch (err) {
//     //   console.error(err);
//     //   res.status(500).json({ error: "Google login failed" });
//     // }

//     res.redirect(`${process.env.CLIENT_URL}`);
//   } catch (error) {
//     console.error("Google login error:", error);
//     res.redirect(`${process.env.CLIENT_URL}/login?error=true`);
//   }
// };

import jwt from "jsonwebtoken";
import User from "../models/user.js";
import client from "../config/googleClient.js";

export const getGoogleAuthURL = (req, res) => {
  const authorizeUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: ["openid", "profile", "email"],
  });
  res.redirect(authorizeUrl);
};

export const googleCallback = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).json({ message: "Thiếu mã code từ Google" });

    // 🔹 Lấy token từ Google
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    // 🔹 Xác thực và lấy thông tin người dùng
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: providerId, email, name, picture } = payload;

    // 🔍 Kiểm tra xem user này đã tồn tại chưa
    let user = await User.findOne({ provider: "google", providerId });

    if (!user) {
      try {
        user = await User.create({
          provider: "google",
          providerId,
          email,
          name,
          picture,
        });
      } catch (err) {
        // Nếu lỗi trùng provider + providerId
        if (err.code === 11000) {
          return res.status(400).json({ message: "Tài khoản Google đã tồn tại!" });
        }
        throw err;
      }
    }

    // 🧠 Tạo JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Redirect về client kèm token
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  } catch (error) {
    console.error("Google login error:", error);
    res.redirect(`${process.env.CLIENT_URL}/login?error=true`);
  }
};
