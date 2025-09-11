import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, server is running!");
});

const startServer = async () => {
    await connectDB(process.env.DB_URI);

    app.listen(PORT, () => {
        console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
};

startServer();
