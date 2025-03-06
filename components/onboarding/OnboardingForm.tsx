"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { UploadButton } from "@/utils/lib/uploadthing";
import { updateUser } from "@/actions/user.actions";
import { IUser } from "@/interfaces/user.interface";
import ReactTextareaAutosize from "react-textarea-autosize";

interface OnboardingFormProps {
  userId: string;
  dbUser: IUser;
}

const OnboardingForm = ({ userId, dbUser }: OnboardingFormProps) => {
  const router = useRouter();
  const [avatar, setAvatar] = useState(dbUser ? dbUser.avatar : "");
  const [username, setUsername] = useState(dbUser ? dbUser.username : "");
  const [name, setName] = useState(dbUser ? dbUser.displayName : "");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

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
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src={avatar || "/placeholder.svg"}
            alt="Avatar"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <UploadButton
          endpoint="messageMedia"
          onClientUploadComplete={(res) => {
            setAvatar(res?.[0]?.url || "");
            toast.success("Avatar uploaded!");
          }}
          onUploadError={(error: Error) => {
            toast.error(`ERROR! ${error.message}`);
          }}
        />
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 bg-neutral-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Display Name
        </label>
        <input
          type="text"
          id="displayName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 bg-neutral-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium mb-2">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-3 py-2 bg-neutral-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium mb-2">
          Bio
        </label>
        <ReactTextareaAutosize
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full px-3 max-h-20 py-2 bg-neutral-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
        />
      </div>

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
