import { INotification } from "@/interfaces/notification.interface";
import { IUser } from "@/interfaces/user.interface";
import Image from "next/image";
import Link from "next/link";
import { VerifiedBadge } from "../badges/VerifiedBadge";
import AdminBadge from "../badges/AdminBadge";
import {
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

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
  // Get the appropriate icon based on notification type
  const getNotificationIcon = () => {
    switch (type) {
      case "liked":
        return <HeartIcon className="w-5 h-5 text-red-500" />;
      case "retweeted":
        return (
          <ArrowPathRoundedSquareIcon className="w-5 h-5 text-green-500" />
        );
      case "replied":
        return <ChatBubbleOvalLeftIcon className="w-5 h-5 text-blue-500" />;
      case "followed":
        return <UserPlusIcon className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`border-b p-4 border-[#2f3336] hover:bg-[#080808] transition-colors duration-200 ${
        notification.read ? "opacity-80" : ""
      }`}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-1">{getNotificationIcon()}</div>
        <div className="flex-1">
          <Link
            href={`/profile/${owner.username}`}
            className="flex items-start gap-3"
          >
            <Image
              src={owner.avatar || "/placeholder.svg"}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full object-cover h-auto"
            />
            <div className="flex-1">
              <div className="flex items-center flex-wrap gap-1">
                <h2 className="font-bold text-base hover:underline">
                  {owner.displayName}
                </h2>
                {owner.isAdmin && <AdminBadge />}
                {!owner.isAdmin && (
                  <VerifiedBadge isSubscribed={owner.isSubscribed} />
                )}
                <span className="text-gray-500">@{owner.username}</span>
              </div>

              <p className="text-gray-300 mt-1">
                {type === "followed"
                  ? "followed you"
                  : type === "liked"
                  ? "liked your Tweet"
                  : type === "retweeted"
                  ? "retweeted your Tweet"
                  : "replied to your Tweet"}
              </p>

              {notification.tweetId?.text && type !== "followed" && (
                <div className="mt-2 text-gray-500 text-sm border-l-4 border-[#2f3336] pl-3 py-1">
                  <p style={{ overflowWrap: "anywhere" }}>
                    {notification.tweetId.text}
                  </p>
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
