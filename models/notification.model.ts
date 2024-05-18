import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  userId: {
    type: String,
    required: true,
  },
  affectedUserId: {
    type: String,
    required: true,
  },
  tweetId: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
