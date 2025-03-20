"use server";

import { connectDb } from "../utils/connectDb";
import { User } from "../models/user.model";
import { Tweet } from "../models/tweet.model";
import { revalidatePath } from "next/cache";
import { IUser, OmittedUserData } from "@/interfaces/user.interface";
import { createNotification } from "./notification.actions";
import { parseJSON } from "@/utils/parseJSON";
import { currentUser } from "@clerk/nextjs/server";
import { shuffleArray } from "@/utils/shuffleArray";

export const fetchUser = async (userId: string | null | undefined) => {
  try {
    await connectDb();

    const user = await User.findOne({ userId });

    return parseJSON(user);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async ({
  username,
  userId,
  bio,
  location,
  avatar,
  name,
  backgroundImage,
  private: privateUser,
  onboarded,
}: OmittedUserData) => {
  try {
    await connectDb();
    const user = await currentUser();

    if (!user) {
      return { message: "You need to be logged in to update the profile." };
    }
    const existingUser = await User.findOne({ userId });
    const currentDbUser = await User.findOne({ userId: user.id });

    if (existingUser.userId != user?.id && !currentDbUser.isAdmin) {
      return { message: "You cannot edit someone else's profile." };
    }

    if (!existingUser) return { message: "This User does not exist." };

    existingUser.displayName = name;
    existingUser.username = username;
    existingUser.avatar = avatar;
    existingUser.bio = bio;
    existingUser.location = location;
    existingUser.backgroundImage = backgroundImage;
    existingUser.private = privateUser;
    existingUser.onboarded = onboarded;

    await existingUser.save();
    revalidatePath(`/profile/${existingUser.username}`);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateBanStatus = async (
  userId: string,
  isBanned: boolean,
  banReason: string = ""
) => {
  try {
    await connectDb();

    const res = await User.findOneAndUpdate(
      { userId },
      { $set: { isBanned, banReason: isBanned ? banReason : "" } },
      { new: true }
    );
    revalidatePath(`/profile/${res.username}?userId=${userId}`);
  } catch (error) {
    console.error(error);
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
    const tweets = await Tweet.find({ userId })
      .sort({ createdAt: -1 })
      .populate("user"); // Sort in the descending order

    if (!tweets) {
      throw new Error("Failed to fetch tweets.");
    }
    return tweets;
  } catch (error) {
    console.log(error);
  }
};

export const followUser = async (userId: string, currentUserId: string) => {
  try {
    await connectDb();
    const user = await currentUser();

    if (!user) {
      return { message: "You need to be logged in to follow a user." };
    }

    if (userId === currentUserId) {
      return { message: "You cannot follow yourself." };
    }

    const existingUser = await User.findById(userId);
    if (existingUser) {
      await createNotification("follow", user.id, existingUser.userId);
    }

    if (!existingUser) {
      return { message: "User not found." };
    }

    const currentDbUser = await User.findById(currentUserId);

    // Update the followers and following arrays
    const userIndex = existingUser.followers.indexOf(user.id);
    const followingIndex = currentDbUser.following.indexOf(userId);

    if (userIndex !== -1) {
      // If the user has already followed the user, remove their follow
      existingUser.followers.splice(userIndex, 1);
    } else {
      // If the user has not followed the user, add their follow
      existingUser.followers.push(user.id);
    }

    if (followingIndex !== -1) {
      // If the current user is already following the user, remove their follow
      currentDbUser.following.splice(followingIndex, 1);
    } else {
      // If the current user is not already following the user, add their follow
      currentDbUser.following.push(userId);
    }

    // Save both users
    await existingUser.save();
    await currentDbUser.save();
    revalidatePath(`/profile/${existingUser.username}`);
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

    return parseJSON(users);
  } catch (error) {
    console.error(error);
  }
};
export const fetchUsers = async (currentUserId: string) => {
  await connectDb();

  const currentUser = await User.findById(currentUserId).select("following");

  // Fetch users who are not the current user and not in the `following` list
  const users = await User.find({
    _id: { $ne: currentUserId, $nin: currentUser?.following || [] },
  }).sort({ displayName: 1 });

  return users;
};

export const fetchFollowSuggestions = async (userId: string) => {
  try {
    const currentUserData = await fetchUser(userId);

    const usersData: any = await fetchUsers(currentUserData?._id);
    const shuffledUsers = shuffleArray(usersData);
    const randomUsersData = shuffledUsers.slice(0, 3);

    const parsedJSONCurrentUserData = parseJSON(currentUserData);
    const parsedJSONRandomUsersData = parseJSON(randomUsersData);

    return { parsedJSONCurrentUserData, parsedJSONRandomUsersData };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
