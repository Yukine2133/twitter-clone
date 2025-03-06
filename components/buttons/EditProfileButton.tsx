"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "../tweets/Modal";
import { IUser } from "@/interfaces/user.interface";
import useEditProfileButton from "@/hooks/buttonsLogic/useEditProfileButton";
import EditProfileFormInput from "../profile/EditProfileFormInput";
import { EditProfileImageUpload } from "../profile/EditProfileImageUpload";
import EditPrivateProfileToggle from "../profile/EditPrivateProfileToggle";

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

      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} toggleModal={toggleModal}>
          <div className="relative">
            <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-4">
              <div className="flex items-center gap-8">
                <button onClick={toggleModal}>
                  <XMarkIcon className="h-5 w-5" />
                </button>
                <h2 className="text-xl font-bold">Edit profile</h2>
              </div>
              <button
                onClick={handleSubmit}
                className="rounded-full bg-white px-4 py-1 font-bold text-black transition-opacity hover:opacity-90"
              >
                Save
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-4">
              <EditProfileImageUpload
                avatar={avatar}
                avatarProgress={avatarProgress}
                backgroundImage={backgroundImage}
                backgroundProgress={backgroundProgress}
                uploadAvatarButtonRef={uploadAvatarButtonRef}
                uploadBackgroundButtonRef={uploadBackgroundButtonRef}
                setBackgroundImage={setBackgroundImage}
                setAvatar={setAvatar}
                setAvatarProgress={setAvatarProgress}
                setBackgroundProgress={setBackgroundProgress}
              />

              <div className="space-y-4 pt-14">
                <EditProfileFormInput
                  label="Username"
                  value={username}
                  onChange={setUsername}
                  maxLength={20}
                />
                <EditProfileFormInput
                  label="Display Name"
                  value={name}
                  onChange={setName}
                  maxLength={50}
                />
                <EditProfileFormInput
                  label="Bio"
                  value={bio}
                  onChange={setBio}
                  maxLength={160}
                  isTextarea
                />
                <EditProfileFormInput
                  label="Location"
                  value={location}
                  onChange={setLocation}
                  maxLength={30}
                />

                <EditPrivateProfileToggle
                  isPrivate={isPrivate}
                  setIsPrivate={setIsPrivate}
                />
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UpdateProfileButton;
