import Modal from "@/components/tweets/Modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EditProfileImageUpload } from "./EditProfileImageUpload";
import EditProfileFormInput from "./EditProfileFormInput";
import EditPrivateProfileToggle from "./EditPrivateProfileToggle";
import { FormEvent } from "react";

export interface IEditProfileModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
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
  backgroundProgress: number;
  setBackgroundProgress: React.Dispatch<React.SetStateAction<number>>;
  avatarProgress: number;
  setAvatarProgress: React.Dispatch<React.SetStateAction<number>>;
}

export const EditProfileModal = ({
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
}: IEditProfileModalProps) => {
  return (
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
  );
};
