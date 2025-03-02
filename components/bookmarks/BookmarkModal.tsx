import { XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "../tweets/Modal";
import { IBookmarkFolder } from "@/interfaces/bookmark.interface";
import BookmarkFolderItem from "./BookmarkFolderItem";

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
      className="md:p-4"
      isModalOpen={isBookmarkFolderModalOpen}
      toggleModal={() => setIsBookmarkFolderModalOpen(false)}
    >
      <div className="">
        <div className="flex items-center gap-6 mb-4">
          <XMarkIcon
            onClick={() => setIsBookmarkFolderModalOpen(false)}
            className="size-6 cursor-pointer"
          />
          <h5 className="font-semibold text-xl">Add to Folder</h5>
        </div>
        {userBookmarkFolders?.map((folder: IBookmarkFolder, index: number) => (
          <BookmarkFolderItem
            key={folder._id}
            folder={folder}
            index={index}
            onClick={() => handleBookmarkFolderClick(folder._id)}
            asLink={false}
          />
        ))}
      </div>
    </Modal>
  );
};
