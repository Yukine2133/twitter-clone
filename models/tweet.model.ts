import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    text: { type: String },
    image: { type: String },
    video: { type: String },
    userId: { type: String, required: true },
    bookmarks: [{ type: String }],
    likes: [{ type: String }],
    replies: [
      {
        user: String,
        text: String,
        image: String,
        video: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Tweet =
  mongoose.models.Tweets || mongoose.model("Tweets", tweetSchema);
