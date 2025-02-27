"use server";

import { connectDb } from "../utils/connectDb";
import { Tweet } from "../models/tweet.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { Bookmark } from "@/models/bookmark.model";
import { BookmarkFolder } from "@/models/bookmarkFolder.model";
import { parseJSON } from "@/utils/parseJSON";

export const bookMarkTweet = async (id: string) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { message: "You need to be logged in to bookmark" };
    }

    await connectDb();

    const existingTweet = await Tweet.findById(id);

    if (!existingTweet) {
      return { message: "Tweet not found" };
    }

    const existingBookmark = await Bookmark.findOne({
      tweetId: id,
      userId: user.id,
    });

    if (existingBookmark) {
      // If the user has already bookmarked the tweet, remove their bookmark
      await Bookmark.deleteOne({ _id: existingBookmark._id });
      const bookmarkFolder = await BookmarkFolder.findOne({ userId: user.id });
      if (bookmarkFolder) {
        bookmarkFolder.bookmarks.pull(existingBookmark._id);
        await bookmarkFolder.save();
      }
    } else {
      // If the user has not bookmarked the tweet, add their bookmark
      await Bookmark.create({ tweetId: id, userId: user.id });
    }

    // revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};

export const getUserBookmarks = async (userId: string) => {
  try {
    await connectDb();
    const userBookmarks = await Bookmark.find({ userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "tweetId",
        populate: {
          path: "user",
          model: "Users",
        },
      });

    if (!userBookmarks) {
      return null;
    }

    return parseJSON(userBookmarks.map((bookmark) => bookmark.tweetId));
  } catch (error) {
    console.error(error);
  }
};

export const fetchBookmarksForTweet = async (tweetId: string) => {
  try {
    await connectDb();

    // Find all bookmarks for the given tweet ID
    const bookmarks = await Bookmark.find({ tweetId });

    return bookmarks;
  } catch (error) {
    console.error(error);
    // return { error: "An unexpected error occurred." };
  }
};

export const addBookmarkFolder = async (name: string) => {
  try {
    await connectDb();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;
    await BookmarkFolder.create({
      name,
      userId,
    });
    revalidatePath("/bookmarks");
  } catch (error) {
    console.error(error);
  }
};

export const getUserBookmarkFolders = async (userId: string) => {
  try {
    await connectDb();

    const folders = await BookmarkFolder.find({ userId });
    return parseJSON(folders);
  } catch (error) {
    console.error(error);
  }
};

export const addBookmarkToFolder = async (
  folderId: string,
  tweetId: string,
  userId: string
) => {
  try {
    await connectDb();
    const bookmark: any = await Bookmark.findOne({ tweetId, userId });

    const folder = await BookmarkFolder.findById(folderId);

    folder.bookmarks.push(bookmark._id);
    await folder.save();
    revalidatePath("/bookmarks");
  } catch (error) {
    console.error(error);
  }
};

export const getBookmarksFromFolder = async (name: string) => {
  try {
    await connectDb();

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const bookmarksFromFolder = await BookmarkFolder.find({
      userId: user?.id,
      name,
    }).populate({
      path: "bookmarks",
      populate: {
        path: "tweetId",
        model: "Tweet",
        populate: {
          path: "user",
          model: "Users",
        },
      },
    });
    return parseJSON(bookmarksFromFolder);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteBookmarkFolder = async (name: string) => {
  try {
    await connectDb();
    await BookmarkFolder.deleteOne({ name });
    revalidatePath("/bookmarks");
  } catch (error) {
    console.error;
    throw error;
  }
};

export const editBookmarkFolder = async (folderName: string, name: string) => {
  try {
    await connectDb();
    const folder = await BookmarkFolder.findOne({ name: folderName });

    console.log(folder);

    folder.name = name;
    await folder.save();
    revalidatePath(`/bookmarks/${name}`);
  } catch (error) {
    console.error;
    throw error;
  }
};
