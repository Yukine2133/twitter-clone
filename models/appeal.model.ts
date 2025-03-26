import mongoose, { Schema } from "mongoose";

const appealSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    banReason: { type: String, required: true },
    text: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Appeal =
  mongoose.models.Appeals || mongoose.model("Appeals", appealSchema);
