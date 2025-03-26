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
