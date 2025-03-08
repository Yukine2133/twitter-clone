import { INotification } from "@/interfaces/notification.interface";
import { IUser } from "@/interfaces/user.interface";
import Image from "next/image";
import Link from "next/link";
import { VerifiedBadge } from "../premium/VerifiedBadge";

interface INotificationCardProps {
  notification: INotification;
  owner: IUser;
  type: string;
}

const NotificationCard = ({
  notification,
  owner,
  type,
}: INotificationCardProps) => {
  return (
    <div
      className={`border-y p-3 border-[#2f3336] ${
        notification.read && "bg-[#212121]"
      }`}
    >
      <Link href={`/profile/${owner.username}`} className="flex gap-2 w-fit">
        <Image
          src={owner.avatar}
          alt="Avatar"
          width={42}
          height={42}
          className="rounded-full object-cover h-auto"
        />
        <div className="">
          <div className="flex items-center gap-1">
            <h2 className="font-semibold ">{owner.displayName}</h2>
            <VerifiedBadge isSubscribed={owner.isSubscribed} />
          </div>
          <h2 className="text-gray-500 text-sm">@{owner.username}</h2>
        </div>
      </Link>
      <div className="flex flex-col gap-2 mt-2">
        <p className="font-semibold  ">
          {" "}
          {type === "followed" ? "followed you" : `${type} your tweet:`}{" "}
        </p>
        <p style={{ overflowWrap: "anywhere" }}>{notification.tweetId?.text}</p>
      </div>
    </div>
  );
};

export default NotificationCard;
