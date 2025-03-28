import { IAdminStatsProps } from "@/interfaces/props.interface";
import {
  ExclamationTriangleIcon,
  NoSymbolIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export function AdminStats({ users, appeals }: IAdminStatsProps) {
  const bannedUsers = users.filter((user) => user.isBanned);
  const pendingAppeals = appeals.filter(
    (appeal) => appeal.status === "Pending"
  );
  return (
    <div className="grid  gap-4 lg:grid-cols-3">
      <div className="bg-[#111] border border-[#222] rounded-lg p-4">
        <div className="flex flex-row items-center justify-between pb-2">
          <div className="text-sm font-medium text-gray-400">Total Users</div>
          <UsersIcon className="size-5 text-gray-400" />
        </div>
        <div className="text-2xl font-bold">{users.length}</div>
      </div>
      <div className="bg-[#111] border border-[#222] rounded-lg p-4">
        <div className="flex flex-row items-center justify-between pb-2">
          <div className="text-sm font-medium text-gray-400">Active Bans</div>
          <NoSymbolIcon className="size-5 text-gray-400" />
        </div>
        <div className="text-2xl font-bold">{bannedUsers.length}</div>
      </div>
      <div className="bg-[#111] border border-[#222] rounded-lg p-4">
        <div className="flex flex-row items-center justify-between pb-2">
          <div className="text-sm font-medium text-gray-400">
            Pending Appeals
          </div>
          <ExclamationTriangleIcon className="size-5 text-gray-400" />
        </div>
        <div className="text-2xl font-bold">{pendingAppeals.length}</div>
      </div>
    </div>
  );
}
