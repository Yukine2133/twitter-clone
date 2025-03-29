"use client";

import { deleteBookmarkFolder } from "@/actions/bookmark.actions";
import { useMoreButtonClickOutside } from "@/hooks/useClickOutside";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import AddOrEditBookmarkFolderButton from "../buttons/AddOrEditBookmarkFolderButton";
import MoreButtonEllipsis from "../buttons/moreButton/MoreButtonEllipsis";
import MoreButtonDropdown from "../buttons/moreButton/MoreButtonDropdown";

const MoreButtonBookmarkFolder = ({ name }: { name: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [edit, setEdit] = useState(false);

  const router = useRouter();

  useMoreButtonClickOutside(buttonRef, setIsOpen);

  const handleDelete = async () => {
    try {
      const res = await deleteBookmarkFolder(name);
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
      <MoreButtonDropdown
        isOpen={isOpen}
        handleDelete={handleDelete}
        handleEdit={() => {
          setEdit(!edit);
          setIsOpen(false);
        }}
      />
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
