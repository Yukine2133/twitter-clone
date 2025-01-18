"use client";

import { toast } from "react-toastify";
import Modal from "../tweets/Modal";
import Image from "next/image";
import { UploadButton } from "@/utils/lib/uploadthing";
import { IUser } from "@/interfaces/user.interface";
import ReactTextareaAutosize from "react-textarea-autosize";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useEditProfileButton from "@/hooks/buttonsLogic/useEditProfileButton";

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
  } = useEditProfileButton({ user });

  return (
    <>
      <button
        onClick={toggleModal}
        className="bg-transparent text-white border border-stone-500 font-semibold py-1 px-3 rounded-full"
      >
        Edit Profile
      </button>

      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} toggleModal={toggleModal}>
          <form
            onSubmit={handleSubmit}
            className="relative h-[550px]  text-start mt-10 sm:mt-0 "
          >
            <button onClick={toggleModal} className="absolute right-0">
              <XMarkIcon className="w-5 h-5" />
            </button>
            <div className="mb-4 ">
              <label className="text-lg  ">Background Image:</label>
              <div className="flex flex-col justify-center items-center gap-2">
                {backgroundImage ? (
                  <Image
                    className="object-cover w-full h-48 md:h-56  mt-2 "
                    src={backgroundImage}
                    alt="Background Image"
                    width={1200}
                    height={350}
                  />
                ) : (
                  <div className="w-full mt-2 h-48 md:h-56  bg-[#333639]" />
                )}
                <UploadButton
                  className="pt-4"
                  endpoint={`messageMedia`}
                  onClientUploadComplete={(res: any) => {
                    if (res?.[0].url) {
                      setBackgroundImage(res[0].url);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(
                      `Something went wrong when uploading the image: ${error.message}`
                    );
                  }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-lg">Avatar:</label>
              <div className="flex justify-center items-center gap-2">
                <Image
                  className="rounded-full w-auto "
                  src={avatar}
                  alt="User Avatar"
                  width={72}
                  height={72}
                />
                <UploadButton
                  className="pt-4"
                  endpoint={`messageMedia`}
                  onClientUploadComplete={(res: any) => {
                    if (res?.[0].url) {
                      setAvatar(res[0].url);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(
                      `Something went wrong when uploading the image: ${error.message}`
                    );
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="rounded-md relative p-2 border  border-[#3b3b3b]   w-full">
                <label className="mb-2 text-stone-500">Display name:</label>
                <input
                  maxLength={50}
                  value={name}
                  className="bg-transparent mt-2 w-full outline-none   "
                  onChange={(e) => setName(e.target.value)}
                />
                <p className="absolute right-1 text-sm text-gray-400 top-1  ">
                  {name.length}/50
                </p>
              </div>
            </div>
            <div className="flex flex-col my-3 ">
              <div className="rounded-md relative p-2 border  border-[#3b3b3b]   w-full">
                <label className="mb-2 text-stone-500">Bio:</label>
                <ReactTextareaAutosize
                  value={bio}
                  rows={1}
                  maxLength={160}
                  className="bg-transparent mt-2 w-full resize-none outline-none   "
                  onChange={(e) => setBio(e.target.value)}
                />{" "}
                <p className="absolute right-1 text-sm text-gray-400 top-1  ">
                  {bio.length}/160
                </p>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="rounded-md relative p-2 border  border-[#3b3b3b]   w-full">
                <label className="mb-2 text-stone-500">Location:</label>
                <input
                  maxLength={30}
                  value={location}
                  className="bg-transparent w-full mt-2  outline-none relative  "
                  onChange={(e) => setLocation(e.target.value)}
                />
                <p className="absolute right-1 text-sm text-gray-400 top-1  ">
                  {location.length}/30
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 mx-auto flex justify-center bg-white text-black p-2 rounded-md"
            >
              Complete
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default UpdateProfileButton;
