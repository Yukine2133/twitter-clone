"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Message } from "@/models/message.model";
import { connectDb } from "@/utils/connectDb";
import { fetchUser } from "./user.actions";

export const sendMessage = async (recipientId: string, formData: FormData) => {
  try {
    await connectDb();

    const { getUser } = getKindeServerSession();

    const user = await getUser();

    const currentUser = await fetchUser(user?.id);

    const content = formData.get("content");

    const message = new Message({
      sender: currentUser._id,
      recipient: recipientId,
      content: content,
    });

    await message.save();
  } catch (error) {
    throw new Error(`Failed to send message: ${error}`);
  }
};
