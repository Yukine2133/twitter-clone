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
import { IDropdownActionsModalRenderingProps } from "@/interfaces/props.interface";

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
