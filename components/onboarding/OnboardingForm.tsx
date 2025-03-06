"use client";

import type React from "react";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { UploadButton } from "@/utils/lib/uploadthing";
import { updateUser } from "@/actions/user.actions";
import { IUser } from "@/interfaces/user.interface";
import ReactTextareaAutosize from "react-textarea-autosize";
import EditProfileFormInput from "../profile/EditProfileFormInput";
import { AvatarUpload } from "../profile/AvatarUpload";

interface OnboardingFormProps {
  userId: string;
  dbUser: IUser;
}

const OnboardingForm = ({ userId, dbUser }: OnboardingFormProps) => {
  const router = useRouter();
  const [avatar, setAvatar] = useState(dbUser ? dbUser.avatar : "");
  const [avatarProgress, setAvatarProgress] = useState(0);
  const [username, setUsername] = useState(dbUser ? dbUser.username : "");
  const [name, setName] = useState(dbUser ? dbUser.displayName : "");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  const uploadAvatarButtonRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !name) {
      toast.error("Username and display name are required.");
      return;
    }
    try {
      await updateUser({
        userId,
        username,
        name,
        avatar,
        location,
        bio,
        onboarded: true,
        backgroundImage: "",
        private: false,
      });
      toast.success("Profile updated successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Error updating profile. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AvatarUpload
        avatar={avatar}
        setAvatar={setAvatar}
        avatarProgress={avatarProgress}
        setAvatarProgress={setAvatarProgress}
        uploadAvatarButtonRef={uploadAvatarButtonRef}
        className="flex justify-center items-center"
      />

      <EditProfileFormInput
        label="Username"
        value={username}
        onChange={(value) => setUsername(value)}
        maxLength={20}
        placeholder="Username"
        isTextarea={false}
      />

      <EditProfileFormInput
        label="Display Name"
        value={name}
        onChange={(value) => setName(value)}
        maxLength={20}
        placeholder="Display Name"
        isTextarea={false}
      />

      <EditProfileFormInput
        label="Location"
        value={location}
        onChange={(value) => setLocation(value)}
        maxLength={50}
        placeholder="Location"
        isTextarea={false}
      />

      <EditProfileFormInput
        label="Bio"
        value={bio}
        onChange={(value) => setBio(value)}
        maxLength={160}
        placeholder="Bio"
        isTextarea={true}
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Complete Profile
      </button>
    </form>
  );
};

export default OnboardingForm;
