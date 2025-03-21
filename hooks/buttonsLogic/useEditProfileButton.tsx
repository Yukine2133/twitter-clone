import { FormEvent, useRef, useState } from "react";
import { z } from "zod";
import { updateUser } from "@/actions/user.actions";
import {
  bioSchema,
  locationSchema,
  nameSchema,
  usernameSchema,
} from "@/utils/lib/validation";
import { toast } from "react-toastify";
import { IUser } from "@/interfaces/user.interface";
const useEditProfileButton = ({ user }: { user: IUser }) => {
  const [username, setUsername] = useState(user.username ? user.username : "");
  const [name, setName] = useState(user.displayName ? user.displayName : "");
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const [location, setLocation] = useState(user.location ? user.location : "");
  const [avatar, setAvatar] = useState(user.avatar ? user.avatar : "");
  const [backgroundImage, setBackgroundImage] = useState(
    user.backgroundImage ? user.backgroundImage : ""
  );
  const [isPrivate, setIsPrivate] = useState(user.private);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [avatarProgress, setAvatarProgress] = useState(0);
  const [backgroundProgress, setBackgroundProgress] = useState(0);

  const userId = user.userId;

  const uploadAvatarButtonRef = useRef<HTMLDivElement>(null);
  const uploadBackgroundButtonRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      // Validation
      usernameSchema.parse(username);
      nameSchema.parse(name);
      bioSchema.parse(bio);
      locationSchema.parse(location);

      const res = await updateUser({
        username,
        userId,
        location,
        bio,
        avatar,
        name,
        backgroundImage,
        private: isPrivate,
        onboarded: true,
      });

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
  return {
    toggleModal,
    isModalOpen,
    username,
    setUsername,
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
    uploadAvatarButtonRef,
    uploadBackgroundButtonRef,

    backgroundProgress,
    setBackgroundProgress,
    avatarProgress,
    setAvatarProgress,
  };
};

export default useEditProfileButton;
