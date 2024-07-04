"use client";

import { deleteBookmarkFolder } from "@/actions/bookmark.actions";
import { useMoreButtonClickOutside } from "@/utils/lib/hooks/useClickOutisde";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const MoreButtonBookmarkFolder = ({ name }: { name: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const router = useRouter();

  useMoreButtonClickOutside(buttonRef, setIsOpen);

  const handleDelete = async () => {
    try {
      const res = await deleteBookmarkFolder(name);
      console.log(res);
      router.push("/bookmarks");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="rotate-90 text-gray-500 hover:text-blue-400 duration-300 transition-all  "
      >
        &#10247;
      </button>
      {isOpen && (
        <div
          className="top-2 right-3
               absolute p-3 z-10 bg-black"
        >
          <button
            // onClick={() => {
            //   setEdit(!edit);
            //   setIsOpen(false);
            // }}
            className="text-blue-500 flex items-center gap-2"
          >
            <PencilIcon className="h-5 w-5" /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 flex items-center gap-2"
          >
            <TrashIcon className="h-5 w-5" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default MoreButtonBookmarkFolder;
