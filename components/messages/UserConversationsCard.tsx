import { IUserConversations } from "@/types/message.interface";
import { formatCreatedAt } from "@/utils/formatTimestamp";
import Image from "next/image";
import Link from "next/link";

const UserConversationsCard = ({
  message,
}: {
  message: IUserConversations;
}) => {
  return (
    <Link href={`/messages/${message.user.username}`} className="">
      <div className="my-4 p-2  bg-[#202327]">
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
          className="ml-12 w-[330px]  sm:w-[550px]  truncate"
        >
          {message.lastMessage}
        </h4>
      </div>
    </Link>
  );
};

export default UserConversationsCard;
