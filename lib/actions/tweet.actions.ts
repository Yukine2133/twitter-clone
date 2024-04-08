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
  bookmarks: string[];
  likes: string[];
  replies: string[];
  createdAt: Date;
  updatedAt: Date;
}
export const fetchTweet = async (tweetId: string) => {
  try {
    await connectDb();

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return null;
    }

    const {
      _id,
      text,
      userId,
      bookmarks,
      likes,
      replies,
      createdAt,
      updatedAt,
    }: TweetProps = tweet;

    const tweetData = {
      _id: _id.toString(),
      text,
      userId: userId.toString(),
      bookmarks,
      likes,
      replies: JSON.parse(JSON.stringify(replies)),
      createdAt,
      updatedAt,
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

export const updateTweet = async (id: string, text: string) => {
  try {
    await connectDb();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const existingTweet = await Tweet.findById(id);

    if (existingTweet.userId != user?.id) {
      return null;
    }

    if (!existingTweet) return null;

    existingTweet.text = text;

    await existingTweet.save();
    revalidatePath(`/`);
  } catch (error) {
    return { message: "Failed to update the tweet", error };
  }
};

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
    console.error("Error bookmarking tweet:", error);
    return { message: "Failed to bookmark the tweet" };
  }
};

export const getUserBookmarks = async (userId: string) => {
  try {
    const userBookmarks = await Tweet.find({ bookmarks: userId });

    if (!userBookmarks) {
      return null;
    }

    return userBookmarks;
  } catch (error) {
    console.error("Error fetching user bookmarks:", error);
    throw error;
  }
};

export const likeTweet = async (id: string) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { message: "You need to be logged in to like" };
    }

    await connectDb();

    const existingTweet = await Tweet.findById(id);

    if (!existingTweet) {
      return { message: "Tweet not found" };
    }

    const userIndex = existingTweet.likes.indexOf(user.id);

    if (userIndex !== -1) {
      // If the user has already bookmarked the tweet, remove their bookmark
      existingTweet.likes.splice(userIndex, 1);
    } else {
      // If the user has not bookmarked the tweet, add their bookmark
      existingTweet.likes.push(user.id);
    }

    await existingTweet.save();
    revalidatePath("/");
  } catch (error) {
    console.error("Error liking tweet:", error);
    return { message: "Failed to liking the tweet" };
  }
};

export const replyTweet = async (formData: FormData, tweetId: string) => {
  const currentDate = new Date();

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  } as const;

  const formattedDate = currentDate.toLocaleString("en-US", options);

  try {
    const { getUser } = getKindeServerSession();
    await connectDb();
    const user = await getUser();

    const existingTweet = await Tweet.findById(tweetId);

    const text = formData.get("text");

    if (!existingTweet) {
      return { message: "Tweet not found" };
    }

    if (!user) {
      return { message: "You need to be authenticated to reply.." };
    }

    existingTweet.replies = existingTweet.replies || [];
    existingTweet.replies.push({
      user: user?.id,
      text: text,
      timestamp: formattedDate,
    });

    await existingTweet.save();
    revalidatePath(`/tweet/${tweetId}`);
    revalidatePath(`/`);
  } catch (error) {
    return { message: "Error adding reply to tweet" };
  }
};

export const deleteReply = async (tweetId: string, replyId: string) => {
  try {
    await connectDb();
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      throw new Error("Tweet not found");
    }

    // Find the index of the reply to be deleted
    const replyIndex = tweet.replies.findIndex(
      (reply: any) => reply._id.toString() === replyId
    );

    if (replyIndex === -1) {
      throw new Error("Reply not found");
    }

    tweet.replies.splice(replyIndex, 1);

    await tweet.save();
    revalidatePath(`/tweet/${tweetId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editReply = async (
  tweetId: string,
  text: string,
  replyId: string
) => {
  try {
    await connectDb();
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      throw new Error("Tweet not found");
    }

    const replyIndex = tweet.replies.findIndex(
      (reply: any) => reply._id.toString() === replyId
    );

    if (replyIndex === -1) {
      throw new Error("Reply not found");
    }

    tweet.replies[replyIndex].text = text;

    await tweet.save();
    revalidatePath(`/tweet/${tweetId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
