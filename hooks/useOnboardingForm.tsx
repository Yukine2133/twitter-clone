import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateUser } from "@/actions/user.actions";
import { IUser } from "@/interfaces/user.interface";
export const useOnboardingForm = (dbUser: IUser) => {
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
        userId: dbUser.userId,
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

  return {
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
  };
};
