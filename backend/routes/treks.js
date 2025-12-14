import express from "express";
import { Trek } from "../models/Trek.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Get all treks with pagination
router.get("/", async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1;
    const limit = 6;

    const result = await Trek.find({})
      .limit(limit)
      .skip((page - 1) * limit);

    res
      .status(200)
      .json({ message: "Trek list fetched successfully", treks: result });
  } catch (error) {
    console.error("Get treks error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get single trek
router.get("/:id", async (req, res) => {
  try {
    const trek = await Trek.findById(req.params.id);

    if (!trek) {
      return res.status(404).json({ error: "Trek not found" });
    }

    res
      .status(200)
      .json({
        message: "Trek fetched successfully",
        trek,
        userId: trek.userId,
      });
  } catch (error) {
    console.error("Get trek error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create trek (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, location, difficulty, price, images, description } = req.body;

    // Validation
    if (!name || !location || !difficulty || !price) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const trek = await Trek.create({
      name,
      location,
      difficulty,
      price: Number.parseFloat(price),
      images: images || [],
      description,
      userId: req.user.userId,
    });

    res.status(201).json({
      message: "Trek created successfully",
      trek: trek,
    });
  } catch (error) {
    console.error("Create trek error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update trek (protected)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, location, difficulty, price, images, description } = req.body;

    const existingTrek = await Trek.findById(req.params.id);
    if (!existingTrek) {
      return res.status(404).json({ error: "Trek not found" });
    }

    // Check ownership
    if (existingTrek.userId && existingTrek.userId !== req.user.userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this trek" });
    }

    const updateData = {
      name,
      location,
      difficulty,
      price: Number.parseFloat(price),
      images,
      description,
    };

    const trek = await Trek.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json({
      message: "Trek updated successfully",
      trek,
    });
  } catch (error) {
    console.error("Update trek error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete trek (protected)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const existingTrek = await Trek.findById(req.params.id);
    if (!existingTrek) {
      return res.status(404).json({ error: "Trek not found" });
    }

    // Check ownership
    if (existingTrek.userId && existingTrek.userId !== req.user.userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this trek" });
    }

    await Trek.deleteOne({ _id: req.params.id });

    res.json({ message: "Trek deleted successfully" });
  } catch (error) {
    console.error("Delete trek error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
