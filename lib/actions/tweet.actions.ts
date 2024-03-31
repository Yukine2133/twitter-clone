"use server";

import { connectDb } from "../connectDb";
import { Tweet } from "../models/tweet.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export const createTweet = async (formData: FormData) => {
  try {
    await connectDb();
    const { getUser } = getKindeServerSession();

    const user = await getUser();
    const userId = user?.id;

    const text = formData.get("text");

    // Check if the userId is a valid ObjectId

    const tweet = await Tweet.create({
      userId: userId,
      text,
    });
    const plainTweet = {
      ...tweet.toObject(),
      _id: tweet._id.toString(),
    };
    revalidatePath("/");
    return plainTweet;
  } catch (error) {
    console.error(error);
    return null; // or handle the error as per your requirement
  }
};

export const fetchTweets = async () => {
  try {
    await connectDb();
    const tweets = await Tweet.find();
    return tweets;
  } catch (error) {
    console.error(error);
  }
};

interface TweetProps {
  _id: string;
  text: string;
  userId: string;
}
export const fetchTweet = async (tweetId: string) => {
  try {
    await connectDb();

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return null;
    }

    const { _id, text, userId }: TweetProps = tweet;

    const tweetData = {
      _id: _id.toString(),
      text,
      userId: userId.toString(),
    };

    return tweetData;
  } catch (error) {
    console.error("Failed to fetch tweet:", error);
    return null;
  }
};

export const deleteTweet = async (id: string) => {
  try {
    await connectDb();
    await Tweet.findByIdAndDelete(id);
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};

export const updateTweet = async (text: string, id: string) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    await connectDb();

    const existingTweet = await Tweet.findById(id);

    if (existingTweet.userId != user?.id) {
      return;
    }

    if (!existingTweet) return { message: "Tweet not found" };

    existingTweet.text = text;

    await existingTweet.save();
    revalidatePath(`/`);
    return existingTweet;
  } catch (error) {
    return { message: "Failed to update the tweet", error };
  }
};
