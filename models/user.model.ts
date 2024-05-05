import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    displayName: String,
    bio: String,
    location: String,
    avatar: String,
    backgroundImage: String,
    userId: String,
    followers: [{ type: String }],
    following: [{ type: String }],
  },
  { timestamps: true }
);

export const User =
  mongoose.models.Users || mongoose.model("Users", userSchema);
