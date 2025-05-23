"use client";

import Modal from "@/components/tweets/Modal";
import TweetForm from "@/components/tweets/tweetForm/TweetForm";
import { IUser } from "@/interfaces/user.interface";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { createPortal } from "react-dom";

export const LeftSideBarButtons = ({ currentUser }: { currentUser: IUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="bg-blue-500 rounded-full px-3 py-3 hover:opacity-80 hidden lg:block font-semibold"
      >
        Tweet
      </button>
      <button
        onClick={toggleModal}
        className="bg-blue-500 rounded-full px-3 py-3 hover:opacity-80 lg:hidden -translate-x-[7px]"
      >
        <PencilIcon className="h-5 w-5" />
      </button>

      {isModalOpen &&
        createPortal(
          <Modal
            className="pt-6"
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
          >
            <TweetForm user={currentUser} toggleModal={toggleModal} />
          </Modal>,
          document.body
        )}
    </>
  );
};
