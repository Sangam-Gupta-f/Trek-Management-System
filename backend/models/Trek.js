import mongoose from "mongoose";

const trekSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Hard"],
      required: true,
    },
    price: { type: Number, required: true },
    images: [{ type: String }],
    description: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Trek = mongoose.model("Trek", trekSchema);
