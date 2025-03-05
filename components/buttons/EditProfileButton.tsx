"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "../tweets/Modal";
import { IUser } from "@/interfaces/user.interface";
import useEditProfileButton from "@/hooks/buttonsLogic/useEditProfileButton";
import EditProfileFormInput from "../profile/EditProfileFormInput";
import { EditProfileImageUpload } from "../profile/EditProfileImageUpload";

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
    handleImageClick,
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
                handleImageClick={handleImageClick}
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

                <div className="flex items-center justify-between rounded-md border border-neutral-800 px-3 py-3">
                  <span className="text-sm">Private profile</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isPrivate}
                    onClick={() => setIsPrivate(!isPrivate)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      isPrivate ? "bg-blue-500" : "bg-neutral-700"
                    }`}
                  >
                    <span
                      className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                        isPrivate ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UpdateProfileButton;
