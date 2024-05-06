"use server";

import { Retweet } from "@/models/retweet.model";
import { Tweet } from "@/models/tweet.model";
import { connectDb } from "@/utils/connectDb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export const saveRetweet = async (tweetId: string) => {
  try {
    await connectDb();

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const existingRetweet = await Retweet.findOne({
      userId: user?.id,
      tweetId: tweetId,
    });

    const tweetToUpdate = await Tweet.findById(tweetId);

    if (!tweetToUpdate) {
      return { message: "Tweet doesn't exist." };
    }

    if (existingRetweet) {
      // Remove the retweet and update tweet's retweet count
      await existingRetweet.deleteOne();
      tweetToUpdate.retweets.pull(existingRetweet._id);
    } else {
      // Add the retweet and update tweet's retweet count
      const retweet = new Retweet({
        userId: user?.id,
        tweetId: tweetId,
      });

      await retweet.save();
      tweetToUpdate.retweets.push(retweet._id);
    }

    await tweetToUpdate.save();

    revalidatePath("/");
  } catch (error) {
    throw new Error("Error saving retweet.");
  }
};

export const fetchUserRetweets = async () => {
  try {
    await connectDb();

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // Find retweets by user ID
    const retweets = await Retweet.find({ userId: user?.id })
      .populate("tweetId")
      .sort({ createdAt: -1 });

    return retweets.map((retweet) => retweet.tweetId);
  } catch (error) {
    throw new Error("Error while fetching user retweets: ");
  }
};

export const fetchRetweetsForTweet = async (tweetId: string) => {
  try {
    await connectDb();

    // Find all retweets for the given tweet ID
    const retweets = await Retweet.find({ tweetId });

    return retweets;
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred." };
  }
};
