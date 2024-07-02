"use server";

import { connectDb } from "../utils/connectDb";
import { Tweet } from "../models/tweet.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { Like } from "@/models/like.model";
import { createNotification } from "./notification.actions";

export const likeTweet = async (id: string) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { message: "You need to be logged in to like a tweet." };
    }

    await connectDb();

    const existingTweet = await Tweet.findById(id);

    if (existingTweet) {
      await createNotification("like", user.id, existingTweet.userId, id);
    }

    if (!existingTweet) {
      return { message: "Tweet not found." };
    }

    // Check if the user has already liked the tweet
    const existingLike = await Like.findOne({
      tweetId: id,
      userId: user.id,
    });

    if (existingLike) {
      // If the user has already liked the tweet, remove their like
      await existingLike.deleteOne();
      existingTweet.likes.pull(existingLike._id);
    } else {
      // If the user has not liked the tweet, add their like
      const newLike = new Like({ tweetId: id, userId: user.id });
      await newLike.save();
      existingTweet.likes.push(newLike._id);
    }

    await existingTweet.save();

    // revalidatePath("/");
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred." };
  }
};

export const fetchLikesForTweet = async (tweetId: string) => {
  try {
    await connectDb();

    // Find all likes for the given tweet ID
    const likes = await Like.find({ tweetId });

    return likes;
  } catch (error) {
    console.error(error);
    // return { error: "An unexpected error occurred." };
  }
};
