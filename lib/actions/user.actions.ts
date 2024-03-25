"use server";

import { connectDb } from "../connectDb";
import { User } from "../models/user.model";

export const fetchUser = async (userId: string) => {
  try {
    await connectDb();
    const users = await User.find({ userId });
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
