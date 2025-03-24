import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/interfaces/user.interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ban, Check, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { formatJoinedDate } from "@/utils/formatTimestamp";
import useEditProfileButton from "@/hooks/buttonsLogic/useEditProfileButton";
import { EditProfileModal } from "../profile/editProfile/EditProfileModal";
import { useHandleBanning } from "@/hooks/profile/useHandleBanning";
import { MoreButtonProfileModal } from "../profile/moreButton/MoreButtonProfileModal";

export interface IUserTableRowCardProps {
  user: IUser;
}
export const UserTableRowCard = ({ user }: IUserTableRowCardProps) => {
  const {
    toggleModal,
    isModalOpen,
    name,
    setName,
    username,
    setUsername,
    bio,
    setBio,
    location,
    setLocation,
    avatar,
    setAvatar,
    backgroundImage,
    setBackgroundImage,
    handleSubmit,
    isPrivate,
    setIsPrivate,
    uploadAvatarButtonRef,
    uploadBackgroundButtonRef,
    backgroundProgress,
    setBackgroundProgress,
    avatarProgress,
    setAvatarProgress,
  } = useEditProfileButton({ user });
  const {
    handleBanSubmit,
    handleUnBan,
    isBanModalOpen,
    setIsBanModalOpen,
    banReason,
    setBanReason,
  } = useHandleBanning(user.userId);
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
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-[#333]"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#222] border-[#333] text-white"
            >
              <DropdownMenuItem
                onClick={toggleModal}
                className="hover:bg-[#333]  focus:bg-[#333] cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4 text-blue-500" />
                Edit
              </DropdownMenuItem>
              {user.isBanned === false ? (
                <DropdownMenuItem
                  onClick={() => setIsBanModalOpen(!isBanModalOpen)}
                  className="hover:bg-[#333] focus:bg-[#333] cursor-pointer"
                >
                  <Ban className="mr-2 h-4 w-4 text-red-500" />
                  Ban User
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => handleUnBan()}
                  className="hover:bg-[#333] focus:bg-[#333] cursor-pointer"
                >
                  <Check className="mr-2 h-4 w-4 text-blue-500" />
                  Unban User
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="bg-[#333]" />
              <DropdownMenuItem
                className="text-red-500 hover:bg-[#333] focus:bg-[#333] cursor-pointer"
                // onClick={() => setDeleteUser(user)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <EditProfileModal
        toggleModal={toggleModal}
        isModalOpen={isModalOpen}
        name={name}
        setName={setName}
        username={username}
        setUsername={setUsername}
        bio={bio}
        setBio={setBio}
        location={location}
        setLocation={setLocation}
        avatar={avatar}
        setAvatar={setAvatar}
        backgroundImage={backgroundImage}
        setBackgroundImage={setBackgroundImage}
        handleSubmit={handleSubmit}
        isPrivate={isPrivate}
        setIsPrivate={setIsPrivate}
        uploadAvatarButtonRef={uploadAvatarButtonRef}
        uploadBackgroundButtonRef={uploadBackgroundButtonRef}
        avatarProgress={avatarProgress}
        setAvatarProgress={setAvatarProgress}
        backgroundProgress={backgroundProgress}
        setBackgroundProgress={setBackgroundProgress}
      />
      {isBanModalOpen && (
        <MoreButtonProfileModal
          banReason={banReason}
          setBanReason={setBanReason}
          isBanModalOpen={isBanModalOpen}
          setIsBanModalOpen={setIsBanModalOpen}
          handleBanSubmit={handleBanSubmit}
        />
      )}
    </>
  );
};
