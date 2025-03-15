import type { IUser } from "@/interfaces/user.interface";
import Image from "next/image";
import Link from "next/link";
import { VerifiedBadge } from "../premium/VerifiedBadge";
import AdminBadge from "../badges/AdminBadge";

const UserCard = ({ user }: { user: IUser }) => {
  return (
    <div className="flex items-center gap-3 ">
      <Image
        src={user.avatar || "/placeholder.svg"}
        alt={user.username}
        width={40}
        height={40}
        className="rounded-full object-cover max-h-10"
      />
      <div className="min-w-0">
        <Link
          className="block "
          href={`/profile/${user.username}?userId=${user.userId}`}
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-[15px] truncate block">
              {user.displayName}
            </span>
            {user.isAdmin && <AdminBadge />}
            {!user.isAdmin && (
              <VerifiedBadge isSubscribed={user.isSubscribed} />
            )}
          </div>
          <span className="text-gray-500 text-[13px] truncate block">
            @{user.username}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
