"use server";

import { Notification } from "@/models/notification.model";

import { connectDb } from "@/utils/connectDb";
import { revalidatePath } from "next/cache";

export const createNotification = async (
  type: string,
  userId: string | undefined,
  affectedUserId: string,
  tweetId?: string | null
) => {
  try {
    await connectDb();
    // Ensure the userId and affectedUserId are not the same
    if (userId === affectedUserId) {
      return;
    }

    // Check if a notification of the same type already exists
    const existingNotification = await Notification.findOne({
      type,
      userId,
      affectedUserId,
      tweetId,
    });

    if (existingNotification) {
      // If it exists, remove it
      await existingNotification.deleteOne();
    } else {
      // If it doesn't exist, create a new one
      const notification = new Notification({
        type,
        userId,
        affectedUserId,
        tweetId,
      });
      await notification.save();
    }
  } catch (error: any) {
    throw new Error("Error creating/removing notification:", error);
  }
};

export const getNotifications = async (userId: string | undefined) => {
  try {
    await connectDb();

    const res = await Notification.find({ affectedUserId: userId })
      .populate("tweetId")
      .sort({ createdAt: -1 });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    await connectDb();

    await Notification.findByIdAndUpdate(notificationId, { read: true });
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

export const fetchUnreadNotifications = async (userId: string) => {
  try {
    await connectDb();

    const res = await Notification.find({
      affectedUserId: userId,
      read: false,
    });
    return res.length;
  } catch (error) {
    console.error(error);
  }
};
