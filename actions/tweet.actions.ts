"use server";

import { connectDb } from "../utils/connectDb";
import { Tweet } from "../models/tweet.model";

import { revalidatePath } from "next/cache";
import { ITweet } from "@/interfaces/tweet.interface";
import { Retweet } from "@/models/retweet.model";
import { fetchUser } from "./user.actions";
import { Notification } from "@/models/notification.model";
import { Like } from "@/models/like.model";
import { Reply } from "@/models/reply.model";
import { Bookmark } from "@/models/bookmark.model";
import { parseJSON } from "@/utils/parseJSON";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@/models/user.model";
import { containsBadWords } from "@/utils/containsBadWords";

export const createTweet = async (formData: FormData) => {
  try {
    await connectDb();
    const user = await currentUser();
    const userId = user?.id;

    const fetchedUser = await fetchUser(userId);

    const text = formData.get("text");
    const images = formData.getAll("images");
    const videos = formData.getAll("videos");

    if (containsBadWords(text as string)) {
      return {
        error:
          "Your tweet contains inappropriate language and cannot be posted.",
      };
    }

    if (!user) {
      return { error: "You need to be logged in to tweet." };
    }

    const tweet = await Tweet.create({
      userId: userId,
      text,
      images,
      videos,
      user: fetchedUser._id,
    });
    const plainTweet = {
      ...tweet.toObject(),
      _id: tweet._id.toString(),
      user: tweet.user.toString(),
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

    const tweets = await Tweet.find()
      .populate({
        path: "user",
        match: { isBanned: false }, // Exclude tweets where the user is banned
      })
      .sort({ createdAt: -1 });

    // Remove tweets where the user was null (banned users)
    const filteredTweets = tweets.filter((tweet) => tweet.user !== null);

    return parseJSON(filteredTweets);
  } catch (error) {
    console.error(error);
  }
};

export const fetchTweet = async (tweetId: string) => {
  try {
    await connectDb();

    const tweet = await Tweet.findById(tweetId).populate("replies", "likes");

    const { _id, userId }: ITweet = tweet;

    const tweetData = {
      ...tweet.toObject(),
      _id: _id.toString(),
      userId: userId.toString(),
    };

    return parseJSON(tweetData);
  } catch (error) {
    console.error(error);
  }
};

export const deleteTweet = async (id: string) => {
  try {
    await connectDb();

    const user = await currentUser();

    if (!user) {
      return { message: "You need to be logged in to update tweet." };
    }

    const tweet = await Tweet.findByIdAndDelete(id);
    await Retweet.deleteMany({ tweetId: id });
    await Notification.deleteMany({ tweetId: id });
    await Like.deleteMany({ tweetId: id });
    await Reply.deleteMany({ tweetId: id });
    await Bookmark.deleteMany({ tweetId: id });

    if (!tweet) return { message: "Tweet not found." };

    const currentDbUser = await User.findOne({ userId: user.id });

    if (tweet.userId != user?.id && !currentDbUser.isAdmin) {
      return { message: "You cannot delete someone else's tweet." };
    }
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};

export const updateTweet = async (
  id: string,
  text: string,
  images?: string[],
  videos?: string[]
) => {
  try {
    await connectDb();
    const user = await currentUser();

    if (!user) {
      return { message: "You need to be logged in to update tweet." };
    }
    const existingTweet = await Tweet.findById(id);
    const currentDbUser = await User.findOne({ userId: user.id });

    if (existingTweet.userId != user?.id && !currentDbUser.isAdmin) {
      return { message: "You cannot edit someone else's tweet." };
    }

    if (!existingTweet) return { message: "This tweet does not exist." };

    existingTweet.text = text;
    existingTweet.images = images;
    existingTweet.videos = videos;

    await existingTweet.save();
    revalidatePath(`/`);
  } catch (error) {
    console.error(error);
  }
};

export const searchTweets = async (
  q: string | null,
  hashtag: boolean = false
) => {
  try {
    await connectDb();
    let regex;
    if (hashtag) {
      regex = new RegExp(`\\B#${q || ""}\\b`, "i");
    } else {
      regex = new RegExp(q || "", "i");
    }

    const tweets = await Tweet.find({
      text: { $regex: regex },
    }).populate("user");

    return parseJSON(tweets);
  } catch (error) {
    console.error(error);
  }
};

export const fetchPopularHashtags = async () => {
  try {
    const hashtags = await Tweet.aggregate([
      {
        $match: { text: { $regex: /#/ } }, // Match tweets containing hashtags
      },
      {
        $project: {
          hashtags: {
            $filter: {
              input: { $split: ["$text", " "] }, // Split text into words
              as: "word",
              cond: { $regexMatch: { input: "$$word", regex: /^#/ } }, // Keep only hashtags
            },
          },
        },
      },
      { $unwind: "$hashtags" }, // Unwind hashtags array into individual documents
      {
        $group: {
          _id: "$hashtags",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]);

    return hashtags;
  } catch (error) {
    console.error("Error fetching popular hashtags:", error);
    throw new Error("Failed to fetch popular hashtags.");
  }
};
