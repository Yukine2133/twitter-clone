import { IUser } from "@/interfaces/user.interface";
import AdminBadge from "../badges/AdminBadge";
import { VerifiedBadge } from "../badges/VerifiedBadge";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { formatJoinedDate } from "@/utils/formatTimestamp";

export const ProfileInfo = ({
  user,
  isOwner,
}: {
  user: IUser;
  isOwner: boolean;
}) => {
  return (
    <div className="mt-3 px-4">
      <div className="flex justify-between items-center my-2">
        <div className="mt-4">
          <div className="flex items-center gap-1">
            <h2 className="font-bold text-xl mb-1">{user.displayName}</h2>
            {user.isAdmin && <AdminBadge />}
            <VerifiedBadge
              isOwner={isOwner}
              isSubscribed={user.isSubscribed}
              profileLink
            />
          </div>
          <h2 className="text-neutral-500">@{user.username}</h2>
        </div>
      </div>
      <div className="space-y-2">
        <h3 style={{ overflowWrap: "anywhere" }}>{user.bio}</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          {user.location && (
            <div className="flex items-center gap-1 text-neutral-500">
              <MapPinIcon className="h-5 w-5" />
              <h3>{user.location}</h3>
            </div>
          )}
          <div className="text-neutral-500 flex items-center gap-2">
            <CalendarDaysIcon className="h-5 w-5" />
            <h3>{formatJoinedDate(user.createdAt)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
