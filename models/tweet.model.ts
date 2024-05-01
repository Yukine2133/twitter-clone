import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    text: { type: String },
    image: { type: String },
    video: { type: String },
    userId: { type: String, required: true },
    bookmarks: [{ type: String }],
    likes: [{ type: String }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
  },
  {
    timestamps: true,
  }
);

export const Tweet =
  mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);
