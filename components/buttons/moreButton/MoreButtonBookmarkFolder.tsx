"use client";

import { deleteBookmarkFolder } from "@/actions/bookmark.actions";
import { useMoreButtonClickOutside } from "@/hooks/useClickOutisde";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import AddOrEditBookmarkFolderButton from "../AddOrEditBookmarkFolderButton";
import MoreButtonEllipsis from "./MoreButtonEllipsis";
import MoreButtonDropdown from "./MoreButtonDropdown";

const MoreButtonBookmarkFolder = ({ name }: { name: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [edit, setEdit] = useState(false);

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
      <MoreButtonEllipsis
        className="lg:opacity-100"
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <MoreButtonDropdown className="top-2" isOpen={isOpen}>
          <button
            onClick={() => {
              setEdit(!edit);
              setIsOpen(false);
            }}
            className="flex w-full text-blue-500 items-center gap-3 px-4 py-3 text-left text-[15px] transition-colors hover:bg-white/10"
          >
            <PencilIcon className="h-5 w-5" /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] transition-colors hover:bg-white/10"
          >
            <TrashIcon className="h-5 w-5" /> Delete
          </button>
        </MoreButtonDropdown>
      )}
      {edit && (
        <AddOrEditBookmarkFolderButton
          edit={edit}
          setEdit={setEdit}
          folderName={name}
        />
      )}
    </div>
  );
};

export default MoreButtonBookmarkFolder;
