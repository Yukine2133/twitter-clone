import { useRef, useState } from "react";
import { useMoreButtonClickOutside } from "@/hooks/useClickOutside";
import { useHandleBanning } from "./useHandleBanning";
export const useMoreButtonProfile = (userId: string) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useMoreButtonClickOutside(buttonRef, setIsOpen);

  const {
    handleBanSubmit,
    handleUnBan,
    isBanModalOpen,
    setIsBanModalOpen,
    banReason,
    setBanReason,
  } = useHandleBanning(userId);

  return {
    isOpen,
    setIsOpen,
    isBanModalOpen,
    setIsBanModalOpen,
    banReason,
    setBanReason,
    buttonRef,
    handleBanSubmit,
    handleUnBan,
  };
};
