"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { connectDb } from "../utils/connectDb";
import { User } from "../models/user.model";
import { Tweet } from "../models/tweet.model";
import { revalidatePath } from "next/cache";

export const fetchUser = async (
  userId?: string | null,
  username?: string | null,
  id?: string | null
) => {
  try {
    await connectDb();
    let users;
    if (username) {
      users = await User.find({ username });
    } else if (userId) {
      users = await User.find({ userId });
    } else if (id) {
      users = await User.findById(id);
    }
    if (users) {
      const { _id } = users[0];
      const plainUser = {
        ...users[0].toObject(),
        _id: _id.toString(),
      };
      return plainUser;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async ({
  userId,
  bio,
  location,
  avatar,
  name,
}: any) => {
  try {
    await connectDb();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { message: "You need to be logged in to update the profile." };
    }
    const existingUser = await User.findOne({ userId });

    if (existingUser.userId != user?.id) {
      return { message: "You cannot edit someone else's profile." };
    }

    if (!existingUser) return { message: "This tweet does not exist." };

    existingUser.displayName = name;
    existingUser.avatar = avatar;
    existingUser.bio = bio;
    existingUser.location = location;

    await existingUser.save();
    revalidatePath(`/profile/${existingUser.username}`);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchUserById = async (id: string | null) => {
  try {
    await connectDb();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserTweets = async (userId?: string | null) => {
  try {
    await connectDb();
    const tweets = await Tweet.find({ userId });

    if (!tweets) {
      throw new Error("Failed to fetch tweets.");
    }
    return tweets;
  } catch (error) {
    console.log(error);
  }
};

export const followUser = async (
  userId: string,
  username: string,
  currentUserId: string
) => {
  try {
    await connectDb();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { message: "You need to be logged in to follow a user." };
    }

    // Check if the userId is the same as the currentUserId
    if (userId === currentUserId) {
      return { message: "You cannot follow yourself." };
    }

    // Find the user to follow by the provided userId
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return { message: "User not found." };
    }
    // Ensure that user.id is the correct _id of the current user
    const currentUser = await User.findById(currentUserId);

    // Update the followers and following arrays
    const userIndex = existingUser.followers.indexOf(user.id);
    const followingIndex = currentUser.following.indexOf(userId);

    if (userIndex !== -1) {
      // If the user has already followed the user, remove their follow
      existingUser.followers.splice(userIndex, 1);
    } else {
      // If the user has not followed the user, add their follow
      existingUser.followers.push(user.id);
    }

    if (followingIndex !== -1) {
      // If the current user is already following the user, remove their follow
      currentUser.following.splice(followingIndex, 1);
    } else {
      // If the current user is not already following the user, add their follow
      currentUser.following.push(userId);
    }

    // Save both users
    await existingUser.save();
    await currentUser.save();

    revalidatePath(`/profile/${username}`);
  } catch (error) {
    console.error(error);
  }
};

export const searchUsers = async (q: string | null) => {
  try {
    await connectDb();
    const users = await User.find({
      username: { $regex: new RegExp(q || "", "i") },
    });

    return users;
  } catch (error) {
    console.error(error);
  }
};
