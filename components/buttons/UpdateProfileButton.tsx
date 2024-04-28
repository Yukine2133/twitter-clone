"use client";

import { FormEvent, useState } from "react";
import Modal from "../tweets/Modal";
import Image from "next/image";

import { toast } from "react-toastify";
import { UploadButton } from "@/utils/lib/uploadthing";
import { updateUser } from "@/actions/user.actions";
import { useRouter } from "next/navigation";

const UpdateProfileButton = ({ user }: any) => {
  const [name, setName] = useState(user.displayName ? user.displayName : "");
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const [location, setLocation] = useState(user.location ? user.location : "");
  const [avatar, setAvatar] = useState(user.avatar ? user.avatar : "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = user.userId;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const res = await updateUser({ userId, location, bio, avatar, name });

      if (res?.message) {
        toast.error(res.message);
      } else {
        toast.success("Profile was updated successfully");
      }

      setIsModalOpen(false);
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="bg-white text-black py-1 px-3 rounded-full"
      >
        Update Profile
      </button>

      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} toggleModal={toggleModal}>
          <form onSubmit={handleSubmit} className="mt-8 text-start">
            <div className="mb-4">
              <label className="text-lg">Avatar:</label>
              <div className="flex justify-center items-center gap-2">
                <Image
                  className="rounded-full w-auto "
                  src={avatar}
                  alt={user.username}
                  width={72}
                  height={72}
                />
                <UploadButton
                  className="pt-4"
                  endpoint={`media`}
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
              <label className="mb-2 text-lg">Display name:</label>
              <input
                value={name}
                className="bg-[#3b3b3b] outline-none rounded-md p-2"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col my-3 ">
              <label className="mb-2 text-lg">Bio:</label>
              <textarea
                value={bio}
                className="bg-[#3b3b3b] outline-none rounded-md p-2"
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="flex flex-col ">
              <label className="mb-2 text-lg">Location:</label>
              <input
                value={location}
                className="bg-[#3b3b3b] outline-none rounded-md p-2"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-12 mx-auto flex justify-center bg-white text-black p-2 rounded-md"
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
