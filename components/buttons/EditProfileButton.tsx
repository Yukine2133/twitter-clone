"use client";

import { toast } from "react-toastify";
import Modal from "../tweets/Modal";
import Image from "next/image";
import { UploadButton } from "@/utils/lib/uploadthing";
import { IUser } from "@/interfaces/user.interface";
import ReactTextareaAutosize from "react-textarea-autosize";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useEditProfileButton from "@/hooks/buttonsLogic/useEditProfileButton";
import { useRef, useState } from "react";

const UpdateProfileButton = ({ user }: { user: IUser }) => {
  const {
    toggleModal,
    isModalOpen,
    name,
    setName,
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
  } = useEditProfileButton({ user });

  const [isHovered, setIsHovered] = useState(false);

  const uploadButtonRef = useRef<HTMLDivElement>(null);

  const handleImageClick = () => {
    const uploadDiv = uploadButtonRef.current;
    if (uploadDiv) {
      const input = uploadDiv.querySelector(
        "input[type='file']"
      ) as HTMLDivElement;
      if (input) {
        input.click(); // 🎯 Trigger file input click
      }
    }
  };

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
                <div className="relative h-48 w-full bg-neutral-800">
                  {backgroundImage && (
                    <Image
                      src={backgroundImage || "/placeholder.svg"}
                      alt="Background"
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50">
                    <UploadButton
                      className="ut-button:bg-black/50 ut-button:rounded-full ut-button:p-2 ut-button:transition-colors ut-button:hover:bg-black/70"
                      endpoint="messageMedia"
                      onClientUploadComplete={(res: any) => {
                        if (res?.[0].url) setBackgroundImage(res[0].url);
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(`Upload error: ${error.message}`);
                      }}
                    />
                  </div>
                </div>

                <div
                  className="absolute -bottom-16 left-4 group cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={handleImageClick}
                >
                  <div className="relative h-28 w-28">
                    <Image
                      src={avatar || "/placeholder.svg"}
                      alt="Avatar"
                      width={112}
                      height={112}
                      className="rounded-full max-h-28 border-4 border-black object-cover"
                    />
                    {isHovered && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 transition-all">
                        <CameraIcon className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </div>

                  <div ref={uploadButtonRef}>
                    <UploadButton
                      className="hidden"
                      endpoint="messageMedia"
                      onClientUploadComplete={(res: any) => {
                        if (res?.[0].url) setAvatar(res[0].url);
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(`Upload error: ${error.message}`);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-14">
                <div className="group relative rounded-md border border-neutral-800 px-3 py-2 focus-within:border-blue-500">
                  <label className="block text-xs text-neutral-500">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={50}
                    className="mt-1 w-full bg-transparent text-base outline-none"
                  />
                  <span className="absolute right-3 top-3 text-xs text-neutral-500">
                    {name.length}/50
                  </span>
                </div>

                <div className="group relative rounded-md border border-neutral-800 px-3 py-2 focus-within:border-blue-500">
                  <label className="block text-xs text-neutral-500">Bio</label>
                  <ReactTextareaAutosize
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    maxLength={160}
                    className="mt-1 w-full resize-none bg-transparent text-base outline-none"
                  />
                  <span className="absolute right-3 top-3 text-xs text-neutral-500">
                    {bio.length}/160
                  </span>
                </div>

                <div className="group relative rounded-md border border-neutral-800 px-3 py-2 focus-within:border-blue-500">
                  <label className="block text-xs text-neutral-500">
                    Location
                  </label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    maxLength={30}
                    className="mt-1 w-full bg-transparent text-base outline-none"
                  />
                  <span className="absolute right-3 top-3 text-xs text-neutral-500">
                    {location.length}/30
                  </span>
                </div>

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
