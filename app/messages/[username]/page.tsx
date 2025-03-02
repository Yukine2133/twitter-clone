import type { IMessage } from "@/interfaces/message.interface";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getMessages } from "@/actions/message.actions";
import { fetchUser } from "@/actions/user.actions";
import MessageForm from "@/components/messages/MessageForm";
import GoBackButton from "@/components/buttons/GoBackButton";
import Link from "next/link";
import MessageCard from "@/components/messages/MessageCard";
import AutoScrollMessages from "@/components/messages/AutoScrollMessages";

export const generateMetadata = async ({
  params,
}: {
  params: { username: string };
}) => {
  return {
    title: `${params.username} - Messages`,
  };
};

const MessageWithTheUser = async ({
  searchParams,
}: {
  searchParams: {
    userId: string;
  };
}) => {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  const userId = searchParams.userId;
  const recipient = await fetchUser(userId);

  const messages = (await getMessages(recipient._id)) as IMessage[];

  return (
    <div className="flex flex-col  h-screen">
      <header className="bg-black px-4 py-3 border-b border-neutral-800 sticky top-0 z-10 flex items-center gap-4">
        <GoBackButton />
        <Link
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          href={`/profile/${recipient.username}`}
        >
          <Image
            src={recipient.avatar || "/placeholder.svg"}
            alt={recipient.displayName}
            width={40}
            height={40}
            className="rounded-full max-h-10 object-cover"
          />
          <div>
            <h2 className="font-bold text-lg">{recipient.displayName}</h2>
            <p className="text-neutral-500 text-sm">@{recipient.username}</p>
          </div>
        </Link>
      </header>

      <AutoScrollMessages>
        <div className="flex-grow p-4 space-y-4">
          {messages.map((message: IMessage) => (
            <MessageCard
              key={message._id}
              message={message}
              isCurrentUserSender={message.sender.userId === currentUser?.id}
            />
          ))}
        </div>
      </AutoScrollMessages>

      <MessageForm recipientUserId={recipient._id} />
    </div>
  );
};

export default MessageWithTheUser;
