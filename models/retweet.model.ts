import mongoose from "mongoose";

const retweetSchema = new mongoose.Schema(
  {
    userId: { type: String },
    tweetId: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
  },
  { timestamps: true }
);

export const Retweet =
  mongoose.models.Retweet || mongoose.model("Retweet", retweetSchema);
