"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "../tweets/Modal";
import { IUser } from "@/interfaces/user.interface";
import useEditProfileButton from "@/hooks/buttonsLogic/useEditProfileButton";
import EditProfileFormInput from "../profile/editProfile/EditProfileFormInput";
import { EditProfileImageUpload } from "../profile/editProfile/EditProfileImageUpload";
import EditPrivateProfileToggle from "../profile/editProfile/EditPrivateProfileToggle";
import { EditProfileModal } from "../profile/editProfile/EditProfileModal";

const UpdateProfileButton = ({ user }: { user: IUser }) => {
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

  return (
    <>
      <button
        onClick={toggleModal}
        className="rounded-full border border-neutral-600 px-4 py-1.5 font-bold transition-colors hover:bg-white/10"
      >
        Edit profile
      </button>

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
    </>
  );
};

export default UpdateProfileButton;
