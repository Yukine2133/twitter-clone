"use server";

import { IAppeal } from "@/interfaces/appeal.interface";
import { Appeal } from "@/models/appeal.model";
import { connectDb } from "@/utils/connectDb";
import { parseJSON } from "@/utils/parseJSON";
import { revalidatePath } from "next/cache";

export const addAppeal = async ({
  user,
  banReason,
  text,
}: Omit<IAppeal, "createdAt" | "status">) => {
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
export const fetchAppeals = async () => {
  try {
    await connectDb();
    const appeals = await Appeal.find().populate("user");

    return parseJSON(appeals) || null;
  } catch (error) {
    console.error(error);
  }
};

export const updateAppeal = async (id: string, status: string) => {
  try {
    await connectDb();
    await Appeal.findByIdAndUpdate(id, { status });
    revalidatePath("/admin");
  } catch (error) {
    console.error(error);
  }
};
