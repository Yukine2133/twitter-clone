import mongoose, { Schema } from "mongoose";

const messageSchema: Schema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    recipient: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    content: { type: String },
    image: { type: String },
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
