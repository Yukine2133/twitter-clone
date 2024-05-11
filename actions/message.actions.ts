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
    const image = formData.get("image");

    const message = new Message({
      sender: currentUser._id,
      recipient: recipientId,
      content,
      image,
    });

    await message.save();
    revalidatePath("/messages");
  } catch (error) {
    return { message: `Failed to send message: ${error}` };
  }
};

export const getMessages = async (userId: string) => {
  try {
    const { getUser } = getKindeServerSession();

    const user = await getUser();

    const currentUser = await fetchUser(user?.id);
    // Retrieve messages where the user is either the sender or the recipient,
    // and where the sender matches the specified senderId
    const messages = await Message.find({
      $or: [
        { sender: userId, recipient: currentUser._id },
        { sender: currentUser._id, recipient: userId },
      ],
    })
      .sort({ createdAt: 1 }) // Sort messages by createdAt timestamp in ascending order
      .populate("sender");

    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { message: "Failed to fetch messages" };
  }
};

export const deleteMessage = async (messageId: string) => {
  try {
    await connectDb();

    const { getUser } = getKindeServerSession();
    const currentUser = await getUser();

    const message = await Message.findById(messageId).populate("sender");

    if (!message) {
      return { message: "Message not found." };
    }

    if (message.sender.userId !== currentUser?.id) {
      return {
        message: "You can only delete your own messages.",
      };
    }

    await Message.findByIdAndDelete(messageId);

    revalidatePath("/messages");
  } catch (error) {
    console.error("Error deleting message:", error);
    return { message: "Failed to delete message." };
  }
};

export const editMessage = async (
  messageId: string,
  content: string,
  image: string
) => {
  try {
    await connectDb();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { message: "You need to be logged in to update message." };
    }
    const existingMessage = await Message.findById(messageId).populate(
      "sender"
    );

    if (existingMessage.sender.userId != user?.id) {
      return { message: "You cannot edit someone else's message." };
    }

    if (!existingMessage) return { message: "Message not found" };

    existingMessage.content = content;
    existingMessage.image = image;

    await existingMessage.save();
    revalidatePath(`/`);
  } catch (error) {
    console.error(error);
  }
};
