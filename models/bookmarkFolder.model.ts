import mongoose from "mongoose";

const bookmarkFolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bookmark",
    },
  ],
});

export const BookmarkFolder =
  mongoose.models.BookmarkFolder ||
  mongoose.model("BookmarkFolder", bookmarkFolderSchema);
