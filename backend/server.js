import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import trekRoutes from "./routes/treks.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/treks", trekRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Trek Planner API is running" });
});

//DB
mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
