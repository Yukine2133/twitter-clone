import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  displayName: String,
  avatar: String,
  userId: String,
  followers: [{ type: String }],
  following: [{ type: String }],
});

export const User =
  mongoose.models.Users || mongoose.model("Users", userSchema);
