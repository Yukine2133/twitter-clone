import mongoose, { Schema, Document } from "mongoose";

const messageSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define and export the message model
export const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
