import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Message } from "@/models/message.model";
import { connectDb } from "@/utils/connectDb";

export const sendMessage = async (recipientId: string, content: string) => {
  try {
    await connectDb();

    const { getUser } = getKindeServerSession();

    const user = await getUser();

    const message = new Message({
      sender: user?.id,
      recipient: recipientId,
      content: content,
    });

    const savedMessage = await message.save();

    return savedMessage;
  } catch (error) {
    throw new Error(`Failed to send message: ${error}`);
  }
};
