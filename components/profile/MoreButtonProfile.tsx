"use client";

import MoreButtonEllipsis from "../buttons/moreButton/MoreButtonEllipsis";
import MoreButtonDropdown from "../buttons/moreButton/MoreButtonDropdown";

import { useMoreButtonProfile } from "@/hooks/profile/useMoreButtonProfile";
import { MoreButtonProfileModal } from "./MoreButtonProfileModal";

export interface IMoreButtonProfileProps {
  userId: string;
  isBanned: boolean;
}

export const MoreButtonProfile = ({
  userId,
  isBanned,
}: IMoreButtonProfileProps) => {
  const {
    isOpen,
    setIsOpen,
    isBanModalOpen,
    setIsBanModalOpen,
    banReason,
    setBanReason,
    buttonRef,
    handleBanSubmit,
    handleUnBan,
  } = useMoreButtonProfile(userId);
  return (
    <>
      <div className="relative inline-block">
        <MoreButtonEllipsis
          className="relative lg:opacity-100 p-2 border border-neutral-700 rounded-full hover:bg-neutral-900 transition-colors hover:text-white"
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
        />
        <MoreButtonDropdown
          className="top-2"
          isOpen={isOpen}
          profile
          handleUnBan={handleUnBan}
          isBanned={isBanned}
          setIsBanModalOpen={setIsBanModalOpen}
        />
      </div>
      {isBanModalOpen && (
        <MoreButtonProfileModal
          isBanModalOpen={isBanModalOpen}
          setIsBanModalOpen={setIsBanModalOpen}
          banReason={banReason}
          setBanReason={setBanReason}
          handleBanSubmit={handleBanSubmit}
        />
      )}
    </>
  );
};
