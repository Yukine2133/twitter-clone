"use server";

import { IAppeal } from "@/interfaces/appeal.interface";
import { Appeal } from "@/models/appeal.model";
import { connectDb } from "@/utils/connectDb";

export const addAppeal = async ({ user, banReason, text }: IAppeal) => {
  try {
    await connectDb();
    await Appeal.create({ user, banReason, text });
  } catch (error) {
    console.error(error);
  }
};

export const fetchAppeal = async (userId: string) => {
  try {
    await connectDb();
    const appeal = await Appeal.findOne({ user: userId });

    return appeal || null;
  } catch (error) {
    console.error(error);
  }
};
