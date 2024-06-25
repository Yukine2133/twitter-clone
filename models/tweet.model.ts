import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    text: { type: String },
    image: { type: String },
    video: { type: String },
    userId: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
    retweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Retweet" }],
  },
  {
    timestamps: true,
  }
);

export const Tweet =
  mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);
