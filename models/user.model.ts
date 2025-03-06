import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    onboarded: { type: Boolean, default: false },
    bio: String,
    location: String,
    avatar: String,
    backgroundImage: String,
    userId: String,
    followers: [{ type: String }],
    following: [{ type: String }],
    private: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.Users || mongoose.model("Users", userSchema);
