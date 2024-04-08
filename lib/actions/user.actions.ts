"use server";

import { connectDb } from "../connectDb";
import { User } from "../models/user.model";

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
