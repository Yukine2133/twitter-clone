"use client";

import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";
import Modal from "../tweets/Modal";
import { addBookmarkFolder } from "@/actions/bookmark.actions";
import { toast } from "react-toastify";

const AddBookmarkFolderButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await addBookmarkFolder(name);
      toast.success("Folder was created successfully.");
    } catch (error) {
      console.error(error);
    } finally {
      setName("");
      toggleModal();
    }
  };
  return (
    <>
      <button
        onClick={toggleModal}
        className="flex items-center gap-2 hover:opacity-85 transition-opacity duration-300"
      >
        <PlusIcon className="size-6" /> Add Folder
      </button>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          className="md:p-4"
        >
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <button onClick={toggleModal}>
                  <ArrowLeftIcon className="size-5" />
                </button>
                <h4 className="font-semibold text-gray-200 text-lg">
                  Create a Folder
                </h4>
              </div>
              <button
                type="submit"
                className="bg-white text-black rounded-full  font-medium px-3 py-1"
              >
                Create
              </button>
            </div>
            <div className="rounded-md relative p-2 mt-5 border  border-[#3b3b3b]   w-full">
              <label className="mb-2 text-stone-500">Name:</label>
              <input
                maxLength={25}
                value={name}
                className="bg-transparent  mt-2 w-full outline-none   "
                onChange={(e) => setName(e.target.value)}
              />
              <p className="absolute right-1 text-sm text-gray-400 top-1  ">
                {name.length}/25
              </p>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddBookmarkFolderButton;
