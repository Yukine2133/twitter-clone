"use client";

import type React from "react";

import { IUser } from "@/interfaces/user.interface";

import EditProfileFormInput from "../profile/EditProfileFormInput";
import { AvatarUpload } from "../profile/AvatarUpload";
import { useOnboardingForm } from "@/hooks/useOnboardingForm";

interface OnboardingFormProps {
  dbUser: IUser;
}

const OnboardingForm = ({ dbUser }: OnboardingFormProps) => {
  const {
    avatar,
    setAvatar,
    avatarProgress,
    setAvatarProgress,
    username,
    setUsername,
    name,
    setName,
    location,
    setLocation,
    bio,
    setBio,
    uploadAvatarButtonRef,
    handleSubmit,
  } = useOnboardingForm(dbUser);
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
