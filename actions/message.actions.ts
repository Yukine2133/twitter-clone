"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Message } from "@/models/message.model";
import { connectDb } from "@/utils/connectDb";
import { fetchUser } from "./user.actions";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/messages");
  } catch (error) {
    throw new Error(`Failed to send message: ${error}`);
  }
};

export const getMessages = async (userId: string) => {
  try {
    // Retrieve messages where the user is either the sender or the recipient
    const messages = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }],
    }).sort({ createdAt: 1 }); // Sort messages by createdAt timestamp in ascending order
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Failed to fetch messages");
  }
};
