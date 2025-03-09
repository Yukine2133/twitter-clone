import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
  userId: String,
  messages: [
    {
      role: String,
      content: String,
    },
  ],
});

export const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
