import { XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "../tweets/Modal";
import * as solid from "@heroicons/react/24/solid";
import { IBookmarkFolder } from "@/interfaces/bookmark.interface";

interface IBookmarkModalProps {
  isBookmarkFolderModalOpen: boolean;
  setIsBookmarkFolderModalOpen: (arg0: boolean) => void;
  userBookmarkFolders: IBookmarkFolder[];
  handleBookmarkFolderClick: (id: string) => void;
}

const colors = [
  "bg-purple-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-lime-500",
  "bg-cyan-500",
  "bg-fuchsia-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-indigo-500",
];

export const BookmarkModal = ({
  isBookmarkFolderModalOpen,
  setIsBookmarkFolderModalOpen,
  userBookmarkFolders,
  handleBookmarkFolderClick,
}: IBookmarkModalProps) => {
  const SolidBookmarkIcon = solid.BookmarkIcon;
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
        {userBookmarkFolders?.map((folder: any, index: number) => {
          const colorClass = colors[index % colors.length];
          return (
            <div key={folder._id}>
              <button
                onClick={() => handleBookmarkFolderClick(folder._id)}
                className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-gray-600/20 transition-colors duration-300 w-full"
              >
                <div className="flex items-center gap-4">
                  <div className={`${colorClass} rounded-full p-[10px]`}>
                    <SolidBookmarkIcon className="size-6 z-10" />
                  </div>
                  <p>{folder.name}</p>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
