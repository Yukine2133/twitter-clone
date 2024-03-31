import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Tweet =
  mongoose.models.Tweets || mongoose.model("Tweets", tweetSchema);
