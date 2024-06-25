import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet",
  },
  userId: {
    type: String,
  },
});

export const Bookmark =
  mongoose.models.Bookmark || mongoose.model("Bookmark", bookmarkSchema);
