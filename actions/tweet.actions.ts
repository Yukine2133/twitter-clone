"use server";

import { connectDb } from "../utils/connectDb";
import { Tweet } from "../models/tweet.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { ITweet } from "@/types/tweet.interface";
import { Reply } from "@/models/reply.model";
import { Like } from "@/models/like.model";

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

    const tweet = await Tweet.findById(tweetId).populate("replies", "likes");

    const { _id, userId }: ITweet = tweet;

    const tweetData = {
      ...tweet.toObject(),
      _id: _id.toString(),
      userId: userId.toString(),
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

    revalidatePath("/");
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
    return { error: "An unexpected error occurred." };
  }
};

// export const likeTweet = async (id: string) => {
//   try {
//     const { getUser } = getKindeServerSession();
//     const user = await getUser();

//     if (!user) {
//       return { message: "You need to be logged in to like a tweet." };
//     }

//     await connectDb();

//     const existingTweet = await Tweet.findById(id);

//     if (!existingTweet) {
//       return { message: "Tweet not found." };
//     }

//     // const userIndex = existingTweet.likes.indexOf(user.id);

//     // if (userIndex !== -1) {
//     //   // If the user has already liked the tweet, remove their like
//     //   existingTweet.likes.splice(userIndex, 1);
//     // } else {
//     //   // If the user has not liked the tweet, add their like
//     //   existingTweet.likes.push(user.id);
//     // }

//     await existingTweet.save();
//     revalidatePath("/");
//   } catch (error) {
//     console.error(error);
//   }
// };

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

    // Create a new reply instance
    const reply = new Reply({
      tweetId: tweetId,
      userId: user.id,
      text: text,
      image: image,
      video: video,
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

    const replies = await Reply.find({ tweetId });

    return replies;
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
  image: string
) => {
  try {
    await connectDb();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { message: "You need to be logged in to edit the reply" };
    }

    const reply = await Reply.findById(replyId);

    if (reply.userId != user?.id) {
      return { message: "You cannot edit someone else's tweet." };
    }

    if (!reply) return { message: "This reply does not exist." };

    reply.text = text;
    reply.image = image;

    await reply.save();
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
