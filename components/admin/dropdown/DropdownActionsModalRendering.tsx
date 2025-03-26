import { EditProfileModal } from "@/components/profile/editProfile/EditProfileModal";
import { MoreButtonProfileModal } from "@/components/profile/moreButton/MoreButtonProfileModal";

import { IDropdownActionsModalRenderingProps } from "@/interfaces/props.interface";
import { DeleteUserModal } from "./DeleteUserModal";

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
      {/* Edit profile modal */}
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

      {/* Ban modal */}
      {isBanModalOpen && (
        <MoreButtonProfileModal
          banReason={banReason}
          setBanReason={setBanReason}
          isBanModalOpen={isBanModalOpen}
          setIsBanModalOpen={setIsBanModalOpen}
          handleBanSubmit={handleBanSubmit}
        />
      )}

      {/* Delete User Modal */}
      <DeleteUserModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleDeleteSubmit={handleDeleteSubmit}
      />
    </>
  );
};
