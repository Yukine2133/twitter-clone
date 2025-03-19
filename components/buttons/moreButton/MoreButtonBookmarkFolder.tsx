"use client";

import { deleteBookmarkFolder } from "@/actions/bookmark.actions";
import { useMoreButtonClickOutside } from "@/hooks/useClickOutside";
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
        <MoreButtonDropdown
          isOpen={isOpen}
          handleDelete={handleDelete}
          handleEdit={() => {
            setEdit(!edit);
            setIsOpen(false);
          }}
        />
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
