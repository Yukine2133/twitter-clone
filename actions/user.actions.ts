"use server";

import { ConnectionStates } from "mongoose";
import { connectDb } from "../utils/connectDb";
import { User } from "../models/user.model";
import { Tweet } from "../models/tweet.model";

export const fetchUser = async (
  userId?: string | null,
  username?: string | null
) => {
  try {
    await connectDb();
    let users;
    if (username) {
      users = await User.find({ username });
    } else {
      users = await User.find({ userId });
    }
    if (users.length > 0) {
      return users[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchUserTweets = async (userId?: string | null) => {
  try {
    await connectDb();
    const tweets = await Tweet.find({ userId });
    return tweets;
  } catch (error) {
    console.log(error);
    return null;
  }
};
