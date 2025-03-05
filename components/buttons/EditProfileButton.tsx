"use client";

import { toast } from "react-toastify";
import Modal from "../tweets/Modal";
import Image from "next/image";
import { UploadButton } from "@/utils/lib/uploadthing";
import { IUser } from "@/interfaces/user.interface";
import ReactTextareaAutosize from "react-textarea-autosize";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useEditProfileButton from "@/hooks/buttonsLogic/useEditProfileButton";
import Loading from "../Loading";
import EditProfileFormInput from "../profile/EditProfileFormInput";

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
              <div className="relative">
                <div className="relative group cursor-pointer h-48 w-full bg-neutral-800">
                  {backgroundImage && (
                    <Image
                      src={backgroundImage || "/placeholder.svg"}
                      alt="Background"
                      fill
                      className="object-cover"
                    />
                  )}
                  <div
                    className={`absolute inset-0 flex items-center justify-center gap-4 bg-black/60 ${
                      !backgroundProgress &&
                      "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    }`}
                    onClick={() => handleImageClick(uploadBackgroundButtonRef)}
                  >
                    {backgroundProgress > 0 ? (
                      <Loading className="mt-0" />
                    ) : (
                      <CameraIcon className="h-8 w-8 text-white" />
                    )}
                  </div>
                </div>

                <div ref={uploadBackgroundButtonRef}>
                  <UploadButton
                    className="hidden"
                    endpoint="messageMedia"
                    onClientUploadComplete={(res: any) => {
                      if (res?.[0].url) setBackgroundImage(res[0].url);
                      setBackgroundProgress(0);
                    }}
                    onUploadProgress={setBackgroundProgress}
                    onUploadError={(error: Error) => {
                      toast.error(`Upload error: ${error.message}`);
                    }}
                  />
                </div>

                <div
                  className="absolute -bottom-16 left-4 group cursor-pointer"
                  onClick={() => handleImageClick(uploadAvatarButtonRef)}
                >
                  <div className="relative h-28 w-28">
                    <Image
                      src={avatar || "/placeholder.svg"}
                      alt="Avatar"
                      width={112}
                      height={112}
                      className="rounded-full max-h-28 border-4 border-black object-cover"
                    />
                    <div
                      className={`absolute inset-0 flex items-center justify-center rounded-full bg-black/60 ${
                        !avatarProgress &&
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      } `}
                    >
                      {avatarProgress > 0 ? (
                        <Loading className="mt-0" />
                      ) : (
                        <CameraIcon className="h-8 w-8 text-white" />
                      )}
                    </div>
                  </div>

                  <div ref={uploadAvatarButtonRef}>
                    <UploadButton
                      className="hidden"
                      endpoint="messageMedia"
                      onClientUploadComplete={(res: any) => {
                        if (res?.[0].url) setAvatar(res[0].url);
                        setAvatarProgress(0);
                      }}
                      onUploadProgress={setAvatarProgress}
                      onUploadError={(error: Error) => {
                        toast.error(`Upload error: ${error.message}`);
                      }}
                    />
                  </div>
                </div>
              </div>

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
