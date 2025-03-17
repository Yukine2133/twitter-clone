"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Modal from "../tweets/Modal";
import { IUser } from "@/interfaces/user.interface";
import { updateUser } from "@/actions/user.actions";
import { usernameSchema } from "@/utils/lib/validation";
import { z } from "zod";

interface OnboardingModalProps {
  user: IUser;
}

const OnboardingModal = ({ user }: OnboardingModalProps) => {
  const [username, setUsername] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(user.onboarded ? false : true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }
    if (username === user.username) {
      toast.error("Username cannot be the same as your current username");
      return;
    }

    try {
      setIsSubmitting(true);
      // Only update the user's username
      await updateUser({
        username,
        userId: user.userId,
        name: user.displayName,
        avatar: user.avatar,
        location: user.location,
        bio: user.bio,
        onboarded: true,
        backgroundImage: user.backgroundImage,
        private: user.private,
      });

      // if (response.error) {
      //   toast.error(response.error);
      //   return;
      // }

      toast.success("Username set successfully!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to set username. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    try {
      setIsModalOpen(false);
      // Only update the user's onboarded status
      await updateUser({
        username: user.username,
        userId: user.userId,
        name: user.displayName,
        avatar: user.avatar,
        location: user.location,
        bio: user.bio,
        onboarded: true,
        backgroundImage: user.backgroundImage,
        private: user.private,
      });
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <Modal isModalOpen={isModalOpen} toggleModal={handleSkip}>
      <div className="p-6 flex flex-col items-center">
        <Image
          src="/twitter-logo-2.png"
          alt="Twitter Logo"
          width={40}
          height={40}
          className="mb-6"
        />

        <h2 className="text-2xl font-bold mb-2">What should we call you?</h2>
        <p className="text-neutral-500 mb-6 text-center">
          Your @username is unique. You can always change it later.
        </p>

        <div className="w-full mb-6">
          <label
            htmlFor="username"
            className="text-sm text-neutral-500 mb-1 block"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-black border border-neutral-800 rounded-md focus:border-blue-500 focus:outline-none"
            placeholder="Username"
          />
          {username === user.username && (
            <p className="text-xs text-red-500 mt-1">
              This is your current username.
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-3 bg-neutral-200 text-black font-bold rounded-full mb-3 hover:bg-neutral-300 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Setting username..." : "Set username"}
        </button>

        <button
          onClick={handleSkip}
          className="w-full py-3 bg-transparent border border-neutral-800 text-white font-bold rounded-full hover:bg-neutral-900 transition-colors"
        >
          Skip
        </button>
      </div>
    </Modal>
  );
};

export default OnboardingModal;
