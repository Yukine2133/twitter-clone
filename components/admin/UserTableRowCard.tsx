import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/interfaces/user.interface";

import { formatJoinedDate } from "@/utils/formatTimestamp";
import { DropdownActions } from "./DropdownActions";

export interface IUserTableRowCardProps {
  user: IUser;
}
export const UserTableRowCard = ({ user }: IUserTableRowCardProps) => {
  return (
    <>
      <TableRow className="border-b-[#333] hover:bg-[#222]">
        <TableCell className="font-medium">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.displayName} />
              <AvatarFallback className="bg-[#333] text-white">
                {user.displayName.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.displayName}</div>
              <div className="text-xs text-gray-400">{user.username}</div>
            </div>
          </div>
        </TableCell>
        <TableCell>
          {user.isBanned === false ? (
            <span className="inline-flex items-center rounded-full border border-[#333] px-2.5 py-0.5 text-xs font-semibold text-gray-200">
              Active
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold text-red-500">
              Banned
            </span>
          )}
        </TableCell>
        <TableCell>
          {user.isAdmin === true ? (
            <span className="inline-flex items-center rounded-full bg-[#1d9bf0] px-2.5 py-0.5 text-xs font-semibold text-white">
              Admin
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-[#333] px-2.5 py-0.5 text-xs font-semibold text-white">
              User
            </span>
          )}
        </TableCell>
        <TableCell>{formatJoinedDate(user.createdAt)}</TableCell>
        <TableCell className="flex justify-end">
          <DropdownActions user={user} />
        </TableCell>
      </TableRow>
    </>
  );
};
