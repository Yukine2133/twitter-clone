import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  avatar: String,
  userId: String,
});

export const User =
  mongoose.models.Users || mongoose.model("Users", userSchema);
