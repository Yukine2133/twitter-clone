"use server";

import { connectDb } from "../utils/connectDb";
import { Tweet } from "../models/tweet.model";
import { revalidatePath } from "next/cache";
import { Reply } from "@/models/reply.model";
import { createNotification } from "./notification.actions";
import { parseJSON } from "@/utils/parseJSON";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@/models/user.model";
import { containsBadWords } from "@/utils/containsBadWords";

export const replyTweet = async (formData: FormData, tweetId: string) => {
  try {
    await connectDb();
    const user = await currentUser();

    const existingTweet = await Tweet.findById(tweetId);
    if (existingTweet) {
      await createNotification(
        "reply",
        user?.id,
        existingTweet.userId,
        tweetId
      );
    }

    const text = formData.get("text");
    const images = formData.getAll("images");
    const videos = formData.getAll("videos");

    if (containsBadWords(text as string)) {
      return {
        error:
          "Your reply contains inappropriate language and cannot be posted.",
      };
    }

    if (!existingTweet) {
      return { error: "Tweet not found" };
    }

    if (!user) {
      return { error: "You need to be logged in to reply." };
    }

    // Create a new reply instance
    const reply = new Reply({
      tweetId: tweetId,
      userId: user.id,
      text: text,
      images,
      videos,
    });

    await reply.save();

    // Add the reply reference to the tweet
    existingTweet.replies = existingTweet.replies || [];
    existingTweet.replies.push(reply._id);
    await existingTweet.save();

    revalidatePath(`/tweet/${tweetId}`);
    revalidatePath(`/`);

    return { message: "Reply was created" };
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred." };
  }
};

export const fetchTweetReplies = async (tweetId: string) => {
  try {
    await connectDb();

    const replies = await Reply.find({ tweetId }).sort({ createdAt: -1 }); // sort in the descending order

    return parseJSON(replies);
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred." };
  }
};

export const deleteReply = async (tweetId: string, replyId: string) => {
  try {
    await connectDb();
    const user = await currentUser();

    if (!user) {
      return { message: "You need to be logged in to delete the reply" };
    }

    const reply = await Reply.findByIdAndDelete(replyId);
    if (!reply) {
      throw new Error("Reply not found.");
    }

    // Remove the reference to the deleted reply from the associated tweet
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      throw new Error("Tweet not found.");
    }
    const replyIndex = tweet.replies.indexOf(replyId);
    if (replyIndex !== -1) {
      tweet.replies.splice(replyIndex, 1);
    }
    await tweet.save();

    revalidatePath(`/tweet/${tweetId}`);
  } catch (error) {
    console.error(error);
  }
};

export const editReply = async (
  replyId: string,
  tweetId: string,
  text: string,
  images: string[]
) => {
  try {
    await connectDb();
    const user = await currentUser();

    if (!user) {
      return { message: "You need to be logged in to edit the reply" };
    }

    const reply = await Reply.findById(replyId);
    const currentDbUser = await User.findOne({ userId: user.id });

    if (reply.userId != user?.id && !currentDbUser.isAdmin) {
      return { message: "You cannot edit someone else's tweet." };
    }

    if (!reply) return { message: "This reply does not exist." };

    reply.text = text;
    reply.images = images;

    await reply.save();
    revalidatePath(`/tweet/${tweetId}`);
  } catch (error) {
    console.error(error);
  }
};
