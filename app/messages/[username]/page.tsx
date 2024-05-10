import { IUser } from "@/types/user.interface";
import { IMessage } from "@/types/message.interface";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getMessages } from "@/actions/message.actions";
import { fetchUser } from "@/actions/user.actions";
import MessageForm from "@/components/messages/MessageForm";
import GoBackButton from "@/components/buttons/GoBackButton";

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
    <div className="mb-20">
      <div className=" bg-black border-b pb-2 border-[#2f3336] w-[620px] fixed top-0  pt-4 flex items-center gap-3">
        <GoBackButton />

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
      </div>
      <div className="mt-20">
        {messages.map((message: IMessage) => {
          const isCurrentUserSender = message.sender.userId === currentUser?.id;
          const messageClassName = `bg-blue-500 max-w-[290px]  rounded-xl px-2 py-1 my-2 text-[15px] ${
            isCurrentUserSender ? "ml-auto" : "bg-zinc-900"
          }`;
          return (
            <div
              className={`flex ${
                isCurrentUserSender ? "justify-end" : "justify-start"
              }`}
              key={message._id}
            >
              <div className={messageClassName}>
                <h1 style={{ overflowWrap: "anywhere" }}>{message.content}</h1>
              </div>
            </div>
          );
        })}
      </div>
      <MessageForm recipientUserId={recipient._id} />
    </div>
  );
};

export default MessageWithTheUser;
