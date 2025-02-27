"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Message } from "@/models/message.model";
import { connectDb } from "@/utils/connectDb";
import { fetchUser } from "./user.actions";
import { revalidatePath } from "next/cache";
import { User } from "@/models/user.model";
import { parseJSON } from "@/utils/parseJSON";

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

    return parseJSON(messages);
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
    existingMessage.isEdited = true;

    await existingMessage.save();
    revalidatePath(`/`);
  } catch (error) {
    console.error(error);
  }
};

export const getUserConversations = async () => {
  try {
    await connectDb();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const currentUser = await fetchUser(user?.id);

    // Find all messages involving the current user
    const messages = await Message.find({
      $or: [{ sender: currentUser?._id }, { recipient: currentUser?._id }],
    }).sort({ createdAt: -1 }); // Sort messages in descending order by createdAt timestamp

    const lastMessagesMap = new Map(); // Map to store the last message for each conversation

    // Loop through messages to find the last message for each conversation
    for (const message of messages) {
      const otherUserId =
        message.sender.toString() === currentUser?._id.toString()
          ? message.recipient.toString()
          : message.sender.toString();
      // If there is no last message for this user, set it as the last message
      if (!lastMessagesMap.has(otherUserId)) {
        lastMessagesMap.set(otherUserId, {
          content: message.content,
          createdAt: message.createdAt,
          isImage: message.image ? true : false, // Check if the last message is an image
        });
      }
    }

    // Fetch user data corresponding to the IDs of users the current user has messaged
    const userIds = Array.from(lastMessagesMap.keys());
    const users = await User.find({ _id: { $in: userIds } });

    // Combine user data with the last message for each user
    const conversations = [];
    for (const user of users) {
      const lastMessageData = lastMessagesMap.get(user._id.toString());
      let lastMessage = lastMessageData ? lastMessageData.content : "";
      // Check if the last message is an image
      if (lastMessageData && lastMessageData.isImage) {
        lastMessage = "sent image";
      }
      conversations.push({
        user,
        lastMessage,
        lastMessageCreatedAt: lastMessageData
          ? lastMessageData.createdAt
          : null,
      });
    }

    return conversations;
  } catch (error) {
    console.error(error);
    return [];
  }
};
