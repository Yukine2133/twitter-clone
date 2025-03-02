import { XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "../tweets/Modal";
import type { IBookmarkFolder } from "@/interfaces/bookmark.interface";
import BookmarkFolderItem from "./BookmarkFolderItem";
import AddOrEditBookmarkFolderButton from "../buttons/AddOrEditBookmarkFolderButton";

interface IBookmarkModalProps {
  isBookmarkFolderModalOpen: boolean;
  setIsBookmarkFolderModalOpen: (arg0: boolean) => void;
  userBookmarkFolders: IBookmarkFolder[];
  handleBookmarkFolderClick: (id: string) => void;
}

export const BookmarkModal = ({
  isBookmarkFolderModalOpen,
  setIsBookmarkFolderModalOpen,
  userBookmarkFolders,
  handleBookmarkFolderClick,
}: IBookmarkModalProps) => {
  return (
    <Modal
      isModalOpen={isBookmarkFolderModalOpen}
      toggleModal={() => setIsBookmarkFolderModalOpen(false)}
    >
      <div className="max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-neutral-800">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsBookmarkFolderModalOpen(false)}
              className="rounded-full p-2 hover:bg-neutral-800 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold">Add to Folder</h2>
          </div>
          <AddOrEditBookmarkFolderButton />
        </div>

        <div className="overflow-y-auto flex-grow">
          {userBookmarkFolders.length === 0 ? (
            <div className="p-4 text-center text-neutral-500">
              No folders yet. Create your first folder!
            </div>
          ) : (
            userBookmarkFolders.map((folder, index: number) => (
              <BookmarkFolderItem
                key={folder._id}
                folder={folder}
                index={index}
                onClick={() => handleBookmarkFolderClick(folder._id)}
                asLink={false}
              />
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};
