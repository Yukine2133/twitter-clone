import { EditProfileModal } from "@/components/profile/editProfile/EditProfileModal";
import { MoreButtonProfileModal } from "@/components/profile/moreButton/MoreButtonProfileModal";
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
import { FormEvent } from "react";

interface IDropdownActionsModalRenderingProps {
  toggleModal: () => void;
  isModalOpen: boolean;
  name: string;
  setName: (arg0: string) => void;
  username: string;
  setUsername: (arg0: string) => void;
  bio: string;
  setBio: (arg0: string) => void;
  location: string;
  setLocation: (arg0: string) => void;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  backgroundImage: string;
  setBackgroundImage: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: FormEvent) => void;
  isPrivate: boolean;
  setIsPrivate: (isPrivate: boolean) => void;
  uploadAvatarButtonRef: React.RefObject<HTMLDivElement>;
  uploadBackgroundButtonRef: React.RefObject<HTMLDivElement>;
  avatarProgress: number;
  setAvatarProgress: React.Dispatch<React.SetStateAction<number>>;
  backgroundProgress: number;
  setBackgroundProgress: React.Dispatch<React.SetStateAction<number>>;
  isBanModalOpen: boolean;
  setIsBanModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  banReason: string;
  setBanReason: React.Dispatch<React.SetStateAction<string>>;
  handleBanSubmit: () => void;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteSubmit: () => void;
}
export const DropdownActionsModalRendering = ({
  avatar,
  avatarProgress,
  backgroundImage,
  backgroundProgress,
  banReason,
  bio,
  handleBanSubmit,
  handleDeleteSubmit,
  handleSubmit,
  isBanModalOpen,
  isDeleteModalOpen,
  isModalOpen,
  isPrivate,
  location,
  name,
  setAvatar,
  setAvatarProgress,
  setBackgroundImage,
  setBackgroundProgress,
  setBanReason,
  setBio,
  setIsBanModalOpen,
  setIsDeleteModalOpen,
  setIsPrivate,
  setLocation,
  setName,
  setUsername,
  toggleModal,
  uploadAvatarButtonRef,
  uploadBackgroundButtonRef,
  username,
}: IDropdownActionsModalRenderingProps) => {
  return (
    <>
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
