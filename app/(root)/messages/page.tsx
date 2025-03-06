import { getUserConversations } from "@/actions/message.actions";
import UserConversationsCard from "@/components/messages/UserConversationsCard";
import type { IUserConversations } from "@/interfaces/message.interface";
import { InboxIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
  description: "Tweeter Messages",
};

const MessagePage = async () => {
  const messages = await getUserConversations();

  return (
    <div className="min-h-screen border-x border-neutral-800">
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-black/60 border-b border-neutral-800">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold">Messages</h1>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-4 rounded-full bg-blue-500/10 p-4">
            <InboxIcon className="h-8 w-8 text-blue-500" />
          </div>
          <h2 className="mb-2 text-2xl font-bold">Welcome to your inbox!</h2>
          <p className="text-neutral-500">
            Drop a line, share posts and more with private conversations between
            you and others on Twitter.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-neutral-800">
          {messages.map((message: IUserConversations) => (
            <UserConversationsCard key={message.user._id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagePage;
