"use client";

import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
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
          className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-600 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          New
        </button>
      )}
      {(isModalOpen || edit) && (
        <Modal
          isModalOpen={isModalOpen || (edit as boolean)}
          toggleModal={toggleModal}
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-neutral-800 p-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleModal}
                  className="rounded-full p-2 hover:bg-neutral-800 transition-colors"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <h2 className="text-xl font-bold">
                  {edit ? "Edit Folder" : "Create a Folder"}
                </h2>
              </div>
              <button
                type="submit"
                form="folderForm"
                className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-black hover:bg-white/90 transition-colors disabled:opacity-50"
                disabled={name.trim().length === 0}
              >
                {edit ? "Save" : "Create"}
              </button>
            </div>
            <form id="folderForm" onSubmit={handleSubmit} className="p-4">
              <div className="relative rounded-md border border-neutral-700 focus-within:border-blue-500">
                <label
                  htmlFor="folderName"
                  className="absolute -top-2.5 left-2 bg-black px-1 text-xs text-neutral-500"
                >
                  Name
                </label>
                <input
                  id="folderName"
                  autoFocus
                  maxLength={25}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent px-3 py-4 text-lg outline-none"
                />
                <span className="absolute bottom-2 right-2 text-sm text-neutral-500">
                  {name.length}/25
                </span>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddOrEditBookmarkFolderButton;
