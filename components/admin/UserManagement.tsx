"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";
import { IUser } from "@/interfaces/user.interface";
import { UserTableRowCard } from "./UserTableRowCard";

export function UserManagement({ users }: { users: IUser[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8 bg-[#222] border-[#333] text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border border-[#333]">
        <Table>
          <TableHeader className="bg-[#111]">
            <TableRow className="border-b-[#333] hover:bg-[#222]">
              <TableHead className="text-gray-400">User</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Role</TableHead>
              <TableHead className="text-gray-400">Join Date</TableHead>
              <TableHead className="text-right text-gray-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <UserTableRowCard key={user._id} user={user} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
