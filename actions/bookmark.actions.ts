"use server";

import { connectDb } from "../utils/connectDb";
import { Tweet } from "../models/tweet.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

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

    const userIndex = existingTweet.bookmarks.indexOf(user.id);

    if (userIndex !== -1) {
      // If the user has already bookmarked the tweet, remove their bookmark
      existingTweet.bookmarks.splice(userIndex, 1);
    } else {
      // If the user has not bookmarked the tweet, add their bookmark
      existingTweet.bookmarks.push(user.id);
    }

    await existingTweet.save();
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};

export const getUserBookmarks = async (userId: string) => {
  try {
    await connectDb();
    const userBookmarks = await Tweet.find({ bookmarks: userId });

    if (!userBookmarks) {
      return null;
    }

    return userBookmarks;
  } catch (error) {
    console.error(error);
  }
};
