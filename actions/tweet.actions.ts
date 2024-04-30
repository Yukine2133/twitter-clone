"use server";

import { connectDb } from "../utils/connectDb";
import { Tweet } from "../models/tweet.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { ITweet } from "@/types/tweet.interface";

export const createTweet = async (formData: FormData) => {
  try {
    await connectDb();
    const { getUser } = getKindeServerSession();

    const user = await getUser();
    const userId = user?.id;

    const text = formData.get("text");
    const image = formData.get("image");
    const video = formData.get("video");

    if (!user) {
      return { error: "You need to be logged in to tweet." };
    }

    const tweet = await Tweet.create({
      userId: userId,
      text,
      image,
      video,
    });
    const plainTweet = {
      ...tweet.toObject(),
      _id: tweet._id.toString(),
    };
    revalidatePath("/");
    return plainTweet;
  } catch (error) {
    console.error(error);
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

export const fetchTweet = async (tweetId: string) => {
  try {
    await connectDb();

    const tweet = await Tweet.findById(tweetId);

    const {
      _id,
      text,
      userId,
      bookmarks,
      likes,
      replies,
      createdAt,
      updatedAt,
      image,
      video,
    }: ITweet = tweet;

    const tweetData = {
      _id: _id.toString(),
      text,
      userId: userId.toString(),
      bookmarks,
      likes,
      replies: JSON.parse(JSON.stringify(replies)),
      createdAt,
      updatedAt,
      image,
      video,
    };

    return tweetData;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTweet = async (id: string) => {
  try {
    await connectDb();

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { message: "You need to be logged in to update tweet." };
    }

    const tweet = await Tweet.findByIdAndDelete(id);

    if (!tweet) return { message: "Tweet not found." };

    if (tweet.userId != user?.id) {
      return { message: "You cannot delete someone else's tweet." };
    }
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};

export const updateTweet = async (id: string, text: string, image: string) => {
  try {
    await connectDb();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { message: "You need to be logged in to update tweet." };
    }
    const existingTweet = await Tweet.findById(id);

    if (existingTweet.userId != user?.id) {
      return { message: "You cannot edit someone else's tweet." };
    }

    if (!existingTweet) return { message: "This tweet does not exist." };

    existingTweet.text = text;
    existingTweet.image = image;

    await existingTweet.save();
    revalidatePath(`/`);
  } catch (error) {
    console.error(error);
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

export const likeTweet = async (id: string) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { message: "You need to be logged in to like a tweet." };
    }

    await connectDb();

    const existingTweet = await Tweet.findById(id);

    if (!existingTweet) {
      return { message: "Tweet not found." };
    }

    const userIndex = existingTweet.likes.indexOf(user.id);

    if (userIndex !== -1) {
      // If the user has already liked the tweet, remove their like
      existingTweet.likes.splice(userIndex, 1);
    } else {
      // If the user has not liked the tweet, add their like
      existingTweet.likes.push(user.id);
    }

    await existingTweet.save();
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};

export const replyTweet = async (formData: FormData, tweetId: string) => {
  try {
    const { getUser } = getKindeServerSession();
    await connectDb();
    const user = await getUser();

    const existingTweet = await Tweet.findById(tweetId);

    const text = formData.get("text");
    const image = formData.get("image");
    const video = formData.get("video");

    if (!existingTweet) {
      return { error: "Tweet not found" };
    }

    if (!user) {
      return { error: "You need to be logged in to reply." };
    }

    existingTweet.replies = existingTweet.replies || [];
    existingTweet.replies.push({
      user: user?.id,
      text: text,
      image,
      video,
    });

    await existingTweet.save();
    revalidatePath(`/tweet/${tweetId}`);
    revalidatePath(`/`);
    return { message: "Reply was created" };
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred." };
  }
};

export const deleteReply = async (tweetId: string, replyId: string) => {
  try {
    await connectDb();

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { message: "You need to be logged in to delete the reply" };
    }

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      throw new Error("Tweet not found.");
    }

    // Find the index of the reply to be deleted
    const replyIndex = tweet.replies.findIndex(
      (reply: any) => reply._id.toString() === replyId
    );

    const owner = tweet.replies.findIndex(
      (reply: any) => reply.user.toString() === user.id
    );
    if (owner !== -1) {
      tweet.replies.splice(replyIndex, 1);
    } else {
      return { message: "You cannot delete someone else's reply." };
    }

    await tweet.save();
    revalidatePath(`/tweet/${tweetId}`);
  } catch (error) {
    console.error(error);
  }
};

export const editReply = async (
  tweetId: string,
  text: string,
  replyId: string,
  image: string
) => {
  try {
    await connectDb();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { message: "You need to be logged in to edit the reply" };
    }

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return { message: "Tweet not found" };
    }

    const replyIndex = tweet.replies.findIndex(
      (reply: any) => reply._id.toString() === replyId
    );

    if (replyIndex === -1) {
      return { message: "Reply not found" };
    }

    const owner = tweet.replies.findIndex(
      (reply: any) => reply.user.toString() === user.id
    );
    if (owner !== -1) {
      tweet.replies[replyIndex].text = text;
      tweet.replies[replyIndex].image = image;
    } else {
      return { message: "You cannot edit someone else's reply." };
    }

    await tweet.save();
    revalidatePath(`/tweet/${tweetId}`);
  } catch (error) {
    console.error(error);
  }
};

export const searchTweets = async (q: string | null) => {
  try {
    await connectDb();
    const tweets = await Tweet.find({
      text: { $regex: new RegExp(q || "", "i") },
    });

    return tweets;
  } catch (error) {
    console.error(error);
  }
};
