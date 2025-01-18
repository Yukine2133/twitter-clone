"use client";

import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import Modal from "../tweets/Modal";
import useAddOrEditBookmarkFolderButton from "@/hooks/buttonsLogic/useAddOrEditBookmarkFolderButton";

const AddOrEditBookmarkFolderButton = ({
  edit,
  setEdit,
  folderName,
}: {
  edit?: boolean;
  setEdit?: (arg0: boolean) => void;
  folderName?: string;
}) => {
  const { isModalOpen, toggleModal, name, setName, handleSubmit } =
    useAddOrEditBookmarkFolderButton({
      edit,
      setEdit,
      folderName,
    });
  return (
    <>
      {!edit && (
        <button
          onClick={toggleModal}
          className="flex items-center gap-2 hover:opacity-85 transition-opacity duration-300"
        >
          <PlusIcon className="size-6" /> Add Folder
        </button>
      )}
      {(isModalOpen || edit) && (
        <Modal
          isModalOpen={isModalOpen || (edit as boolean)}
          toggleModal={toggleModal}
          className="md:p-4"
        >
          <form onSubmit={handleSubmit}>
            {!edit && (
              <div className="flex  mb-5 items-center justify-between">
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
            )}
            <div className="rounded-md relative p-2  border  border-[#3b3b3b]   w-full">
              <label className="mb-2 text-stone-500">Name:</label>
              <input
                autoFocus
                maxLength={25}
                value={name}
                className="bg-transparent  mt-2 w-full outline-none   "
                onChange={(e) => setName(e.target.value)}
              />
              <p className="absolute right-1 text-sm text-gray-400 top-1">
                {name.length}/25
              </p>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddOrEditBookmarkFolderButton;
