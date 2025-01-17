import { getUserConversations } from "@/actions/message.actions";
import UserConversationsCard from "@/components/messages/UserConversationsCard";
import { IUserConversations } from "@/interfaces/message.interface";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
  description: "Tweeter Messages",
};

const MessagePage = async () => {
  const messages = await getUserConversations();

  return (
    <div className="">
      <h2 className="text-xl px-2 md:px-4 ml-2  sm:ml-0 mt-2 font-semibold">
        Messages
      </h2>

      {messages.length === 0 && (
        <p className="mt-4 px-2 md:px-4 text-xl">
          You don&apos;t have any messages.
        </p>
      )}

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
