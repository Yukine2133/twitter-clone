import { getUserConversations } from "@/actions/message.actions";
import UserConversationsCard from "@/components/messages/UserConversationsCard";
import { IUserConversations } from "@/types/message.interface";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
  description: "Tweeter Messages",
};

const MessagePage = async () => {
  const messages = await getUserConversations();

  return (
    <div>
      <h2 className="text-xl mt-2 font-semibold">Messages</h2>

      <div className="mt-4">
        {messages.map((message: IUserConversations) => {
          return (
            <UserConversationsCard message={message} key={message.user._id} />
          );
        })}
      </div>
    </div>
  );
};

export default MessagePage;
