"use client";

import { FormEvent, useState } from "react";
import Modal from "../tweets/Modal";
import { z } from "zod";
import Image from "next/image";

import { toast } from "react-toastify";
import { UploadButton } from "@/utils/lib/uploadthing";
import { updateUser } from "@/actions/user.actions";
import { IUser } from "@/types/user.interface";
import { bioSchema, locationSchema, nameSchema } from "@/utils/lib/validation";
import ReactTextareaAutosize from "react-textarea-autosize";

const UpdateProfileButton = ({ user }: { user: IUser }) => {
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

      // Validate name
      nameSchema.parse(name);

      // Validate bio
      bioSchema.parse(bio);

      // Validate location
      locationSchema.parse(location);

      const res = await updateUser({ userId, location, bio, avatar, name });

      if (res?.message) {
        toast.error(res.message);
      } else {
        toast.success("Profile was updated successfully");
      }

      setIsModalOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0].message;
        toast.error(errorMessage);
      } else {
        toast.error(String(error));
      }
    }
  };

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
