import {
  addBookmarkFolder,
  editBookmarkFolder,
} from "@/actions/bookmark.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
const useAddOrEditBookmarkFolderButton = ({
  edit,
  setEdit,
  folderName,
}: {
  edit?: boolean;
  setEdit?: (arg0: boolean) => void;
  folderName?: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState((folderName as string) || "");

  const router = useRouter();

  const toggleModal = () => {
    setEdit ? setEdit(!edit) : setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (edit) {
        await editBookmarkFolder(folderName as string, name);
        toast.success("Folder was updated successfully..");
        router.push(`/bookmarks/${name}`);
      } else {
        await addBookmarkFolder(name);
        toast.success("Folder was created successfully.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setName("");
      edit ? setEdit?.(false) : toggleModal();
    }
  };
  return {
    isModalOpen,
    toggleModal,
    name,
    setName,
    handleSubmit,
  };
};

export default useAddOrEditBookmarkFolderButton;
