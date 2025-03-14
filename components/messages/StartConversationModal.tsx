"use client";

import Modal from "../tweets/Modal";
import {
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import UserCard from "../search/UserCard";
import { useStartConversationModal } from "@/hooks/messages/useStartConversationModal";
import { useRouter } from "next/navigation";

export const StartConversationModal = () => {
  const {
    isModalOpen,
    toggleModal,
    searchQuery,
    setSearchQuery,
    searchedUsers,
    loading,
  } = useStartConversationModal();

  const router = useRouter();

  return (
    <>
      <button
        onClick={() => toggleModal(true)}
        className="rounded-full p-2 hover:bg-white/10 transition-colors"
      >
        <ChatBubbleLeftIcon className="h-5 w-5" />
      </button>

      <Modal isModalOpen={isModalOpen} toggleModal={toggleModal}>
        <div className="flex flex-col max-h-[80vh]">
          <div className="flex items-center gap-4 p-4 border-b border-neutral-800">
            <button
              onClick={() => toggleModal(false)}
              className="rounded-full p-2 hover:bg-white/10 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold">New message</h2>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-neutral-500" />
              <input
                type="text"
                placeholder="Search people"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-neutral-500"
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="flex-1 overflow-y-auto">
            {loading && (
              <div className="text-center text-neutral-500 py-8">
                Searching...
              </div>
            )}

            {!loading && searchQuery.trim() && searchedUsers.length === 0 && (
              <div className="text-center text-neutral-500 py-8">
                No users found.
              </div>
            )}

            {!loading && !searchQuery.trim() && (
              <div className="text-center text-neutral-500 py-8">
                Try searching for people to message.
              </div>
            )}

            {!loading && searchedUsers.length > 0 && (
              <div>
                {searchedUsers.map((user) => (
                  <div
                    key={user._id}
                    className="px-4 py-3 hover:bg-white/[0.03] transition-colors"
                    onClick={() =>
                      router.push(
                        `/messages/${user.username}?userId=${user.userId}`
                      )
                    }
                  >
                    <UserCard user={user} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
