import { IUser } from "@/interfaces/user.interface";
import Image from "next/image";
import Link from "next/link";

const UserCard = ({ user }: { user: IUser }) => {
  return (
    <div className="flex  gap-2 items-center mb-4">
      <Image
        src={user.avatar}
        alt={user.username}
        width={38}
        height={38}
        className="rounded-full object-cover"
      />
      <div>
        <Link className="flex flex-col" href={`/profile/${user.username}`}>
          <span className="font-bold ">{user.displayName}</span>
          <span className="text-gray-500 ">@{user.username}</span>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
