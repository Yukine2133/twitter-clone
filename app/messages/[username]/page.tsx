import { IMessage } from "@/interfaces/message.interface";
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
    title: params.username + " - Messages",
  };
};

const MessageWithTheUser = async ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  const username = params.username;
  const recipient = await fetchUser(undefined, username);

  const messages = (await getMessages(recipient._id)) as IMessage[];

  return (
    <div className="mb-20 h-[400px] ">
      <div className=" bg-black px-2 md:px-4 border-b pb-2 border-[#2f3336] w-[640px] fixed top-0 z-10  pt-4 flex items-center gap-3">
        <GoBackButton />

        <Link
          className="flex items-center gap-3"
          href={`/profile/${recipient.username}`}
        >
          <Image
            src={recipient.avatar}
            alt="Recipient avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <h2 className="font-semibold mb-1">{recipient.displayName}</h2>
            <h2 className="text-gray-500 text-sm">@{recipient.username}</h2>
          </div>
        </Link>
      </div>
      <AutoScrollMessages>
        <div className="mb-20">
          {messages.map((message: IMessage) => {
            const isCurrentUserSender =
              message.sender.userId === currentUser?.id;
            return (
              <MessageCard
                key={message._id}
                message={message}
                isCurrentUserSender={isCurrentUserSender}
              />
            );
          })}
        </div>
      </AutoScrollMessages>
      <MessageForm recipientUserId={recipient._id} />
    </div>
  );
};

export default MessageWithTheUser;
