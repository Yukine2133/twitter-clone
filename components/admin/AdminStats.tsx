import { IUser } from "@/interfaces/user.interface";
import { AlertTriangle, Ban, Users } from "lucide-react";

export function AdminStats({ users }: { users: IUser[] }) {
  const bannedUsers = users.filter((user) => user.isBanned);
  return (
    <div className="grid  gap-4 lg:grid-cols-3">
      <div className="bg-[#111] border border-[#222] rounded-lg p-4">
        <div className="flex flex-row items-center justify-between pb-2">
          <div className="text-sm font-medium text-gray-400">Total Users</div>
          <Users className="h-4 w-4 text-gray-400" />
        </div>
        <div className="text-2xl font-bold">{users.length}</div>
      </div>
      <div className="bg-[#111] border border-[#222] rounded-lg p-4">
        <div className="flex flex-row items-center justify-between pb-2">
          <div className="text-sm font-medium text-gray-400">Active Bans</div>
          <Ban className="h-4 w-4 text-gray-400" />
        </div>
        <div className="text-2xl font-bold">{bannedUsers.length}</div>
      </div>
      <div className="bg-[#111] border border-[#222] rounded-lg p-4">
        <div className="flex flex-row items-center justify-between pb-2">
          <div className="text-sm font-medium text-gray-400">
            Pending Appeals
          </div>
          <AlertTriangle className="h-4 w-4 text-gray-400" />
        </div>
        <div className="text-2xl font-bold">18</div>
      </div>
    </div>
  );
}
