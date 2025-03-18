"use client";

import { useRef, useState } from "react";
import MoreButtonEllipsis from "./MoreButtonEllipsis";
import MoreButtonDropdown from "./MoreButtonDropdown";
import { useMoreButtonClickOutside } from "@/hooks/useClickOutisde";
import { NoSymbolIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/tweets/Modal";
import ReactTextareaAutosize from "react-textarea-autosize";
import { banUser } from "@/actions/user.actions";
import { toast } from "react-toastify";

export const MoreButtonProfile = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [banReason, setBanReason] = useState("");

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useMoreButtonClickOutside(buttonRef, setIsOpen);

  const handleBanSubmit = async () => {
    try {
      await banUser(userId, banReason);

      toast.success("User has been successfully banned.");
    } catch (error) {
    } finally {
      setIsBanModalOpen(false);
      setBanReason("");
    }
  };
  return (
    <>
      <div className="relative inline-block">
        <MoreButtonEllipsis
          className="relative lg:opacity-100 p-2 border border-neutral-700 rounded-full hover:bg-neutral-900 transition-colors hover:text-white"
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <MoreButtonDropdown className="top-2" isOpen={isOpen}>
            <div className="py-1">
              <button
                onClick={() => setIsBanModalOpen(true)}
                className="flex w-full items-center gap-2 px-4 py-3 text-left text-[15px] transition-colors hover:bg-white/10 text-red-500"
              >
                <NoSymbolIcon className="size-5 " />
                <span>Ban</span>
              </button>
            </div>
          </MoreButtonDropdown>
        )}
      </div>
      {isBanModalOpen && (
        <Modal
          isModalOpen={isBanModalOpen}
          toggleModal={() => setIsBanModalOpen(false)}
        >
          <div className="p-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsBanModalOpen(false)}
                  className="rounded-full p-2 hover:bg-neutral-800 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
                <h2 className="text-xl font-bold">Ban User</h2>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleBanSubmit();
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">
                    Reason for Ban
                  </label>
                  <div className="relative">
                    <ReactTextareaAutosize
                      value={banReason}
                      onChange={(e) => setBanReason(e.target.value)}
                      placeholder="Explain why this user is being banned..."
                      minRows={3}
                      maxRows={6}
                      className="w-full bg-black border border-neutral-800 rounded-md p-3 resize-none focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-neutral-500">
                      {banReason.length}/280
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsBanModalOpen(false)}
                    className="px-4 py-2 rounded-full border border-neutral-700 hover:bg-neutral-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!banReason.trim()}
                    className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors font-bold disabled:opacity-50"
                  >
                    Ban User
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};
