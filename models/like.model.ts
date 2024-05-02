import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet",
  },
  userId: {
    type: String,
  },
});

export const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);
