import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    tweetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
      required: true,
    },
    userId: { type: String },
    text: { type: String },
    image: { type: String },
    video: { type: String },
  },
  { timestamps: true }
);

export const Reply =
  mongoose.models.Reply || mongoose.model("Reply", replySchema);
