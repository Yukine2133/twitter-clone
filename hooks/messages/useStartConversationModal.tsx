import { useState, useEffect } from "react";
import { searchUsers } from "@/actions/user.actions";
import { IUser } from "@/interfaces/user.interface";

export const useStartConversationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedUsers, setSearchUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleModal = (state: boolean) => {
    setIsModalOpen(state);
    if (!state) {
      setSearchQuery("");
      setSearchUsers([]);
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchUsers([]);
      return;
    }

    const delaySearch = setTimeout(async () => {
      setLoading(true);
      try {
        const users = (await searchUsers(searchQuery)) as IUser[];
        setSearchUsers(users);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);
  return {
    isModalOpen,
    toggleModal,
    searchQuery,
    setSearchQuery,
    searchedUsers,
    loading,
  };
};
