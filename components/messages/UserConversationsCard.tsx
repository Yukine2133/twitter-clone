import type { IUserConversations } from "@/interfaces/message.interface";
import { formatCreatedAt } from "@/utils/formatTimestamp";
import Image from "next/image";
import Link from "next/link";

const UserConversationsCard = ({
  message,
}: {
  message: IUserConversations;
}) => {
  return (
    <Link
      href={`/messages/${message.user.username}?userId=${message.user.userId}`}
      className="block transition-colors hover:bg-zinc-900"
    >
      <div className="flex gap-3 p-4">
        <Image
          src={message.user.avatar || "/placeholder.svg"}
          alt={`${message.user.displayName}'s avatar`}
          width={48}
          height={48}
          className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 text-[15px]">
            <span className="font-bold truncate">
              {message.user.displayName}
            </span>
            <span className="text-neutral-500">@{message.user.username}</span>
            <span className="text-neutral-500">&middot;</span>
            <span className="text-neutral-500 text-sm">
              {formatCreatedAt(message.lastMessageCreatedAt)}
            </span>
          </div>
          <p className="mt-0.5 truncate text-neutral-500">
            {message.lastMessage}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserConversationsCard;
