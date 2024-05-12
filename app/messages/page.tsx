import { getUserConversations } from "@/actions/message.actions";
import { IUserConversations } from "@/types/message.interface";
import { formatCreatedAt } from "@/utils/formatTimestamp";
import Image from "next/image";
import Link from "next/link";

const MessagePage = async () => {
  const messages = await getUserConversations();

  return (
    <div>
      <h2 className="text-xl mt-2 font-semibold">Messages</h2>

      <div className="mt-4">
        {messages.map((message: IUserConversations) => {
          return (
            <Link
              href={`/messages/${message.user.username}`}
              key={message.user._id}
              className=""
            >
              <div className="my-4 p-2 bg-[#202327]">
                <div className="flex gap-2 items-center">
                  <Image
                    src={message.user.avatar}
                    alt="Avatar"
                    width={42}
                    height={42}
                    className="object-cover rounded-full "
                  />
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium ">{message.user.displayName}</h3>
                    <h3 className="text-gray-500 ">@{message.user.username}</h3>
                    <span className=" text-gray-500">&middot;</span>
                    <p className="text-gray-500 text-sm">
                      {formatCreatedAt(message.lastMessageCreatedAt)}
                    </p>
                  </div>
                </div>
                <h4
                  style={{ overflowWrap: "anywhere" }}
                  className="ml-12 w-[550px]  truncate"
                >
                  {message.lastMessage}
                </h4>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MessagePage;
