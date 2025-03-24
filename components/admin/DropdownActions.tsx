import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ban, Check, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "../ui/button";
import useEditProfileButton from "@/hooks/buttonsLogic/useEditProfileButton";
import { EditProfileModal } from "../profile/editProfile/EditProfileModal";
import { useHandleBanning } from "@/hooks/profile/useHandleBanning";
import { MoreButtonProfileModal } from "../profile/moreButton/MoreButtonProfileModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { IUser } from "@/interfaces/user.interface";
export const DropdownActions = ({ user }: { user: IUser }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
            onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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

      {/* Delete User Confirmation */}
      <AlertDialog
        open={!!isDeleteModalOpen}
        onOpenChange={(open) => !open && setIsDeleteModalOpen(false)}
      >
        <AlertDialogContent className="bg-[#222] text-white border-[#333]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-[#444] text-white hover:bg-[#333] hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={() => {}}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
