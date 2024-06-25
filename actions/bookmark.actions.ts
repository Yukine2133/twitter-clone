"use server";

import { connectDb } from "../utils/connectDb";
import { Tweet } from "../models/tweet.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { Bookmark } from "@/models/bookmark.model";

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
    } else {
      // If the user has not bookmarked the tweet, add their bookmark
      await Bookmark.create({ tweetId: id, userId: user.id });
    }

    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};

export const getUserBookmarks = async (userId: string) => {
  try {
    await connectDb();
    const userBookmarks = await Bookmark.find({ userId })
      .sort({ createdAt: -1 })
      .populate("tweetId");

    if (!userBookmarks) {
      return null;
    }

    return userBookmarks.map((bookmark) => bookmark.tweetId);
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
    return { error: "An unexpected error occurred." };
  }
};
