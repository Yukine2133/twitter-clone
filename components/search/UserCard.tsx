import { IUser } from "@/types/user.interface";
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
        <Link href={`/profile/${user.username}`}>
          <span className="font-bold ">{user.username}</span>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
